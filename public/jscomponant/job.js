import { pagination, paginationConroller, check_page_status } from './utilities/pagination.js'
import { searchFtn } from './utilities/search.js';
import { sorting } from './utilities/sorting.js'

let table = document.querySelector('#jobTable');
let jobData;

const loadJobTable = () => {
  try {
    if (window.location.pathname === '/job') {
      let data = JSON.parse(sessionStorage.getItem('jobData'))
      let clientData = JSON.parse(sessionStorage.getItem('clientData'))
      console.log(data, clientData)
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

          let clientTag = document.createElement('td')
          let clientSelect = document.createElement('select')
          clientSelect.setAttribute('data-client', job.id)
          clientSelect.setAttribute('disabled','')
          for (let i = 0; i < clientData.length; i++) {
            let client = document.createElement('option')
            client.value = clientData[i].client
            client.textContent = clientData[i].client
            if(clientData[i].client === job.client) {
              client.setAttribute('selected', '')
            }
            client.setAttribute('data-client', job.id)
            clientSelect.appendChild(client)
          }
          clientTag.appendChild(clientSelect)
          trTag.appendChild(clientTag)

          let locationTag = document.createElement('td')
          let location = document.createElement('input')
          location.setAttribute('disabled','')
          location.setAttribute('type', 'text')
          location.setAttribute('data-location', job.id)
          location.value = job.location
          locationTag.appendChild(location)
          trTag.appendChild(locationTag)

          let wtDate = new Date(job.walkthrough_date).getDate()
          wtDate < 10? wtDate = '0'+wtDate:wtDate
          let wtMonth = new Date(job.walkthrough_date).getMonth()+1
          wtMonth < 10? wtMonth = '0'+wtMonth:wtMonth
          let wtYear = new Date(job.walkthrough_date).getFullYear()
          let wtDateData = `${wtYear}-${wtMonth}-${wtDate}`
  
          let walkthroughDateTag = document.createElement('td')
          let walkthroughDate = document.createElement('input')
          walkthroughDate.setAttribute('disabled','')
          walkthroughDate.setAttribute('type', 'date')
          walkthroughDate.setAttribute('data-walkthrough-date', job.id)
          walkthroughDate.value = wtDateData
          walkthroughDateTag.appendChild(walkthroughDate)
          trTag.appendChild(walkthroughDateTag)

          let startDate = new Date(job.sampling_start_date).getDate()
          startDate < 10? startDate = '0'+startDate:startDate
          let startMonth = new Date(job.sampling_start_date).getMonth()+1
          startMonth < 10? startMonth = '0'+startMonth:startMonth
          let startYear = new Date(job.sampling_start_date).getFullYear()
          let startDateData = `${startYear}-${startMonth}-${startDate}`

          let startDateTag = document.createElement('td')
          let start = document.createElement('input')
          start.classList.add('hide')
          start.setAttribute('type', 'date')
          start.setAttribute('data-start-date', job.id)
          start.value = startDateData
          startDateTag.appendChild(start)
          trTag.appendChild(startDateTag)

          let endDate = new Date(job.sampling_end_date).getDate()
          endDate < 10? endDate = '0'+endDate:endDate
          let endMonth = new Date(job.sampling_end_date).getMonth()+1
          endMonth < 10? endMonth = '0'+endMonth:endMonth
          let endYear = new Date(job.sampling_end_date).getFullYear()
          let endDateData = `${endYear}-${endMonth}-${endDate}`

          let endDateTag = document.createElement('td')
          let end = document.createElement('input')
          end.classList.add('hide')
          end.setAttribute('type', 'date')
          end.setAttribute('data-end-date', job.id)
          end.value = endDateData
          endDateTag.appendChild(end)
          trTag.appendChild(endDateTag)

          let samplingPeriodTag = document.createElement('td')
          let samplingPeriod = document.createElement('input')
          samplingPeriod.setAttribute('disabled','')
          samplingPeriod.setAttribute('type', 'text')
          samplingPeriod.setAttribute('data-sampling-period', job.id)
          samplingPeriod.value = `${startDateData} - ${endDateData}`
          samplingPeriodTag.appendChild(samplingPeriod)
          trTag.appendChild(samplingPeriodTag)

          let totalPointTag = document.createElement('td')
          let totalPoint = document.createElement('input')
          totalPoint.setAttribute('disabled','')
          totalPoint.setAttribute('type', 'number')
          totalPoint.setAttribute('data-total-point', job.id)
          totalPoint.value = job.totalPoint
          totalPointTag.appendChild(totalPoint)
          trTag.appendChild(totalPointTag)

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
      let newClient = document.querySelector('#client')
      newClient.innerText = ''
      for (let i = 0; i <= clientData.length; i++) {
        let client = document.createElement('option')
        if(i === 0) {
          client.value = ''
          client.textContent = 'Choose one client'
        } else {
          client.value = clientData[i-1].client
          client.textContent = clientData[i-1].client
        }
        newClient.appendChild(client)
      }

      // controller for the and delete btn
      document.querySelectorAll('[data-edit]')?.forEach(edit => {
        edit.addEventListener('click', (e) => {
          const target = e.target.getAttribute('data-edit')
          document.querySelector(`[data-client="${target}"]`).removeAttribute("disabled")
          document.querySelector(`[data-location="${target}"]`).removeAttribute("disabled")
          document.querySelector(`[data-walkthrough-date="${target}"]`).removeAttribute("disabled")
          document.querySelector(`[data-sampling-period="${target}"]`).classList.add("hide")
          document.querySelector(`[data-start-date="${target}"]`).classList.remove("hide")
          document.querySelector(`[data-end-date="${target}"]`).classList.remove("hide")
          document.querySelector(`[data-total-point="${target}"]`).removeAttribute("disabled")
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
          document.querySelector(`[data-client="${target}"]`).setAttribute("disabled","")
          document.querySelector(`[data-location="${target}"]`).setAttribute("disabled","")
          document.querySelector(`[data-walkthrough-date="${target}"]`).setAttribute("disabled","")
          document.querySelector(`[data-sampling-period="${target}"]`).classList.remove("hide")
          document.querySelector(`[data-start-date="${target}"]`).classList.add("hide")
          document.querySelector(`[data-end-date="${target}"]`).classList.add("hide")
          document.querySelector(`[data-total-point="${target}"]`).setAttribute("disabled","")
          document.querySelector(`[data-done="${target}"]`).classList.add('hide')
          document.querySelector(`[data-cancel="${target}"]`).classList.add('hide')
          document.querySelector(`[data-edit="${target}"]`).classList.remove('hide')
        })
      })
      document.querySelectorAll('[data-cancel]')?.forEach(cancel => {
        cancel.addEventListener('click', (e) => {
          let target = e.target.getAttribute('data-cancel')
          document.querySelector(`[data-client="${target}"]`).setAttribute("disabled","")
          document.querySelector(`[data-location="${target}"]`).setAttribute("disabled","")
          document.querySelector(`[data-walkthrough-date="${target}"]`).setAttribute("disabled","")
          document.querySelector(`[data-sampling-period="${target}"]`).classList.remove("hide")
          document.querySelector(`[data-start-date="${target}"]`).classList.add("hide")
          document.querySelector(`[data-end-date="${target}"]`).classList.add("hide")
          document.querySelector(`[data-total-point="${target}"]`).setAttribute("disabled","")
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

const getClientData = async () => {
  try {
    if(!JSON.parse(sessionStorage.getItem('clientData'))) {
      let data = await fetch('/clientList')
      let clientData = await data.json()
      sessionStorage.setItem('clientData',JSON.stringify(clientData))
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

  const client = document.querySelector(`[data-client="${currentTarget}"]`).value
  const location = document.querySelector(`[data-location="${currentTarget}"]`).value
  const walkthroughDate = document.querySelector(`[data-walkthrough-date="${currentTarget}"]`).value
  const startDate = document.querySelector(`[data-start-date="${currentTarget}"]`).value
  const endDate = document.querySelector(`[data-end-date="${currentTarget}"]`).value
  const totalPoint = document.querySelector(`[data-total-point="${currentTarget}"]`).value

  await fetch(`/jobList${e.target.getAttribute('data-done')}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      id:currentTarget,
      client: client,
      location: location,
      walkthroughDate: walkthroughDate, 
      startDate: startDate, 
      endDate: endDate, 
      totalPoint: totalPoint
    })
  })
  getjobData()
}

let path = window.location.pathname
if(path === '/job') {
  getjobData()
  getClientData()

  document.querySelector('#reset_btn').addEventListener('click', () => {
    document.querySelector('#client').value = ''
    document.querySelector('#location').value = ''
    document.querySelector('#walkthrouhgDate').value = ''
    document.querySelector('#samplingPeriod').value = ''
    document.querySelector('#totalPoint').value = ''
  })
  
  // add new data
  document
    .querySelector('#addJobFrom')
    ?.addEventListener('submit', async (event) => {
      event.preventDefault() // To prevent the form from submitting synchronously
      const form = event.target
      let client = form.client.value
      let location = form.location.value
      let walkthrouhgDate = form.walkthrouhgDate.value
      let samplingPeriod = form.samplingPeriod.value
      let totalPoint = form.totalPoint.value
  
      const res = await fetch('/jobList', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          client: client,
          location: location,
          walkthrouhgDate: walkthrouhgDate, 
          samplingPeriod: samplingPeriod, 
          totalPoint: totalPoint
        })
      })
      const result = await res.json()
 
      document.querySelector('#client').value = ''
      document.querySelector('#location').value = ''
      document.querySelector('#walkthrouhgDate').value = ''
      document.querySelector('#samplingPeriod').value = ''
      document.querySelector('#totalPoint').value = ''
  
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