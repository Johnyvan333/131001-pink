var menuOpen = document.querySelector (".top-panel__toogle");
var menuPopup = document.querySelector(".main-menu");
var menuClose = menuPopup.querySelector(".main-menu__close-icon");

menuOpen.addEventListener("click", function(event) {
  event.preventDefault();
  menuPopup.classList.add("main-menu--open");
});

menuClose.addEventListener("click", function(event) {
  event.preventDefault();
  menuPopup.classList.remove("main-menu--open");
});
