import { pagination, paginationConroller, check_page_status } from './utilities/pagination.js'
import { searchFtn } from './utilities/search.js';
import { sorting } from './utilities/sorting.js'

let table = document.querySelector('#equipmentTable');
let equipmentData;

const loadEquipmentTable = () => {
  try {
    if (window.location.pathname === '/equipment') {
      let data = JSON.parse(sessionStorage.getItem('equipmentData'))
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
        treatedData.forEach( equipment => {
          let trTag = document.createElement('tr')

          trTag.id = equipment.id

          let equipmentIdTag = document.createElement('th')
          equipmentIdTag.setAttribute('scope','row')
          equipmentIdTag.textContent = equipment.id
          trTag.appendChild(equipmentIdTag)

          let nameTag = document.createElement('td')
          let name = document.createElement('input')
          name.setAttribute('disabled','')
          name.setAttribute('type', 'text')
          name.setAttribute('data-name', equipment.id)
          name.value = equipment.name
          nameTag.appendChild(name)
          trTag.appendChild(nameTag)

          let brandTag = document.createElement('td')
          let brand = document.createElement('input')
          brand.setAttribute('disabled','')
          brand.setAttribute('type', 'text')
          brand.setAttribute('data-brand', equipment.id)
          brand.value = equipment.brand
          brandTag.appendChild(brand)
          trTag.appendChild(brandTag)

          let modelTag = document.createElement('td')
          let model = document.createElement('input')
          model.setAttribute('disabled','')
          model.setAttribute('type', 'text')
          model.setAttribute('data-model', equipment.id)
          model.value = equipment.model
          modelTag.appendChild(model)
          trTag.appendChild(modelTag)

          let parameterTag = document.createElement('td')
          let parameterSelect = document.createElement('select')
          parameterSelect.setAttribute('data-parameter', equipment.id)
          parameterSelect.setAttribute('disabled' ,'')
          for (let i = 0; i < parameterData.length; i++) {
            let parameter = document.createElement('option')
            parameter.value = parameterData[i].parameter
            parameter.textContent = parameterData[i].parameter
            if(parameterData[i].parameter === equipment.parameter) {
              parameter.setAttribute('selected', '')
            }
            parameter.setAttribute('data-parameter', equipment.id)
            parameterSelect.appendChild(parameter)
          }
          parameterTag.appendChild(parameterSelect)
          trTag.appendChild(parameterTag)

          let calDateData
          if(equipment.calibration_date){
            let calDate = new Date(equipment.calibration_date).getDate()
            calDate < 10? calDate = '0'+calDate:calDate
            let calMonth = new Date(equipment.calibration_date).getMonth()+1
            calMonth < 10? calMonth = '0'+calMonth:calMonth
            let calYear = new Date(equipment.calibration_date).getFullYear()
            calDateData = `${calYear}-${calMonth}-${calDate}`
          } else {
            calDateData = ''
          }
  
          let calibrationDateTag = document.createElement('td')
          let calibrationDate = document.createElement('input')
          calibrationDate.setAttribute('disabled','')
          calibrationDate.setAttribute('type', 'date')
          calibrationDate.setAttribute('data-calibration-date', equipment.id)
          calibrationDate.value = calDateData
          calibrationDateTag.appendChild(calibrationDate)
          trTag.appendChild(calibrationDateTag)

          let expiryDateData
          if(equipment.expiry_date){
            let exp_date = new Date(equipment.expiry_date).getDate()
            exp_date < 10? exp_date = '0'+exp_date:exp_date
            let expMonth = new Date(equipment.expiry_date).getMonth()+1
            expMonth < 10? expMonth = '0'+expMonth:expMonth
            let expYear = new Date(equipment.expiry_date).getFullYear()
            expiryDateData = `${expYear}-${expMonth}-${exp_date}`
          } else {
            expiryDateData = ''
          }

          let expiryDateTag = document.createElement('td')
          let expiryDate = document.createElement('input')
          expiryDate.setAttribute('disabled','')
          expiryDate.setAttribute('type', 'date')
          expiryDate.setAttribute('data-expiry-date', equipment.id)
          expiryDate.value = expiryDateData
          expiryDateTag.appendChild(expiryDate)
          trTag.appendChild(expiryDateTag)

          let editTag = document.createElement('td')
          let edit = document.createElement('button')
          edit.setAttribute('data-edit', equipment.id)
          edit.textContent = 'Edit'
          editTag.appendChild(edit)
          let done = document.createElement('button')
          done.setAttribute('data-done', equipment.id)
          done.setAttribute('class','hide')
          done.textContent = 'Done'
          editTag.appendChild(done)
          let cancel = document.createElement('button')
          cancel.setAttribute('data-cancel', equipment.id)
          cancel.setAttribute('class','hide')
          cancel.textContent = 'Cancel'
          editTag.appendChild(cancel)
          trTag.appendChild(editTag)

          let delTag = document.createElement('td')
          let del = document.createElement('button')
          del.setAttribute('data-delete', equipment.id)
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
          document.querySelector(`[data-brand="${target}"]`).removeAttribute("disabled")
          document.querySelector(`[data-model="${target}"]`).removeAttribute("disabled")
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
          document.querySelector(`[data-brand="${target}"]`).setAttribute("disabled","")
          document.querySelector(`[data-model="${target}"]`).setAttribute("disabled","")
          document.querySelector(`[data-calibration-date="${target}"]`).setAttribute("disabled","")
          document.querySelector(`[data-done="${target}"]`).classList.add('hide')
          document.querySelector(`[data-cancel="${target}"]`).classList.add('hide')
          document.querySelector(`[data-edit="${target}"]`).classList.remove('hide')
        })
      })
      document.querySelectorAll('[data-cancel]')?.forEach(cancel => {
        cancel.addEventListener('click', (e) => {
          let target = e.target.getAttribute('data-cancel')
          document.querySelector(`[data-brand="${target}"]`).setAttribute("disabled","")
          document.querySelector(`[data-model="${target}"]`).setAttribute("disabled","")
          document.querySelector(`[data-calibration-date="${target}"]`).setAttribute("disabled","")
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
const getEquipmentData = async () => {
  try {
    let data = await fetch('/equipmentList')
    equipmentData = await data.json()
    sessionStorage.setItem('equipmentData',JSON.stringify(equipmentData))
    loadEquipmentTable()
  } catch (err) {
    console.log(err)
  }
}
const getParameterData = async () => {
  try {
    if(!JSON.parse(sessionStorage.getItem('parameterData'))) {
      let data = await fetch('/parameterList')
      let parameterData = await data.json()
      sessionStorage.setItem('parameterData',JSON.stringify(parameterData))
    }
  } catch (err) {
    console.log(err)
  }
}
const delFtn = async (e) => {
  try {
    const res = await fetch(`/equipmentList${e.target.getAttribute('data-delete')}`, {
      method: 'DELETE'
    })
    const result = await res.json()
    alert(result)
    getEquipmentData()
  } catch (err) {
    console.log(err)
  }
}

const editFtn = async (e) => {
  const currentTarget = e.target.getAttribute('data-done')

  const name = document.querySelector(`[data-name="${currentTarget}"]`).value
  const brand = document.querySelector(`[data-brand="${currentTarget}"]`).value
  const model = document.querySelector(`[data-model="${currentTarget}"]`).value
  const parameter = document.querySelector(`[data-parameter="${currentTarget}"]`).value
  let calibrationDate = document.querySelector(`[data-calibration-date="${currentTarget}"]`).value
  console.log(calibrationDate)
  let data = JSON.parse(sessionStorage.getItem('equipmentData'))
  let filterData = data.filter(item => {
    return Number(item.id) === Number(currentTarget)
  })
  try {
    if(calibrationDate === '') {
      calibrationDate = null
    } else {
      if(filterData.length !== 0){
        let calDate = new Date(filterData[0].calibration_date).getDate()
        calDate < 10? calDate = '0'+calDate:calDate
        let calMonth = new Date(filterData[0].calibration_date).getMonth()+1
        calMonth < 10? calMonth = '0'+calMonth:calMonth
        let calYear = new Date(filterData[0].calibration_date).getFullYear()
        let oldCalDateData = `${calYear}-${calMonth}-${calDate}`
    
        let exp_date = new Date(filterData[0].expiry_date).getDate()
        exp_date < 10? exp_date = '0'+exp_date:exp_date
        let expMonth = new Date(filterData[0].expiry_date).getMonth()+1
        expMonth < 10? expMonth = '0'+expMonth:expMonth
        let expYear = new Date(filterData[0].expiry_date).getFullYear()
        let oldExpiryDateData = `${expYear}-${expMonth}-${exp_date}`
        if(oldCalDateData !== calibrationDate) {
          console.log('change')
          await fetch('/historyList', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              id: filterData[0].id, 
              calibrationDate: oldCalDateData,
              expiryDate: oldExpiryDateData
            })
          })
        }
      }
    }

    await fetch(`/equipmentList${e.target.getAttribute('data-done')}`, {
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
    getEquipmentData()
  } catch (err) {
    console.log(err)
  }

}

let path = window.location.pathname
if(path === '/equipment') {
  getEquipmentData()
  getParameterData()
  
  // add new data
  document
    .querySelector('#addEquipmentFrom')
    ?.addEventListener('submit', async (event) => {
      event.preventDefault()

      const form = event.target
      if(form.name.value === '' | form.parameter.value === '') {
        alert("Equipment name/Parameter can't be blank")
        return
      }
      let name = form.name.value
      let brand = form.brand.value
      let model = form.model.value
      let parameter = form.parameter.value
      let calibrationDate = form.calibrationDate.value === ''?null:form.calibrationDate.value
  
      try {
        const res = await fetch('/equipmentList', {
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
    
        getEquipmentData()
        loadEquipmentTable()
      } catch (err) {
        console.log(err)
        alert('Please try again')
      }
    })
  
  document.querySelectorAll('[data-th]')?.forEach(sort => {
    sort.addEventListener('click', (e) => {
      e.stopPropagation()
      let target = e.target.getAttribute('data-th')
      let data = JSON.parse(sessionStorage.getItem('equipmentData'))
      let sortedData = sorting(data,target)
      sessionStorage.setItem('equipmentData',JSON.stringify(sortedData))
      loadEquipmentTable()
    })
  })
}

export { loadEquipmentTable }