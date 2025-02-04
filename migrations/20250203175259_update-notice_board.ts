import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable('notice_board', (table) => {
    table.string('done_by').alter()
  })
}


export async function down(knex: Knex): Promise<void> {
  await knex.schema.alterTable('notice_board', (table) => {
    table.integer('done_by').alter()
  })
}

