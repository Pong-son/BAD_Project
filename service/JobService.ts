import { Knex } from 'knex';

export class JobService {
  constructor(private knex: Knex){}

  async getJob() {
    return await this.knex('job').join('client','job.client_id','client.id').select('job.id', 'client.company_name', 'job.location', 'job.walkthrough_date', 'job.sampling_start_date', 'job.sampling_end_date', 'job.no_of_sampling_point');
  }

  async addJob(client:string, location:string, jobReceiveDate: Date, walkthroughDate:Date|null, startDate:string|null, endDate:Date|null, totalPoint: number|null) {
    return await this.knex.insert({
      client_id: this.knex('client').select('id').where('company_name',client),
      location: location,
      job_receive_date: jobReceiveDate,
      walkthrough_date: walkthroughDate,
      sampling_start_date: startDate,
      sampling_end_date: endDate,
      no_of_sampling_point: totalPoint
    }).into('job');
  }

  async updateJob(id:number, client:string, location:string, walkthroughDate:Date, startDate:string, endDate:Date, totalPoint: number) {
    return await this.knex('job').update({
      client_id: this.knex('client').select('id').where('company_name',client),
      location: location,
      walkthrough_date: walkthroughDate,
      sampling_start_date: startDate,
      sampling_end_date: endDate,
      no_of_sampling_point: totalPoint
    }).where('id',id);
  }

  async delJob(id:number) {
    return await this.knex('job').where('id',id).del();
  }
}