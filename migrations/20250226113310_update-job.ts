import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable("job", (table) => {
    table.dropColumn('floor_plan')
  })
}


export async function down(knex: Knex): Promise<void> {
  await knex.schema.alterTable("job", (table) => {
    table.text("floor_plan")
  })
}