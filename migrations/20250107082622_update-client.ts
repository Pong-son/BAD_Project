import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable('client', (table) => {
    table.dropColumn('is_admin');
    table.string('phone_no');
    table.string("email");
  })
}


export async function down(knex: Knex): Promise<void> {
  await knex.schema.alterTable('client', (table) => {
    table.boolean('is_admin');
    table.dropColumn('phone_no');
    table.dropColumn("email");
  })
}

