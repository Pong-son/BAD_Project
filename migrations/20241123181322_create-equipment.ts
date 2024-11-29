import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("equipment", (table) => {
    table.increments();
    table.string("name");
    table.string("brand");
    table.string("model");
    table.integer("parameter_id").unsigned();
    table.foreign("parameter_id").references("parameter.id");
    table.date("calibration_date");
    table.date("expiry_date");
    table.timestamps(false,true);
  })
}


export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable("equipment")
}

