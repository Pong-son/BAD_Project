import express from 'express';
import { photoUploadController } from '..';

export const photoUploadRoute = express.Router()

photoUploadRoute.put('/photoUploadList/id/jobName', photoUploadController.updatePhotoUpload)