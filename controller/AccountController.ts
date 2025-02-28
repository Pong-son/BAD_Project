import express from 'express';
import { AccountService } from '../service/AccountService';
import { hashPassword } from '../utilities/hash'

export class AccountController {

  constructor (private accountService: AccountService) {}

  getAccount = async (req: express.Request, res: express.Response) => {
    try {
      let data: any[]
  
      let accountList:any = []
      accountList = await this.accountService.getAccount()
      if (accountList.length === 0) {
        data = []
      } else {
        data = accountList
      }
      // res.json(pagination(data,page,limit))
      res.json(data)
    } catch (err) {
      console.log(err)
      res.json([])
    }
  }

  addAccount = async (req: express.Request, res: express.Response) => {
    try {
      let hashPassWord = await hashPassword(req.body.password)
      hashPassWord
      await this.accountService.addAccount(req.body.username, req.body.email,hashPassWord)
      res.json('Added')
    } catch (err) {
      console.log(err)
      return
    }
  }
  
  updateAccount = async (req: express.Request, res: express.Response) => {
    try {
      if (req.body.changePW){
        let hashPassWord = await hashPassword(req.body.password)
        hashPassWord
        await this.accountService.updateAccountPW(Number(req.params.id), hashPassWord)
        res.json('Changed')
      } else if (req.body.upGrade) {
        await this.accountService.updateAccountAdmin(Number(req.params.id), req.body.is_admin)
        res.json('Upgraded')
      } else {
        await this.accountService.updateAccount(Number(req.params.id),req.body.username, req.body.email)
        res.json('Edited')
      }
    } catch (err) {
      console.log(err)
    }
  }
  
  delAccount = async (req: express.Request, res: express.Response) => {
    try {
      await this.accountService.delAccount(Number(req.params.id))
    } catch (err) {
      console.log(err)
    }
    res.json('Deleted')
  }
}
