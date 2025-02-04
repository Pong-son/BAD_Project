import { pagination, paginationConroller, check_page_status } from './utilities/pagination.js'
import { searchFtn } from './utilities/search.js';
import { sorting } from './utilities/sorting.js'

let table = document.querySelector('#jobTable');
let jobData;

const loadJobTable = () => {
  try {
    if (window.location.pathname === '/job') {
      let data = JSON.parse(sessionStorage.getItem('jobData'))
      let parameterData = JSON.parse(sessionStorage.getItem('parameterData'))
      console.log(data, parameterData)
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
        treatedData.forEach( job => {
          let trTag = document.createElement('tr')

          trTag.id = job.id

          let jobIdTag = document.createElement('th')
          jobIdTag.setAttribute('scope','row')
          jobIdTag.textContent = job.id
          trTag.appendChild(jobIdTag)

          let nameTag = document.createElement('td')
          let name = document.createElement('input')
          name.setAttribute('disabled','')
          name.setAttribute('type', 'text')
          name.setAttribute('data-name', job.id)
          name.value = job.name
          nameTag.appendChild(name)
          trTag.appendChild(nameTag)

          let brandTag = document.createElement('td')
          let brand = document.createElement('input')
          brand.setAttribute('disabled','')
          brand.setAttribute('type', 'text')
          brand.setAttribute('data-brand', job.id)
          brand.value = job.brand
          brandTag.appendChild(brand)
          trTag.appendChild(brandTag)

          let modelTag = document.createElement('td')
          let model = document.createElement('input')
          model.setAttribute('disabled','')
          model.setAttribute('type', 'text')
          model.setAttribute('data-model', job.id)
          model.value = job.model
          modelTag.appendChild(model)
          trTag.appendChild(modelTag)

          let parameterTag = document.createElement('td')
          let parameterSelect = document.createElement('select')
          parameterSelect.setAttribute('data-parameter', job.id)
          parameterSelect.setAttribute('disabled','')
          for (let i = 0; i < parameterData.length; i++) {
            let parameter = document.createElement('option')
            parameter.value = parameterData[i].parameter
            parameter.textContent = parameterData[i].parameter
            if(parameterData[i].parameter === job.parameter) {
              parameter.setAttribute('selected', '')
            }
            parameter.setAttribute('data-parameter', job.id)
            parameterSelect.appendChild(parameter)
          }
          parameterTag.appendChild(parameterSelect)
          trTag.appendChild(parameterTag)

          let calDate = new Date(job.calibration_date).getDate()
          calDate < 10? calDate = '0'+calDate:calDate
          let calMonth = new Date(job.calibration_date).getMonth()+1
          calMonth < 10? calMonth = '0'+calMonth:calMonth
          let calYear = new Date(job.calibration_date).getFullYear()
          let calDateData = `${calYear}-${calMonth}-${calDate}`
  
          let calibrationDateTag = document.createElement('td')
          let calibrationDate = document.createElement('input')
          calibrationDate.setAttribute('disabled','')
          calibrationDate.setAttribute('type', 'date')
          calibrationDate.setAttribute('data-calibration-date', job.id)
          calibrationDate.value = calDateData
          calibrationDateTag.appendChild(calibrationDate)
          trTag.appendChild(calibrationDateTag)

          let exp_date = new Date(job.expiry_date).getDate()
          exp_date < 10? exp_date = '0'+exp_date:exp_date
          let expMonth = new Date(job.expiry_date).getMonth()+1
          expMonth < 10? expMonth = '0'+expMonth:expMonth
          let expYear = new Date(job.expiry_date).getFullYear()
          let expiryDateData = `${expYear}-${expMonth}-${exp_date}`

          let expiryDateTag = document.createElement('td')
          let expiryDate = document.createElement('input')
          expiryDate.setAttribute('disabled','')
          expiryDate.setAttribute('type', 'date')
          expiryDate.setAttribute('data-expiry-date', job.id)
          expiryDate.value = expiryDateData
          expiryDateTag.appendChild(expiryDate)
          trTag.appendChild(expiryDateTag)

          let editTag = document.createElement('td')
          let edit = document.createElement('button')
          edit.setAttribute('data-edit', job.id)
          edit.textContent = 'Edit'
          editTag.appendChild(edit)
          let done = document.createElement('button')
          done.setAttribute('data-done', job.id)
          done.setAttribute('class','hide')
          done.textContent = 'Done'
          editTag.appendChild(done)
          let cancel = document.createElement('button')
          cancel.setAttribute('data-cancel', job.id)
          cancel.setAttribute('class','hide')
          cancel.textContent = 'Cancel'
          editTag.appendChild(cancel)
          trTag.appendChild(editTag)

          let delTag = document.createElement('td')
          let del = document.createElement('button')
          del.setAttribute('data-delete', job.id)
          del.textContent = 'Delete'
          delTag.appendChild(del)
          trTag.appendChild(delTag)

          table.appendChild(trTag)
        })
      }
      let newParameter = document.querySelector('#parameter')
      newParameter.innerText = ''
      for (let i = 0; i <= parameterData.length; i++) {
        let parameter = document.createElement('option')
        if(i === 0) {
          parameter.value = ''
          parameter.textContent = 'Choose one parameter'
        } else {
          parameter.value = parameterData[i-1].parameter
          parameter.textContent = parameterData[i-1].parameter
        }
        newParameter.appendChild(parameter)
      }

      // controller for the and delete btn
      document.querySelectorAll('[data-edit]')?.forEach(edit => {
        edit.addEventListener('click', (e) => {
          const target = e.target.getAttribute('data-edit')
          document.querySelector(`[data-name="${target}"]`).removeAttribute("disabled")
          document.querySelector(`[data-brand="${target}"]`).removeAttribute("disabled")
          document.querySelector(`[data-model="${target}"]`).removeAttribute("disabled")
          document.querySelector(`[data-parameter="${target}"]`).removeAttribute("disabled")
          document.querySelector(`[data-calibration-date="${target}"]`).removeAttribute("disabled")
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
          document.querySelector(`[data-name="${target}"]`).setAttribute("disabled","")
          document.querySelector(`[data-brand="${target}"]`).setAttribute("disabled","")
          document.querySelector(`[data-model="${target}"]`).setAttribute("disabled","")
          document.querySelector(`[data-parameter="${target}"]`).setAttribute("disabled","")
          document.querySelector(`[data-calibration-date="${target}"]`).setAttribute("disabled","")
          document.querySelector(`[data-done="${target}"]`).classList.add('hide')
          document.querySelector(`[data-cancel="${target}"]`).classList.add('hide')
          document.querySelector(`[data-edit="${target}"]`).classList.remove('hide')
        })
      })
      document.querySelectorAll('[data-cancel]')?.forEach(cancel => {
        cancel.addEventListener('click', (e) => {
          let target = e.target.getAttribute('data-cancel')
          document.querySelector(`[data-name="${target}"]`).setAttribute("disabled","")
          document.querySelector(`[data-brand="${target}"]`).setAttribute("disabled","")
          document.querySelector(`[data-model="${target}"]`).setAttribute("disabled","")
          document.querySelector(`[data-parameter="${target}"]`).setAttribute("disabled","")
          document.querySelector(`[data-calibration-date="${target}"]`).setAttribute("disabled","")
          document.querySelector(`[data-done="${target}"]`).classList.add('hide')
          document.querySelector(`[data-cancel="${target}"]`).classList.add('hide')
          document.querySelector(`[data-edit="${target}"]`).classList.remove('hide')
        })
      })
    }
  } catch (e) {
    console.log(e)
  }
}

