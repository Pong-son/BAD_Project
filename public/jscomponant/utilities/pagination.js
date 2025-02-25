import { loadTable } from './loadTable.js'
import { login } from './login.js'
export let currentPage = 1
export let totalPage = 1
export let itemPerPage = 10
export let previousPage = (currentPage > 1? currentPage -1:null)
export let nextPage = (currentPage < totalPage? currentPage +1:null)
export let start = ((currentPage -1)*itemPerPage)
export let end = start + itemPerPage
export let treatedData = []

export const pagination =  (data) => {
  itemPerPage = Number(document.querySelector('#itemPerPage')?.value)
  totalPage = (data?.length === 0?1:Math.ceil(data?.length/itemPerPage))
  if (data?.length) {
    start = ((currentPage -1)*itemPerPage)
    end = start + itemPerPage
    treatedData = data.slice(start,end)
    return treatedData
  } else {
    return
  }
}

export const paginationConroller = (data) => {
  totalPage = (data?.length === 0?1:Math.ceil(data?.length/itemPerPage))

  let pageController = document.querySelector('#pageController')
  pageController.textContent = ''

  for(let i = 1;i <= totalPage ;i++){
    let listItem = document.createElement('li')
    listItem.setAttribute('class','page-item')
    let pageBtn = document.createElement('a')
    pageBtn.setAttribute('class','page-link')
    pageBtn.setAttribute('data-page',i)
    pageBtn.textContent = i

    listItem.appendChild(pageBtn)
    pageController.appendChild(listItem)
  }

  document.querySelectorAll('[data-page]')?.forEach(page => {
    page.addEventListener('click',async e => {
      const page = e.target.getAttribute('data-page')
      currentPage = page
      loadTable(login)
    })
  })
}


export const check_page_status = () => {
  let searchInput = document.querySelector('#searchItem').value
  if(searchInput){
    currentPage = 1
  }
  let preBtn = document.querySelector('[aria-label="Previous"]')
  let nextBtn = document.querySelector('[aria-label="Next"]')
  document.querySelector(`[data-page="${currentPage}"]`)?.classList.add('disabled')
  currentPage <= 1?preBtn.classList.add('disabled'):preBtn.classList.remove('disabled')
  currentPage >= totalPage?nextBtn.classList.add('disabled'):nextBtn.classList.remove('disabled')
}

document.querySelector('#itemPerPage')?.addEventListener('input', () => {
  itemPerPage = Number(document.querySelector('#itemPerPage').value)
  document.querySelector('#itemPerPage').blur()
  currentPage = 1
  loadTable(login)
})

document.querySelector('[data-pre]')?.addEventListener('click',() => {
  currentPage = Number(currentPage) - 1
  loadTable(login)
  return currentPage
})

document.querySelector('[aria-label="Next"]')?.addEventListener('click',() => {
  currentPage = Number(currentPage) + 1
  loadTable(login)
  return currentPage
})