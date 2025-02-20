import express from 'express';
import { LoginService } from '../service/LoginService'
import { checkPassword } from '../utilities/hash'

export class LoginController {

  constructor (private loginService: LoginService) {}

  postLogin = async (req: express.Request, res: express.Response) => {
    try {
      let user:any = await this.loginService.getLoginUser(req.body.username)
      let matchpw = await checkPassword({plainPassword: req.body.password,hashedPassword: user[0].password})
  
      if(matchpw){
        req.session.user = user[0].username
        if(user[0].is_admin){
          req.session.is_admin = true
        }
      }
      
      if (!req.session.user) {
        res.json('fail')
      } else if (user[0].is_admin) {
        res.json('admin')
      } else {
        res.json('done')
      }
    } catch (e) {
      console.log(e)
    }
  }

  getLogout = (req: express.Request, res: express.Response) => {
    try {
      req.session.destroy((err) => {
        if(err) {
          console.log('failed')
        } else {
          console.log('logout')
          res.redirect('./')
        }
      })
    } catch (e) {
      console.log(e)
    }
  }
}