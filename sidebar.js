const hambMenu = document.querySelector("#hamburger-icon");
const prodFilterEle = document.querySelector("#product-filters");

hambMenu.addEventListener("click", () => {
  searchBar.classList.toggle("hide");

  if (hambMenu.classList.contains("active")) {
    hambMenu.src = "assets/close.png";
  } else {
    hambMenu.src = "assets/menu.png";
  }
  hambMenu.classList.toggle("active");
  prodFilterEle.classList.toggle("visible");
});
