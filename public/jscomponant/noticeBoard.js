import { sorting } from './utilities/sorting.js'
import { login } from './utilities/login.js'

let table = document.querySelector('#noticeBoardTable');
let noticeBoardData;

const loadNoticeBoardTable = () => {
  try {
    if (window.location.pathname === '/') {
      let data = JSON.parse(sessionStorage.getItem('noticeBoardData'))

      // generate table
      if(data?.length === undefined || data?.length === 0 ) {
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
        data.forEach( noticeBoard => {
          if(!noticeBoard.finish){

            let trTag = document.createElement('tr')

            trTag.id = noticeBoard.id

            let noticeBoardIdTag = document.createElement('th')
            noticeBoardIdTag.setAttribute('scope','row')
            noticeBoardIdTag.textContent = noticeBoard.id
            trTag.appendChild(noticeBoardIdTag)

            let titleTag = document.createElement('td')
            let title = document.createElement('input')
            title.setAttribute('disabled','')
            title.setAttribute('type', 'text')
            title.setAttribute('data-title', noticeBoard.id)
            title.value = noticeBoard.title
            titleTag.appendChild(title)
            trTag.appendChild(titleTag)
    
            let contentTag = document.createElement('td')
            let content = document.createElement('input')
            content.setAttribute('disabled','')
            content.setAttribute('type', 'text')
            content.setAttribute('data-content', noticeBoard.id)
            content.value = noticeBoard.content
            contentTag.appendChild(content)
            trTag.appendChild(contentTag)

            let finishTag = document.createElement('td')
            let finish = document.createElement('button')
            finish.setAttribute('data-finish', noticeBoard.id)
            finish.textContent = 'Done'
            finishTag.appendChild(finish)
            trTag.appendChild(finishTag)

            table.appendChild(trTag)
          }
        })
      }

      // controller for finish btn
      document.querySelectorAll('[data-finish]')?.forEach(finish => {
        finish.addEventListener('click', (e) => {
          finishFtn(e)
        })
      })
    }
  } catch (err) {
    console.log(err)
  }
}

const getnoticeBoardData = async () => {
  try {
    let data = await fetch('/noticeBoardList')
    noticeBoardData = await data.json()
    sessionStorage.setItem('noticeBoardData',JSON.stringify(noticeBoardData))
    loadNoticeBoardTable()
  } catch (err) {
    console.log(err)
  }
}

const finishFtn = async (e) => {
  await fetch(`/noticeBoardList${e.target.getAttribute('data-finish')}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      doneBy: window.sessionStorage.getItem('username'),
    })
  })
  getnoticeBoardData()
}

let path = window.location.pathname
if(path === '/' && login) {
  getnoticeBoardData()
  
  document.querySelectorAll('[data-th]')?.forEach(sort => {
    sort.addEventListener('click', (e) => {
      e.stopPropagation()
      let target = e.target.getAttribute('data-th')
      let data = JSON.parse(sessionStorage.getItem('noticeBoardData'))
      let sortedData = sorting(data,target)
      sessionStorage.setItem('noticeBoardData',JSON.stringify(sortedData))
      loadNoticeBoardTable()
    })
  })
}

export { loadNoticeBoardTable }