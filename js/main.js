var pageHeader = document.querySelector(".page-header");
var menuPopup = document.querySelector(".main-menu");
var menuOpen = document.querySelector (".top-panel__toogle");
var menuClose = menuPopup.querySelector(".main-menu__close-icon");

menuPopup.classList.remove("main-menu--no-script");
pageHeader.classList.remove("page-header--index-no-script");

menuOpen.addEventListener("click", function(event) {
  event.preventDefault();
  menuPopup.classList.add("main-menu--open");
});

menuClose.addEventListener("click", function(event) {
  event.preventDefault();
  menuPopup.classList.remove("main-menu--open");
});
