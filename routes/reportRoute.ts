import express from 'express';
import { reportController } from '..';

export const reportRoute = express.Router()

reportRoute.get('/printReport/:type/:jobId', reportController.getReport)
reportRoute.get('/reviewReport:jobId', reportController.getReportData)