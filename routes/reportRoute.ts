import express from 'express';
import { reportController } from '..';

export const reportRoute = express.Router()

reportRoute.get('/reportList', reportController.getReport)
reportRoute.delete('/reportList:id', reportController.delReport)
reportRoute.post('/reportList', reportController.addReport)
reportRoute.put('/reportList:id', reportController.updateReport)