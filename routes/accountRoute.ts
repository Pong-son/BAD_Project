import express from 'express';
import { accountController } from '../index';

export const accountRoute = express.Router()

accountRoute.get('/accountList', accountController.getAccount)
accountRoute.delete('/accountList:id', accountController.delAccount)
accountRoute.post('/accountList', accountController.addAccount)
accountRoute.put('/accountList:id', accountController.updateAccount)