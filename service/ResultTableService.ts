import { Knex } from 'knex';

export class ResultTableService {
  constructor(private knex: Knex){}

  async getResultTable(jobId:number) {
    return await this.knex('result').select('id', 'point_no', 'description', 'sampling_date', 'carbon_dioxide' , 'co2_equipment_id' ,'pm10', 'pm10_equipment_id', 'humidity', 'rh_equipment_id', 'photo', 'processed_photo').where('job_id',jobId).orderBy('point_no', 'asc');
  }

  async addResultTable(jobId:number, point:string|string[], description:string|string[], samplingDate:string|string[], co2Result:number, co2Equipment:string|string[], pm10Result:number, pm10Equipment:string|string[], rhResult:number, rhEquipment:string|string[], photo:string|string[], newPhoto:string|string[]) {
    return await this.knex.insert({
      job_id: jobId,
      point_no: point,
      description: description,
      sampling_date: samplingDate,
      carbon_dioxide: co2Result,
      co2_equipment_id: this.knex('equipment').select('id').where('name', co2Equipment),
      pm10: pm10Result,
      pm10_equipment_id: this.knex('equipment').select('id').where('name', pm10Equipment),
      humidity: rhResult,
      rh_equipment_id: this.knex('equipment').select('id').where('name', rhEquipment),
      photo: photo,
      processed_photo: newPhoto
    }).into('result');
  }

  async updateResultTable(id:number, point:string|string[], description:string|string[], samplingDate:string|string[], co2Result:number, co2Equipment:number, pm10Result:number, pm10Equipment:number, rhResult:number, rhEquipment:number) {
    return await this.knex('result').update({
      point_no: point,
      description: description,
      sampling_date: samplingDate,
      carbon_dioxide: co2Result,
      co2_equipment_id: co2Equipment,
      pm10: pm10Result,
      pm10_equipment_id: pm10Equipment,
      humidity: rhResult,
      rh_equipment_id: rhEquipment
    }).where('id',id);
  }

  async delResultTable(id:number) {
    return await this.knex('result').where('id',id).del();
  }
}