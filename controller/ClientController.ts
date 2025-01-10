import express from 'express';
import { ClientService } from '../service/ClientService';

export class ClientController {

  constructor (private clientService: ClientService) {}

  getClient = async (req: express.Request, res: express.Response) => {
    try {
      let data: any[]
  
      let clientList:any = []
      clientList = await this.clientService.getClient()
      if (clientList.length === 0) {
        data = []
      } else {
        data = clientList
      }
      // res.json(pagination(data,page,limit))
      res.json(data)
    } catch (err) {
      console.log(err)
      res.json([])
    }
  }
  
  addClient = async (req: express.Request, res: express.Response) => {
    try {
      await this.clientService.addClient(req.body.companyName, req.body.address, req.body.contact, req.body.phoneNo, req.body.email)
      res.json('Added')
    } catch (err) {
      console.log(err)
      return
    }
  }
  
  updateClient = async (req: express.Request, res: express.Response) => {
    try {
      await this.clientService.updateClient(Number(req.params.id),req.body.companyName, req.body.address, req.body.contact, req.body.phoneNo, req.body.email)
      res.json('Edited')
    } catch (err) {
      console.log(err)
    }
  }
  
  delClient = async (req: express.Request, res: express.Response) => {
    try {
      await this.clientService.delClient(Number(req.params.id))
    } catch (err) {
      console.log(err)
    }
    res.json('Deleted')
  }
}