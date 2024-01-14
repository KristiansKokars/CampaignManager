import {
	bigint,
	boolean,
	mysqlEnum,
	mysqlTableCreator,
	text,
	varchar
} from 'drizzle-orm/mysql-core';

export const tablePrefix = 'cm_';

export const mysqlTable = mysqlTableCreator((name) => `${tablePrefix}${name}`);

export const user = mysqlTable('auth_user', {
	id: varchar('id', {
		length: 15
	}).primaryKey(),
	username: varchar('username', { length: 254 }),
	email: varchar('email', { length: 320 }),
	emailVerified: boolean('email_verified')
});

export const userKey = mysqlTable('user_key', {
	id: varchar('id', {
		length: 255
	}).primaryKey(),
	userId: varchar('user_id', {
		length: 15
	})
		.notNull()
		.references(() => user.id),
	hashedPassword: varchar('hashed_password', {
		length: 255
	})
});

export const userSession = mysqlTable('user_session', {
	id: varchar('id', {
		length: 128
	}).primaryKey(),
	userId: varchar('user_id', {
		length: 15
	})
		.notNull()
		.references(() => user.id),
	activeExpires: bigint('active_expires', {
		mode: 'number'
	}).notNull(),
	idleExpires: bigint('idle_expires', {
		mode: 'number'
	}).notNull()
});

export const campaign = mysqlTable('campaign', {
	id: varchar('id', { length: 256 }).primaryKey(),
	dungeonMasterId: varchar('dungeon_master_id', { length: 15 })
		.notNull()
		.references(() => user.id),
	name: varchar('name', { length: 256 }).notNull(),
	status: mysqlEnum('status', [
		'not_started',
		'started',
		'paused',
		'ongoing',
		'finished'
	]).notNull(),
	description: text('description'),
	bannerUrl: varchar('banner_url', { length: 256 })
});
