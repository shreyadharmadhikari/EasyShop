const hambMenu = document.querySelector("#hamburger-icon");
const prodFilterEle = document.querySelector("#product-filters");
const searchBar = document.getElementById("searchBar");
const inputSearch = document.getElementById("inputSearch");
const overlay = document.querySelector("#overlay");
const searchContainer = document.querySelector(".search-container");

hambMenu.addEventListener("click", () => {
  searchBar.classList.toggle("hide");
  inputSearch.classList.toggle("hide");
  overlay.classList.toggle("active");
  searchContainer.classList.toggle("hide");

  if (hambMenu.classList.contains("active")) {
    hambMenu.classList.remove("active");
    hambMenu.src = "assets/close.png";
  } else {
    hambMenu.classList.add("active");
    hambMenu.src = "assets/menu.png";
  }
  prodFilterEle.classList.toggle("visible");
});

overlay.addEventListener("click", () => {
  searchBar.classList.remove("hide");
  hambMenu.src = "assets/menu.png";
  hambMenu.classList.add("active");
  prodFilterEle.classList.remove("visible");
  overlay.classList.remove("active");
});
