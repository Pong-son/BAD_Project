import { loadClientTable } from '../client.js'
import { loadEquipmentTable } from '../equipment.js'
import { loadHistoryTable } from '../history.js'
import { loadAccountTable } from '../account.js'
import { loadParameterTable } from '../parameter.js'

let path = window.location.pathname

export const loadTable = () => {
  if( path === '/account') {
    loadAccountTable()
  }
  if( path === '/parameter') {
    loadParameterTable()
  }
  if( path === '/client') {
    loadClientTable()
  }
  if( path === '/equipment') {
    loadEquipmentTable()
  }
  if( path === '/history') {
    loadHistoryTable()
  }
}