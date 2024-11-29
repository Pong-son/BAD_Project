import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("parameter", (table) => {
    table.increments();
    table.string("parameter");
    table.integer("calibration_period");
    table.timestamps(false,true);
  })
}


export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable("parameter")
}

