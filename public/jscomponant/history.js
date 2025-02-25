import { pagination, paginationConroller, check_page_status } from './utilities/pagination.js'
import { searchFtn } from './utilities/search.js';
import { sorting } from './utilities/sorting.js'

let table = document.querySelector('#historyTable');
let historyData;

const loadHistoryTable = () => {
  try {
    if (window.location.pathname === '/history') {
      let data = JSON.parse(sessionStorage.getItem('historyData'))
      console.log(data)
      let searchInput = document.querySelector('#searchItem').value
      if (searchInput) {
        data = searchFtn(data)
      }
      
      paginationConroller(data)
      let treatedData = pagination(data)
      check_page_status()

      // generate table
      if (searchInput !== '' && data.length === 0) {
        let trTag = document.createElement('tr')
        let thTag = document.createElement('th')

        let no_of_col = document.querySelectorAll('th').length
        table.textContent = ''

        thTag.setAttribute('colspan', no_of_col)
        thTag.setAttribute('class','text-center')
        thTag.textContent = 'No Relevant DATA'
        trTag.id = 1
        trTag.appendChild(thTag)
        table.appendChild(trTag)
      }else if(treatedData?.length === undefined || treatedData?.length === 0 ) {
        let trTag = document.createElement('tr')
        let thTag = document.createElement('th')

        let no_of_col = document.querySelectorAll('th').length
        table.textContent = ''

        thTag.setAttribute('colspan', no_of_col)
        thTag.setAttribute('class','text-center')
        thTag.textContent = 'No DATA'
        trTag.id = 1
        trTag.appendChild(thTag)
        table.appendChild(trTag)
      } else {
        table.textContent = ''
        treatedData.forEach( history => {
          let trTag = document.createElement('tr')

          trTag.id = history.id

          let historyIdTag = document.createElement('th')
          historyIdTag.setAttribute('scope','row')
          historyIdTag.textContent = history.id
          trTag.appendChild(historyIdTag)

          let nameTag = document.createElement('td')
          let name = document.createElement('input')
          name.setAttribute('disabled','')
          name.setAttribute('type', 'text')
          name.setAttribute('data-name', history.id)
          name.value = history.name
          nameTag.appendChild(name)
          trTag.appendChild(nameTag)

          let calDate = new Date(history.calibration_date).getDate()
          calDate < 10? calDate = '0'+calDate:calDate
          let calMonth = new Date(history.calibration_date).getMonth()+1
          calMonth < 10? calMonth = '0'+calMonth:calMonth
          let calYear = new Date(history.calibration_date).getFullYear()
          let calDateData = `${calYear}-${calMonth}-${calDate}`
  
          let calibrationDateTag = document.createElement('td')
          let calibrationDate = document.createElement('input')
          calibrationDate.setAttribute('disabled','')
          calibrationDate.setAttribute('type', 'date')
          calibrationDate.setAttribute('data-calibration-date', history.id)
          calibrationDate.value = calDateData
          calibrationDateTag.appendChild(calibrationDate)
          trTag.appendChild(calibrationDateTag)

          let exp_date = new Date(history.expiry_date).getDate()
          exp_date < 10? exp_date = '0'+exp_date:exp_date
          let expMonth = new Date(history.expiry_date).getMonth()+1
          expMonth < 10? expMonth = '0'+expMonth:expMonth
          let expYear = new Date(history.expiry_date).getFullYear()
          let expiryDateData = `${expYear}-${expMonth}-${exp_date}`

          let expiryDateTag = document.createElement('td')
          let expiryDate = document.createElement('input')
          expiryDate.setAttribute('disabled','')
          expiryDate.setAttribute('type', 'date')
          expiryDate.setAttribute('data-expiry-date', history.id)
          expiryDate.value = expiryDateData
          expiryDateTag.appendChild(expiryDate)
          trTag.appendChild(expiryDateTag)

          let delTag = document.createElement('td')
          let del = document.createElement('button')
          del.setAttribute('data-delete', history.id)
          del.textContent = 'Delete'
          delTag.appendChild(del)
          trTag.appendChild(delTag)

          table.appendChild(trTag)
        })
      }

      // controller for delete btn
      document.querySelectorAll('[data-delete]')?.forEach(del => {
        del.addEventListener('click', (e) => {
          delFtn(e)
        })
      })
    }
  } catch (err) {
    console.log(err)
  }
}

const gethistoryData = async () => {
  try {
    let data = await fetch('/historyList')
    historyData = await data.json()
    sessionStorage.setItem('historyData',JSON.stringify(historyData))
    loadHistoryTable()
  } catch (err) {
    console.log(err)
  }
}

const delFtn = async (e) => {
  await fetch(`/historyList${e.target.getAttribute('data-delete')}`, {
    method: 'DELETE'
  })

  gethistoryData()
}

let path = window.location.pathname
if(path === '/history') {
  gethistoryData()
  
  document.querySelectorAll('[data-th]')?.forEach(sort => {
    sort.addEventListener('click', (e) => {
      e.stopPropagation()
      let target = e.target.getAttribute('data-th')
      let data = JSON.parse(sessionStorage.getItem('historyData'))
      let sortedData = sorting(data,target)
      sessionStorage.setItem('historyData',JSON.stringify(sortedData))
      loadHistoryTable()
    })
  })
}

export { loadHistoryTable }