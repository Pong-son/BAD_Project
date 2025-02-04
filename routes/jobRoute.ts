import express from 'express';
import { jobController } from '..';

export const jobRoute = express.Router()

jobRoute.get('/jobList', jobController.getJob)
jobRoute.delete('/jobList:id', jobController.delJob)
jobRoute.post('/jobList', jobController.addJob)
jobRoute.put('/jobList:id', jobController.updateJob)