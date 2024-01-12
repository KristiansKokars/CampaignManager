import { bigint, mysqlTableCreator, varchar } from 'drizzle-orm/mysql-core';

export const mysqlTable = mysqlTableCreator((name) => `campaign-manager_${name}`);

export const test = mysqlTable('test', {
	id: bigint('id', { mode: 'number' }).primaryKey().autoincrement(),
	name: varchar('name', { length: 256 })
});
