let productsGrid = document.getElementById("products-grid");
for (let prodObj of products) {
  let prodDiv = document.createElement("div");
  prodDiv.setAttribute("class", "pdiv");
  prodDiv.innerHTML = `
                    <img src="${prodObj.img}" alt="${prodObj.category}" />
                    <p class="pname">${prodObj.productName}</p>
                    <p class="pcatg">${prodObj.category}</p>
                    <p class="pprice">INR ${prodObj.price}</p>
                    <div class="p-btns">
                    <button class="pbtn addToCart"  data-val="${prodObj.id}">Add to cart</button>
                    <button class="pbtn buyNow" data-val="${prodObj.id}">Buy Now</button>
                    </div>
                    `;

  productsGrid.appendChild(prodDiv);
}

function displayByFilter(filteredProducts) {
  let productsGrid = document.getElementById("products-grid");
  if (filteredProducts.length === 0) {
    productsGrid.innerHTML =
      "<h1 class='noProdFound'>No Products Found!!!</h1>";
    return;
  }
  productsGrid.innerHTML = "";
  for (let prodObj of filteredProducts) {
    let prodDiv = document.createElement("div");
    prodDiv.setAttribute("class", "pdiv");
    prodDiv.innerHTML = `
                    <img src="${prodObj.img}" alt="${prodObj.category}" />
                    <p class="pname">${prodObj.productName}</p>
                    <p class="pcatg">${prodObj.category}</p>
                    <p class="pprice">INR ${prodObj.price}</p>
                    <div class="p-btns">
                    <button class="pbtn addToCart"  data-val="${prodObj.id}">Add to cart</button>
                    <button class="pbtn buyNow" data-val="${prodObj.id}">Buy Now</button>
                    </div>
                    `;

    productsGrid.appendChild(prodDiv);
  }
}

const filterByCategoryButtons = [...document.querySelectorAll(".category")];

let categoriesSelected = new Set();
let priceRangeSelected = new Set();

filterByCategoryButtons.forEach((btn, index, arr) => {
  btn.addEventListener("click", () => filterByCategory(btn, arr));
});

function filterByCategory(btn, arr) {
  const btnText = btn.innerText;

  if (btnText === "All") {
    categoriesSelected.clear();
    arr.forEach((btn) => btn.classList.remove("selected"));
    btn.classList.add("selected");
  } else {
    arr[0].classList.remove("selected");
    btn.classList.toggle("selected");
    btn.classList.contains("selected")
      ? categoriesSelected.add(btn.innerText)
      : categoriesSelected.delete(btn.innerText);
  }
  updatedProductsList();
}

const filterByPriceButtons = [...document.querySelectorAll(".price")];

filterByPriceButtons.forEach((btn) => {
  btn.addEventListener("click", () => filterByPrice(btn));
});

function filterByPrice(btnEle) {
  let btnText = btnEle.innerText;

  btnEle.classList.toggle("selected");

  btnEle.classList.contains("selected")
    ? priceRangeSelected.add(btnText)
    : priceRangeSelected.delete(btnText);
  updatedProductsList();
}

let sortSelected = new Set();
const sortButtons = [...document.querySelectorAll(".sort")];

sortButtons.forEach((btn, indx, arr) => {
  btn.addEventListener("click", () => sortProducts(btn, arr));
});

function sortProducts(btnEle, btnsArr) {
  const dataVal = btnEle.getAttribute("data-val");
  btnEle.classList.toggle("selected");

  if (dataVal === "ascending") {
    btnsArr.forEach((btn) => {
      if (btn.getAttribute("data-val") !== "ascending") {
        btn.classList.remove("selected");
      }
    });

    if (btnEle.classList.contains("selected")) {
      sortSelected.clear();
      sortSelected.add("Ascending");
    }
  }
  if (dataVal === "descending") {
    btnsArr.forEach((btn) => {
      if (btn.getAttribute("data-val") !== "descending") {
        btn.classList.remove("selected");
      }
    });

    if (btnEle.classList.contains("selected")) {
      sortSelected.clear();
      sortSelected.add("Descending");
    }
  }

  updatedProductsList();
}

let searchText = "";
let searchFlag = false;

const searchButton = document.querySelector("#btnS");

searchButton.addEventListener("click", () => searchByNameOrCategory());

function searchByNameOrCategory() {
  const inputSearchBox = document.querySelector("#inputSearch");
  const inputVal = inputSearchBox.value.toLowerCase();
  if (inputVal === "") {
    searchFlag = false;
    searchText = "";
  } else {
    searchFlag = true;
    searchText = inputVal.toLowerCase();
  }
  updatedProductsList();
}

