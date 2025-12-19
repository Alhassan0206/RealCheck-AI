const { drizzle } = require('drizzle-orm/node-postgres');
const { Pool } = require('pg');
const schema = require('./schema');

let db;
let pool;

if (!process.env.DATABASE_URL) {
  console.warn('⚠️ WARNING: DATABASE_URL not set. Using MOCK DATABASE for testing purposes.');

  // Mock Chainable Query Builder
  const createMockBuilder = (op) => {
    const builder = {
      from: () => builder,
      where: () => builder,
      orderBy: () => builder,
      limit: () => builder,
      set: () => builder,
      values: (vals) => {
        builder.vals = vals;
        return builder;
      },
      returning: () => Promise.resolve([{ id: 1, ...builder.vals, ...builder.mockData }]),
      then: (resolve) => resolve([{ id: 1, ...builder.mockData }])
    };
    return builder;
  };

  db = {
    select: () => createMockBuilder('select'),
    insert: () => createMockBuilder('insert'),
    update: () => createMockBuilder('update'),
    delete: () => createMockBuilder('delete'),
    ...schema
  };

  // Basic mock pool
  pool = { end: () => Promise.resolve() };

} else {
  pool = new Pool({ connectionString: process.env.DATABASE_URL });
  db = drizzle(pool, { schema });
}

module.exports = { db, pool };
