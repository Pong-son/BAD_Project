import { Knex } from 'knex';

export class EquipmentService {
  constructor(private knex: Knex){}

  async getEquipment() {
    return await this.knex('equipment').join('parameter','equipment.parameter_id','parameter.id').select('equipment.id', 'equipment.name', 'equipment.brand', 'equipment.model', 'parameter.parameter', 'equipment.calibration_date', 'equipment.expiry_date');
  }

  async addEquipment(name:string, brand:string, model:string, parameter:string, calibrationDate:Date) {
    let expiryDate = new Date(calibrationDate)
    let calibrationPeriod = await this.knex('parameter').select('calibration_period').where('parameter',parameter)
    expiryDate.setMonth(expiryDate.getMonth() +  Number(calibrationPeriod[0].calibration_period))
    expiryDate.setDate(expiryDate.getDate() - 1)
    console.log(calibrationDate, expiryDate)
    return await this.knex.insert({
      name: name,
      brand: brand,
      model: model,
      parameter_id: this.knex('parameter').select('id').where('parameter',parameter),
      calibration_date: calibrationDate,
      expiry_date: expiryDate
    }).into("equipment");
  }

  async updateEquipment(id:number, name:string, brand:string, model:string, parameter:string, calibrationDate:Date) {
    let expiryDate = new Date(calibrationDate)
    let calibrationPeriod = await this.knex('parameter').select('calibration_period').where('parameter',parameter)
    expiryDate.setMonth(expiryDate.getMonth() + Number(calibrationPeriod[0].calibration_period))
    expiryDate.setDate(expiryDate.getDate() - 1)
    return await this.knex("equipment").update({
      name: name,
      brand: brand,
      model: model,
      parameter_id: this.knex('parameter').select('id').where('parameter',parameter),
      calibration_date: calibrationDate,
      expiry_date: expiryDate
    }).where("id",id);
  }

  async delEquipment(id:number) {
    return await this.knex("equipment").where("id",id).del();
  }
}