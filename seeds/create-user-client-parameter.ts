import { Knex } from "knex";
import { hashPassword } from '../utilities/hash'

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("account").del();
    await knex("result").del();
    await knex("job").del();
    await knex("client").del();
    await knex("history").del();
    await knex("equipment").del();
    await knex("parameter").del();
    await knex("notice_board").del();

    let password = await hashPassword("Admin")
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
        { parameter: 'Humidity', calibration_period: 12},
        { parameter: 'PM10', calibration_period: 24}
    ]);

    await knex("equipment").insert([
        { name: 'Equipment A', brand: 'Brand A', model:'Model-1', parameter_id: knex('parameter').select('id').where('parameter','Carbon Dioxide'), calibration_date: '2024-12-27 00:00:00', expiry_date: '2026-12-26 00:00:00'},
        { name: 'Equipment B', brand: 'Brand B', model:'Model-2', parameter_id: knex('parameter').select('id').where('parameter','Humidity'), calibration_date: '2025-01-05 00:00:00', expiry_date: '2026-01-04 00:00:00'},
        { name: 'Equipment C', brand: 'Brand C', model:'Model-3', parameter_id: knex('parameter').select('id').where('parameter','PM10'), calibration_date: '2023-02-20 00:00:00', expiry_date: '2025-02-19 00:00:00'}
    ]);

    await knex("job").insert([
        { client_id: knex('client').select('id').where('company_name','Company A'), location: 'Tsuen Wan', job_receive_date:'2025-02-10 00:00:00', walkthrough_date: '2025-02-17 00:00:00', sampling_start_date: '2025-03-01 00:00:00', sampling_end_date: '2025-03-02 00:00:00', no_of_sampling_point:7},
        { client_id: knex('client').select('id').where('company_name','Company B'), location: 'Wan Chai', job_receive_date:'2025-02-17 00:00:00', walkthrough_date: '2025-02-15 00:00:00', sampling_start_date: '2025-02-22 00:00:00', sampling_end_date: '2025-02-24 00:00:00', no_of_sampling_point:10}
    ]);

    await knex("result").insert([
        { 
            job_id: knex('job').select('id').where('location','Tsuen Wan'),
            point_no: '1',
            description:'Office Area',
            sampling_date: '2025-02-27 00:00:00',
            carbon_dioxide: 798,
            co2_equipment_id: knex('equipment').select('id').where('parameter_id',knex('parameter').select('id').where('parameter','Carbon Dioxide')),
            pm10: 27,
            pm10_equipment_id:knex('equipment').select('id').where('parameter_id',knex('parameter').select('id').where('parameter','PM10')),
            humidity: 67.8,
            rh_equipment_id: knex('equipment').select('id').where('parameter_id',knex('parameter').select('id').where('parameter','Humidity')),
            photo: '',
            processed_photo:''
        },
        { 
            job_id: knex('job').select('id').where('location','Tsuen Wan'),
            point_no: '2',
            description:'Near reception',
            sampling_date: '2025-02-27 00:00:00',
            carbon_dioxide: 699,
            co2_equipment_id: knex('equipment').select('id').where('parameter_id',knex('parameter').select('id').where('parameter','Carbon Dioxide')),
            pm10: 22,
            pm10_equipment_id:knex('equipment').select('id').where('parameter_id',knex('parameter').select('id').where('parameter','PM10')),
            humidity: 60.4,
            rh_equipment_id: knex('equipment').select('id').where('parameter_id',knex('parameter').select('id').where('parameter','Humidity')),
            photo: '',
            processed_photo:''
        }
    ]);
};
