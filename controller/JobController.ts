import express from 'express';
import { JobService } from '../service/JobService';

export class JobController {

  constructor (private jobService: JobService) {}

  getJob = async (req: express.Request, res: express.Response) => {
    try {
      let data: any[]
  
      let jobList:any = []
      jobList = await this.jobService.getJob()
      if (jobList.length === 0) {
        data = []
      } else {
        data = jobList
      }
      // res.json(pagination(data,page,limit))
      res.json(data)
    } catch (err) {
      console.log(err)
      res.json([])
    }
  }
  
  addJob = async (req: express.Request, res: express.Response) => {
    try {
      await this.jobService.addJob(req.body.name, req.body.brand, req.body.model, req.body.parameter, req.body.calibrationDate)
      res.json('Added')
    } catch (err) {
      console.log(err)
      return
    }
  }
  
  updateJob = async (req: express.Request, res: express.Response) => {
    try {

      await this.jobService.updateJob(Number(req.params.id),req.body.name, req.body.brand, req.body.model, req.body.parameter, req.body.calibrationDate)
      res.json('Edited')
    } catch (err) {
      console.log(err)
    }
  }
  
  delJob = async (req: express.Request, res: express.Response) => {
    try {
      await this.jobService.delJob(Number(req.params.id))
    } catch (err) {
      console.log(err)
    }
    res.json('Deleted')
  }
}