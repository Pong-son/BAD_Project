import express from 'express';
// import { pagination } from '../utilities/pagination'
import { hashPassword } from '../utilities/hash'
import { accountService } from '../index'

const accountRoute = express.Router()

// let pre_order_by: string = 'id'

const getAccountRoute = async (req: express.Request, res: express.Response) => {
	try {
		let data: any[]
		// let page: number = req.query.page?Number(req.query.page):1
		// let limit: number = req.query.limit?Number(req.query.limit):10
		// let order_by:boolean = req.query.order_by === pre_order_by? false:true
		// pre_order_by = String(req.query.order_by)

		let accountList:any = []
		accountList = await accountService.getAccount()
		if (accountList.length === 0) {
			data = []
		} else {
			data = accountList
		}
		// res.json(pagination(data,page,limit))
		res.json(data)
	} catch (err) {
		console.log(err)
		res.json([])
	}
}

const addAccountRoute = async (req: express.Request, res: express.Response) => {
	try {
		let hashPassWord = await hashPassword(req.body.password)
		hashPassWord
		await accountService.addAccount(req.body.username, req.body.email,hashPassWord)
	} catch (err) {
		console.log(err)
	}
	res.json('Added')
}

const updateAccountRoute = async (req: express.Request, res: express.Response) => {
	try {
		await accountService.updateAccount(Number(req.params.id),req.body.username, req.body.email)
	} catch (err) {
		console.log(err)
	}
	res.json('Edited')
}

const updatePWRoute = async (req: express.Request, res: express.Response) => {
	try {
		let hashPassWord = await hashPassword(req.body.newPW)
		hashPassWord
		await accountService.updateAccountPW(Number(req.params.id), hashPassWord)
	} catch (err) {
		console.log(err)
	}
	res.json('Changed')
}

const updateAdminRoute = async (req: express.Request, res: express.Response) => {
	try {
		await accountService.updateAccountAdmin(Number(req.params.id), req.body.is_admin)
	} catch (err) {
		console.log(err)
	}
	res.json('Upgraded')
}

const delAccountRoute = async (req: express.Request, res: express.Response) => {
	try {
		await accountService.delAccount(Number(req.params.id))
	} catch (err) {
		console.log(err)
	}
	res.json('Deleted')
}

accountRoute.get('/accountList', getAccountRoute)
accountRoute.delete('/accountList:id', delAccountRoute)
accountRoute.post('/accountList', addAccountRoute)
accountRoute.put('/accountList:id', updateAccountRoute)
accountRoute.put('/accountListChange:id', updatePWRoute)
accountRoute.put('/accountListUpgrade:id', updateAdminRoute)

export { accountRoute, getAccountRoute, delAccountRoute, addAccountRoute, updateAccountRoute }