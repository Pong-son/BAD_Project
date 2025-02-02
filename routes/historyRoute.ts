import express from 'express';
import { historyController } from '..';

export const historyRoute = express.Router()

historyRoute.get('/historyList', historyController.getHistory)
historyRoute.delete('/historyList:id', historyController.delHistory)
historyRoute.post('/historyList', historyController.addHistory)