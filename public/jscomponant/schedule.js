let jobData
let addEvents = []

const getSchedule = async () => {
    try {
      let data = await fetch('/jobList')
      jobData = await data.json()
      sessionStorage.setItem('jobData',JSON.stringify(jobData))
      console.log('get')
    } catch (err) {
      console.log(err)
    }
}

const loadSchedule = () => {
  if (window.location.pathname === '/schedule') {
    let data = JSON.parse(sessionStorage.getItem('jobData'))
    addEvents = []
    data.forEach(job => {
      let startDate = new Date(job.sampling_start_date).getDate()
      startDate < 10? startDate = '0'+startDate:startDate
      let startMonth = new Date(job.sampling_start_date).getMonth()+1
      startMonth < 10? startMonth = '0'+startMonth:startMonth
      let startYear = new Date(job.sampling_start_date).getFullYear()
      let startDateData = `${startYear}-${startMonth}-${startDate}`

      let endDate = new Date(job.sampling_end_date).getDate()+1
      endDate < 10? endDate = '0'+endDate:endDate
      let endMonth = new Date(job.sampling_end_date).getMonth()+1
      endMonth < 10? endMonth = '0'+endMonth:endMonth
      let endYear = new Date(job.sampling_end_date).getFullYear()
      let endDateData = `${endYear}-${endMonth}-${endDate}`

      let event = {}
      event.title = job.location
      event.start = startDateData
      event.end = endDateData
      event.allDay = true
      addEvents.push(event)
      console.log(addEvents)
    });
  }
}

const addEvent = () => {
  console.log('update your database')
}

const loadCalendar = () => {
  console.log('loadCalendar')
  console.log(addEvents)
  document.addEventListener('DOMContentLoaded', function() {
    const calendarEl = document.getElementById('calendar');
    const calendar = new FullCalendar.Calendar(calendarEl, {
      initialView: 'dayGridMonth',
      headerToolbar: {
        left: 'title',
        right: 'today prev,next'
      },
      events: addEvents,
      eventColor: '#378006',
      eventBackgroundColor: 'darkblue',
      eventBorderColor:'black',
      eventTextColor: 'white'
    });
    calendar.render();
  });
}
let path = window.location.pathname
if(path === '/schedule') {
  getSchedule()
  loadSchedule()
  loadCalendar()
  
}