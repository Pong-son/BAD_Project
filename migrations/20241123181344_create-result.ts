import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("result", (table) => {
    table.increments();
    table.integer("job_id").unsigned();
    table.foreign("job_id").references("job.id");
    table.string("point_no");
    table.string("description");
    table.date("sampling_date");
    table.integer("carbon_dioxide");
    table.integer("co2_equipment_id").unsigned();
    table.foreign("co2_equipment_id").references("equipment.id")
    table.integer("pm10");
    table.integer("pm10_equipment_id").unsigned();
    table.foreign("pm10_equipment_id").references("equipment.id")
    table.float("humidity");
    table.integer("rh_equipment_id").unsigned();
    table.foreign("rh_equipment_id").references("equipment.id")
    table.text("photo");
    table.text("processed_photo");
    table.timestamps(false,true);
  })
}


export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable("result")
}

