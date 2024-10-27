import { Knex } from "knex";

const table_name = 'match'

export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable(table_name, (table) => {
        table.increments('id').primary()
        table.string('day').nullable()
        table.string('time').nullable()
        table.boolean('status').defaultTo(true).notNullable()
        table
      .integer("user_id")
      .unsigned()
      .nullable()
      .references("id")
      .inTable("user");
      table
      .integer("stadium_id")
      .unsigned()
      .nullable()
      .references("id")
      .inTable("stadium");
        table.timestamp('created_at', { useTz: false }).defaultTo(knex.raw('now()')).notNullable()
        table.timestamp('updated_at', { useTz: false }).defaultTo(knex.raw('now()')).notNullable()
    })
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTableIfExists(table_name)
}

