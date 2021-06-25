// header element function
const windowHeight = $(window).height();
const windowWidth = $(window).width();
const header = document.getElementById('header');
const searchForm = document.getElementById('searchForm');
const extendedFormLists = document.getElementsByClassName('extendedformlist');
const shrinkedFormLists = document.getElementsByClassName('shrinkedformlist');
const conditions = document.getElementById('conditions');
const formLists = document.getElementsByClassName('formlist')
const hotelFormLists = document.getElementById('hotelFormLists');
const experienceFormLists = document.getElementById('experienceFormLists');
const locationForm = document.getElementById('locationForm');
const searchFormLines = document.getElementsByClassName('line');

function shrinkSearchForm() {
  $('header').addClass('-bgwhite');
  Array.from(extendedFormLists).forEach((extendedFormList) => {
    extendedFormList.classList.add("-hide");
  });
  Array.from(searchFormLines).forEach((searchFormLine) => {
    searchFormLine.classList.add("-hide");
  });
  Array.from(shrinkedFormLists).forEach((shrinkedFormList) => {
    shrinkedFormList.classList.remove("-hide");
    shrinkedFormList.classList.add("-shrinked");
  });

  searchForm.classList.add("-shrinked");
  conditions.classList.add("-hide");
  hotelFormLists.classList.add('-shrinked');
  experienceFormLists.classList.add('-shrinked');
  header.classList.add('-shrinked');
}

function extendSearchForm() {
  $('header').removeClass('-bgwhite');
  Array.from(extendedFormLists).forEach((extendedFormList) => {
    extendedFormList.classList.remove("-hide");
  });
  Array.from(searchFormLines).forEach((searchFormLine) => {
    searchFormLine.classList.remove("-hide");
  });
  Array.from(shrinkedFormLists).forEach((shrinkedFormList) => {
    shrinkedFormList.classList.add("-hide");
    shrinkedFormList.classList.remove("-shrinked");
  });
  searchForm.classList.remove("-shrinked");
  hotelFormLists.classList.remove('-shrinked');
  experienceFormLists.classList.remove('-shrinked');
  header.classList.remove('-shrinked');
  if (windowWidth > 750) {
    conditions.classList.remove("-hide")
  }
}

// header scroll event
$(window).scroll(function () {
  let scrollPosition = $(this).scrollTop();
  scrollPosition > $('header').offset().top - windowHeight && $('header').offset().top !== 0 ? shrinkSearchForm() : extendSearchForm()
});


//set clicked form style
function setClickedFormStyle() {
  Array.from(formLists).forEach(formList => {
    formList.addEventListener('click', (e) => {
      Array.from(formLists).forEach(formList => {
        formList.classList.remove("-focused");
      })
      formList.classList.add("-focused");
    })
  })
}

//open / close popp window
function toggleFormWindow(parentNodeSelector, targetElem) {
  document.addEventListener('click', (e) => {
    if (e.target.closest(parentNodeSelector)) {
      targetElem.setAttribute('data-open', 'true');
    } else {
      targetElem.setAttribute('data-open', 'false');
    }
  })
}

const locationWindow = document.getElementById('LocationWindow');
const checkinWindow = document.getElementById('CheckinWindow');

setClickedFormStyle();
toggleFormWindow('#locationForm', locationWindow);
toggleFormWindow('#checkinForm', checkinWindow);


//set checkin calendar function ==============================================
const week = ["日", "月", "火", "水", "木", "金", "土"];
const today = new Date();
const nextMonthToday = new Date();
nextMonthToday.setMonth(nextMonthToday.getMonth() + 1);
console.log('nextMonthToday', nextMonthToday);

let showDate = new Date(today.getFullYear(), today.getMonth(), 1);
let showNextMonthDate = new Date(nextMonthToday.getFullYear(), nextMonthToday.getMonth(), 1);

const currentMonthPrevBtn = document.getElementById('currentMonthPrevBtn');
const currentMonthNextBtn = document.getElementById('currentMonthNextBtn');
const nextMonthPrevBtn = document.getElementById('nextMonthPrevBtn');
const nextMonthNextBtn = document.getElementById('nextMonthNextBtn');

