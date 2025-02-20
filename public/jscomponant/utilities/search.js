import { loadTable } from "./loadTable.js"
import { login } from './login.js'

export const searchFtn = (data) => {
  let searchInput = document.querySelector('#searchItem').value.toString().toLowerCase()
  let filterData = data.filter(item => {
    let match = false
    for (const key in item) {
      match = item[key].toString().toLowerCase().includes(searchInput)
      if (match) {
        return match
      }
    }
  })
  return filterData
}


document.querySelector('#searchItem')?.addEventListener('input',()=> {
  loadTable(login)
})
  
document.querySelector('#refreshBtn')?.addEventListener('click', () => {
  document.querySelector('#searchItem').value = ''
  loadTable(login)
})
