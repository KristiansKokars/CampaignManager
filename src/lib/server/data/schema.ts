import { relations, sql } from 'drizzle-orm';
import { primaryKey, text, sqliteTableCreator, integer, blob } from 'drizzle-orm/sqlite-core';

export const tablePrefix = 'cm_';

export const sqliteTable = sqliteTableCreator((name) => `${tablePrefix}${name}`);

export const user = sqliteTable('auth_user', {
	id: text('id', {
		length: 15
	}).primaryKey(),
	username: text('username', { length: 254 }),
	email: text('email', { length: 320 }),
	emailVerified: integer('email_verified', { mode: 'boolean' })
});

export const userRelations = relations(user, ({ many }) => ({
	notes: many(campaignNotes)
}));

export const userKey = sqliteTable('user_key', {
	id: text('id', {
		length: 255
	}).primaryKey(),
	userId: text('user_id', {
		length: 15
	})
		.notNull()
		.references(() => user.id),
	hashedPassword: text('hashed_password', {
		length: 255
	})
});

export const userSession = sqliteTable('user_session', {
	id: text('id', {
		length: 128
	}).primaryKey(),
	userId: text('user_id', {
		length: 15
	})
		.notNull()
		.references(() => user.id),
	activeExpires: blob('active_expires', {
		mode: 'bigint'
	}).notNull(),
	idleExpires: blob('idle_expires', {
		mode: 'bigint'
	}).notNull()
});

export const campaign = sqliteTable('campaign', {
	id: text('id', { length: 256 }).primaryKey(),
	dungeonMasterId: text('dungeon_master_id', { length: 15 })
		.notNull()
		.references(() => user.id, { onDelete: 'cascade' }),
	name: text('name', { length: 256 }).notNull(),
	status: text('status', {
		enum: ['not_started', 'started', 'paused', 'ongoing', 'finished']
	}).notNull(),
	description: text('description'),
	bannerUrl: text('banner_url', { length: 256 })
});

export const campaignRelations = relations(campaign, ({ many }) => ({
	sessions: many(campaignSession),
	campaignInvites: many(campaignInvite)
}));

export const campaignSession = sqliteTable(
	'campaign_session',
	{
		sessionNumber: integer('session_number').notNull(),
		campaignId: text('campaign_id', { length: 256 }).notNull(),
		date: integer('date', { mode: 'timestamp' }).default(sql`CURRENT_TIMESTAMP`)
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

export const campaignNotes = sqliteTable('campaign_note', {
	id: text('id', { length: 256 }).primaryKey(),
	title: text('title', { length: 256 }),
	text: text('text').notNull(),
	sessionNumber: integer('session_number').notNull(),
	campaignId: text('campaign_id', { length: 256 }).notNull(),
	authorId: text('author_id', { length: 15 })
		.notNull()
		.references(() => user.id, { onDelete: 'cascade' })
});

export const campaignNotesRelations = relations(campaignNotes, ({ one }) => ({
	campaignSession: one(campaignSession, {
		fields: [campaignNotes.sessionNumber, campaignNotes.campaignId],
		references: [campaignSession.sessionNumber, campaignSession.campaignId]
	}),
	author: one(user, {
		fields: [campaignNotes.authorId],
		references: [user.id]
	})
}));

export const campaignInvite = sqliteTable(
	'campaign_invite',
	{
		campaignId: text('campaign_id', { length: 256 })
			.notNull()
			.references(() => campaign.id, { onDelete: 'cascade' }),
		invitedUserId: text('invited_user_id', {
			length: 15
		})
			.notNull()
			.references(() => user.id, { onDelete: 'cascade' }),
		status: text('status', { enum: ['declined', 'accepted', 'sent'] }).default('sent')
	},
	(table) => {
		return {
			pk: primaryKey({ columns: [table.campaignId, table.invitedUserId] })
		};
	}
);

export const campaignInviteRelations = relations(campaignInvite, ({ one }) => ({
	campaign: one(campaign, {
		fields: [campaignInvite.campaignId],
		references: [campaign.id]
	})
}));