const getjobData = async () => {
  try {
    let data = await fetch('/jobList')
    jobData = await data.json()
    sessionStorage.setItem('jobData',JSON.stringify(jobData))
    loadJobTable()
  } catch (e) {
    console.log(e)
  }
}

const getparameterData = async () => {
  try {
    if(!JSON.parse(sessionStorage.getItem('parameterData'))) {
      let data = await fetch('/parameterList')
      let parameterData = await data.json()
      sessionStorage.setItem('parameterData',JSON.stringify(parameterData))
    }
  } catch (e) {
    console.log(e)
  }
}

const delFtn = async (e) => {
  await fetch(`/jobList${e.target.getAttribute('data-delete')}`, {
    method: 'DELETE'
  })

  getjobData()
}

const editFtn = async (e) => {
  const currentTarget = e.target.getAttribute('data-done')

  const name = document.querySelector(`[data-name="${currentTarget}"]`).value
  const brand = document.querySelector(`[data-brand="${currentTarget}"]`).value
  const model = document.querySelector(`[data-model="${currentTarget}"]`).value
  const parameter = document.querySelector(`[data-parameter="${currentTarget}"]`).value
  const calibrationDate = document.querySelector(`[data-calibration-date="${currentTarget}"]`).value

  let oldCalibrationDate
  let data = JSON.parse(sessionStorage.getItem('jobData'))
  let filterData = data.filter(item => {
    console.log(Number(item.id) === Number(currentTarget))
    return Number(item.id) === Number(currentTarget)
  })

  if(filterData.length !== 0){
    oldCalibrationDate = filterData[0].calibration_date
    await fetch('/historyList', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id: filterData[0].id, 
        calibrationDate: oldCalibrationDate,
        expiryDate: filterData[0].expiry_date
      })
    })
  }

  await fetch(`/jobList${e.target.getAttribute('data-done')}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      id:currentTarget,
      name: name,
      brand: brand,
      model: model, 
      parameter: parameter, 
      calibrationDate: calibrationDate
    })
  })
  getjobData()
}

let path = window.location.pathname
if(path === '/job') {
  getjobData()
  getparameterData()

  document.querySelector('#reset_btn').addEventListener('click', () => {
    document.querySelector('#name').value = ''
    document.querySelector('#brand').value = ''
    document.querySelector('#model').value = ''
    document.querySelector('#parameter').value = ''
    document.querySelector('#calibrationDate').value = ''
  })
  
  // add new data
  document
    .querySelector('#addJobFrom')
    ?.addEventListener('submit', async (event) => {
      event.preventDefault() // To prevent the form from submitting synchronously
      const form = event.target
      let name = form.name.value
      let brand = form.brand.value
      let model = form.model.value
      let parameter = form.parameter.value
      let calibrationDate = form.calibrationDate.value
  
      const res = await fetch('/jobList', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: name,
          brand: brand,
          model: model, 
          parameter: parameter, 
          calibrationDate: calibrationDate
        })
      })
      const result = await res.json()
  
      alert(result)
      document.querySelector('#name').value = ''
      document.querySelector('#brand').value = ''
      document.querySelector('#model').value = ''
      document.querySelector('#parameter').value = ''
      document.querySelector('#calibrationDate').value = ''
  
      getjobData()
      loadJobTable()
    })
  
  document.querySelectorAll('[data-th]')?.forEach(sort => {
    sort.addEventListener('click', (e) => {
      e.stopPropagation()
      let target = e.target.getAttribute('data-th')
      let data = JSON.parse(sessionStorage.getItem('jobData'))
      let sortedData = sorting(data,target)
      sessionStorage.setItem('jobData',JSON.stringify(sortedData))
      loadJobTable()
    })
  })
}

export { loadJobTable }