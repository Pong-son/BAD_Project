import { loginBtn } from './login.js'

const navBar = (login) => {
  let navTab = document.createElement('nav')
  navTab.classList.add('navbar')
  navTab.classList.add('navbar-expand-lg')
  navTab.classList.add('text-bg-primary')

  let divTab = document.createElement('div')
  divTab.classList.add('container-fluid')

  let aTab = document.createElement('a')
  aTab.classList.add('navbar-brand')
  aTab.classList.add('text-light')
  aTab.setAttribute('href','/')
  aTab.textContent = 'E & M'

  let navBarToggleBtn = document.createElement('button')
  navBarToggleBtn.classList.add('navbar-toggler')
  navBarToggleBtn.classList.add('bg-primary')
  navBarToggleBtn.setAttribute('data-bs-toggle','collapse')
  navBarToggleBtn.setAttribute('data-bs-target','#navbarSupportedContent')
  navBarToggleBtn.setAttribute('aria-controls','navbarSupportedContent')
  navBarToggleBtn.setAttribute('aria-expanded','false')
  navBarToggleBtn.setAttribute('aria-label','Toggle navigation')

  let navBarToggleSpan = document.createElement('span')
  navBarToggleBtn.classList.add('navbar-toggler-icon')
  navBarToggleBtn.appendChild(navBarToggleSpan)

  let navDivTab = document.createElement('div')
  navDivTab.classList.add('collapse')
  navDivTab.classList.add('navbar-collapse')
  navDivTab.setAttribute('id','navbarSupportedContent')

  let ulTab = document.createElement('ul')
  ulTab.classList.add('navbar-nav')
  ulTab.classList.add('me-auto')
  ulTab.classList.add('mb-2')
  ulTab.classList.add('mb-lg-0')

  let btnDivTab = document.createElement('div')
  btnDivTab.classList.add('d-flex')

  let btnATab = document.createElement('a')
  btnATab.setAttribute('href', '/')

  let btnTab = document.createElement('button')
  btnTab.setAttribute('type', 'button')
  btnTab.setAttribute('id', 'loginBtn')
  btnTab.setAttribute('data-bs-toggle', 'modal')
  btnTab.setAttribute('data-bs-target', '#loginModal')
  btnTab.classList.add('btn')
  btnTab.classList.add('btn-success')
  btnTab.classList.add('text-light')

  let firstLiTab = document.createElement('li')
  firstLiTab.classList.add('nav-item')

  let firstATab = document.createElement('a')
  firstATab.classList.add('nav-link')
  firstATab.classList.add('active')
  firstATab.classList.add('text-light')
  firstATab.setAttribute('aria-current','page')
  firstATab.setAttribute('href', '/')
  firstATab.textContent = 'Home'

  let secondLiTab = document.createElement('li')
  secondLiTab.classList.add('nav-item')
  secondLiTab.classList.add('dropdown')
  secondLiTab.setAttribute('data-user','')

  let secondATab = document.createElement('a')
  secondATab.classList.add('nav-link')
  secondATab.classList.add('dropdown-toggle')
  secondATab.classList.add('text-light')
  secondATab.setAttribute('role', 'button')
  secondATab.setAttribute('data-bs-toggle', 'dropdown')
  secondATab.setAttribute('aria-expanded', 'false')
  secondATab.textContent = 'Job'

  let secondUlTab = document.createElement('ul')
  secondUlTab.classList.add('dropdown-menu')
  secondUlTab.classList.add('text-bg-primary')

  let jobLiTab = document.createElement('li')

  let jobATab = document.createElement('a')
  jobATab.classList.add('dropdown-item')
  jobATab.classList.add('text-light')
  jobATab.setAttribute('href', '/job')
  jobATab.textContent = 'Job Details'

  let scheduleLiTab = document.createElement('li')

  let scheduleATab = document.createElement('a')
  scheduleATab.classList.add('dropdown-item')
  scheduleATab.classList.add('text-light')
  scheduleATab.setAttribute('href', '/schedule')
  scheduleATab.textContent = 'Schedule'

  let thirdLiTab = document.createElement('li')
  thirdLiTab.classList.add('nav-item')
  thirdLiTab.classList.add('dropdown')
  thirdLiTab.setAttribute('data-user','')

  let thirdATab = document.createElement('a')
  thirdATab.classList.add('nav-link')
  thirdATab.classList.add('dropdown-toggle')
  thirdATab.classList.add('text-light')
  thirdATab.setAttribute('href', '/#')
  thirdATab.setAttribute('role', 'button')
  thirdATab.setAttribute('data-bs-toggle', 'dropdown')
  thirdATab.setAttribute('aria-expanded', 'false')
  thirdATab.textContent = 'Equipments'

  let thirdUlTab = document.createElement('ul')
  thirdUlTab.classList.add('dropdown-menu')
  thirdUlTab.classList.add('text-bg-primary')

  let equipmentLiTab = document.createElement('li')

  let equipmentATab = document.createElement('a')
  equipmentATab.classList.add('dropdown-item')
  equipmentATab.classList.add('text-light')
  equipmentATab.setAttribute('href', '/equipment')
  equipmentATab.textContent = 'Equipment List'

  let parameterLiTab = document.createElement('li')

  let parameterATab = document.createElement('a')
  parameterATab.classList.add('dropdown-item')
  parameterATab.classList.add('text-light')
  parameterATab.setAttribute('href', '/parameter')
  parameterATab.textContent = 'Parameter'

  let historyLiTab = document.createElement('li')

  let historyATab = document.createElement('a')
  historyATab.classList.add('dropdown-item')
  historyATab.classList.add('text-light')
  historyATab.setAttribute('href', '/history')
  historyATab.textContent = 'History'

  let forthLiTab = document.createElement('li')
  forthLiTab.classList.add('nav-item')

  let forthATab = document.createElement('a')
  forthATab.classList.add('nav-link')
  forthATab.classList.add('text-light')
  forthATab.setAttribute('href', '/client')
  forthATab.textContent = 'Client'

  let fifthLiTab = document.createElement('li')
  fifthLiTab.classList.add('nav-item')
  fifthLiTab.classList.add('admin_hide')

  let fifthATab = document.createElement('a')
  fifthATab.classList.add('nav-link')
  fifthATab.classList.add('text-light')
  fifthATab.setAttribute('href', '/account')
  fifthATab.textContent = 'Account'

  if(login) {
    firstLiTab.appendChild(firstATab)
    jobLiTab.appendChild(jobATab)
    secondUlTab.appendChild(jobLiTab)
    scheduleLiTab.appendChild(scheduleATab)
    secondUlTab.appendChild(scheduleLiTab)
    secondLiTab.appendChild(secondATab)
    secondLiTab.appendChild(secondUlTab)
    equipmentLiTab.appendChild(equipmentATab)
    thirdUlTab.appendChild(equipmentLiTab)
    parameterLiTab.appendChild(parameterATab)
    thirdUlTab.appendChild(parameterLiTab)
    historyLiTab.appendChild(historyATab)
    thirdUlTab.appendChild(historyLiTab)
    thirdLiTab.appendChild(thirdATab)
    thirdLiTab.appendChild(thirdUlTab)
    forthLiTab.appendChild(forthATab)
    fifthLiTab.appendChild(fifthATab)
    ulTab.appendChild(firstLiTab)
    ulTab.appendChild(secondLiTab)
    ulTab.appendChild(thirdLiTab)
    ulTab.appendChild(forthLiTab)
    ulTab.appendChild(fifthLiTab)
    btnATab.appendChild(btnTab)
    btnDivTab.appendChild(btnATab)
    navDivTab.appendChild(ulTab)
    navDivTab.appendChild(btnDivTab)
    divTab.appendChild(aTab)
    divTab.appendChild(navBarToggleBtn)
    divTab.appendChild(navDivTab)
    navTab.appendChild(divTab)
    document.querySelector('#navBar').textContent = ''
    document.querySelector('#navBar').appendChild(navTab)
  } else {
    firstLiTab.appendChild(firstATab)
    ulTab.appendChild(firstLiTab)
    btnDivTab.appendChild(btnTab)
    navDivTab.appendChild(ulTab)
    navDivTab.appendChild(btnDivTab)
    divTab.appendChild(aTab)
    divTab.appendChild(navBarToggleBtn)
    divTab.appendChild(navDivTab)
    navTab.appendChild(divTab)
    document.querySelector('#navBar').textContent = ''
    document.querySelector('#navBar').appendChild(navTab)
  }

  loginBtn(login)
}

export { navBar }