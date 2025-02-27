import { pagination, paginationConroller, check_page_status } from './utilities/pagination.js'
import { searchFtn } from './utilities/search.js';
import { sorting } from './utilities/sorting.js'

let table = document.querySelector('#jobTable');
let resultTable = document.querySelector('#resultTable');
let targetJobId;
let targetJobName;
let targetPointId;
let jobData;
let equipmentData;

const loadJobTable = () => {
  try {
    if (window.location.pathname === '/job') {
      let data = JSON.parse(sessionStorage.getItem('jobData'))
      let clientData = JSON.parse(sessionStorage.getItem('clientData'))
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
            client.value = clientData[i].company_name
            client.textContent = clientData[i].company_name
            if(clientData[i].company_name === job.company_name) {
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

          let wtDateData
          if(job.walkthrough_date) {
            let wtDate = new Date(job.walkthrough_date).getDate()
            wtDate < 10? wtDate = '0'+wtDate:wtDate
            let wtMonth = new Date(job.walkthrough_date).getMonth()+1
            wtMonth < 10? wtMonth = '0'+wtMonth:wtMonth
            let wtYear = new Date(job.walkthrough_date).getFullYear()
            wtDateData = `${wtYear}-${wtMonth}-${wtDate}`
          } else {
            wtDateData = ''
          }
  
          let walkthroughDateTag = document.createElement('td')
          let walkthroughDate = document.createElement('input')
          walkthroughDate.setAttribute('disabled','')
          walkthroughDate.setAttribute('type', 'date')
          walkthroughDate.setAttribute('data-walkthrough-date', job.id)
          walkthroughDate.value = wtDateData
          walkthroughDateTag.appendChild(walkthroughDate)
          trTag.appendChild(walkthroughDateTag)
          
          let samplingPeriodTag = document.createElement('td')
          let startDateData
          if (job.sampling_start_date) {
            let startDate = new Date(job.sampling_start_date).getDate()
            startDate < 10? startDate = '0'+startDate:startDate
            let startMonth = new Date(job.sampling_start_date).getMonth()+1
            startMonth < 10? startMonth = '0'+startMonth:startMonth
            let startYear = new Date(job.sampling_start_date).getFullYear()
            startDateData = `${startYear}-${startMonth}-${startDate}`
          } else {
            startDateData = ''
          }

          let startDateTag = document.createElement('div')
          startDateTag.setAttribute('data-start-date-tag', job.id)
          startDateTag.classList.add('hide')
          let startDateLabel = document.createElement('label')
          startDateLabel.textContent = 'Start Date'
          startDateLabel.classList.add('input-group-text')
          startDateTag.appendChild(startDateLabel)

          let start = document.createElement('input')
          start.setAttribute('type', 'date')
          start.setAttribute('data-start-date', job.id)
          start.classList.add('form-control')
          start.value = startDateData
          startDateLabel.appendChild(start)
          samplingPeriodTag.appendChild(startDateTag)

          let endDateData
          if(job.sampling_end_date) {

            let endDate = new Date(job.sampling_end_date).getDate()
            endDate < 10? endDate = '0'+endDate:endDate
            let endMonth = new Date(job.sampling_end_date).getMonth()+1
            endMonth < 10? endMonth = '0'+endMonth:endMonth
            let endYear = new Date(job.sampling_end_date).getFullYear()
            endDateData = `${endYear}-${endMonth}-${endDate}`
          } else {
            endDateData = ''
          }

          let endDateTag = document.createElement('div')
          endDateTag.setAttribute('data-end-date-tag', job.id)
          endDateTag.classList.add('hide')
          let endDateLabel = document.createElement('label')
          endDateLabel.textContent = 'End Date'
          endDateLabel.classList.add('input-group-text')
          endDateTag.appendChild(endDateLabel)

          let end = document.createElement('input')
          end.setAttribute('type', 'date')
          end.setAttribute('data-end-date', job.id)
          end.classList.add('form-control')
          end.value = endDateData
          endDateLabel.appendChild(end)
          samplingPeriodTag.appendChild(endDateTag)

          let samplingPeriod = document.createElement('input')
          samplingPeriod.setAttribute('disabled','')
          samplingPeriod.setAttribute('type', 'text')
          samplingPeriod.setAttribute('data-sampling-period', job.id)
          samplingPeriod.value = startDateData ==='' | endDateData === ''?'':`${startDateData} - ${endDateData}`
          samplingPeriodTag.appendChild(samplingPeriod)
          trTag.appendChild(samplingPeriodTag)

          let totalPointTag = document.createElement('td')
          let totalPoint = document.createElement('input')
          totalPoint.setAttribute('disabled','')
          totalPoint.setAttribute('type', 'number')
          totalPoint.setAttribute('data-total-point', job.id)
          totalPoint.value = job.no_of_sampling_point
          totalPointTag.appendChild(totalPoint)
          trTag.appendChild(totalPointTag)

          let detailTag = document.createElement('td')
          let detail = document.createElement('button')
          detail.setAttribute('data-detail', job.id)
          detail.setAttribute('data-bs-toggle', 'modal')
          detail.setAttribute('data-bs-target', '#resultTableModal')
          detail.textContent = 'Review'
          detailTag.appendChild(detail)
          trTag.appendChild(detailTag)

          let reportTag = document.createElement('td')
          let report = document.createElement('button')
          report.setAttribute('data-report', job.id)
          report.setAttribute('data-bs-toggle', 'modal')
          report.setAttribute('data-bs-target', '#reportModal')
          report.textContent = 'Review'
          reportTag.appendChild(report)
          trTag.appendChild(reportTag)

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
          client.value = clientData[i-1].company_name
          client.textContent = clientData[i-1].company_name
        }
        newClient.appendChild(client)
      }

      document.querySelectorAll('[data-detail]')?.forEach(detail => {
        detail.addEventListener('click', e => {
          detailFtn(e)
        })
      })

      document.querySelectorAll('[data-report]')?.forEach(report => {
        report.addEventListener('click', e => {
          reportFtn(e)
        })
      })

      // controller for the and delete btn
      document.querySelectorAll('[data-edit]')?.forEach(edit => {
        edit.addEventListener('click', (e) => {
          const target = e.target.getAttribute('data-edit')
          document.querySelector(`[data-client="${target}"]`).removeAttribute("disabled")
          document.querySelector(`[data-location="${target}"]`).removeAttribute("disabled")
          document.querySelector(`[data-walkthrough-date="${target}"]`).removeAttribute("disabled")
          document.querySelector(`[data-sampling-period="${target}"]`).classList.add("hide")
          document.querySelector(`[data-start-date-tag="${target}"]`).classList.remove("hide")
          document.querySelector(`[data-end-date-tag="${target}"]`).classList.remove("hide")
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
          document.querySelector(`[data-start-date-tag="${target}"]`).classList.add("hide")
          document.querySelector(`[data-end-date-tag="${target}"]`).classList.add("hide")
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
          document.querySelector(`[data-start-date-tag="${target}"]`).classList.add("hide")
          document.querySelector(`[data-end-date-tag="${target}"]`).classList.add("hide")
          document.querySelector(`[data-total-point="${target}"]`).setAttribute("disabled","")
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

const loadResultTable = () => {
  try {
    if (window.location.pathname === '/job') {
      let data = JSON.parse(sessionStorage.getItem('resultTableData'))
      let equipmentData = JSON.parse(sessionStorage.getItem('equipmentData'))

      // generate table
      if(data?.length === undefined || data?.length === 0 ) {
        let trTag = document.createElement('tr')
        let thTag = document.createElement('th')

        let no_of_col = document.querySelectorAll('th').length
        resultTable.textContent = ''

        thTag.setAttribute('colspan', no_of_col)
        thTag.setAttribute('class','text-center')
        thTag.textContent = 'No DATA'
        trTag.id = 1
        trTag.appendChild(thTag)
        resultTable.appendChild(trTag)
      } else {
        resultTable.textContent = ''
        data.forEach( result => {
          let trTag = document.createElement('tr')

          trTag.id = result.id

          let resultIdTag = document.createElement('th')
          resultIdTag.setAttribute('scope','row')
          resultIdTag.textContent = result.id
          trTag.appendChild(resultIdTag)

          let pointNoTag = document.createElement('td')
          let pointNo = document.createElement('input')
          pointNo.setAttribute('disabled','')
          pointNo.setAttribute('type', 'text')
          pointNo.setAttribute('data-point-no', result.id)
          pointNo.value = result.point_no
          pointNoTag.appendChild(pointNo)
          trTag.appendChild(pointNoTag)

          let descriptionTag = document.createElement('td')
          let description = document.createElement('input')
          description.setAttribute('disabled','')
          description.setAttribute('type', 'text')
          description.setAttribute('data-description', result.id)
          description.value = result.description
          descriptionTag.appendChild(description)
          trTag.appendChild(descriptionTag)

          let sampleDate = new Date(result.sampling_date).getDate()
          sampleDate < 10? sampleDate = '0'+sampleDate:sampleDate
          let sampleMonth = new Date(result.sampling_date).getMonth()+1
          sampleMonth < 10? sampleMonth = '0'+sampleMonth:sampleMonth
          let sampleYear = new Date(result.sampling_date).getFullYear()
          let sampleDateData = `${sampleYear}-${sampleMonth}-${sampleDate}`
  
          let samplingDateTag = document.createElement('td')
          let samplingDate = document.createElement('input')
          samplingDate.setAttribute('disabled','')
          samplingDate.setAttribute('type', 'date')
          samplingDate.setAttribute('data-sampling-date', result.id)
          samplingDate.value = sampleDateData
          samplingDateTag.appendChild(samplingDate)
          trTag.appendChild(samplingDateTag)

          let co2Tag = document.createElement('td')

          let co2ResultTag = document.createElement('div')
          co2ResultTag.classList.add('input-group')
          let co2ResultLabel = document.createElement('label')
          co2ResultLabel.textContent = 'Result'
          co2ResultLabel.setAttribute('data-co2-label', result.id)
          co2ResultLabel.classList.add('input-group-text')
          co2ResultTag.appendChild(co2ResultLabel)

          let co2Result = document.createElement('input')
          co2Result.setAttribute('disabled','')
          co2Result.setAttribute('type', 'number')
          co2Result.setAttribute('data-co2-result', result.id)
          co2Result.classList.add('form-control')
          co2Result.value = result.carbon_dioxide
          co2ResultLabel.appendChild(co2Result)
          co2Tag.appendChild(co2ResultTag)

          let co2EquipmentTag = document.createElement('div')
          co2EquipmentTag.setAttribute('data-co2-equipment-tag', result.id)
          co2EquipmentTag.classList.add('hide')
          let co2EquipmentLabelTag = document.createElement('label')
          co2EquipmentLabelTag.textContent = 'Equipment No.:'
          co2EquipmentTag.appendChild(co2EquipmentLabelTag)

          let co2EquipmentSelect = document.createElement('select')
          co2EquipmentSelect.setAttribute('data-co2-equipment-select', result.id)
          for (let i = 0; i < equipmentData.length; i++) {
            if(equipmentData[i].parameter === "Carbon Dioxide") {
              let equipment = document.createElement('option')
              equipment.value = equipmentData[i].name
              equipment.textContent = equipmentData[i].name
              if(equipmentData[i].parameter === result.co2_equipment_id) {
                equipment.setAttribute('selected', '')
              }
              equipment.setAttribute('data-co2-equipment', equipment.id)
              co2EquipmentSelect.appendChild(equipment)
            }
          }
          co2EquipmentLabelTag.appendChild(co2EquipmentSelect)
          co2Tag.appendChild(co2EquipmentTag)
          trTag.appendChild(co2Tag)

          let pm10Tag = document.createElement('td')

          let pm10ResultTag = document.createElement('div')
          pm10ResultTag.classList.add('input-group')
          let pm10ResultLabel = document.createElement('label')
          pm10ResultLabel.textContent = 'Result'
          pm10ResultLabel.setAttribute('data-pm10-label', result.id)
          pm10ResultLabel.classList.add('input-group-text')
          pm10ResultTag.appendChild(pm10ResultLabel)

          let pm10Result = document.createElement('input')
          pm10Result.setAttribute('disabled','')
          pm10Result.setAttribute('type', 'number')
          pm10Result.setAttribute('data-pm10-result', result.id)
          pm10Result.classList.add('form-control')
          pm10Result.value = result.pm10
          pm10ResultLabel.appendChild(pm10Result)
          pm10Tag.appendChild(pm10ResultTag)

          let pm10EquipmentTag = document.createElement('div')
          pm10EquipmentTag.setAttribute('data-pm10-equipment-tag', result.id)
          pm10EquipmentTag.classList.add('hide')
          let pm10EquipmentLabelTag = document.createElement('label')
          pm10EquipmentLabelTag.textContent = 'Equipment No.:'
          pm10EquipmentTag.appendChild(pm10EquipmentLabelTag)

          let pm10EquipmentSelect = document.createElement('select')
          pm10EquipmentSelect.setAttribute('data-pm10-equipment-select', result.id)
          for (let i = 0; i < equipmentData.length; i++) {
            if(equipmentData[i].parameter === "PM10") {
              let equipment = document.createElement('option')
              equipment.value = equipmentData[i].name
              equipment.textContent = equipmentData[i].name
              if(equipmentData[i].parameter === result.pm10_equipment_id) {
                equipment.setAttribute('selected', '')
              }
              equipment.setAttribute('data-pm10-equipment', equipment.id)
              pm10EquipmentSelect.appendChild(equipment)
            }
          }
          pm10EquipmentTag.appendChild(pm10EquipmentSelect)
          pm10Tag.appendChild(pm10EquipmentTag)
          trTag.appendChild(pm10Tag)

          let rhTag = document.createElement('td')

          let rhResultTag = document.createElement('div')
          rhResultTag.classList.add('input-group')
          let rhResultLabel = document.createElement('label')
          rhResultLabel.textContent = 'Result'
          rhResultLabel.setAttribute('data-rh-label', result.id)
          rhResultLabel.classList.add('input-group-text')
          rhResultTag.appendChild(rhResultLabel)

          let rhResult = document.createElement('input')
          rhResult.setAttribute('disabled','')
          rhResult.setAttribute('type', 'number')
          rhResult.setAttribute('data-rh-result', result.id)
          rhResult.classList.add('form-control')
          rhResult.value = result.humidity
          rhResultLabel.appendChild(rhResult)
          rhTag.appendChild(rhResultTag)

          let rhEquipmentTag = document.createElement('div')
          rhEquipmentTag.setAttribute('data-rh-equipment-tag', result.id)
          rhEquipmentTag.classList.add('hide')
          let rhEquipmentLabelTag = document.createElement('label')
          rhEquipmentLabelTag.textContent = 'Equipment No.:'
          rhEquipmentTag.appendChild(rhEquipmentLabelTag)

          let rhEquipmentSelect = document.createElement('select')
          rhEquipmentSelect.setAttribute('data-rh-equipment-select', result.id)
          for (let i = 0; i < equipmentData.length; i++) {
            if(equipmentData[i].parameter === "Humidity") {
              let equipment = document.createElement('option')
              equipment.value = equipmentData[i].name
              equipment.textContent = equipmentData[i].name
              if(equipmentData[i].parameter === result.rh_equipment_id) {
                equipment.setAttribute('selected', '')
              }
              equipment.setAttribute('data-rh-equipment', equipment.id)
              rhEquipmentSelect.appendChild(equipment)
            }
          }
          rhEquipmentTag.appendChild(rhEquipmentSelect)
          rhTag.appendChild(rhEquipmentTag)
          trTag.appendChild(rhTag)

          let photoTag = document.createElement('td')
          let photo = document.createElement('button')
          photo.setAttribute('data-photo', result.id)
          photo.setAttribute('data-bs-toggle', 'modal')
          photo.setAttribute('data-bs-target', '#photoModal')
          photo.textContent = 'Review'
          photoTag.appendChild(photo)
          trTag.appendChild(photoTag)

          let editTag = document.createElement('td')
          let edit = document.createElement('button')
          edit.setAttribute('data-result-edit', result.id)
          edit.textContent = 'Edit'
          editTag.appendChild(edit)
          let done = document.createElement('button')
          done.setAttribute('data-result-done', result.id)
          done.setAttribute('class','hide')
          done.textContent = 'Done'
          editTag.appendChild(done)
          let cancel = document.createElement('button')
          cancel.setAttribute('data-result-cancel', result.id)
          cancel.setAttribute('class','hide')
          cancel.textContent = 'Cancel'
          editTag.appendChild(cancel)
          trTag.appendChild(editTag)

          let delTag = document.createElement('td')
          let del = document.createElement('button')
          del.setAttribute('data-result-delete', result.id)
          del.textContent = 'Delete'
          delTag.appendChild(del)
          trTag.appendChild(delTag)

          resultTable.appendChild(trTag)
        })
      }
      let co2Equipment = document.querySelector('#co2Equipment')
      co2Equipment.innerText = ''
      for (let i = 0; i <= equipmentData.length; i++) {
        let equipment = document.createElement('option')
        if(i === 0) {
          equipment.value = ''
          equipment.textContent = 'Choose one equipment'
          co2Equipment.appendChild(equipment)
        } else if(equipmentData[i-1].parameter === 'Carbon Dioxide'){
          equipment.value = equipmentData[i-1].name
          equipment.textContent = equipmentData[i-1].name
          co2Equipment.appendChild(equipment)
        }
      }
      let pm10Equipment = document.querySelector('#pm10Equipment')
      pm10Equipment.innerText = ''
      for (let i = 0; i <= equipmentData.length; i++) {
        let equipment = document.createElement('option')
        if(i === 0) {
          equipment.value = ''
          equipment.textContent = 'Choose one equipment'
          pm10Equipment.appendChild(equipment)
        } else if(equipmentData[i-1].parameter === 'PM10'){
          equipment.value = equipmentData[i-1].name
          equipment.textContent = equipmentData[i-1].name
          pm10Equipment.appendChild(equipment)
        }
      }
      let rhEquipment = document.querySelector('#rhEquipment')
      rhEquipment.innerText = ''
      for (let i = 0; i <= equipmentData.length; i++) {
        let equipment = document.createElement('option')
        if(i === 0) {
          equipment.value = ''
          equipment.textContent = 'Choose one equipment'
          rhEquipment.appendChild(equipment)
        } else if(equipmentData[i-1].parameter === 'Humidity'){
          equipment.value = equipmentData[i-1].name
          equipment.textContent = equipmentData[i-1].name
          rhEquipment.appendChild(equipment)
        }
      }
      document.querySelectorAll('[data-photo]')?.forEach(photo => {
        photo.addEventListener('click', (e) => {
          photoReviewFtn(e)
        })
      })
      // controller for the and delete btn
      document.querySelectorAll('[data-result-edit]')?.forEach(edit => {
        edit.addEventListener('click', (e) => {
          const target = e.target.getAttribute('data-result-edit')
          document.querySelector(`[data-point-no="${target}"]`).removeAttribute("disabled")
          document.querySelector(`[data-description="${target}"]`).removeAttribute("disabled")
          document.querySelector(`[data-sampling-date="${target}"]`).removeAttribute("disabled")
          document.querySelector(`[data-co2-result="${target}"]`).removeAttribute("disabled")
          document.querySelector(`[data-co2-label="${target}"]`).classList.remove("hide")
          document.querySelector(`[data-co2-equipment-tag="${target}"]`).classList.remove("hide")
          document.querySelector(`[data-pm10-result="${target}"]`).removeAttribute("disabled")
          document.querySelector(`[data-pm10-label="${target}"]`).classList.remove("hide")
          document.querySelector(`[data-pm10-equipment-tag="${target}"]`).classList.remove("hide")
          document.querySelector(`[data-rh-result="${target}"]`).removeAttribute("disabled")
          document.querySelector(`[data-rh-label="${target}"]`).classList.remove("hide")
          document.querySelector(`[data-rh-equipment-tag="${target}"]`).classList.remove("hide")
          document.querySelector(`[data-result-done="${target}"]`).classList.remove('hide')
          document.querySelector(`[data-result-cancel="${target}"]`).classList.remove('hide')
          document.querySelector(`[data-result-edit="${target}"]`).classList.add('hide')
        })
      })
      document.querySelectorAll('[data-result-delete]')?.forEach(del => {
        del.addEventListener('click', (e) => {
          resultDelFtn(e)
        })
      })
      document.querySelectorAll('[data-result-done]')?.forEach(done => {
        done.addEventListener('click', (e) => {
          resultEditFtn(e)
          const target = e.target.getAttribute('data-result-done')
          document.querySelector(`[data-point-no="${target}"]`).setAttribute("disabled","")
          document.querySelector(`[data-description="${target}"]`).setAttribute("disabled","")
          document.querySelector(`[data-sampling-date="${target}"]`).setAttribute("disabled","")
          document.querySelector(`[data-co2-result="${target}"]`).setAttribute("disabled","")
          document.querySelector(`[data-co2-label="${target}"]`).classList.add("hide")
          document.querySelector(`[data-co2-equipment-tag="${target}"]`).classList.add("hide")
          document.querySelector(`[data-pm10-result="${target}"]`).setAttribute("disabled","")
          document.querySelector(`[data-pm10-label="${target}"]`).classList.add("hide")
          document.querySelector(`[data-pm10-equipment-tag="${target}"]`).classList.add("hide")
          document.querySelector(`[data-rh-result="${target}"]`).setAttribute("disabled","")
          document.querySelector(`[data-rh-label="${target}"]`).classList.add("hide")
          document.querySelector(`[data-rh-equipment-tag="${target}"]`).classList.add("hide")
          document.querySelector(`[data-result-done="${target}"]`).classList.add('hide')
          document.querySelector(`[data-result-cancel="${target}"]`).classList.add('hide')
          document.querySelector(`[data-result-edit="${target}"]`).classList.remove('hide')
        })
      })
      document.querySelectorAll('[data-result-cancel]')?.forEach(cancel => {
        cancel.addEventListener('click', (e) => {
          let target = e.target.getAttribute('data-result-cancel')
          document.querySelector(`[data-point-no="${target}"]`).setAttribute("disabled","")
          document.querySelector(`[data-description="${target}"]`).setAttribute("disabled","")
          document.querySelector(`[data-sampling-date="${target}"]`).setAttribute("disabled","")
          document.querySelector(`[data-co2-result="${target}"]`).setAttribute("disabled","")
          document.querySelector(`[data-co2-label="${target}"]`).classList.add("hide")
          document.querySelector(`[data-co2-equipment-tag="${target}"]`).classList.add("hide")
          document.querySelector(`[data-pm10-result="${target}"]`).setAttribute("disabled","")
          document.querySelector(`[data-pm10-label="${target}"]`).classList.add("hide")
          document.querySelector(`[data-pm10-equipment-tag="${target}"]`).classList.add("hide")
          document.querySelector(`[data-rh-result="${target}"]`).setAttribute("disabled","")
          document.querySelector(`[data-rh-label="${target}"]`).classList.add("hide")
          document.querySelector(`[data-rh-equipment-tag="${target}"]`).classList.add("hide")
          document.querySelector(`[data-result-done="${target}"]`).classList.add('hide')
          document.querySelector(`[data-result-cancel="${target}"]`).classList.add('hide')
          document.querySelector(`[data-result-edit="${target}"]`).classList.remove('hide')
        })
      })
    }
  } catch (err) {
    console.log(err)
  }
}

// for get data from database
const getJobData = async () => {
  try {
    let data = await fetch('/jobList')
    jobData = await data.json()
    sessionStorage.setItem('jobData',JSON.stringify(jobData))
    loadJobTable()
  } catch (err) {
    console.log(err)
    alert('Please refresh page')
  }
}
const getClientData = async () => {
  try {
    if(!JSON.parse(sessionStorage.getItem('clientData'))) {
      let data = await fetch('/clientList')
      let clientData = await data.json()
      sessionStorage.setItem('clientData',JSON.stringify(clientData))
    }
  } catch (err) {
    console.log(err)
    alert('Please refresh page')
  }
}
const getResultData = async (jobId) => {
  try {
    let data = await fetch(`/resultTableList${jobId}`)
    let resultTableData = await data.json()
    sessionStorage.setItem('resultTableData',JSON.stringify(resultTableData))
    loadResultTable()
  } catch (err) {
    console.log(err)
    alert('Please refresh page')
  }
}
const getEquipmentData = async () => {
  try {
    let data = await fetch('/equipmentList')
    equipmentData = await data.json()
    sessionStorage.setItem('equipmentData',JSON.stringify(equipmentData))
  } catch (err) {
    console.log(err)
    alert('Please refresh page')
  }
}

// function for job table
const delFtn = async (e) => {
  try {
    await fetch(`/jobList${e.target.getAttribute('data-delete')}`, {
      method: 'DELETE'
    })
    getJobData()
  } catch (err) {
    console.log(err)
  }
}
const editFtn = async (e) => {
  const currentTarget = e.target.getAttribute('data-done')

  const client = document.querySelector(`[data-client="${currentTarget}"]`).value
  const location = document.querySelector(`[data-location="${currentTarget}"]`).value
  let walkthroughDate = document.querySelector(`[data-walkthrough-date="${currentTarget}"]`).value
  let startDate = document.querySelector(`[data-start-date="${currentTarget}"]`).value
  let endDate = document.querySelector(`[data-end-date="${currentTarget}"]`).value
  let totalPoint = document.querySelector(`[data-total-point="${currentTarget}"]`).value

  walkthroughDate === ''?walkthroughDate = null: walkthroughDate
  startDate === ''? startDate = null: startDate
  endDate === ''? endDate = null: endDate
  totalPoint === ''? totalPoint = 0: totalPoint
  try {
    await fetch(`/jobList${e.target.getAttribute('data-done')}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        client: client,
        location: location,
        walkthroughDate: walkthroughDate, 
        startDate: startDate, 
        endDate: endDate, 
        totalPoint: totalPoint
      })
    })
    getJobData()
  } catch (err) {
    console.log(err)
    return
  }
}
const detailFtn = (e) => {
  const currentTarget = e.target.getAttribute('data-detail')
  const location = document.querySelector(`[data-location="${currentTarget}"]`).value
  document.querySelector('#resultTableModalLabel').textContent = location
  targetJobId = currentTarget
  targetJobName = location
  getResultData(targetJobId)
  loadResultTable()
}
const reportFtn = async (e) => {
  const currentTarget = e.target.getAttribute('data-report')
  const location = document.querySelector(`[data-location="${currentTarget}"]`).value
  document.querySelector('#reportModalLabel').textContent = `Report Review (For ${location} [Job Id: ${currentTarget}]`
  targetJobId = currentTarget
  const res = await fetch(`/reviewReport${targetJobId}`)
  const data = await res.json()
  console.log(data)
  if(data.length !== 0) {
    document.querySelector('#reportClient').textContent = data[0].company_name
    document.querySelector('#reportClientAddress').textContent = data[0].address
    document.querySelector('#reportClientContactName').textContent = data[0].contact
    document.querySelector('#reportClientPhoneNo').textContent = data[0].phone_no
    document.querySelector('#reportClientEmail').textContent = data[0].email
    document.querySelector('#reportLocation').textContent = data[0].location

    let wtDate = new Date(data[0].walkthrough_date).getDate()
    wtDate < 10? wtDate = 0+wtDate:wtDate
    let wtMonth = new Date(data[0].walkthrough_date).getMonth()+1
    wtMonth < 10? wtMonth = 0+wtMonth:wtMonth
    let wtYear = new Date(data[0].walkthrough_date).getFullYear()
    let wtDateData = `${wtYear}-${wtMonth}-${wtDate}`
    document.querySelector('#reportWTDate').textContent = wtDateData

    let startDate = new Date(data[0].sampling_start_date).getDate()
    startDate < 10? startDate = 0+startDate:startDate
    let startMonth = new Date(data[0].sampling_start_date).getMonth()+1
    startMonth < 10? startMonth = 0+startMonth:startMonth
    let startYear = new Date(data[0].sampling_start_date).getFullYear()
    let startDateData = `${startYear}-${startMonth}-${startDate}`

    let endDate = new Date(data[0].sampling_end_date).getDate()
    endDate < 10? endDate = 0+endDate:endDate
    let endMonth = new Date(data[0].sampling_end_date).getMonth()+1
    endMonth < 10? endMonth = 0+endMonth:endMonth
    let endYear = new Date(data[0].sampling_end_date).getFullYear()
    let endDateData = `${endYear}-${endMonth}-${endDate}`
    document.querySelector('#reportSamplingPeriod').textContent = `${startDateData} - ${endDateData}`
    
    document.querySelector('#reportTotalPoint').textContent = data[0].no_of_sampling_point
    
    let co2EquipmentListTag = document.querySelector('#co2EquipmentList')
    let pm10EquipmentListTag = document.querySelector('#pm10EquipmentList')
    let rhEquipmentListTag = document.querySelector('#rhEquipmentList')

    let co2EquipmentList = []
    let pm10EquipmentList = []
    let rhEquipmentList = []
    data.forEach(data => {
      co2EquipmentList.push(data.co2Equipment)
      pm10EquipmentList.push(data.pm10Equipment)
      rhEquipmentList.push(data.rhEquipment)
    })
    let newco2EquipmentList = [...new Set(co2EquipmentList)]
    newco2EquipmentList.forEach(item=>{
      co2EquipmentListTag.textContent += item
    })
    let newpm10EquipmentList = [...new Set(pm10EquipmentList)]
    newpm10EquipmentList.forEach(item=>{
      pm10EquipmentListTag.textContent += item
    })
    let newrhEquipmentList = [...new Set(rhEquipmentList)]
    newrhEquipmentList.forEach(item=>{
      rhEquipmentListTag.textContent += item
    })

    let resultTable = document.querySelector('#resultResultTable')
    let line = document.createElement('hr')
    resultTable.appendChild(line)
    data.forEach(data => {
      let samplingDate = new Date(data.sampling_date).getDate()
      samplingDate < 10? samplingDate = 0+samplingDate:samplingDate
      let samplingMonth = new Date(data.sampling_date).getMonth()+1
      samplingMonth < 10? samplingMonth = 0+samplingMonth:samplingMonth
      let samplingYear = new Date(data.sampling_date).getFullYear()
      let samplingDateData = `${samplingYear}-${samplingMonth}-${samplingDate}`
  
      let pointTag = document.createElement('div')

      let pointNoTag = document.createElement('div')
      let pointNoNameTag = document.createElement('span')
      pointNoNameTag.textContent = 'Pont No.:'
      let pointNoDataTag = document.createElement('span')
      pointNoDataTag.textContent = data.point_no
      pointNoTag.appendChild(pointNoNameTag)
      pointNoTag.appendChild(pointNoDataTag)

      let descriptionTag = document.createElement('div')
      let descriptionNameTag = document.createElement('span')
      descriptionNameTag.textContent = 'Description:'
      let descriptionDataTag = document.createElement('span')
      descriptionDataTag.textContent = data.description
      descriptionTag.appendChild(descriptionNameTag)
      descriptionTag.appendChild(descriptionDataTag)

      let samplingDateTag = document.createElement('div')
      let samplingDateNameTag = document.createElement('span')
      samplingDateNameTag.textContent = 'Sampling Date:'
      let samplingDateDataTag = document.createElement('span')
      samplingDateDataTag.textContent = samplingDateData
      samplingDateTag.appendChild(samplingDateNameTag)
      samplingDateTag.appendChild(samplingDateDataTag)

      let co2ResultTag = document.createElement('div')
      let co2ResultNameTag = document.createElement('span')
      co2ResultNameTag.textContent = 'CO2:'
      let co2ResultDataTag = document.createElement('span')
      co2ResultDataTag.textContent = data.carbon_dioxide
      co2ResultTag.appendChild(co2ResultNameTag)
      co2ResultTag.appendChild(co2ResultDataTag)

      let pm10ResultTag = document.createElement('div')
      let pm10ResultNameTag = document.createElement('span')
      pm10ResultNameTag.textContent = 'PM10:'
      let pm10ResultDataTag = document.createElement('span')
      pm10ResultDataTag.textContent = data.pm10
      pm10ResultTag.appendChild(pm10ResultNameTag)
      pm10ResultTag.appendChild(pm10ResultDataTag)

      let rhResultTag = document.createElement('div')
      let rhResultNameTag = document.createElement('span')
      rhResultNameTag.textContent = 'Humidity:'
      let rhResultDataTag = document.createElement('span')
      rhResultDataTag.textContent = data.humidity
      rhResultTag.appendChild(rhResultNameTag)
      rhResultTag.appendChild(rhResultDataTag)

      let line = document.createElement('hr')
      pointTag.appendChild(pointNoTag)
      pointTag.appendChild(descriptionTag)
      pointTag.appendChild(samplingDateTag)
      pointTag.appendChild(co2ResultTag)
      pointTag.appendChild(pm10ResultTag)
      pointTag.appendChild(rhResultTag)
      pointTag.appendChild(line)
      resultTable.appendChild(pointTag)
    })

    let resultPhoto = document.querySelector('#reportPhoto')
    data.forEach(data => {
      let divTag = document.createElement('div')
      let photoNameTag = document.createElement('span')
      photoNameTag.textContent = `Point ${data.point_no}`
      let photoTag = document.createElement('img')
      photoTag.setAttribute('src',`../treatedPhoto/${data.processed_photo}`)
      photoTag.classList.add('reviewPhoto')
      
      let line = document.createElement('hr')

      divTag.appendChild(photoNameTag)
      divTag.appendChild(photoTag)
      resultPhoto.appendChild(divTag)
      resultPhoto.appendChild(line)
    })

    let todayDate = new Date().getDate()
    todayDate < 10? todayDate = 0+todayDate:todayDate
    let todayMonth = new Date().getMonth()+1
    todayMonth < 10? todayMonth = 0+todayMonth:todayMonth
    let todayYear = new Date().getFullYear()
    let todayDateData = `${todayYear}-${todayMonth}-${todayDate}`
    document.querySelector('#reportIssueDate').textContent = todayDateData

  }
}

// function for result table
const resultDelFtn = async (e) => {
  try {
    await fetch(`/resultTableList${e.target.getAttribute('data-result-delete')}`, {
      method: 'DELETE'
    })
    getResultData(targetJobId)
    loadResultTable()
  } catch (err) {
    console.log(err)
  }
}
const resultEditFtn = async (e) => {
  const currentTarget = e.target.getAttribute('data-result-done')

  const pointNo = document.querySelector(`[data-point-no="${currentTarget}"]`).value
  const description = document.querySelector(`[data-description="${currentTarget}"]`).value
  const samplingDate = document.querySelector(`[data-sampling-date="${currentTarget}"]`).value
  const co2Result = document.querySelector(`[data-co2-result="${currentTarget}"]`).value
  const co2Equipment = document.querySelector(`[data-co2-equipment-select="${currentTarget}"]`).value
  const pm10Result = document.querySelector(`[data-pm10-result="${currentTarget}"]`).value
  const pm10Equipment = document.querySelector(`[data-pm10-equipment-select="${currentTarget}"]`).value
  const rhResult = document.querySelector(`[data-rh-result="${currentTarget}"]`).value
  const rhEquipment = document.querySelector(`[data-rh-equipment-select="${currentTarget}"]`).value
  try {
    await fetch(`/resultTableList${e.target.getAttribute('data-result-done')}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        pointNo: pointNo,
        description: description,
        samplingDate: samplingDate, 
        co2Result: co2Result, 
        co2Equipment: co2Equipment, 
        pm10Result: pm10Result, 
        pm10Equipment: pm10Equipment, 
        rhResult: rhResult, 
        rhEquipment: rhEquipment
      })
    })
    getJobData()
  } catch (err) {
    console.log(err)
  }

}
const photoReviewFtn = async (e) => {
  try{
    targetPointId = e.target.getAttribute('data-photo')
    let data = JSON.parse(sessionStorage.getItem('resultTableData'))
    let target = data.filter(pointData => {
      if(Number(pointData.id) === Number(targetPointId)) {
        return true
      }
    })
    document.querySelector('#photoReview').setAttribute('src',`../treatedPhoto/${target[0].processed_photo}`)
  } catch (err) {
    console.log(err)
  }
}
const photoReuploadFtn = async () => {
  try {
    document
      .querySelector('#reuploadPhotoFrom')
      ?.addEventListener('submit', async (event) => {
        event.preventDefault() // To prevent the form from submitting synchronously
        const form = event.target
        const formData = new FormData()

        if(form.reuploadPhoto.files[0] === undefined){
          alert('Please upload a photo')
        }
        if (form.reuploadPhoto.files[0] !== undefined) {
          formData.append('photo', form.reuploadPhoto.files[0])
          const res = await fetch(`/photoUploadList/${targetPointId}/${targetJobName}`, {
            method: 'PUT',
            body: formData
          })
          const result = await res.json()
        } else {
          return
        }
        document.querySelector('#reuploadPhoto').value = ''
      })
  } catch (err) {
    console.log(err)
  }
}

// for export report
const exportWord = async (e) => {
  try {
    const res = await fetch(`/printReport/word/${targetJobId}`)
    const result = await res.json()
    if(result === 'printed') {
      alert('Report has been printed')
    }
  } catch (err) {
    console.log(err)
  }
}
const exportPDF = async () => {
  try {
    const res = await fetch(`/printReport/pdf/${targetJobId}`)
    const result = await res.json()
    if(result === 'printed') {
      alert('Report has been printed')
    }
  } catch (err) {
    console.log(err)
  }
}


let path = window.location.pathname
if(path === '/job') {
  getJobData()
  getClientData()
  getEquipmentData()
  
  // add new data
  document
    .querySelector('#addJobFrom')
    ?.addEventListener('submit', async (event) => {
      event.preventDefault() // To prevent the form from submitting synchronously
      const form = event.target

      if(form.client.value === '' | form.location.value === '' | form.jobReceiveDate.value) {
        alert('client, location or job receive date can not be blank!')
      }
      let client = form.client.value
      let location = form.location.value
      let jobReceiveDate = form.jobReceiveDate.value
      let walkthroughDate = form.walkthroughDate.value === ''? null: form.walkthroughDate.value
      let startDate = form.startDate.value === ''? null: form.startDate.value
      let endDate = form.endDate.value === ''? null: form.endDate.value
      let totalPoint = form.totalPoint.value === ''? 0: form.totalPoint.value
  
      try{
        const res = await fetch('/jobList', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            client: client,
            location: location,
            jobReceiveDate: jobReceiveDate,
            walkthroughDate: walkthroughDate, 
            startDate: startDate,
            endDate: endDate,
            totalPoint: totalPoint
          })
        })
        const result = await res.json()

      } catch (err) {
        console.log('Can not add new job')
      }

      document.querySelector('#client').value = ''
      document.querySelector('#location').value = ''
      document.querySelector('#jobReceiveDate').value = ''
      document.querySelector('#walkthroughDate').value = ''
      document.querySelector('#startDate').value = ''
      document.querySelector('#endDate').value = ''
      document.querySelector('#totalPoint').value = ''
  
      getJobData()
      loadJobTable()
    })

  // add new point
  document
    .querySelector('#addPointFrom')
    ?.addEventListener('submit', async (event) => {
      event.preventDefault() // To prevent the form from submitting synchronously
      const form = event.target

      if(form.point.value === '' | form.description.value ==='' | form.samplingDate.value ==='' | form.co2Result.value ==='' | form.co2Equipment.value ==='' | form.pm10Result.value ==='' | form.pm10Equipment.value ==='' | form.rhResult.value ==='' | form.rhEquipment.value ==='') {
        alert('Please fill all the information')
        return
      }
      const formData = new FormData()
      formData.append('jobId', targetJobId)
      formData.append('point', form.point.value)
      formData.append('description', form.description.value)
      formData.append('samplingDate', form.samplingDate.value)
      formData.append('co2Result', form.co2Result.value)
      formData.append('co2Equipment', form.co2Equipment.value)
      formData.append('pm10Result', form.pm10Result.value)
      formData.append('pm10Equipment', form.pm10Equipment.value)
      formData.append('rhResult', form.rhResult.value)
      formData.append('rhEquipment', form.rhEquipment.value)
      if (form.photo.files[0] !== undefined) {
        formData.append('photo', form.photo.files[0])
      }
      try{
        const res = await fetch(`/resultTableList/${form.point.value}/${targetJobName}`, {
          method: 'POST',
          body: formData
        })
        const result = await res.json()

      } catch (err) {
        console.log('Can not add new point')
      }
 
      document.querySelector('#point').value = ''
      document.querySelector('#description').value = ''
      document.querySelector('#co2Result').value = ''
      document.querySelector('#co2Equipment').value = ''
      document.querySelector('#pm10Result').value = ''
      document.querySelector('#pm10Equipment').value = ''
      document.querySelector('#rhResult').value = ''
      document.querySelector('#rhEquipment').value = ''
      document.querySelector('#photo').value = ''
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

  document.querySelector('#exportWord').addEventListener('click', () => {
    exportWord()
  })

  document.querySelector('#exportPDF').addEventListener('click', () => {
    exportPDF()
  })

  document.querySelector('#reuploadSubmitBtn').addEventListener('click', () => {
    photoReuploadFtn()
  })
}

export { loadJobTable }