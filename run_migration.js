require('dotenv/config');
const { PrismaClient } = require('./src/generated/prisma');
const { PrismaPg } = require('@prisma/adapter-pg');
const { Pool } = require('pg');

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);

const prisma = new PrismaClient({
  adapter,
  log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
});

async function runMigration() {
  try {
    console.log('Running migration: Add online_business field...');
    
    // Check if the column already exists
    const result = await prisma.$queryRaw`
      SELECT column_name 
      FROM information_schema.columns 
      WHERE table_name = 'Business' 
      AND column_name = 'isOnlineBusiness'
    `;
    
    if (result.length === 0) {
      console.log('Column does not exist, adding it...');
      await prisma.$executeRaw`
        ALTER TABLE "Business" 
        ADD COLUMN "isOnlineBusiness" BOOLEAN NOT NULL DEFAULT false
      `;
      console.log('✅ Migration completed successfully!');
    } else {
      console.log('Column already exists, skipping migration.');
    }
    
  } catch (error) {
    console.error('❌ Migration failed:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

runMigration();