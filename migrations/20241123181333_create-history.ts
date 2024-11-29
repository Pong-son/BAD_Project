import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("history", (table) => {
    table.increments();
    table.integer("equipment_id").unsigned();
    table.foreign("equipment_id").references("equipment.id");
    table.date("calibration_date");
    table.date("expiry_date");
    table.timestamps(false,true);
  })
}


export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable("history")
}

