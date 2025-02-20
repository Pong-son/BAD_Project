import express from 'express';
import { ReportService } from '../service/ReportService';
import { exportPDF, exportDocx } from '../utilities/printReport';

export class ReportController {

  constructor (private reportService: ReportService) {}

  getReport = async (req: express.Request, res: express.Response) => {
    try {
      let reportList:any = []
      reportList = await this.reportService.getReport(Number(req.params.jobId))
      if (req.params.type === 'word') {
        exportDocx(reportList)
      } else if (req.params.type === 'pdf') {
        exportPDF(reportList)
      }
      // res.json(pagination(data,page,limit))
      res.json('Printed')
    } catch (err) {
      console.log(err)
      res.json([])
    }
  }
}