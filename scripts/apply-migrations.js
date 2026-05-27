const { Pool } = require('pg');
const fs = require('fs');
const path = require('path');

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error('DATABASE_URL environment variable is not set');
}

const migrations = [
  { name: '001_init', path: 'prisma/migrations/001_init/migration.sql' },
  { name: '002_add_auth_tables', path: 'prisma/migrations/002_add_auth_tables/migration.sql' }
];

async function applyStatement(pool, statement) {
  // CockroachDB requires schema changes in implicit transactions
  // We release the client after each statement
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    await client.query(statement);
    await client.query('COMMIT');
  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  } finally {
    client.release();
  }
}

async function applyMigration(pool, migration) {
  const migrationPath = path.join(process.cwd(), migration.path);

  if (!fs.existsSync(migrationPath)) {
    console.log(`⚠️  Migration file not found: ${migration.name}`);
    return;
  }

  console.log(`Applying migration: ${migration.name}...`);

  const sql = fs.readFileSync(migrationPath, 'utf-8');

  // Split by semicolon but handle CREATE FUNCTION that contains semicolons
  const statements = [];
  let currentStatement = '';
  let inFunction = false;

  const lines = sql.split('\n');
  for (const line of lines) {
    if (line.trim().startsWith('--')) continue; // Skip comments

    currentStatement += line + '\n';

    if (line.includes('CREATE OR REPLACE FUNCTION')) {
      inFunction = true;
    }

    if (line.includes('$$ LANGUAGE plpgsql')) {
      inFunction = false;
    }

    // Split on semicolon only when not in function
    if (line.trim().endsWith(';') && !inFunction) {
      statements.push(currentStatement.trim());
      currentStatement = '';
    }
  }

  // Apply each statement in its own transaction
  for (let i = 0; i < statements.length; i++) {
    const statement = statements[i];
    if (!statement) continue;

    try {
      await applyStatement(pool, statement);
      console.log(`  ✓ Statement ${i + 1}/${statements.length}`);
    } catch (error) {
      // Ignore "trigger already exists" errors
      const isTriggerExists = error.message.includes('already exists') ||
                            error.message.includes('duplicate') ||
                            error.code === '42P07' ||
                            error.code === '42710';

      if (isTriggerExists) {
        console.log(`  ⊘ Statement ${i + 1}/${statements.length} (already exists, skipped)`);
      } else {
        console.error(`  ✗ Statement ${i + 1}/${statements.length} failed:`, error.message);
        throw error;
      }
    }
  }

  console.log(`✓ Applied migration: ${migration.name}`);
}

async function main() {
  const pool = new Pool({ connectionString, max: 1 }); // Limit connections for CockroachDB

  try {
    console.log('Connecting to CockroachDB...');

    for (const migration of migrations) {
      await applyMigration(pool, migration);
    }

    console.log('✅ All migrations applied successfully!');
  } catch (error) {
    console.error('❌ Error applying migrations:', error);
    process.exit(1);
  } finally {
    await pool.end();
  }
}

main();