function updatedProductsList() {
  let finalProdArr = [...products];
  let tempArr = [];

  if (searchFlag === true) {
    finalProdArr.forEach((product) => {
      if (
        product.productName.toLowerCase().includes(searchText) ||
        product.category.toLowerCase().includes(searchText)
      ) {
        tempArr.push(product);
      }
    });
    finalProdArr = tempArr;
  }

  if (categoriesSelected.size > 0) {
    finalProdArr = finalProdArr.filter((prod) =>
      categoriesSelected.has(prod.category),
    );
  }

  if (priceRangeSelected.size > 0) {
    finalProdArr = finalProdArr.filter(
      (prod) =>
        (priceRangeSelected.has("Below 1000") && prod.price < 1000) ||
        (priceRangeSelected.has("1000-3000") &&
          prod.price >= 1000 &&
          prod.price <= 3000) ||
        (priceRangeSelected.has("Above 3000") && prod.price > 3000),
    );
  }

  if (sortSelected.size > 0) {
    if (sortSelected.has("Ascending")) {
      finalProdArr = [...finalProdArr].sort((p1, p2) => p1.price - p2.price);
    } else {
      finalProdArr = [...finalProdArr].sort((p1, p2) => p2.price - p1.price);
    }
  }

  displayByFilter(finalProdArr);
}

const clearFilterBtn = document.querySelector(".clearFilters");

clearFilterBtn.addEventListener("click", () => {
  const allFilterBtns = [...document.querySelectorAll(".f-btn")];
  allFilterBtns.forEach((btn) => {
    btn.classList.remove("selected");
    categoriesSelected.clear();
    priceRangeSelected.clear();
    sortSelected.clear();
  });
  updatedProductsList();
});

const productsCartDialogBox = document.querySelector("#cartDialog");
const cartItemCountBtn = document.querySelector("#itemCount");
const addToCartBtns = [...document.querySelectorAll(".addToCart")];
const addToCartIconImg = document.querySelector("#addToCartImg");
cartItemCountBtn.innerText = Object.entries(
  JSON.parse(localStorage.getItem("cartItems")),
).length;
const buyNowBtns = document.querySelectorAll(".buyNow");

buyNowBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    const productsPresentInCart = JSON.parse(localStorage.getItem("cartItems"));
    const prodID = +btn.getAttribute("data-val");

    if (productsPresentInCart === null) {
      productsPresentInCart[prodID] = 1;
    } else {
      if (!productsPresentInCart[prodID]) {
        productsPresentInCart[prodID] = 1;
      }
    }

    localStorage.setItem("cartItems", JSON.stringify(productsPresentInCart));
    cartItemCountBtn.innerText = Object.entries(productsPresentInCart).length;
    productsCartDialogBox.showModal();
    displayCartItems(productsPresentInCart);
    dialogBoxEventListeners(productsPresentInCart);
    cartItemCountBtn.innerText = Object.entries(
      JSON.parse(localStorage.getItem("cartItems")),
    ).length;
  });
});

addToCartBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    let productToAddInCart;
    const localStorageCartItems = JSON.parse(localStorage.getItem("cartItems"));
    if (localStorageCartItems === null) {
      productToAddInCart = {};
    } else {
      productToAddInCart = localStorageCartItems;
    }

    const productID = +btn.getAttribute("data-val");

    if (!productToAddInCart[productID]) {
      productToAddInCart[productID] = 1;
      alert("Product added to cart successfully!");
    } else {
      alert("Product is already present in cart!");
    }

    localStorage.setItem("cartItems", JSON.stringify(productToAddInCart));
    cartItemCountBtn.innerText = Object.entries(productToAddInCart).length;
  });
});

