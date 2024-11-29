import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("notice_board", (table) => {
    table.increments();
    table.string("title");
    table.string("content");
    table.integer("done_by");
    table.boolean("finish")
    table.timestamps(false,true);
  })
}


export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable("notice_board")
}

