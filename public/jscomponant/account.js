import { pagination, paginationConroller, check_page_status } from './utilities/pagination.js'
import { searchFtn } from './utilities/search.js';
import { sorting } from './utilities/sorting.js'

let table = document.querySelector('#accountTable');
let accountData;

const loadAccountTable = () => {
  try {
    if (window.location.pathname === '/account') {
      let data = JSON.parse(sessionStorage.getItem('accountData'))

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
        treatedData.forEach( user => {
          let trTag = document.createElement('tr')

          trTag.id = user.id

          let userIdTag = document.createElement('th')
          userIdTag.setAttribute('scope','row')
          userIdTag.textContent = user.id
          trTag.appendChild(userIdTag)

          let usernameTag = document.createElement('td')
          let username = document.createElement('input')
          username.setAttribute('disabled','')
          username.setAttribute('type', 'text')
          username.setAttribute('data-username', user.id)
          username.value = user.username
          usernameTag.appendChild(username)
          trTag.appendChild(usernameTag)

          let emailTag = document.createElement('td')
          let email = document.createElement('input')
          email.setAttribute('disabled','')
          email.setAttribute('type', 'text')
          email.setAttribute('data-email', user.id)
          email.value = user.email
          emailTag.appendChild(email)
          trTag.appendChild(emailTag)
          
          let is_adminTag = document.createElement('td')
          let is_admin = document.createElement('input')
          is_admin.setAttribute('disabled','')
          is_admin.setAttribute('type', 'text')
          is_admin.setAttribute('data-is-admin', user.id)
          is_admin.value = user.is_admin
          is_adminTag.appendChild(is_admin)
          trTag.appendChild(is_adminTag)

          let changePWTag = document.createElement('td')
          let changePW = document.createElement('button')
          changePW.setAttribute('data-bs-toggle', 'modal')
          changePW.setAttribute('data-bs-target', '#changeModal')
          changePW.setAttribute('data-change', user.id)
          changePW.textContent = 'Change'
          changePWTag.appendChild(changePW)
          trTag.appendChild(changePWTag)

          let upgradeTag = document.createElement('td')
          let upgrade = document.createElement('button')
          upgrade.setAttribute('data-upgrade', user.id)
          upgrade.textContent = 'Upgrade'
          if(user.is_admin){
            upgrade.setAttribute('disabled','')
          }
          upgradeTag.appendChild(upgrade)
          trTag.appendChild(upgradeTag)

          let editTag = document.createElement('td')
          let edit = document.createElement('button')
          edit.setAttribute('data-edit', user.id)
          edit.textContent = 'Edit'
          editTag.appendChild(edit)
          let done = document.createElement('button')
          done.setAttribute('data-done', user.id)
          done.setAttribute('class','hide')
          done.textContent = 'Done'
          editTag.appendChild(done)
          let cancel = document.createElement('button')
          cancel.setAttribute('data-cancel', user.id)
          cancel.setAttribute('class','hide')
          cancel.textContent = 'Cancel'
          editTag.appendChild(cancel)
          trTag.appendChild(editTag)

          let delTag = document.createElement('td')
          let del = document.createElement('button')
          del.setAttribute('data-delete', user.id)
          del.textContent = 'Delete'
          delTag.appendChild(del)
          trTag.appendChild(delTag)

          table.appendChild(trTag)
        })
      }
      // controller for the and delete btn
      document.querySelectorAll('[data-change]')?.forEach(change => {
        change.addEventListener('click', (e) => {
          document.querySelector('#id_change_pw').value = e.target.getAttribute('data-change')
        })
      })
      document.querySelectorAll('[data-upgrade]')?.forEach(upgrade => {
        upgrade.addEventListener('click', async (e) => {
          const targetId = e.target.getAttribute('data-upgrade')
  
          const res = await fetch(`/accountList${targetId}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              upGrade:true,
              is_admin:true
            })
          })
          await res.json()
      
          document.querySelector('#id_change_pw').textContent = ''
          document.querySelector('#newPassword').value = ''
          document.querySelector('#cfmNewPassword').value = ''
      
          getAccountData()
        })
      })
      document.querySelectorAll('[data-edit]')?.forEach(edit => {
        edit.addEventListener('click', (e) => {
          const target = e.target.getAttribute('data-edit')
          document.querySelector(`[data-username="${target}"]`).removeAttribute("disabled")
          document.querySelector(`[data-email="${target}"]`).removeAttribute("disabled")
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
          document.querySelector(`[data-username="${target}"]`).setAttribute("disabled","")
          document.querySelector(`[data-email="${target}"]`).setAttribute("disabled","")
          document.querySelector(`[data-done="${target}"]`).classList.add('hide')
          document.querySelector(`[data-cancel="${target}"]`).classList.add('hide')
          document.querySelector(`[data-edit="${target}"]`).classList.remove('hide')
        })
      })
      document.querySelectorAll('[data-cancel]')?.forEach(cancel => {
        cancel.addEventListener('click', (e) => {
          let target = e.target.getAttribute('data-cancel')
          document.querySelector(`[data-username="${target}"]`).setAttribute("disabled","")
          document.querySelector(`[data-email="${target}"]`).setAttribute("disabled","")
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

const getAccountData = async () => {
  try {
    let data = await fetch('/accountList')
    accountData = await data.json()
    sessionStorage.setItem('accountData',JSON.stringify(accountData))
    loadAccountTable()
  } catch (err) {
    console.log(err)
  }
}

const delFtn = async (e) => {
  await fetch(`/accountList${e.target.getAttribute('data-delete')}`, {
    method: 'DELETE'
  })
  getAccountData()
}

const editFtn = async (e) => {
  const currentTarget = e.target.getAttribute('data-done')
  
  const username = document.querySelector(`[data-username="${currentTarget}"]`).value
  const email = document.querySelector(`[data-email="${currentTarget}"]`).value

  await fetch(`/accountList${e.target.getAttribute('data-done')}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      id:currentTarget,
      username: username,
      email: email
    })
  })
  getAccountData()
}

let path = window.location.pathname
if(path === '/account') {
  getAccountData()
  document.querySelectorAll('.form-control').forEach(item => {
    item.addEventListener('change',() => {
        let rUserName = document.querySelector('#rUserName').value
        let email = document.querySelector('#email').value
        let rPassWord = document.querySelector('#rPassWord').value
        let cfmRPassWord = document.querySelector('#cfmRPassWord').value
        let regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{4,}$/
        
        if (rUserName !== '' && email !== '' && rPassWord !== '' && cfmRPassWord !== '') {
          // validation for password
          if (!regex.test(rPassWord)) {
            document.querySelector('#warn_notice').textContent = "Password must be at 4 characters, as least one number, one capital letter, one lower case letter"
          } else {
            // two passwords matching
            if (rPassWord !== cfmRPassWord) {
              document.querySelector('#warn_notice').textContent = "Two passwords are not match!"
              return
            } else {
              document.querySelector('#submit_btn').removeAttribute('disabled')
              document.querySelector('#warn_notice').textContent = ''
            }
          }
        } else {
          document.querySelector('#submit_btn').setAttribute('disabled','')
          document.querySelector('#warn_notice').textContent = 'Fill in all the information!'
        }
      })
  })

  document.querySelector('#reset_btn').addEventListener('click', () => {
    document.querySelector('#rUserName').value = ''
    document.querySelector('#email').value = ''
    document.querySelector('#rPassWord').value = ''
    document.querySelector('#cfmRPassWord').value = ''
    document.querySelector('#warn_notice').textContent = ''
    document.querySelector('#submit_btn').setAttribute('disabled','')
  })

  document.querySelectorAll('.form-control').forEach(item => {
    item.addEventListener('change',() => {
        let newPassword = document.querySelector('#newPassword').value
        let cfmNewPassword = document.querySelector('#cfmNewPassword').value
        let regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{4,}$/
        if (newPassword !== '' && cfmNewPassword !== '') {
          if (!regex.test(newPassword)) {
            document.querySelector('#warn_notice_change_pw').textContent = "Password must be at 4 characters, as least one number, one capital letter, one lower case letter"
          } else {
            if(newPassword !== cfmNewPassword) {
              document.querySelector('#warn_notice_change_pw').textContent = 'Two password are not match!'
              return
            } else {
              document.querySelector('#submit_btn_change_pw').removeAttribute('disabled')
              document.querySelector('#warn_notice_change_pw').textContent = ''
            }
          }
        } else {
          document.querySelector('#submit_btn_change_pw').setAttribute('disabled','')
          document.querySelector('#warn_notice_change_pw').textContent = 'Fill in all the information!'
        }
      })
  })

  document.querySelector('#reset_btn_change_pw').addEventListener('click', () => {
    document.querySelector('#id_change_pw').value = ''
    document.querySelector('#newPassword').value = ''
    document.querySelector('#cfmNewPassword').value = ''
    document.querySelector('#warn_notice_change_pw').textContent = ''
    document.querySelector('#submit_btn_change_pw').setAttribute('disabled','')
  })
  
  // add new data
  document
    .querySelector('#regisForm')
    ?.addEventListener('submit', async (event) => {
      event.preventDefault()
      const form = event.target
      let rUserName = form.rUserName.value
      let email = form.email.value
      let rPassWord = form.rPassWord.value
  
      const res = await fetch('/accountList', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: rUserName,
          email:email,
          password: rPassWord
        })
      })
      const result = await res.json()
  
      alert(result)
      document.querySelector('#rUserName').value = ''
      document.querySelector('#rPassWord').value = ''
      document.querySelector('#cfmRPassWord').value = ''
  
      getAccountData()
    })
  
  // for change password
  document
    .querySelector('#changePwForm')
    ?.addEventListener('submit', async (event) => {
      event.preventDefault()
      const form = event.target
      
      let newPassWord = form.newPassword.value
      const res = await fetch(`/accountList${form.id_change_pw.value}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          changePW: true,
          password: newPassWord
        })
      })
      const result = await res.json()
  
      alert(result)
  
      document.querySelector('#id_change_pw').value = ''
      document.querySelector('#newPassword').value = ''
      document.querySelector('#cfmNewPassword').value = ''
    })
  
  document.querySelector('#rpw_visibility')?.addEventListener('click',() => {
    let pw = document.querySelector('#rPassWord')
    if(pw.type === "password") {
      document.querySelector('#rpw_visibility').textContent = 'visibility_off'
      pw.type = "text"
    } else {
      document.querySelector('#rpw_visibility').textContent = 'visibility'
      pw.type = "password"
    }
  })
  
  document.querySelector('#cfmRpw_visibility')?.addEventListener('click',() => {
    let pw = document.querySelector('#cfmRPassWord')
    if(pw.type === "password") {
      document.querySelector('#cfmRpw_visibility').textContent = 'visibility_off'
      pw.type = "text"
    } else {
      document.querySelector('#cfmRpw_visibility').textContent = 'visibility'
      pw.type = "password"
    }
  })
  
  document.querySelector('#newpw_visibility')?.addEventListener('click',() => {
    let pw = document.querySelector('#newPassword')
    if(pw.type === "password") {
      document.querySelector('#newpw_visibility').textContent = 'visibility_off'
      pw.type = "text"
    } else {
      document.querySelector('#newpw_visibility').textContent = 'visibility'
      pw.type = "password"
    }
  })
  
  document.querySelector('#cfmNewpw_visibility')?.addEventListener('click',() => {
    let pw = document.querySelector('#cfmNewPassword')
    if(pw.type === "password") {
      document.querySelector('#cfmNewpw_visibility').textContent = 'visibility_off'
      pw.type = "text"
    } else {
      document.querySelector('#cfmNewpw_visibility').textContent = 'visibility'
      pw.type = "password"
    }
  })
  
  document.querySelectorAll('[data-th]')?.forEach(sort => {
    sort.addEventListener('click', (e) => {
      e.stopPropagation()
      let target = e.target.getAttribute('data-th')
      let data = JSON.parse(sessionStorage.getItem('accountData'))
      let sortedData = sorting(data,target)
      sessionStorage.setItem('accountData',JSON.stringify(sortedData))
      loadAccountTable()
    })
  })
}

export { loadAccountTable }