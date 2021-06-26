// header element function
const windowHeight = $(window).height();
const windowWidth = $(window).width();
const header = document.getElementById('header');
const accountBtn = document.getElementById('accountBtn');
const userSelectLangList = document.getElementById('userSelectLangList');

const searchForm = document.getElementById('searchForm');
const extendedFormLists = document.getElementsByClassName('extendedformlist');
const shrinkedFormLists = document.getElementsByClassName('shrinkedformlist');
const conditions = document.getElementById('conditions');
const formLists = document.getElementsByClassName('formlist')
const lines = document.getElementsByClassName('line');
const formListsArray = document.getElementsByClassName('formlists');

const hotelFormLists = document.getElementById('hotelFormLists');
const experienceFormLists = document.getElementById('experienceFormLists');
const locationForm = document.getElementById('locationForm');
const searchFormLines = document.getElementsByClassName('line');

const locationWindow = document.getElementById('LocationWindow');
const checkinWindow = document.getElementById('CheckinWindow');
const peopleWindow = document.getElementById('PeopleWindow');
const accountWindow = document.getElementById('AccountWindow');

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
toggleFormWindow('#accountBtn', accountWindow);


//set search form function ==============================================
//shrink search form
function shrinkSearchForm() {
  $('header').addClass('-bgwhite');
  Array.from(extendedFormLists).forEach((extendedFormList) => {
    extendedFormList.classList.add('-hide');
  });
  Array.from(searchFormLines).forEach((searchFormLine) => {
    searchFormLine.classList.add('-hide');
  });
  Array.from(shrinkedFormLists).forEach((shrinkedFormList) => {
    shrinkedFormList.classList.remove('-hide');
    shrinkedFormList.classList.add('-shrinked');
  });

  searchForm.classList.add('-shrinked');
  conditions.classList.add('-hide');
  hotelFormLists.classList.add('-shrinked');
  experienceFormLists.classList.add('-shrinked');
  header.classList.add('-shrinked');
}

//extend search form
function extendSearchForm() {
  $('header').removeClass('-bgwhite');
  Array.from(extendedFormLists).forEach((extendedFormList) => {
    extendedFormList.classList.remove('-hide');
  });
  Array.from(searchFormLines).forEach((searchFormLine) => {
    searchFormLine.classList.remove('-hide');
  });
  Array.from(shrinkedFormLists).forEach((shrinkedFormList) => {
    shrinkedFormList.classList.add('-hide');
    shrinkedFormList.classList.remove('-shrinked');
  });
  searchForm.classList.remove('-shrinked');
  hotelFormLists.classList.remove('-shrinked');
  experienceFormLists.classList.remove('-shrinked');
  header.classList.remove('-shrinked');
  if (windowWidth > 750) {
    conditions.classList.remove('-hide')
  }
}

//set clicked form style
function setClickedFormStyle() {

  Array.from(formLists).forEach((formList, i) => {
    formList.addEventListener('click', () => {
      Array.from(formLists).forEach((formList, j) => {
        formList.classList.remove('-focused');
        formListsArray[0].classList.remove('-focused');
        switch (i) {
          case 0:
            lines[0].classList.add('-hide');
            lines[1].classList.remove('-hide');
            lines[2].classList.remove('-hide');
            break;
          case 1:
            lines[0].classList.add('-hide');
            lines[1].classList.add('-hide');
            lines[2].classList.remove('-hide');
            break;
          case 2:
            lines[0].classList.remove('-hide');
            lines[1].classList.add('-hide');
            lines[2].classList.add('-hide');
            break;
          case 3:
            lines[1].classList.remove('-hide');
            lines[2].classList.add('-hide');
            break;
          case 4:
            break;
          default:
            break;
        }
      })
      formList.classList.add('-focused');
      Array.from(formListsArray).forEach((formLists)=>{
        formLists.classList.remove('-focused');
      })
    })
  })
}

//open / close popup window
function toggleFocusedStatus() {
  document.addEventListener('click', (e) => {
    if (!e.target.closest('#searchForm')) {
      Array.from(formLists).forEach((formList)=>{
        formList.classList.remove('-focused');
      })
      Array.from(formListsArray).forEach((formLists)=>{
        formLists.classList.remove('-focused');
      })
    }
  })
}
toggleFocusedStatus()

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
const week = ['日', '月', '火', '水', '木', '金', '土'];
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

