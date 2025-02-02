import express from 'express';
import { HistoryService } from '../service/HistoryService';

export class HistoryController {

  constructor (private historyService: HistoryService) {}

  getHistory = async (req: express.Request, res: express.Response) => {
    try {
      let data: any[]
  
      let historyList:any = []
      historyList = await this.historyService.getHistory()
      if (historyList.length === 0) {
        data = []
      } else {
        data = historyList
      }
      // res.json(pagination(data,page,limit))
      res.json(data)
    } catch (err) {
      console.log(err)
      res.json([])
    }
  }
  
  addHistory = async (req: express.Request, res: express.Response) => {
    try {
      await this.historyService.addHistory(req.body.id, req.body.calibrationDate, req.body.expiryDate)
      res.json('Added')
    } catch (err) {
      console.log(err)
      return
    }
  }
  
  delHistory = async (req: express.Request, res: express.Response) => {
    try {
      await this.historyService.delHistory(Number(req.params.id))
    } catch (err) {
      console.log(err)
    }
    res.json('Deleted')
  }
}