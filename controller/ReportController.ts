import express from 'express';
import { ReportService } from '../service/ReportService';

export class ReportController {

  constructor (private reportService: ReportService) {}

  getReport = async (req: express.Request, res: express.Response) => {
    try {
      let data: any[]
  
      let reportList:any = []
      reportList = await this.reportService.getReport()
      if (reportList.length === 0) {
        data = []
      } else {
        data = reportList
      }
      // res.json(pagination(data,page,limit))
      res.json(data)
    } catch (err) {
      console.log(err)
      res.json([])
    }
  }
  
  addReport = async (req: express.Request, res: express.Response) => {
    try {
      await this.reportService.addReport(req.body.companyName, req.body.address, req.body.contact, req.body.phoneNo, req.body.email)
      res.json('Added')
    } catch (err) {
      console.log(err)
      return
    }
  }
  
  updateReport = async (req: express.Request, res: express.Response) => {
    try {
      await this.reportService.updateReport(Number(req.params.id),req.body.companyName, req.body.address, req.body.contact, req.body.phoneNo, req.body.email)
      res.json('Edited')
    } catch (err) {
      console.log(err)
    }
  }
  
  delReport = async (req: express.Request, res: express.Response) => {
    try {
      await this.reportService.delReport(Number(req.params.id))
    } catch (err) {
      console.log(err)
    }
    res.json('Deleted')
  }
}