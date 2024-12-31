import { Calendar } from 'fullcalendar-scheduler'

document.addEventListener('DOMContentLoaded', function() {
  const calendarEl = document.getElementById('calendar')
  const calendar = new Calendar(calendarEl, {
    initialView: 'resourceTimelineMonth'
  })
  calendar.render()
})