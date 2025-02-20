import { loadClientTable } from '../client.js'
import { loadJobTable } from '../job.js'
import { loadEquipmentTable } from '../equipment.js'
import { loadHistoryTable } from '../history.js'
import { loadAccountTable } from '../account.js'
import { loadParameterTable } from '../parameter.js'
import { loadNoticeBoardTable } from '../noticeBoard.js'

let path = window.location.pathname

export const loadTable = (login) => {
  if(login){
    if( path === '/account') {
      loadAccountTable()
    }
    if( path === '/parameter') {
      loadParameterTable()
    }
    if( path === '/client') {
      loadClientTable()
    }
    if( path === '/job') {
      loadJobTable()
    }
    if( path === '/equipment') {
      loadEquipmentTable()
    }
    if( path === '/history') {
      loadHistoryTable()
    }
    if( path === '/') {
      loadNoticeBoardTable()
    }
  }
}