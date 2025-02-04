import express from 'express';
import { Request, Response } from 'express';
import { isLoggedIn, isAdmin } from './secure/secure';
import dotenv from 'dotenv';
dotenv.config()

import path from 'path';
import expressSession from 'express-session'

import Knex from "knex";
const knexConfig = require("./knexfile");
const configMode = process.env.NODE_ENV || "development";
export const knex = Knex(knexConfig[configMode]);

import { AccountController } from './controller/AccountController'; 
import { AccountService } from './service/AccountService'
export const accountService = new AccountService(knex);
export const accountController = new AccountController(accountService);
import { accountRoute } from './routes/accountRoute'

import { ParameterController } from './controller/ParameterController';
import { ParameterService } from './service/ParameterService'
export const parameterService = new ParameterService(knex);
export const parameterController = new ParameterController(parameterService);
import { parameterRoute } from './routes/parameterRoute'

import { EquipmentController } from './controller/EquipmentController';
import { EquipmentService } from './service/EquipmentService'
export const equipmentService = new EquipmentService(knex);
export const equipmentController = new EquipmentController(equipmentService);
import { equipmentRoute } from './routes/equipmentRoute'

import { HistoryController } from './controller/HistoryController';
import { HistoryService } from './service/HistoryService'
export const historyService = new HistoryService(knex);
export const historyController = new HistoryController(historyService);
import { historyRoute } from './routes/historyRoute'

import { ClientController } from './controller/ClientController';
import { ClientService } from './service/ClientService'
export const clientService = new ClientService(knex);
export const clientController = new ClientController(clientService);
import { clientRoute } from './routes/clientRoute'; 

import { NoticeBoardController } from './controller/NoticeBoardController';
import { NoticeBoardService } from './service/NoticeBoardService'
export const noticeBoardService = new NoticeBoardService(knex);
export const noticeBoardController = new NoticeBoardController(noticeBoardService);
import { noticeBoardRoute } from './routes/noticeBoardRoute'; 

import { JobController } from './controller/JobController';
import { JobService } from './service/JobService'
export const jobService = new JobService(knex);
export const jobController = new JobController(jobService);
import { jobRoute } from './routes/jobRoute'; 

import { LoginController } from './controller/LoginController'; 
import { LoginService } from './service/LoginService'
export const loginService = new LoginService(knex);
export const loginController = new LoginController(loginService)

import { loginRoute } from './routes/loginRoute'

const app = express()

app.use(
  expressSession({
    secret: 'bad_project',
    resave: true,
    saveUninitialized: true,
  }),
)

declare module 'express-session' {
  interface SessionData {
		user?: string
		is_admin?: boolean
		// darkTheme?:boolean
  }
}

app.use(express.urlencoded({ extended: true }));

app.use(express.json());

const PORT = 8080;

app.use(express.static('public'))

app.use('/', loginRoute)

app.get('/', function (req: Request, res: Response) {
	res.sendFile(path.resolve('index.html'))
})

app.get('/islogin',(req: Request, res: Response) => {
	if (!req.session.user) {
		req.session.user = ''
	}
	res.json(req.session.user)
})

app.use(isLoggedIn)

app.use('/', parameterRoute)

app.use('/', equipmentRoute)

app.use('/', historyRoute)

app.use('/', clientRoute)

app.use('/', noticeBoardRoute)

app.use('/', jobRoute)

app.use('/', accountRoute)

app.get('/schedule', (req: Request, res: Response) => {
	res.sendFile(path.resolve('public/protected', 'schedule.html'))
})

app.get('/parameter', (req: Request, res: Response) => {
	res.sendFile(path.resolve('public/protected', 'parameter.html'))
})

app.get('/equipment', (req: Request, res: Response) => {
	res.sendFile(path.resolve('public/protected', 'equipment.html'))
})

app.get('/history', (req: Request, res: Response) => {
	res.sendFile(path.resolve('public/protected', 'history.html'))
})

app.get('/client', (req: Request, res: Response) => {
	res.sendFile(path.resolve('public/protected', 'client.html'))
})

app.get('/job', (req: Request, res: Response) => {
	res.sendFile(path.resolve('public/protected', 'job.html'))
})

app.use(isAdmin)

app.get('/account', (req: Request, res: Response) => {
	res.sendFile(path.resolve('public/protected', 'account.html'))
})

app.use((req, res) => {
	res.status(404)
	res.sendFile(path.resolve('public', '404.html'))
})

app.listen(PORT, () => {
	console.log(`Listening at http://localhost:${PORT}/`)
})