// init
window.onload = function () {
  showCalendar(today, 'calendar', 'calendarHeader', calendar);
  showCalendar(nextMonthToday, 'nextMonthCalendar', 'nextCalendarHeader', calendar);
  showPrevMonth(currentMonthPrevBtn, 'calendar', 'calendarHeader');
  showNextMonth(currentMonthNextBtn, 'calendar', 'calendarHeader');
  showPrevMonth(nextMonthPrevBtn, 'nextMonthCalendar', 'nextCalendarHeader');
  showNextMonth(nextMonthNextBtn, 'nextMonthCalendar', 'nextCalendarHeader');
};

// show prev month button
function showPrevMonth(targetBtnElem, targetCalendarId, targetHeaderId) {
  targetBtnElem.addEventListener('click', () => {
    showDate.setMonth(showDate.getMonth() - 1);
    showCalendar(showDate, targetCalendarId, targetHeaderId);
    if (targetBtnElem === currentMonthPrevBtn) {
      showNextMonthDate.setMonth(showNextMonthDate.getMonth() - 1);
      showCalendar(showNextMonthDate, 'nextMonthCalendar', 'nextCalendarHeader');
    }
  })
}

// show next month button
function showNextMonth(targetBtnElem, targetCalendarId, targetHeaderId) {
  targetBtnElem.addEventListener('click', () => {
    showNextMonthDate.setMonth(showNextMonthDate.getMonth() + 1);
    showCalendar(showNextMonthDate, targetCalendarId, targetHeaderId);
    if (targetBtnElem === nextMonthNextBtn) {
      showDate.setMonth(showDate.getMonth() + 1);
      showCalendar(showDate, 'calendar', 'calendarHeader');
    }
  })
}

// show calendar
function showCalendar(date, targetCalendarId, targetHeaderId) {
  let year = date.getFullYear();
  let month = date.getMonth();
  document.getElementById(targetHeaderId).innerHTML = year + "年 " + (month + 1) + "月";

  let calendar = createCalendar(year, month);
  document.getElementById(targetCalendarId).innerHTML = calendar;
}

// create calendar
function createCalendar(year, month) {
  // 曜日
  let calendar = "<table><tr class='dayOfWeek'>";
  for (var i = 0; i < week.length; i++) {
    calendar += `<th>${week[i]}</th>`;
  }
  calendar += "</tr>";

  let count = 0;
  let startDayOfWeek = new Date(year, month, 1).getDay();
  let endDate = new Date(year, month + 1, 0).getDate();
  let lastMonthEndDate = new Date(year, month, 0).getDate();
  let rowLength = Math.ceil((startDayOfWeek + endDate) / week.length);

  //draw calendar body
  for (let i = 0; i < rowLength; i++) {
    calendar += "<tr>";
    for (let j = 0; j < week.length; j++) {
      if (i == 0 && j < startDayOfWeek) {
        //hide previout month date
        calendar += "<td class='-disabled'>" + (lastMonthEndDate - startDayOfWeek + j + 1) + "</td>";
      } else if (count >= endDate) {
        //hide next month date
        count++;
        calendar += "<td class='-disabled'>" + (count - endDate) + "</td>";
      } else {
        count++;
        //greyout previous days
        if (year < today.getFullYear()
          || month < (today.getMonth())
          || year <= today.getFullYear()
          && month <= (today.getMonth())
          && count < today.getDate()) {
          calendar += "<td class='-previous'>" + count + "</td>";
        } else //get today
          if (year == today.getFullYear()
            && month == (today.getMonth())
            && count == today.getDate()) {
            calendar += "<td class='-today'>" + count + "</td>";
          } else {
            calendar += "<td>" + count + "</td>";
          }
      }
    }
    calendar += "</tr>";
  }
  return calendar;
}

//set calendar toggle button
const calenderToggleBtn = document.getElementById('calenderToggleBtn');
const dateToggleBtn = document.getElementById('dateToggleBtn');

calenderToggleBtn.addEventListener('click',()=>{
  calenderToggleBtn.classList.toggle('-selected');
  dateToggleBtn.classList.toggle('-selected');
})
dateToggleBtn.addEventListener('click',()=>{
  dateToggleBtn.classList.toggle('-selected');
  calenderToggleBtn.classList.toggle('-selected');
})