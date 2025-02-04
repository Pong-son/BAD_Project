import express from 'express';
import { noticeBoardController } from '..';

export const noticeBoardRoute = express.Router()

noticeBoardRoute.get('/noticeBoardList', noticeBoardController.getNoticeBoard)
noticeBoardRoute.put('/noticeBoardList:id', noticeBoardController.updateNoticeBoard)