calenderToggleBtn.addEventListener('click', () => {
  calenderToggleBtn.classList.toggle('-selected');
  dateToggleBtn.classList.toggle('-selected');
  calenderArea.classList.remove('-hide');
  flexiblePlanArea.classList.add('-hide');
})
dateToggleBtn.addEventListener('click', () => {
  dateToggleBtn.classList.toggle('-selected');
  calenderToggleBtn.classList.toggle('-selected');
  calenderArea.classList.add('-hide');
  flexiblePlanArea.classList.remove('-hide');
})

//draw lengthofstaylist
const lengthOfStays = document.getElementsByClassName('lengthofstay');
Array.from(lengthOfStays).forEach((lengthOfStay) => {
  lengthOfStay.addEventListener('click', () => {
    lengthOfStay.classList.toggle('-selected');
  })
})

//draw monthlist
const monthList = document.getElementById('monthList');
const month = new Date().getMonth() + 1;

for (let i = month + 1; i < month + 7; i++) {
  const li = document.createElement('li');
  if (i <= month + 2) {
    li.classList.add('-selected');
  }
  li.innerHTML = `<img src="/assets/calendar_selected.jpg" alt="カレンダー"><p>${i}月</p>`;
  li.addEventListener('click', () => {
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
  minusBtn.setAttribute('class', 'minusbtn counter');
  peopleNum.setAttribute('class', 'peoplenum');
  plusBtn.setAttribute('class', 'plusbtn counter');

  let peopleNumCount = 0;

  minusBtn.innerText = `-`;
  peopleNum.innerHTML = String(peopleNumCount);
  plusBtn.innerText = `+`;

  PeoplenumCounter.appendChild(minusBtn);
  PeoplenumCounter.appendChild(peopleNum);
  PeoplenumCounter.appendChild(plusBtn);

  function checkPeopleNumCount() {
    if (peopleNumCount === 0) {
      minusBtn.classList.add('-disabled');
    } else {
      minusBtn.classList.remove('-disabled');
    }
  }

  plusBtn.addEventListener('click', () => {
    peopleNumCount++;
    peopleNum.innerHTML = String(peopleNumCount);
    checkPeopleNumCount();
  })
  minusBtn.addEventListener('click', () => {
    if (peopleNumCount != 0) {
      peopleNumCount--;
      peopleNum.innerHTML = String(peopleNumCount);
      checkPeopleNumCount();
    }
  })

  //init
  peopleNumCount = 0;
  checkPeopleNumCount();
})

//draw language list ==============================================
const langSets = [
  {
    "lang": "日本語",
    "region": "日本"
  },
  {
    "lang": "Azərbaycan dili",
    "region": "Azərbaycan"
  },
  {
    "lang": "Bahasa Indonesia",
    "region": "Indonesia"
  },
  {
    "lang": "Bosanski",
    "region": "Bosna i Hercegovina"
  },
  {
    "lang": "Català",
    "region": "Espanya"
  },
  {
    "lang": "Čeština",
    "region": "Česká republika"
  },
  {
    "lang": "Crnogorski",
    "region": "Crna Gora"
  },
  {
    "lang": "Dansk",
    "region": "Danmark"
  },
  {
    "lang": "Deutsch",
    "region": "Deutschland"
  },
  {
    "lang": "Deutsch",
    "region": "Österreich"
  },
  {
    "lang": "Deutsch",
    "region": "Schweiz"
  },
  {
    "lang": "Eesti",
    "region": "Eesti"
  },
  {
    "lang": "English",
    "region": "Australia"
  },
  {
    "lang": "English",
    "region": "Canada"
  },
  {
    "lang": "English",
    "region": "Guyana"
  },
  {
    "lang": "English",
    "region": "India"
  },
  {
    "lang": "English",
    "region": "Ireland"
  },
  {
    "lang": "English",
    "region": "New Zealand"
  },
  {
    "lang": "English",
    "region": "Singapore"
  },
  {
    "lang": "English",
    "region": "United Arab Emirates"
  },
  {
    "lang": "English",
    "region": "Argentina"
  },
  {
    "lang": "Español",
    "region": "Belice"
  },
  {
    "lang": "Español",
    "region": "Bolivia"
  },
  {
    "lang": "Español",
    "region": "Chile"
  },
  {
    "lang": "Español",
    "region": "Colombia"
  },
  {
    "lang": "Español",
    "region": "Costa Rica"
  },
  {
    "lang": "Español",
    "region": "Ecuador"
  },
  {
    "lang": "Español",
    "region": "El Salvador"
  },
  {
    "lang": "Español",
    "region": "España"
  },
  {
    "lang": "Español",
    "region": "Estados Unidos"
  },
  {
    "lang": "Español",
    "region": "Guatemala"
  },
  {
    "lang": "Español",
    "region": "Honduras"
  },
  {
    "lang": "Español",
    "region": "Colombia"
  },
  {
    "lang": "Español",
    "region": "México"
  },
  {
    "lang": "Español",
    "region": "Nicaragua"
  },
  {
    "lang": "Español",
    "region": "Panamá"
  },
  {
    "lang": "Español",
    "region": "Paraguay"
  },
  {
    "lang": "Español",
    "region": "Perú"
  },
  {
    "lang": "Español",
    "region": "Venezuela"
  },
  {
    "lang": "Français",
    "region": "Belgique"
  },
  {
    "lang": "Français",
    "region": "Canada"
  },
  {
    "lang": "Français",
    "region": "France"
  },
  {
    "lang": "Français",
    "region": "Suisse"
  },
  {
    "lang": "Gaeilge",
    "region": "Éire"
  },
  {
    "lang": "Hrvatski",
    "region": "Hrvatska"
  },
  {
    "lang": "isiXhosa",
    "region": "eMzantsi Afrika"
  },
  {
    "lang": "isiZulu",
    "region": "iNingizimu Afrika"
  },
  {
    "lang": "Íslenska",
    "region": "Ísland"
  },
  {
    "lang": "Italiano",
    "region": "Italia"
  },
  {
    "lang": "Italiano",
    "region": "Svizzera"
  },
  {
    "lang": "Latviešu",
    "region": "Āfrika"
  },
  {
    "lang": "Latviešu",
    "region": "Latvija"
  },
  {
    "lang": "Lietuvių",
    "region": "Lietuva"
  },
  {
    "lang": "Magyar",
    "region": "Magyarország"
  },
  {
    "lang": "Malti",
    "region": "Malta"
  },
  {
    "lang": "Melayu",
    "region": "Malaysia"
  },
  {
    "lang": "Nederlands",
    "region": "België"
  },
  {
    "lang": "Nederlands",
    "region": "Nederland"
  },
  {
    "lang": "Melayu",
    "region": "Nederland"
  },
  {
    "lang": "Norsk",
    "region": "Norge"
  },
  {
    "lang": "Polski",
    "region": "Polska"
  },
  {
    "lang": "Brasil",
    "region": "Português"
  },
  {
    "lang": "Portugal",
    "region": "Română"
  },
  {
    "lang": "România",
    "region": "Shqip"
  },
  {
    "lang": "Shqipëri",
    "region": "Slovenčina"
  },
  {
    "lang": "Slovensko",
    "region": "Slovenščina"
  },
  {
    "lang": "Slovenija",
    "region": "Srpski"
  },
  {
    "lang": "Srbija",
    "region": "Suomi"
  },
  {
    "lang": "Svenska",
    "region": "Sverige"
  },
  {
    "lang": "Tagalog",
    "region": "Pilipinas"
  },
  {
    "lang": "Tiếng Việt",
    "region": "Việt Nam"
  },
  {
    "lang": "Türkçe",
    "region": "Türkiye"
  },
  {
    "lang": "Ελληνικά",
    "region": "Ελλάδα"
  },
  {
    "lang": "Български",
    "region": "България"
  },
  {
    "lang": "Македонски",
    "region": "Северна Македонија"
  },
  {
    "lang": "Русский",
    "region": "Россия"
  },
  {
    "lang": "Українська",
    "region": "Україна"
  },
  {
    "lang": "ქართული",
    "region": "საქართველო"
  },
  {
    "lang": "Հայերեն",
    "region": "Հայաստան"
  },
  {
    "lang": "עברית",
    "region": "ישראל"
  },
  {
    "lang": "العربية",
    "region": "العالم"
  },
  {
    "lang": "हिन्दी",
    "region": "भारत"
  },
  {
    "lang": "ไทย",
    "region": "ประเทศไทย"
  },
  {
    "lang": "한국어",
    "region": "대한민국"
  },
  {
    "lang": "繁體中文",
    "region": "香港"
  },
  {
    "lang": "美国",
    "region": "美國"
  },
  {
    "lang": "简体中文",
    "region": "中国"
  },
  {
    "lang": "繁體中文",
    "region": "香港"
  },
  {
    "lang": "繁體中文",
    "region": "台灣"
  }
]

for(let i=0; i<langSets.length; i++){
  const li = document.createElement('li');
  const langName = document.createElement('p');
  const regionName = document.createElement('p');

  langName.classList.add('langname');
  regionName.classList.add('langregion');
  langName.innerText = langSets[i]['lang'];
  regionName.innerText = langSets[i]['region'];
  li.appendChild(langName);
  li.appendChild(regionName);
  userSelectLangList.appendChild(li);
}