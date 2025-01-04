import { Knex } from "knex";
import { hashPassword } from '../utilities/hash'

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("account").del();

    let password = await hashPassword("admin")
    let password2 = await hashPassword("qwer1234")
    // Inserts seed entries
    await knex("account").insert([
        { username: "Admin", password: password, email: 'admin@AbortController.com',is_admin:true },
        { username: 'one', password: password2, email: 'peter@AbortController.com', is_admin: false}
    ]);
};
