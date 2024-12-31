import express from 'express';

export const isLoggedIn = (
	req: express.Request,
	res: express.Response,
	next: express.NextFunction
	) => {
		if (req.session?.user) {
			next()
	} else {
		res.redirect('./')
	}
}

export const isAdmin = (
  req: express.Request,
	res: express.Response,
	next: express.NextFunction
	) => {
		if (req.session?.is_admin) {
			next()
	} else {
		res.redirect('./')
	}
}
