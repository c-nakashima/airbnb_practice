// header element function
const windowHeight = $(window).height();
const windowWidth = $(window).width();
const header = document.getElementById('header');
const searchForm = document.getElementById('searchForm');
const extendedFormLists = document.getElementsByClassName('extendedformlist');
const shrinkedFormList = document.getElementById('shrinkedFormList');
const conditions = document.getElementById('conditions');
const formLists = document.getElementById('formLists');
const searchFormLines = document.getElementsByClassName('line');

function shrinkSearchForm(){
  $('header').addClass('-bgwhite');
  console.log(extendedFormLists);
  Array.from(extendedFormLists).forEach((extendedFormList) => {
    extendedFormList.classList.add("-hide");
  })
  Array.from(searchFormLines).forEach((searchFormLine) => {
    searchFormLine.classList.add("-hide");
  })
  shrinkedFormList.classList.remove("-hide");
  shrinkedFormList.classList.add("-shrinked");
  searchForm.classList.add("-shrinked");
  conditions.classList.add("-hide");
  formLists.classList.add('-shrinked');
  header.classList.add('-shrinked');
}

function extendSearchForm(){
  $('header').removeClass('-bgwhite');
  Array.from(extendedFormLists).forEach((extendedFormList) => {
    extendedFormList.classList.remove("-hide");
  })
  Array.from(searchFormLines).forEach((searchFormLine) => {
    searchFormLine.classList.remove("-hide");
  })
  shrinkedFormList.classList.add("-hide");
  shrinkedFormList.classList.remove("-shrinked");
  searchForm.classList.remove("-shrinked");
  formLists.classList.remove('-shrinked');
  header.classList.remove('-shrinked');
  if(windowWidth > 750){
    conditions.classList.remove("-hide")
    }
}

// header scroll event
$(window).scroll(function () {
  let scrollPosition = $(this).scrollTop();
    scrollPosition > $('header').offset().top - windowHeight && $('header').offset().top !== 0 ? shrinkSearchForm() : extendSearchForm()
});

// $(window).resize(function(){
//   console.log('hoge')
//   // windowWidth < 750 ? conditions.classList.add("-hide") : conditions.classList.remove("-hide");
//   // if(windowWidth > 750){
//   //   conditions.style.display = "flex";
//   // }
// });