import { timestamp, pgTable, text, primaryKey, integer, uuid } from 'drizzle-orm/pg-core'
// import type { AdapterAccount } from '@auth/core/adapters'
import { sql } from 'drizzle-orm'

export const users = pgTable('user', {
	id: text('id').notNull().primaryKey(),
	name: text('name'),
	email: text('email').notNull(),
	image: text('image').notNull()
})

export const room = pgTable('room', {
	id: uuid('id')
		.default(sql`gen_random_uuid()`)
		.notNull()
		.primaryKey(),
	userId: text('userId')
		.notNull()
		.references(() => users.id, { onDelete: 'cascade' }),
	name: text('name').notNull(),
	description: text('description'),
	tags: text('tags').notNull(),
	githubRepo: text('githubRepo')
})

export type Room = typeof room.$inferSelect
