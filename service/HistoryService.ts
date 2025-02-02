import { Knex } from 'knex';

export class HistoryService {
  constructor(private knex: Knex){}

  async getHistory() {
    return await this.knex('history').join('equipment','history.equipment_id','equipment.id').select('history.id', 'equipment.name', 'history.calibration_date', 'history.expiry_date');
  }

  async addHistory(id:number, calibrationDate:Date, expiryDate: Date) {
    return await this.knex.insert({
      equipment_id: id,
      calibration_date: calibrationDate,
      expiry_date: expiryDate
    }).into("history");
  }

  async delHistory(id:number) {
    return await this.knex("history").where("id",id).del();
  }
}