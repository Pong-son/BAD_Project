import { pagination, paginationConroller, check_page_status } from './utilities/pagination.js'
import { searchFtn } from './utilities/search.js';
import { sorting } from './utilities/sorting.js'

let table = document.querySelector('#parameterTable');
let parameterData;

const loadParameterTable = () => {
  try {
    if (window.location.pathname === '/parameter') {
      let data = JSON.parse(sessionStorage.getItem('parameterData'))

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
        treatedData.forEach( parameter => {
          let trTag = document.createElement('tr')

          trTag.id = parameter.id

          let parameterIdTag = document.createElement('th')
          parameterIdTag.setAttribute('scope','row')
          parameterIdTag.textContent = parameter.id
          trTag.appendChild(parameterIdTag)

          let parameterTag = document.createElement('td')
          let parameterName = document.createElement('input')
          parameterName.setAttribute('disabled','')
          parameterName.setAttribute('type', 'text')
          parameterName.setAttribute('data-parameter', parameter.id)
          parameterName.value = parameter.parameter
          parameterTag.appendChild(parameterName)
          trTag.appendChild(parameterTag)

          let calibrationPeriodTag = document.createElement('td')
          let calibrationPeriod = document.createElement('input')
          calibrationPeriod.setAttribute('disabled','')
          calibrationPeriod.setAttribute('type', 'number')
          calibrationPeriod.setAttribute('data-calibration-period', parameter.id)
          calibrationPeriod.value = parameter.calibration_period
          calibrationPeriodTag.appendChild(calibrationPeriod)
          trTag.appendChild(calibrationPeriodTag)

          let editTag = document.createElement('td')
          let edit = document.createElement('button')
          edit.setAttribute('data-edit', parameter.id)
          edit.textContent = 'Edit'
          editTag.appendChild(edit)
          let done = document.createElement('button')
          done.setAttribute('data-done', parameter.id)
          done.setAttribute('class','hide')
          done.textContent = 'Done'
          editTag.appendChild(done)
          let cancel = document.createElement('button')
          cancel.setAttribute('data-cancel', parameter.id)
          cancel.setAttribute('class','hide')
          cancel.textContent = 'Cancel'
          editTag.appendChild(cancel)
          trTag.appendChild(editTag)

          let delTag = document.createElement('td')
          let del = document.createElement('button')
          del.setAttribute('data-delete', parameter.id)
          del.textContent = 'Delete'
          delTag.appendChild(del)
          trTag.appendChild(delTag)

          table.appendChild(trTag)
        })
      }
      // controller for the and delete btn
      document.querySelectorAll('[data-edit]')?.forEach(edit => {
        edit.addEventListener('click', (e) => {
          const target = e.target.getAttribute('data-edit')
          document.querySelector(`[data-parameter="${target}"]`).removeAttribute("disabled")
          document.querySelector(`[data-calibration-period="${target}"]`).removeAttribute("disabled")
          document.querySelector(`[data-done="${target}"]`).classList.remove('hide')
          document.querySelector(`[data-cancel="${target}"]`).classList.remove('hide')
          document.querySelector(`[data-edit="${target}"]`).classList.add('hide')
        })
    })
      document.querySelectorAll('[data-delete]')?.forEach(del => {
        del.addEventListener('click', (e) => {
          delFtn(e)
        })
      })
      document.querySelectorAll('[data-done]')?.forEach(done => {
        done.addEventListener('click', (e) => {
          editFtn(e)
          const target = e.target.getAttribute('data-done')
          document.querySelector(`[data-parameter="${target}"]`).setAttribute("disabled","")
          document.querySelector(`[data-calibration-period="${target}"]`).setAttribute("disabled","")
          document.querySelector(`[data-done="${target}"]`).classList.add('hide')
          document.querySelector(`[data-cancel="${target}"]`).classList.add('hide')
          document.querySelector(`[data-edit="${target}"]`).classList.remove('hide')
        })
      })
      document.querySelectorAll('[data-cancel]')?.forEach(cancel => {
        cancel.addEventListener('click', (e) => {
          let target = e.target.getAttribute('data-cancel')
          document.querySelector(`[data-parameter="${target}"]`).setAttribute("disabled","")
          document.querySelector(`[data-calibration-period="${target}"]`).setAttribute("disabled","")
          document.querySelector(`[data-done="${target}"]`).classList.add('hide')
          document.querySelector(`[data-cancel="${target}"]`).classList.add('hide')
          document.querySelector(`[data-edit="${target}"]`).classList.remove('hide')
        })
      })
    }
  } catch (err) {
    console.log(err)
  }
}

const getParameterData = async () => {
  try {
    let data = await fetch('/parameterList')
    parameterData = await data.json()
    sessionStorage.setItem('parameterData',JSON.stringify(parameterData))
    loadParameterTable()
  } catch (err) {
    console.log(err)
  }
}

const delFtn = async (e) => {
  const res = await fetch(`/parameterList${e.target.getAttribute('data-delete')}`, {
    method: 'DELETE'
  })
  const result = await res.json()
  alert(result)
  getParameterData()
}

const editFtn = async (e) => {
  const currentTarget = e.target.getAttribute('data-done')
  
  const parameter = document.querySelector(`[data-parameter="${currentTarget}"]`).value
  const calibrationPeriod = document.querySelector(`[data-calibration-period="${currentTarget}"]`).value

  await fetch(`/parameterList${e.target.getAttribute('data-done')}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      id:currentTarget,
      parameter: parameter,
      calibrationPeriod: calibrationPeriod
    })
  })
  getParameterData()
}

let path = window.location.pathname
if(path === '/parameter') {
  getParameterData()
  document.querySelectorAll('.form-control').forEach(item => {
    item.addEventListener('change',() => {
        let parameter = document.querySelector('#parameter').value
        let calibrationPeriod = document.querySelector('#calibrationPeriod').value
        
        if (parameter !== '' && calibrationPeriod !== '') {
          document.querySelector('#submit_btn').removeAttribute('disabled')
          document.querySelector('#warn_notice').textContent = ''
        } else {
          document.querySelector('#submit_btn').setAttribute('disabled','')
          document.querySelector('#warn_notice').textContent = 'Fill in all the information!'
        }
      })
  })

  document.querySelector('#reset_btn').addEventListener('click', () => {
    document.querySelector('#parameter').value = ''
    document.querySelector('#calibrationPeriod').value = ''
    document.querySelector('#warn_notice').textContent = ''
    document.querySelector('#submit_btn').setAttribute('disabled','')
  })
  
  // add new data
  document
    .querySelector('#addParameterFrom')
    ?.addEventListener('submit', async (event) => {
      event.preventDefault() // To prevent the form from submitting synchronously
      const form = event.target
      let parameter = form.parameter.value
      let calibrationPeriod = form.calibrationPeriod.value
  
      const res = await fetch('/parameterList', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          parameter: parameter,
          calibrationPeriod:calibrationPeriod
        })
      })
      const result = await res.json()
  
      alert(result)
      document.querySelector('#parameter').value = ''
      document.querySelector('#calibrationPeriod').value = ''
  
      getParameterData()
    })
  
  document.querySelectorAll('[data-th]')?.forEach(sort => {
    sort.addEventListener('click', (e) => {
      e.stopPropagation()
      let target = e.target.getAttribute('data-th')
      let data = JSON.parse(sessionStorage.getItem('parameterData'))
      let sortedData = sorting(data,target)
      sessionStorage.setItem('parameterData',JSON.stringify(sortedData))
      loadParameterTable()
    })
  })
}

export { loadParameterTable }