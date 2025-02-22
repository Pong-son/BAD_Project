import { Knex } from 'knex';

export class PhotoUploadService {
  constructor(private knex: Knex){}

  async updatePhotoUpload(id:number, photo:string|string[], newPhoto:string|string[]) {
    return await this.knex('result').update({
      photo: photo,
      processed_photo: newPhoto
    }).where('id',id);
  }
}