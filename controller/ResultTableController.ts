import express from 'express';
import formidable from 'formidable'
import { parseForm } from '../utilities/formUtils'
import { ResultTableService } from '../service/ResultTableService';
import { faceDetection } from '../utilities/faceDetection';
import fs from 'fs';

let newFileName:string = ''

export class ResultTableController {

  constructor (private resultTableService: ResultTableService) {}

  getResultTable = async (req: express.Request, res: express.Response) => {
    try {
      let data: any[]
  
      let resultTableList:any = []
      resultTableList = await this.resultTableService.getResultTable(Number(req.params.jobId))
      if (resultTableList.length === 0) {
        data = []
      } else {
        data = resultTableList
      }
      // res.json(pagination(data,page,limit))
      res.json(data)
    } catch (err) {
      console.log(err)
      res.json([])
    }
  }
  
  addResultTable = async (req: express.Request, res: express.Response) => {
    const { fields, files } = await parseForm(req)
    try {
      if(files.photo) {
        const photo = (files.photo as formidable.File)
        newFileName = await faceDetection(photo.filepath, photo.newFilename, newFileName)
        await this.resultTableService.addResultTable(Number(fields.jobId), fields.point, fields.description, fields.samplingDate, Number(fields.co2Result), fields.co2Equipment, Number(fields.pm10Result), fields.pm10Equipment, Number(fields.rhResult), fields.rhEquipment, photo.newFilename, newFileName)
        res.json('Added with photo')
      } else {
        await this.resultTableService.addResultTable(Number(fields.jobId), fields.point, fields.description, fields.samplingDate, Number(fields.co2Result), fields.co2Equipment, Number(fields.pm10Result), fields.pm10Equipment, Number(fields.rhResult), fields.rhEquipment, '', '')
        res.json('Added without photo')
      }
    } catch (err) {
      console.log(err)
      return
    }
  }
  
  updateResultTable = async (req: express.Request, res: express.Response) => {
    try {
      await this.resultTableService.updateResultTable(Number(req.params.id), req.body.pointNo, req.body.description, req.body.samplingDate, req.body.co2Result, req.body.co2Equipment, req.body.pm10Result, req.body.pm10Equipment, req.body.rhResult, req.body.rhEquipment)
      res.json('Edited')
    } catch (err) {
      console.log(err)
    }
  }
  
  delResultTable = async (req: express.Request, res: express.Response) => {
    try {
      const result:any = await this.resultTableService.delResultTable(Number(req.params.id))
      if(result[0].photo !== '' && result[0].processed_photo !== ''){
        fs.unlinkSync(`./public/photo/${result[0].photo}`)
        fs.unlinkSync(`./public/treatedPhoto/${result[0].processed_photo}`)
        res.json('Data and all photos Deleted')
      }
      res.json('Deleted')
    } catch (err) {
      console.log(err)
    }
  }
}