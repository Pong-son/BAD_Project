import express from 'express';
import { photoUploadController } from '..';

export const photoUploadRoute = express.Router()

photoUploadRoute.put('/photoUploadList/:pointId/:jobName', photoUploadController.updatePhotoUpload)