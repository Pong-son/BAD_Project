let addEvents = [
  { // this object will be "parsed" into an Event Object
    title: 'The Title', // a property!
    start: '2025-01-05', // a property!
    end: '2025-01-17' // a property! ** see important note below about 'end' **
  },{
    title: 'testing', // a property!
    start: '2025-01-03', // a property!
    end: '2025-01-03'
  }
]

const addEvent = () => {
  console.log('update your database')
}

document.addEventListener('DOMContentLoaded', function() {
  const calendarEl = document.getElementById('calendar');
  const calendar = new FullCalendar.Calendar(calendarEl, {
    initialView: 'dayGridMonth',
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'addEventBtn'
    },
    customButtons: {
      addEventBtn: {
        text: 'add event...',
        click: function() {
          var dateStr = prompt('Enter a date in YYYY-MM-DD format');
          var date = new Date(dateStr + 'T00:00:00'); // will be in local time
          if (!isNaN(date.valueOf())) { // valid?
            calendar.addEvent({
              title: 'dynamic event',
              start: date,
              allDay: true
            });
            addEvent()
            alert('Great. Now, update your database...');
          } else {
            alert('Invalid date.');
          }
        }
      }
    },
    dateClick: function(info) {
      alert('Clicked on: ' + info.dateStr);
      alert('Coordinates: ' + info.jsEvent.pageX + ',' + info.jsEvent.pageY);
      alert('Current view: ' + info.view.type);
      // change the day's background color just for fun
      info.dayEl.style.backgroundColor = 'red';
    },
    events: addEvents,
    eventColor: '#378006',
    eventBackgroundColor: 'darkblue',
    eventBorderColor:'black',
    eventTextColor: 'white'
  });
  calendar.render();
});