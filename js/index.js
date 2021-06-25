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
        formList.style.backgroundColor = "transparent";
        formList.style.boxShadow = "none"
      })
      formList.style.backgroundColor = "#FFF";
      formList.style.boxShadow = "rgb(0 0 0 / 14%) 0px 1px 12px 1px";
    })
  })
}

console.log('formLists',formLists)

const locationWindow = document.getElementById('LocationWindow');


document.addEventListener('click',(e)=>{
  if (e.target.closest('#locationForm')) {
    locationWindow.setAttribute('data-open', 'true');
  }else{
    locationWindow.setAttribute('data-open', 'false');
  }
})

setClickedFormStyle();s


