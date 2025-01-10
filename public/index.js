import { checkLogin } from './jscomponant/utilities/login.js'
import { loadAccountTable } from './jscomponant/account.js'
import { loadParameterTable } from './jscomponant/parameter.js'
import { loadClientTable } from './jscomponant/client.js'

let path = window.location.pathname

window.onload = () => {
  checkLogin()

  if( path === '/account') {
    loadAccountTable()
  }

  if( path === '/parameter') {
    loadParameterTable()
  }

  if( path === '/client') {
    loadClientTable()
  }


}