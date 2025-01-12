import { Knex } from "knex";
import { hashPassword } from '../utilities/hash'

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("account").del();
    await knex("client").del();
    await knex("equipment").del();
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

    await knex("equipment").insert([
        { name: 'Equipment A', brand: 'Brand A', model:'Model-1', parameter_id: knex('parameter').select('id').where('parameter','Carbon Dioxide'), calibration_date: '2024-12-27 00:00:00', expiry_date: '2026-12-26 00:00:00'},
        { name: 'Equipment B', brand: 'Brand B', model:'Model-2', parameter_id: knex('parameter').select('id').where('parameter','Humidity'), calibration_date: '2025-01-05 00:00:00', expiry_date: '2026-01-04 00:00:00'}
    ]);
};
