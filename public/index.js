import { checkLogin } from './jscomponant/utilities/login.js'
import { loadTable } from './jscomponant/utilities/loadTable.js'

window.onload = async () => {
  let result = await fetch('/login')
  let login = await result.json()

  checkLogin(login)
  loadTable(login)
}