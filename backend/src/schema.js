const { pgTable, serial, text, integer, timestamp, boolean, jsonb, varchar, decimal } = require('drizzle-orm/pg-core');
const { relations } = require('drizzle-orm');

const users = pgTable('users', {
  id: serial('id').primaryKey(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  name: varchar('name', { length: 255 }).notNull(),
  picture: text('picture'),
  googleId: varchar('google_id', { length: 255 }),
  credits: integer('credits').default(50).notNull(),
  plan: varchar('plan', { length: 50 }).default('free').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull()
});

const scans = pgTable('scans', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').references(() => users.id).notNull(),
  imageUrl: text('image_url'),
  result: varchar('result', { length: 50 }).notNull(),
  confidence: integer('confidence').notNull(),
  metadata: jsonb('metadata'),
  createdAt: timestamp('created_at').defaultNow().notNull()
});

const designs = pgTable('designs', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').references(() => users.id).notNull(),
  title: varchar('title', { length: 255 }).notNull(),
  type: varchar('type', { length: 50 }).notNull(),
  prompt: text('prompt'),
  imageUrl: text('image_url'),
  status: varchar('status', { length: 50 }).default('draft').notNull(),
  templateId: varchar('template_id', { length: 100 }),
  brandKitId: integer('brand_kit_id'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull()
});

const brandKits = pgTable('brand_kits', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').references(() => users.id).notNull(),
  name: varchar('name', { length: 255 }).notNull(),
  logoUrl: text('logo_url'),
  primaryColor: varchar('primary_color', { length: 20 }),
  secondaryColor: varchar('secondary_color', { length: 20 }),
  accentColor: varchar('accent_color', { length: 20 }),
  fontFamily: varchar('font_family', { length: 100 }),
  isDefault: boolean('is_default').default(false),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull()
});

const creditTransactions = pgTable('credit_transactions', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').references(() => users.id).notNull(),
  amount: integer('amount').notNull(),
  action: varchar('action', { length: 100 }).notNull(),
  description: text('description'),
  balanceAfter: integer('balance_after').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull()
});

const notifications = pgTable('notifications', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').references(() => users.id).notNull(),
  title: varchar('title', { length: 255 }).notNull(),
  message: text('message').notNull(),
  type: varchar('type', { length: 50 }).default('info').notNull(),
  isRead: boolean('is_read').default(false).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull()
});

const subscriptions = pgTable('subscriptions', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').references(() => users.id).notNull(),
  plan: varchar('plan', { length: 50 }).notNull(),
  status: varchar('status', { length: 50 }).default('active').notNull(),
  creditsPerMonth: integer('credits_per_month').notNull(),
  pricePerMonth: decimal('price_per_month', { precision: 10, scale: 2 }),
  currentPeriodStart: timestamp('current_period_start').notNull(),
  currentPeriodEnd: timestamp('current_period_end').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull()
});

const templates = pgTable('templates', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  category: varchar('category', { length: 100 }).notNull(),
  previewUrl: text('preview_url'),
  isActive: boolean('is_active').default(true).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull()
});

const usersRelations = relations(users, ({ many }) => ({
  scans: many(scans),
  designs: many(designs),
  brandKits: many(brandKits),
  creditTransactions: many(creditTransactions),
  notifications: many(notifications),
  subscriptions: many(subscriptions)
}));

const scansRelations = relations(scans, ({ one }) => ({
  user: one(users, {
    fields: [scans.userId],
    references: [users.id]
  })
}));

const designsRelations = relations(designs, ({ one }) => ({
  user: one(users, {
    fields: [designs.userId],
    references: [users.id]
  }),
  brandKit: one(brandKits, {
    fields: [designs.brandKitId],
    references: [brandKits.id]
  })
}));

const brandKitsRelations = relations(brandKits, ({ one }) => ({
  user: one(users, {
    fields: [brandKits.userId],
    references: [users.id]
  })
}));

const creditTransactionsRelations = relations(creditTransactions, ({ one }) => ({
  user: one(users, {
    fields: [creditTransactions.userId],
    references: [users.id]
  })
}));

const notificationsRelations = relations(notifications, ({ one }) => ({
  user: one(users, {
    fields: [notifications.userId],
    references: [users.id]
  })
}));

const subscriptionsRelations = relations(subscriptions, ({ one }) => ({
  user: one(users, {
    fields: [subscriptions.userId],
    references: [users.id]
  })
}));

module.exports = {
  users,
  scans,
  designs,
  brandKits,
  creditTransactions,
  notifications,
  subscriptions,
  templates,
  usersRelations,
  scansRelations,
  designsRelations,
  brandKitsRelations,
  creditTransactionsRelations,
  notificationsRelations,
  subscriptionsRelations
};
