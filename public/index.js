import { checkLogin } from './jscomponant/utilities/login.js'
import { loadTable } from './jscomponant/utilities/loadTable.js'

window.onload = () => {
  checkLogin()
  loadTable()
}