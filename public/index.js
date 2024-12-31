import { checkLogin } from './jscomponant/utilities/login.js'
import { loadAccountTable } from './jscomponant/account.js'

let path = window.location.pathname

window.onload = () => {
  checkLogin()

  if( path === '/account') {
    loadAccountTable()
  }

}