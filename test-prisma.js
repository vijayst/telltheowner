require('dotenv').config();

const { PrismaPg } = require('@prisma/adapter-pg');
const { Pool } = require('pg');
const { PrismaClient } = require('./src/generated/prisma/client');

console.log('Creating pool...');
const pool = new Pool({ connectionString: process.env.DATABASE_URL });

console.log('Creating adapter...');
const adapter = new PrismaPg(pool);

console.log('Creating PrismaClient...');
const prisma = new PrismaClient({ adapter });

console.log('Testing prisma client...');
console.log('Prisma object:', prisma);
console.log('Has findUnique:', typeof prisma.user?.findUnique);
console.log('Has user:', typeof prisma.user);
console.log('Available models:', Object.keys(prisma).filter(k => typeof prisma[k] === 'object' && prisma[k].findMany));

console.log('\nTesting PrismaAdapter...');
const { PrismaAdapter } = require('@auth/prisma-adapter');
console.log('Creating adapter with prisma...');
const authAdapter = PrismaAdapter(prisma);
console.log('Auth adapter:', authAdapter);

// Test a simple query
prisma.$disconnect().then(() => {
  console.log('\nDisconnected successfully');
  process.exit(0);
}).catch(err => {
  console.error('Error disconnecting:', err);
  process.exit(1);
});