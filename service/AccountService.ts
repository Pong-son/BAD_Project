import { Knex } from 'knex';

export class AccountService {
  constructor(private knex: Knex){}

  async getAccount() {
    return await this.knex.select('id','username','email','is_admin').from("account");
  }

  async addAccount(username:string, email:string, password:string) {
    return await this.knex.insert({
      username:username,
      email:email,
      password:password,
      is_admin:false
    }).into("account"); 
  }

  async updateAccount(id:number, username:string, email:string) {
    return await this.knex("account").update({
      username:username,
      email:email,

    }).where("id",id);
  }

  async updateAccountPW (id:number, newPW:string) {
    return await this.knex("account").update({
      password:newPW,
    }).where("id",id);
  }

  async updateAccountAdmin (id:number, is_admin:boolean) {
    return await this.knex("account").update({
      is_admin:is_admin
    }).where("id",id);
  }

  async delAccount(id:number) {
    return await this.knex("account").where("id",id).del();
  }
}