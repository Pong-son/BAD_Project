import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("client", (table) => {
    table.increments();
    table.string("company_name");
    table.text("address");
    table.string("contact");
    table.boolean("is_admin");
    table.timestamps(false,true);
  })
}


export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable("client")
}

