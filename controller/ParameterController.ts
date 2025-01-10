import express from 'express';
import { ParameterService } from '../service/ParameterService';

export class ParameterController {

  constructor (private parameterService: ParameterService) {}

  getParameter = async (req: express.Request, res: express.Response) => {
    try {
      let data: any[]
  
      let parameterList:any = []
      parameterList = await this.parameterService.getParameter()
      if (parameterList.length === 0) {
        data = []
      } else {
        data = parameterList
      }
      // res.json(pagination(data,page,limit))
      res.json(data)
    } catch (err) {
      console.log(err)
      res.json([])
    }
  }
  
  addParameter = async (req: express.Request, res: express.Response) => {
    try {
      await this.parameterService.addParameter(req.body.parameter, req.body.calibrationPeriod)
      res.json('Added')
    } catch (err) {
      console.log(err)
      return
    }
  }
  
  updateParameter = async (req: express.Request, res: express.Response) => {
    try {
      await this.parameterService.updateParameter(Number(req.params.id),req.body.parameter, req.body.calibrationPeriod)
      res.json('Edited')
    } catch (err) {
      console.log(err)
    }
  }
  
  delParameter = async (req: express.Request, res: express.Response) => {
    try {
      await this.parameterService.delParameter(Number(req.params.id))
    } catch (err) {
      console.log(err)
    }
    res.json('Deleted')
  }
}