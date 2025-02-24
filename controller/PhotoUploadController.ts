import express from 'express';
import formidable from 'formidable'
import { parseForm } from '../utilities/formUtils'
import { PhotoUploadService } from '../service/PhotoUploadService';
import { faceDetection } from '../utilities/faceDetection';

let newFileName:string = ''

export class PhotoUploadController {

  constructor (private photoUploadService: PhotoUploadService) {}
  
  updatePhotoUpload = async (req: express.Request, res: express.Response) => {
    try {
      const { fields, files } = await parseForm(req)
      fields
      const photo = (files.photo as formidable.File)
      if(files) {
        newFileName = await faceDetection(photo.filepath, photo.newFilename, newFileName)
        
        await this.photoUploadService.updatePhotoUpload(Number(req.params.pointId), photo.newFilename, newFileName)
      }
      res.json('Edited')
    } catch (err) {
      console.log(err)
      res.json('Can not Upload')
    }
  }

}