import express from 'express';
import { loginController } from '../index'; 

export const loginRoute = express.Router()

loginRoute.post('/login', loginController.postLogin)

loginRoute.get('/logout', loginController.getLogout)