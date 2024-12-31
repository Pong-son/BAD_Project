import { Knex } from 'knex';

export class LoginService {
  constructor(private knex: Knex){}

  async getLoginUser(username:string) {
    return await this.knex.select("*").from("account").where('username',username);
  }
}