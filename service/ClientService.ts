import { Knex } from 'knex';

export class ClientService {
  constructor(private knex: Knex){}

  async getClient() {
    return await this.knex.select('id','company_name','address', 'contact', 'phone_no', 'email').from("client").orderBy('id','asc');
  }

  async addClient(companyName:string, address:string, contact:string, phoneNo:string, email:string) {
    return await this.knex.insert({
      company_name: companyName,
      address: address,
      contact: contact,
      phone_no: phoneNo,
      email: email
    }).into("client");
  }

  async updateClient(id:number, companyName:string, address:string, contact:string, phoneNo:string, email:string) {
    return await this.knex("client").update({
      company_name: companyName,
      address: address,
      contact: contact,
      phone_no: phoneNo,
      email: email
    }).where("id",id);
  }

  async delClient(id:number) {
    return await this.knex("client").where("id",id).del();
  }
}