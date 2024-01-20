import { relations } from 'drizzle-orm';
import {
	bigint,
	boolean,
	date,
	int,
	mysqlEnum,
	mysqlTableCreator,
	primaryKey,
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

export const campaignRelations = relations(campaign, ({ many }) => ({
	sessions: many(campaignSession)
}));

export const campaignSession = mysqlTable(
	'campaign_session',
	{
		sessionNumber: int('session_number').notNull(),
		campaignId: varchar('campaign_id', { length: 256 }).notNull(),
		date: date('date')
	},
	(table) => {
		return {
			pk: primaryKey({ columns: [table.campaignId, table.sessionNumber] })
		};
	}
);

export const campaignSessionRelations = relations(campaignSession, ({ one, many }) => ({
	campaign: one(campaign, {
		fields: [campaignSession.campaignId],
		references: [campaign.id]
	}),
	notes: many(campaignNotes)
}));

export const campaignNotes = mysqlTable('campaign_note', {
	id: varchar('id', { length: 256 }).primaryKey(),
	title: varchar('title', { length: 256 }),
	text: text('text').notNull(),
	sessionNumber: int('session_number').notNull(),
	campaignId: varchar('campaign_id', { length: 256 }).notNull(),
	authorId: varchar('author_id', { length: 15 })
		.notNull()
		.references(() => user.id)
});

export const campaignNotesRelations = relations(campaignNotes, ({ one }) => ({
	campaignSession: one(campaignSession, {
		fields: [campaignNotes.sessionNumber, campaignNotes.campaignId],
		references: [campaignSession.sessionNumber, campaignSession.campaignId]
	})
}));

export const campaignInvite = mysqlTable(
	'campaign_invite',
	{
		campaignId: varchar('campaign_id', { length: 256 })
			.notNull()
			.references(() => campaign.id),
		invitedUserId: varchar('invited_user_id', {
			length: 15
		})
			.notNull()
			.references(() => user.id),
		status: mysqlEnum('status', ['declined', 'accepted', 'sent']).default('sent')
	},
	(table) => {
		return {
			pk: primaryKey({ columns: [table.campaignId, table.invitedUserId] })
		};
	}
);
