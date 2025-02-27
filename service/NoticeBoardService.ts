import { Knex } from 'knex';

export class NoticeBoardService {
  constructor(private knex: Knex){}

  async getNoticeBoard() {
    return await this.knex.select('id','title','content','finish').from("notice_board").where("finish",false).orderBy('id', 'asc');
  }

  async addNoticeBoard(title:string, content:string) {
    return await this.knex.insert({
      title: title,
      content: content,
      finish: false
    }).into("notice_board");
  }

  async updateNoticeBoard(id:number, doneBy:string) {
    return await this.knex.update({
      done_by: doneBy,
      finish: true
    }).into("notice_board").where("id",id);
  }
}