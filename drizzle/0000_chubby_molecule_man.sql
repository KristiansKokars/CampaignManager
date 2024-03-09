CREATE TABLE `cm_campaign` (
	`id` text(256) PRIMARY KEY NOT NULL,
	`dungeon_master_id` text(15) NOT NULL,
	`name` text(256) NOT NULL,
	`status` text NOT NULL,
	`description` text,
	`banner_url` text(256),
	FOREIGN KEY (`dungeon_master_id`) REFERENCES `cm_auth_user`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `cm_campaign_invite` (
	`campaign_id` text(256) NOT NULL,
	`invited_user_id` text(15) NOT NULL,
	`status` text DEFAULT 'sent',
	PRIMARY KEY(`campaign_id`, `invited_user_id`),
	FOREIGN KEY (`campaign_id`) REFERENCES `cm_campaign`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`invited_user_id`) REFERENCES `cm_auth_user`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `cm_campaign_note` (
	`id` text(256) PRIMARY KEY NOT NULL,
	`title` text(256),
	`text` text NOT NULL,
	`session_number` integer NOT NULL,
	`campaign_id` text(256) NOT NULL,
	`author_id` text(15) NOT NULL,
	FOREIGN KEY (`author_id`) REFERENCES `cm_auth_user`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `cm_campaign_session` (
	`session_number` integer NOT NULL,
	`campaign_id` text(256) NOT NULL,
	`date` integer DEFAULT CURRENT_TIMESTAMP,
	PRIMARY KEY(`campaign_id`, `session_number`)
);
--> statement-breakpoint
CREATE TABLE `cm_auth_user` (
	`id` text(15) PRIMARY KEY NOT NULL,
	`username` text(254),
	`email` text(320),
	`email_verified` integer
);
--> statement-breakpoint
CREATE TABLE `cm_user_key` (
	`id` text(255) PRIMARY KEY NOT NULL,
	`user_id` text(15) NOT NULL,
	`hashed_password` text(255),
	FOREIGN KEY (`user_id`) REFERENCES `cm_auth_user`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `cm_user_session` (
	`id` text(128) PRIMARY KEY NOT NULL,
	`user_id` text(15) NOT NULL,
	`active_expires` blob NOT NULL,
	`idle_expires` blob NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `cm_auth_user`(`id`) ON UPDATE no action ON DELETE no action
);
