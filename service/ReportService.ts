import { Knex } from 'knex';

export class ReportService {
  constructor(private knex: Knex){}

  async getReport() {
    return await this.knex.select('id','company_name','address', 'contact', 'phone_no', 'email').from("report");
  }

  async addReport(companyName:string, address:string, contact:string, phoneNo:string, email:string) {
    return await this.knex.insert({
      company_name: companyName,
      address: address,
      contact: contact,
      phone_no: phoneNo,
      email: email
    }).into("report");
  }

  async updateReport(id:number, companyName:string, address:string, contact:string, phoneNo:string, email:string) {
    return await this.knex("report").update({
      company_name: companyName,
      address: address,
      contact: contact,
      phone_no: phoneNo,
      email: email
    }).where("id",id);
  }

  async delReport(id:number) {
    return await this.knex("report").where("id",id).del();
  }
}