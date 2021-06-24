// header element function
const headerElem = document.getElementById('header');
console.log(headerElem)
const windowHeight = $(window).height();

// header scroll event
$(window).scroll(function () {
  let scrollPosition = $(this).scrollTop();
  scrollPosition > $('header').offset().top - windowHeight && $('header').offset().top !== 0 ? $('header').addClass('-bgwhite') : $('header').removeClass('-bgwhite');
})
