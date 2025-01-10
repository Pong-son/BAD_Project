import express from 'express';
import { parameterController } from '..';

export const parameterRoute = express.Router()

parameterRoute.get('/parameterList', parameterController.getParameter)
parameterRoute.delete('/parameterList:id', parameterController.delParameter)
parameterRoute.post('/parameterList', parameterController.addParameter)
parameterRoute.put('/parameterList:id', parameterController.updateParameter)