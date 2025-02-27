import { Knex } from 'knex';

export class ReportService {
  constructor(private knex: Knex){}

  async getReport(jobId:number) {
    return await this.knex('job').where('job.id',jobId)
      .join('client','job.client_id','client.id')
      .join('result','job.id','result.job_id')
      .join('equipment as co2Equipment','result.co2_equipment_id','=','co2Equipment.id')
      .join('equipment as pm10Equipment','result.pm10_equipment_id','=','pm10Equipment.id')
      .join('equipment as rhEquipment','result.rh_equipment_id','=','rhEquipment.id')
      .select('job.id', 'job.location', 'job.walkthrough_date', 'job.no_of_sampling_point', 'job.sampling_start_date', 'job.sampling_end_date', 'client.company_name','client.address','client.contact','client.phone_no','client.email','result.point_no','result.description','result.sampling_date','result.carbon_dioxide','co2Equipment.name as co2Equipment' ,'pm10','pm10Equipment.name as pm10Equipment','result.humidity','rhEquipment.name as rhEquipment','result.processed_photo')
      .orderBy('result.point_no', 'asc');
  }
}