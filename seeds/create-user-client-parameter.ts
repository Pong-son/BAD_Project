import { Knex } from "knex";
import { hashPassword } from '../utilities/hash'

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("account").del();
    await knex("client").del();
    await knex("parameter").del();

    let password = await hashPassword("admin")
    let password2 = await hashPassword("qwer1234")
    // Inserts seed entries
    await knex("account").insert([
        { username: 'Admin', password: password, email: 'admin@testing.com',is_admin:true },
        { username: 'one', password: password2, email: 'peter@testing.com', is_admin: false}
    ]);

    await knex("client").insert([
        { company_name: 'Company A', address: 'XXX, Kowloon, H.K.', contact: 'Person A',phone_no:'12345678', email: 'aaa@aaa.com' },
        { company_name: 'Company B', address: 'YYY, Kowloon, H.K.', contact: 'Person B', phone_no: '87654321', email: 'bbb@bbb.com'}
    ]);

    await knex("parameter").insert([
        { parameter: 'Carbon Dioxide', calibration_period: 24},
        { parameter: 'Humidity', calibration_period: 12}
    ]);
};
