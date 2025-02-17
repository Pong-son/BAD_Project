import express from 'express';
import { resultTableController } from '..';

export const resultTableRoute = express.Router()

resultTableRoute.get('/resultTableList:jobId', resultTableController.getResultTable)
resultTableRoute.delete('/resultTableList:id', resultTableController.delResultTable)
resultTableRoute.post('/resultTableList', resultTableController.addResultTable)
resultTableRoute.put('/resultTableList:id', resultTableController.updateResultTable)