import { navBar } from './jscomponant/utilities/navbar.js'
import { checkLogin } from './jscomponant/utilities/login.js'

window.onload = () => {
  navBar()
  checkLogin()
}