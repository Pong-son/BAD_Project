import { Knex } from 'knex';

export class ParameterService {
  constructor(private knex: Knex){}

  async getParameter() {
    return await this.knex.select('id','parameter','calibration_period').from("parameter").orderBy('id', 'asc');
  }

  async addParameter(parameter:string, calibrationPeriod:string) {
    return await this.knex.insert({
      parameter: parameter,
      calibration_period: calibrationPeriod
    }).into("parameter");
  }

  async updateParameter(id:number, parameter:string, calibrationPeriod:string) {
    return await this.knex("parameter").update({
      parameter:parameter,
      calibration_period:calibrationPeriod,
    }).where("id",id);
  }

  async delParameter(id:number) {
    return await this.knex("parameter").where("id",id).del();
  }
}