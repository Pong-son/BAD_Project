import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("job", (table) => {
    table.increments();
    table.integer("client_id").unsigned();
    table.foreign("client_id").references("client.id");
    table.string("location");
    table.date("job_receive_date");
    table.timestamp("walkthrough_date");
    table.integer("no_of_sampling_point");
    table.text("floor_plan");
    table.date("sampling_start_date");
    table.date("sampling_end_date");
    table.date("report_issue_date");
    table.boolean("is_admin");
    table.timestamps(false,true);
  })
}


export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable("job")
}

