import { pagination, paginationConroller, check_page_status } from './utilities/pagination.js'
import { searchFtn } from './utilities/search.js';
import { sorting } from './utilities/sorting.js'

let table = document.querySelector('#client_table');
let equipmentData;

const loadEquipmentTable = () => {
  try {
    if (window.location.pathname === '/client') {
      let data = JSON.parse(sessionStorage.getItem('equipmentData'))

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
        treatedData.forEach( client => {
          let trTag = document.createElement('tr')

          trTag.id = client.id

          let clientIdTag = document.createElement('th')
          clientIdTag.setAttribute('scope','row')
          clientIdTag.textContent = client.id
          trTag.appendChild(clientIdTag)

          let companyNameTag = document.createElement('td')
          let companyName = document.createElement('input')
          companyName.setAttribute('disabled','')
          companyName.setAttribute('type', 'text')
          companyName.setAttribute('data-company-name', client.id)
          companyName.value = client.company_name
          companyNameTag.appendChild(companyName)
          trTag.appendChild(companyNameTag)

          let contactTag = document.createElement('td')
          let contact = document.createElement('input')
          contact.setAttribute('disabled','')
          contact.setAttribute('type', 'text')
          contact.setAttribute('data-contact', client.id)
          contact.value = client.contact
          contactTag.appendChild(contact)
          trTag.appendChild(contactTag)

          let emailTag = document.createElement('td')
          let email = document.createElement('input')
          email.setAttribute('disabled','')
          email.setAttribute('type', 'text')
          email.setAttribute('data-email', client.id)
          email.value = client.email
          emailTag.appendChild(email)
          trTag.appendChild(emailTag)

          let addressTag = document.createElement('td')
          let address = document.createElement('input')
          address.setAttribute('disabled','')
          address.setAttribute('type', 'text')
          address.setAttribute('data-address', client.id)
          address.value = client.address
          addressTag.appendChild(address)
          trTag.appendChild(addressTag)

          let phoneNoTag = document.createElement('td')
          let phoneNo = document.createElement('input')
          phoneNo.setAttribute('disabled','')
          phoneNo.setAttribute('type', 'text')
          phoneNo.setAttribute('data-phone-no', client.id)
          phoneNo.value = client.phone_no
          phoneNoTag.appendChild(phoneNo)
          trTag.appendChild(phoneNoTag)

          let editTag = document.createElement('td')
          let edit = document.createElement('button')
          edit.setAttribute('data-edit', client.id)
          edit.textContent = 'Edit'
          editTag.appendChild(edit)
          let done = document.createElement('button')
          done.setAttribute('data-done', client.id)
          done.setAttribute('class','hide')
          done.textContent = 'Done'
          editTag.appendChild(done)
          let cancel = document.createElement('button')
          cancel.setAttribute('data-cancel', client.id)
          cancel.setAttribute('class','hide')
          cancel.textContent = 'Cancel'
          editTag.appendChild(cancel)
          trTag.appendChild(editTag)

          let delTag = document.createElement('td')
          let del = document.createElement('button')
          del.setAttribute('data-delete', client.id)
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
          document.querySelector(`[data-company-name="${target}"]`).removeAttribute("disabled")
          document.querySelector(`[data-contact="${target}"]`).removeAttribute("disabled")
          document.querySelector(`[data-email="${target}"]`).removeAttribute("disabled")
          document.querySelector(`[data-address="${target}"]`).removeAttribute("disabled")
          document.querySelector(`[data-phone-no="${target}"]`).removeAttribute("disabled")
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
          document.querySelector(`[data-company-name="${target}"]`).setAttribute("disabled","")
          document.querySelector(`[data-contact="${target}"]`).setAttribute("disabled","")
          document.querySelector(`[data-email="${target}"]`).setAttribute("disabled","")
          document.querySelector(`[data-address="${target}"]`).setAttribute("disabled","")
          document.querySelector(`[data-phone-no="${target}"]`).setAttribute("disabled","")
          document.querySelector(`[data-done="${target}"]`).classList.add('hide')
          document.querySelector(`[data-cancel="${target}"]`).classList.add('hide')
          document.querySelector(`[data-edit="${target}"]`).classList.remove('hide')
        })
      })
      document.querySelectorAll('[data-cancel]')?.forEach(cancel => {
        cancel.addEventListener('click', (e) => {
          let target = e.target.getAttribute('data-cancel')
          document.querySelector(`[data-company-name="${target}"]`).setAttribute("disabled","")
          document.querySelector(`[data-contact="${target}"]`).setAttribute("disabled","")
          document.querySelector(`[data-email="${target}"]`).setAttribute("disabled","")
          document.querySelector(`[data-address="${target}"]`).setAttribute("disabled","")
          document.querySelector(`[data-phone-no="${target}"]`).setAttribute("disabled","")
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

const getequipmentData = async () => {
  try {
    let data = await fetch('/clientList')
    equipmentData = await data.json()
    sessionStorage.setItem('equipmentData',JSON.stringify(equipmentData))
    loadEquipmentTable()
  } catch (e) {
    console.log(e)
  }
}

const delFtn = async (e) => {
  await fetch(`/clientList${e.target.getAttribute('data-delete')}`, {
    method: 'DELETE'
  })

  getequipmentData()
}

const editFtn = async (e) => {
  const currentTarget = e.target.getAttribute('data-done')

  const companyName = document.querySelector(`[data-company-name="${currentTarget}"]`).value
  const address = document.querySelector(`[data-address="${currentTarget}"]`).value
  const contact = document.querySelector(`[data-contact="${currentTarget}"]`).value
  const phoneNo = document.querySelector(`[data-phone-no="${currentTarget}"]`).value
  const email = document.querySelector(`[data-email="${currentTarget}"]`).value

  await fetch(`/clientList${e.target.getAttribute('data-done')}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      id:currentTarget,
      companyName: companyName,
      address: address,
      contact: contact, 
      phoneNo: phoneNo, 
      email: email
    })
  })
  getequipmentData()
}

let path = window.location.pathname
if(path === '/client') {
  getequipmentData()

  document.querySelector('#reset_btn').addEventListener('click', () => {
    document.querySelector('#companyName').value = ''
    document.querySelector('#address').value = ''
    document.querySelector('#contact').value = ''
    document.querySelector('#phoneNo').value = ''
    document.querySelector('#email').value = ''
  })
  
  // add new data
  document
    .querySelector('#addClientFrom')
    ?.addEventListener('submit', async (event) => {
      event.preventDefault() // To prevent the form from submitting synchronously
      const form = event.target
      let companyName = form.companyName.value
      let address = form.address.value
      let contact = form.contact.value
      let phoneNo = form.phoneNo.value
      let email = form.email.value
  
      const res = await fetch('/clientList', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          companyName: companyName,
          address: address,
          contact: contact, 
          phoneNo: phoneNo, 
          email: email
        })
      })
      const result = await res.json()
  
      alert(result)
      document.querySelector('#companyName').value = ''
      document.querySelector('#address').value = ''
      document.querySelector('#contact').value = ''
      document.querySelector('#phoneNo').value = ''
      document.querySelector('#email').value = ''
  
      getequipmentData()
      loadEquipmentTable()
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