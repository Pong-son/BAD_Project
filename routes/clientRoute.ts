import express from 'express';
import { clientController } from '..';

export const clientRoute = express.Router()

clientRoute.get('/clientList', clientController.getClient)
clientRoute.delete('/clientList:id', clientController.delClient)
clientRoute.post('/clientList', clientController.addClient)
clientRoute.put('/clientList:id', clientController.updateClient)