import express from 'express';
import { EquipmentService } from '../service/EquipmentService';

export class EquipmentController {

  constructor (private equipmentService: EquipmentService) {}

  getEquipment = async (req: express.Request, res: express.Response) => {
    try {
      let data: any[]
  
      let equipmentList:any = []
      equipmentList = await this.equipmentService.getEquipment()
      if (equipmentList.length === 0) {
        data = []
      } else {
        data = equipmentList
      }
      // res.json(pagination(data,page,limit))
      res.json(data)
    } catch (err) {
      console.log(err)
      res.json([])
    }
  }
  
  addEquipment = async (req: express.Request, res: express.Response) => {
    try {
      await this.equipmentService.addEquipment(req.body.name, req.body.brand, req.body.model, req.body.parameter, req.body.calibrationDate)
      res.json('Added')
    } catch (err) {
      console.log(err)
      return
    }
  }
  
  updateEquipment = async (req: express.Request, res: express.Response) => {
    try {

      await this.equipmentService.updateEquipment(Number(req.params.id),req.body.name, req.body.brand, req.body.model, req.body.parameter, req.body.calibrationDate)
      res.json('Edited')
    } catch (err) {
      console.log(err)
    }
  }
  
  delEquipment = async (req: express.Request, res: express.Response) => {
    try {
      await this.equipmentService.delEquipment(Number(req.params.id))
    } catch (err) {
      console.log(err)
    }
    res.json('Deleted')
  }
}