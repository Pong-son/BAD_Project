import { Knex } from 'knex';

export class JobService {
  constructor(private knex: Knex){}

  async getJob() {
    let data = await this.knex.select('id', 'name', 'expiry_date').from('job');
    let today = new Date()
    data.forEach(async item => {
      let itemDate = new Date(item.expiry_date)
      let dateDifference = Math.ceil((itemDate.getTime() - today.getTime())/(1000*60*60*24))
      if(dateDifference > 0 && dateDifference < 30){
        let items = await this.knex.select('title','finish').from('notice_board').where({'title':item.name,'finish':false});
        if(items) {
          await this.knex('notice_board').where('title',item.name).del();
          await this.knex.insert({
            title: item.name,
            content: `Expired in ${dateDifference} day(s)`,
            finish:false
          }).into('notice_board');
        }
      }
    })
    return await this.knex('job').join('parameter','job.parameter_id','parameter.id').select('job.id', 'job.name', 'job.brand', 'job.model', 'parameter.parameter', 'job.calibration_date', 'job.expiry_date');
  }

  async addJob(name:string, brand:string, model:string, parameter:string, calibrationDate:Date) {
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
    }).into('job');
  }

  async updateJob(id:number, name:string, brand:string, model:string, parameter:string, calibrationDate:Date) {
    let expiryDate = new Date(calibrationDate)
    let calibrationPeriod = await this.knex('parameter').select('calibration_period').where('parameter',parameter)
    expiryDate.setMonth(expiryDate.getMonth() + Number(calibrationPeriod[0].calibration_period))
    expiryDate.setDate(expiryDate.getDate() - 1)
    return await this.knex('job').update({
      name: name,
      brand: brand,
      model: model,
      parameter_id: this.knex('parameter').select('id').where('parameter',parameter),
      calibration_date: calibrationDate,
      expiry_date: expiryDate
    }).where('id',id);
  }

  async delJob(id:number) {
    return await this.knex('job').where('id',id).del();
  }
}