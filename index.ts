import express from 'express';
import { Request, Response } from 'express';
import { isLoggedIn, isAdmin } from './secure/secure';
import { accountRoute } from './routes/accountRoute'
import dotenv from 'dotenv';
dotenv.config()

import path from 'path';
import expressSession from 'express-session'

import Knex from "knex";
const knexConfig = require("./knexfile");
const configMode = process.env.NODE_ENV || "development";
export const knex = Knex(knexConfig[configMode]);


import { AccountService } from './service/AccountService'
export const accountService = new AccountService(knex);

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

app.use('/', accountRoute)

app.use(isLoggedIn, isAdmin)

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