import express from 'express';
import { NoticeBoardService } from '../service/NoticeBoardService';

export class NoticeBoardController {

  constructor (private noticeBoardService: NoticeBoardService) {}

  getNoticeBoard = async (req: express.Request, res: express.Response) => {
    try {
      let data: any[]
  
      let noticeBoardList:any = []
      noticeBoardList = await this.noticeBoardService.getNoticeBoard()
      if (noticeBoardList.length === 0) {
        data = []
      } else {
        data = noticeBoardList
      }
      // res.json(pagination(data,page,limit))
      res.json(data)
    } catch (err) {
      console.log(err)
      res.json([])
    }
  }
  
  updateNoticeBoard = async (req: express.Request, res: express.Response) => {
    try {
      await this.noticeBoardService.updateNoticeBoard(Number(req.params.id), req.body.doneBy)
    } catch (err) {
      console.log(err)
    }
    res.json('Deleted')
  }
}