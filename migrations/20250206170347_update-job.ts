import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable("job", (table) => {
    table.dropColumn('is_admin')
  })
}


export async function down(knex: Knex): Promise<void> {
  await knex.schema.alterTable("job", (table) => {
    table.boolean("is_admin")
  })
}

