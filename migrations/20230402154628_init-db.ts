import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('posts', (table) => {
    table.specificType('id', 'CHAR(12)').primary();
    table.string('slug', 60).notNullable().unique();
    table.string('title', 80).notNullable();
    table.text('content');
    table.timestamp('publishedAt');
    table.timestamp('createdAt').notNullable().defaultTo(knex.fn.now());
    table.timestamp('updatedAt').notNullable();
  });
   await knex.schema.createTable('users', (table) => {
    table.specificType('id', 'CHAR(12)').primary();
    table.string('name', 60);
    table.string('email', 60).notNullable().unique();
    table.string('password', 80).notNullable();
    table.timestamp('createdAt').notNullable().defaultTo(knex.fn.now());
    table.timestamp('updatedAt').notNullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('posts');
  await knex.schema.dropTable('users');
}
