import { Knex } from "knex";

const table_name = 'requst_player'

export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable(table_name, (table) => {
        table.increments('id').primary()
        table.integer('match_id').nullable()
        .references('id')
        .inTable('match')

        
        table.string('number_of_player').nullable().unique()
        table.boolean('status').defaultTo(true).notNullable()
        table.timestamp('created_at', { useTz: false }).defaultTo(knex.raw('now()')).notNullable()
        table.timestamp('updated_at', { useTz: false }).defaultTo(knex.raw('now()')).notNullable()
    })
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTableIfExists(table_name)
}

