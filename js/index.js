// header element function
const windowHeight = $(window).height();
const windowWidth = $(window).width();
const header = document.getElementById('header');
const searchForm = document.getElementById('searchForm');
const extendedFormLists = document.getElementsByClassName('extendedformlist');
const shrinkedFormLists = document.getElementsByClassName('shrinkedformlist');
const conditions = document.getElementById('conditions');
const formLists = document.getElementById('formLists');
const experienceFormLists = document.getElementById('experienceFormLists');
const searchFormLines = document.getElementsByClassName('line');

function shrinkSearchForm() {
  $('header').addClass('-bgwhite');
  console.log(extendedFormLists);
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
  formLists.classList.add('-shrinked');
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
  formLists.classList.remove('-shrinked');
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

// function drawFormLists(formListsNum, labelNames, placeholderNames) {
//   for (let i = 0; i < formListsNum; i++) {
//     const li = document.createElement('li');
//     const form = document.createElement('form');
//     const label = document.createElement('label');
//     const input = document.createElement('input');
//     li.setAttribute('id', 'formList');
//     li.setAttribute('class', 'formlist  extendedformlist');
//     form.setAttribute('class', 'form')
//     label.setAttribute('class', 'label');
//     input.setAttribute('class', 'input');
//     input.setAttribute('placeholder', placeholderNames[i]);
//     label.innerText = labelNames[i];
//     li.appendChild(form);
//     form.appendChild(label);
//     form.appendChild(input);
//     if (i === formListNum - 1) {
//       li.addClass('-last');
//       li.insertAdjacentElement(
//         'beforeend',
//         '<button class="submitbtn" type="submit"><i class= "fas fa-search" ></i></button >')
//     }
//     formLists.appendChild(li);
//   }
//   console.log('formLists',formLists)
//   formLists.insertAdjacentElement(
//     'beforeend',
//     '<li id="shrinkedFormList" class="formlist -hide shrinkedformlist"><p>検索をはじめる</p><div class="shrinkedsubmitbtn" type="submit"><i class="fas fa-search"></i></div></li>'
//     )
// }

// const hotelFormNum = 4;
// const hotelFormLabelNames = ['ロケーション','チェックイン','チェックアウト','人数']
// const hotelFormPlaceholderNames = ['行き先はどちらですか','日付を入力','日付を入力','ゲスト数を入力']
// drawFormLists();