import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("user", (table) => {
    table.increments();
    table.string("username");
    table.string("email");
    table.string("password");
    table.boolean("is_admin");
    table.timestamps(false,true);
  })
}


export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable("user")
}

