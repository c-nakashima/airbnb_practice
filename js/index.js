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

const locationWindow = document.getElementById('LocationWindow');
const checkinWindow = document.getElementById('CheckinWindow');
const peopleWindow = document.getElementById('PeopleWindow');

// header scroll event
$(window).scroll(function () {
  let scrollPosition = $(this).scrollTop();
  scrollPosition > $('header').offset().top - windowHeight && $('header').offset().top !== 0 ? shrinkSearchForm() : extendSearchForm()
});

//init
setClickedFormStyle();
toggleFormWindow('#locationForm', locationWindow);
toggleCheckinFormWindow();
toggleFormWindow('#peopleForm', peopleWindow);


//set search form function ==============================================
//shrink search form
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

//extend search form
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

//open / close popup window
function toggleFormWindow(parentNodeSelector, targetElem) {
  document.addEventListener('click', (e) => {
    if (e.target.closest(parentNodeSelector)) {
      targetElem.setAttribute('data-open', 'true');
    } else {
      targetElem.setAttribute('data-open', 'false');
    }
  })
}

function toggleCheckinFormWindow() {
  document.addEventListener('click', (e) => {
    if (e.target.closest('#checkinForm') || e.target.closest('#checkoutForm')) {
      checkinWindow.setAttribute('data-open', 'true');
    } else {
      checkinWindow.setAttribute('data-open', 'false');
    }
  })
}

//set checkin calendar function ==============================================
const week = ["日", "月", "火", "水", "木", "金", "土"];
const today = new Date();
const nextMonthToday = new Date();
nextMonthToday.setMonth(nextMonthToday.getMonth() + 1);

let showDate = new Date(today.getFullYear(), today.getMonth(), 1);
let showNextMonthDate = new Date(nextMonthToday.getFullYear(), nextMonthToday.getMonth(), 1);

const currentMonthPrevBtn = document.getElementById('currentMonthPrevBtn');
const currentMonthNextBtn = document.getElementById('currentMonthNextBtn');
const nextMonthPrevBtn = document.getElementById('nextMonthPrevBtn');
const nextMonthNextBtn = document.getElementById('nextMonthNextBtn');

// calendar init
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
        calendar += '<td class="-disabled"><div class="date">' + (lastMonthEndDate - startDayOfWeek + j + 1) + '</div></td>';
      } else if (count >= endDate) {
        //hide next month date
        count++;
        calendar += '<td class="-disabled"><div class="date">' + (count - endDate) + '</div></td>';
      } else {
        count++;
        //greyout previous days
        if (year < today.getFullYear()
          || month < (today.getMonth())
          || year <= today.getFullYear()
          && month <= (today.getMonth())
          && count < today.getDate()) {
          calendar += `<td class="-previous"><div class="date">${count}</div></td>`;
        } else //get today
          if (year == today.getFullYear()
            && month == (today.getMonth())
            && count == today.getDate()) {
            calendar += `<td class="-today"><div class="date">${count}</div></td>`;
          } else {
            calendar += `<td><div class="date">${count}</div></td>`;
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
//set calender toggle function
const calenderArea = document.getElementById('calenderArea');
const flexiblePlanArea = document.getElementById('flexiblePlanArea');

calenderToggleBtn.addEventListener('click',()=>{
  calenderToggleBtn.classList.toggle('-selected');
  dateToggleBtn.classList.toggle('-selected');
  calenderArea.classList.remove('-hide');
  flexiblePlanArea.classList.add('-hide');
})
dateToggleBtn.addEventListener('click',()=>{
  dateToggleBtn.classList.toggle('-selected');
  calenderToggleBtn.classList.toggle('-selected');
  calenderArea.classList.add('-hide');
  flexiblePlanArea.classList.remove('-hide');
})

//draw lengthofstaylist
const lengthOfStays = document.getElementsByClassName('lengthofstay');
Array.from(lengthOfStays).forEach((lengthOfStay)=>{
  lengthOfStay.addEventListener('click',()=>{
    lengthOfStay.classList.toggle('-selected');
  })
})

//draw monthlist
const monthList = document.getElementById('monthList');
const month = new Date().getMonth() + 1;

for(let i=month+1; i<month+7; i++){
  const li = document.createElement('li');
  if(i<=month+2){
    li.classList.add('-selected');    
  }
  li.innerHTML = `<img src="/assets/calendar_selected.jpg" alt="カレンダー"><p>${i}月</p>`;
  li.addEventListener('click',()=>{
    li.classList.toggle('-selected');
  })
  monthList.appendChild(li);
}

//set people number counter function ==============================================
//draw peoplelist
const peopleList = document.getElementById('peopleList');
const PeoplenumCounters = document.getElementsByClassName('peoplenumcounter');

Array.from(PeoplenumCounters).forEach(PeoplenumCounter => {
  const minusBtn = document.createElement('button');
  const peopleNum = document.createElement('span');
  const plusBtn = document.createElement('button');
  minusBtn.setAttribute('class','minusbtn counter');
  peopleNum.setAttribute('class','peoplenum');
  plusBtn.setAttribute('class','plusbtn counter');

  let peopleNumCount = 0;

  minusBtn.innerText = `-`;
  peopleNum.innerHTML = String(peopleNumCount);
  plusBtn.innerText = `+`;
  
  PeoplenumCounter.appendChild(minusBtn);
  PeoplenumCounter.appendChild(peopleNum);
  PeoplenumCounter.appendChild(plusBtn);

  function checkPeopleNumCount(){
    if(peopleNumCount === 0){
      minusBtn.classList.add('-disabled');
    }else{
      minusBtn.classList.remove('-disabled');
    }
  }

  plusBtn.addEventListener('click',()=>{
    peopleNumCount++;
    peopleNum.innerHTML = String(peopleNumCount);
    checkPeopleNumCount();
  })
  minusBtn.addEventListener('click',()=>{
    if(peopleNumCount != 0){
      peopleNumCount--;
      peopleNum.innerHTML = String(peopleNumCount);
      checkPeopleNumCount();
    }
  })

  //init
  peopleNumCount = 0;
  checkPeopleNumCount();
})
