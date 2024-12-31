import { Knex } from "knex";
import { hashPassword } from '../utilities/hash'

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("account").del();

    let password = await hashPassword("admin")
    let password2 = await hashPassword("qwer1234")
    // Inserts seed entries
    await knex("account").insert([
        { id: 1, username: "Admin", password: password, is_admin:true },
        { id: 2, username: 'one', password: password2, is_admin: false}
    ]);
};
