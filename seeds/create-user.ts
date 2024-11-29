import { Knex } from "knex";
import { hashPassword } from '../utilities/hash'

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("user").del();

    let password = await hashPassword("admin")
    // Inserts seed entries
    await knex("user").insert([
        { id: 1, username: "Admin", password: password, is_admin:true }
    ]);
};
