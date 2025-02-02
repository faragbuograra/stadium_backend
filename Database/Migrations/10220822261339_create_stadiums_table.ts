import { Knex } from "knex";

const table_name = 'stadium'

export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable(table_name, (table) => {
        table.increments('id').primary()
        table.string('name').nullable()
        table.string('number_of_player').nullable()
        table.integer('user_id').nullable()
        .references('id').inTable('user')
        table.string('balance').unique().nullable()

        table.boolean('status').defaultTo(true).notNullable()
        table.timestamp('created_at', { useTz: false }).defaultTo(knex.raw('now()')).notNullable()
        table.timestamp('updated_at', { useTz: false }).defaultTo(knex.raw('now()')).notNullable()
    })
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTableIfExists(table_name)
}

