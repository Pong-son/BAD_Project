import { loginBtn } from './login.js'

const navBar = (login) => {
  let content = (login)?
    `<nav class="navbar navbar-expand-lg text-bg-primary">
      <div class="container-fluid">
        <a class="navbar-brand text-light" href="/">E & M</a>
        <button id="navBarToggle" class="navbar-toggler bg-primary" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <a class="nav-link active text-light" aria-current="page" href="/">Home</a>
            </li>
            <li class="nav-item dropdown" data-user>
              <a class="nav-link dropdown-toggle text-light" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Job
              </a>
              <ul class="dropdown-menu text-bg-primary">
                <li><a class="dropdown-item text-light" href="/job_detail">Job Details</a></li>
                <li><a class="dropdown-item text-light" href="/schedule">Schedule</a></li>
              </ul>
            </li>
            <li class="nav-item dropdown" data-user>
              <a class="nav-link dropdown-toggle text-light" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Equipments
              </a>
              <ul class="dropdown-menu text-bg-primary">
                <li><a class="dropdown-item text-light" href="/equipment">Equipment List</a></li>
                <li><a class="dropdown-item text-light" href="/parameter">Parameter</a></li>
                <li><a class="dropdown-item text-light" href="/history">History</a></li>
              </ul>
            </li>
            <li class="nav-item">
              <a class="nav-link text-light" href="/client">Client</a>
            </li>
            <li class="nav-item admin_hide">
              <a class="nav-link text-light" href="/account">Account</a>
            </li>
          </ul>
          <div class="d-flex">
            <span type="button" class="btn material-symbols-outlined fs-2 text-light" id="lightDarkBtn" data-bs-toggle="tooltip" data-bs-placement="left" data-bs-title="Change the Theme">
              toggle_off
            </span>
            <a href="/"><button type="button" id="loginBtn" class="btn btn-success text-light" data-bs-toggle="modal" data-bs-target="#loginModal"></button></a>
          </div>
        </div>
      </div>
    </nav>` : `
    <nav class="navbar navbar-expand-lg text-bg-primary">
      <div class="container-fluid">
        <a class="navbar-brand text-light" href="/">E & M</a>
        <button id="navBarToggle" class="navbar-toggler bg-primary" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <a class="nav-link active text-light" aria-current="page" href="/">Home</a>
            </li>
          </ul>
          <div class="d-flex">
            <span type="button" class="btn material-symbols-outlined fs-2 text-light" id="lightDarkBtn" data-bs-toggle="tooltip" data-bs-placement="left" data-bs-title="Change the Theme">
              toggle_off
            </span>
            <button type="button" id="loginBtn" class="btn btn-success text-light" data-bs-toggle="modal" data-bs-target="#loginModal"></button>
          </div>
        </div>
      </div>
    </nav>`
  document.querySelector('#navBar').innerHTML = content

  loginBtn()
}

export { navBar }