function displayCartItems(productsAddedInCart) {
  productsCartDialogBox.innerHTML = ``;
  const productsInCartContainerDiv = document.createElement("div");
  productsInCartContainerDiv.id = "productsInCartContainerDiv";
  const placeOrderBtn = document.createElement("button");
  placeOrderBtn.id = "placeOrder";
  placeOrderBtn.innerText = "Place Order";

  productsCartDialogBox.appendChild(placeOrderBtn);

  const newBtn = document.createElement("button");
  newBtn.id = "closeCart";
  newBtn.innerText = "Close";
  productsCartDialogBox.appendChild(newBtn);

  if (Object.entries(productsAddedInCart).length === 0) {
    productsInCartContainerDiv.innerHTML = `<h3 style="text-align: center; margin-top: 22%; font-size: 1.8rem; font-family: verdana; font-weight:500">No products present</h3>`;
    const placeOrderBtn = document.getElementById("placeOrder");
    placeOrderBtn.classList.add("disabled-btn");
  } else {
    const placeOrderBtn = document.getElementById("placeOrder");
    placeOrderBtn.classList.remove("disabled-btn");

    products.forEach((prod) => {
      if (productsAddedInCart[prod.id]) {
        const divEle = document.createElement("div");
        divEle.classList.add("cartDiv");
        divEle.id = `cartDiv-${prod.id}`;
        divEle.innerHTML = `
                          <img src="${prod.img}" alt="product image" class="cartProdImg"/>
                          <p class="cartProdName">${prod.productName}<p>
                          <p class="priceText">Price per product</p>
                          <p class="cartProdPrice">₹ ${prod.price}</p>
                          <p class="prodQuantity"> Quantity:
                          <button class="qtyMinus" data-val="${prod.id}">-</button>
                          <span class="qtyInNumber  qtyNum${prod.id}">${productsAddedInCart[prod.id]}</span>
                          <button class="qtyPlus" data-val="${prod.id}">+</button>
                          </p>
                          <a href="#" class="removeItem" data-prodId="${prod.id}">Remove item</a>
                          <hr id="hRuler">
                         `;
        productsInCartContainerDiv.appendChild(divEle);
      }
    });
    productsCartDialogBox.prepend(productsInCartContainerDiv);
  }
}

addToCartIconImg.addEventListener("click", () => {
  productsCartDialogBox.showModal();
  const productsAddedInCart = JSON.parse(localStorage.getItem("cartItems"));
  cartItemCountBtn.innerText = Object.entries(
    JSON.parse(localStorage.getItem("cartItems")),
  ).length;

  displayCartItems(productsAddedInCart);
  dialogBoxEventListeners(productsAddedInCart);
});

function dialogBoxEventListeners(productsAddedInCart) {
  const closeCartDialogBtn = document.querySelector("#closeCart");
  const qtyPlusButtons = [...document.querySelectorAll(".qtyPlus")];
  const qtyMinusButtons = [...document.querySelectorAll(".qtyMinus")];
  const removeItemLinks = [...document.querySelectorAll(".removeItem")];
  const placeOrderBtn = document.querySelector("#placeOrder");

  placeOrderBtn.addEventListener("click", () => {
    window.location.href = "summary_page.html";
  });

  closeCartDialogBtn.addEventListener("click", () => {
    productsCartDialogBox.close();
  });

  removeItemLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const prodId = +link.getAttribute("data-prodId");
      delete productsAddedInCart[prodId];
      localStorage.setItem("cartItems", JSON.stringify(productsAddedInCart));
      const divEle = document.getElementById(`cartDiv-${prodId}`);
      productsInCartContainerDiv.removeChild(divEle);
      if (Object.entries(productsAddedInCart).length === 0) {
        productsInCartContainerDiv.innerHTML = `<h3 style="text-align: center; margin-top: 22%; font-size: 1.8rem; font-family: verdana; font-weight:500">No products present</h3>`;
      }
      cartItemCountBtn.innerText = Object.entries(
        JSON.parse(localStorage.getItem("cartItems")),
      ).length;
    });
  });

  qtyPlusButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const productID = +btn.getAttribute("data-val");
      let prodQuantity = productsAddedInCart[productID];
      if (prodQuantity < 6) {
        prodQuantity += 1;
      } else {
        alert("Maximum 6 items can be added at one time for any product!");
      }
      productsAddedInCart[productID] = prodQuantity;
      localStorage.setItem("cartItems", JSON.stringify(productsAddedInCart));
      const quantityNumSpan = document.querySelector(`.qtyNum${productID}`);
      quantityNumSpan.innerText = prodQuantity;
      cartItemCountBtn.innerText = Object.entries(
        JSON.parse(localStorage.getItem("cartItems")),
      ).length;
    });
  });

  qtyMinusButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const productID = +btn.getAttribute("data-val");
      let prodQuantity = productsAddedInCart[productID];
      if (prodQuantity === 1) {
        delete productsAddedInCart[productID];
        const divEle = document.getElementById(`cartDiv-${productID}`);
        productsInCartContainerDiv.removeChild(divEle);
      } else {
        prodQuantity -= 1;
        productsAddedInCart[productID] = prodQuantity;
        const quantityNumSpan = document.querySelector(`.qtyNum${productID}`);
        quantityNumSpan.innerText = prodQuantity;
      }
      if (Object.entries(productsAddedInCart).length === 0) {
        productsInCartContainerDiv.innerHTML = `<h3 style="text-align: center; margin-top: 22%; font-size: 1.8rem; font-family: verdana; font-weight:500">No products present</h3>`;
      }

      cartItemCountBtn.innerText = Object.entries(
        JSON.parse(localStorage.getItem("cartItems")),
      ).length;
    });
  });
}
