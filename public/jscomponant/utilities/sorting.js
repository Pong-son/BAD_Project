export let orderBy = 'id'
export let orderDirection = true
export let sortedData = []

export const sorting = (data) => {
  let oldOrderBy = orderBy
  let newOrderBy = document.querySelector('').value
  if(oldOrderBy === newOrderBy) {
    orderDirection = !orderDirection
  } else {
    // when true, ascending
    orderDirection = true
  }
  if (orderDirection) {
    sortedData = data.sort((a,b) => a[orderBy].localeCompare(b[orderBy]))

  } else {
    sortedData = data.sort((b,a) => a[orderBy].localeCompare(b[orderBy]))
  }
  return sortedData
}