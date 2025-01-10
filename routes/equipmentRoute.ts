import express from 'express';
import { equipmentController } from '..';

export const equipmentRoute = express.Router()

equipmentRoute.get('/equipmentList', equipmentController.getEquipment)
equipmentRoute.delete('/equipmentList:id', equipmentController.delEquipment)
equipmentRoute.post('/equipmentList', equipmentController.addEquipment)
equipmentRoute.put('/equipmentList:id', equipmentController.updateEquipment)