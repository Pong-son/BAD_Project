export let orderBy = 'id'
export let orderDirection = true
export let sortedData = []
export let oldOrderBy
export let newOrderBy

export const sorting = (data,target) => {
  oldOrderBy = orderBy
  newOrderBy = target
  document.querySelector(`[data-arrow=${orderBy}]`).textContent = ''
  if(oldOrderBy === newOrderBy) {
    orderDirection = !orderDirection
  } else {
    // when true, ascending
    orderDirection = true
  }
  if (orderDirection) {
    // ascending
    sortedData = data.sort((a,b) => (a[orderBy].toString()).localeCompare(b[orderBy].toString()))
    document.querySelector(`[data-arrow=${target}]`).textContent = 'arrow_downward'
  } else {
    // descending
    sortedData = data.sort((b,a) => (a[orderBy].toString()).localeCompare(b[orderBy].toString()))
    document.querySelector(`[data-arrow=${target}]`).textContent = 'arrow_upward'
  }
  orderBy = target
  return sortedData
}