let products = [
  {
    id: 101,
    productName: "Oppo K13 5G",
    category: "Electronics",
    price: 16999,
    img: "https://tse4.mm.bing.net/th/id/OIP.eHGHx2SGTxezSkJSt5i4dgHaHa?pid=Api&P=0&h=220",
  },
  {
    id: 102,
    productName: "Maybelline Color sensational Lipstick",
    category: "Beauty / Cosmetics",
    price: 2400,
    img: "http://d3d71ba2asa5oz.cloudfront.net/12016923/images/71jqvuy%2b85l__sl1500_.jpg",
  },
  {
    id: 103,
    productName:
      "Maybelline New York Fit Me Shade 128 Warm Nude Compact Powder",
    category: "Beauty / Cosmetics",
    price: 3500,
    img: "https://m.media-amazon.com/images/I/61FDV10Re5L._AC_SL1200_.jpg",
  },
  {
    id: 104,
    productName:
      "RangMahal Women's Off White Chikankari Cotton Anarkali dress Indian Kurti For Women",
    category: "Clothing",
    price: 5999,
    img: "https://m.media-amazon.com/images/I/71BqySX+3RL._AC_SX679_.jpg",
  },
  {
    id: 105,
    productName:
      "Bimba Black Diamond Ikat Long A Line Anarkali Dress For Women Classic Printed Indian Kurtis",
    category: "Clothing",
    price: 1000,
    img: "https://i5.walmartimages.com/seo/Bimba-Black-Diamond-Ikat-Long-A-Line-Anarkali-Dress-For-Women-Classic-Printed-Indian-Kurtis-Tunic-Medium_54be5c95-63af-4e07-b55e-29ecd708edbe.6ac690ca1f7552873eb9dbe515619792.jpeg?odnHeight=2000&odnWidth=2000&odnBg=FFFFFF",
  },
  {
    id: 106,
    productName:
      "Maple Clothing Indian Kurti Top Tunic Printed Women's India dresses",
    category: "Clothing",
    price: 800,
    img: "https://i5.walmartimages.com/seo/Maple-Clothing-Indian-Kurti-Top-Tunic-Printed-Women-s-India-Clothes-Blue-L_05a54b52-81ce-40ed-9358-0341d8994c6c.c5d20f5b7530cfcb267d6709abb2ffc0.jpeg?odnHeight=2000&odnWidth=2000&odnBg=FFFFFF",
  },
  {
    id: 107,
    productName:
      "Soucolor Acrylic Paint Brushes Set, 20Pcs Round Pointed Tip Artist Paintbrushes",
    category: "Stationary",
    price: 900,
    img: "https://m.media-amazon.com/images/I/717vj8b2QkS._AC_UL320_.jpg",
  },
  {
    id: 108,
    productName: "KALOUR 72 Count Colored Pencils for Adult Coloring Books",
    category: "Stationary",
    price: 1699,
    img: "https://m.media-amazon.com/images/I/81YUlWyWv5L._AC_UL320_.jpg",
  },
  {
    id: 109,
    productName:
      "JBL Tune 720BT - Wireless Over-Ear Headphones with JBL Pure Bass Sound",
    category: "Electronics",
    price: 4038,
    img: "https://m.media-amazon.com/images/I/61EL2AKKcBL._AC_UY218_.jpg",
  },
  {
    id: 110,
    productName:
      "dotn Portable Bluetooth Speaker, 2026 Bluetooth 5.4 Wireless Speaker",
    category: "Electronics",
    price: 1705,
    img: "https://m.media-amazon.com/images/I/71ucSMBe+JL._AC_UY218_.jpg",
  },
];

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
                    <button class="pbtn buyNow">Buy Now</button>
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
                    <button class="pbtn buyNow" >Buy Now</button>
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

cartItemCountBtn.innerHTML = JSON.parse(
  localStorage.getItem("cartItems"),
).length;

addToCartBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    let productsAddedToCart;
    const localStorageCartItems = JSON.parse(localStorage.getItem("cartItems"));
    if (localStorageCartItems === null) {
      productsAddedToCart = [];
    } else {
      productsAddedToCart = localStorageCartItems;
    }

    const productID = +btn.getAttribute("data-val");

    if (!productsAddedToCart.includes(productID)) {
      productsAddedToCart.push(productID);
      alert("Product added to cart successfully!");
    }

    localStorage.setItem("cartItems", JSON.stringify(productsAddedToCart));
  });
});

addToCartIconImg.addEventListener("click", () => {
  productsCartDialogBox.showModal();
  const productsAddedInCart = JSON.parse(localStorage.getItem("cartItems"));
  productsCartDialogBox.innerHTML = ``;
  products.forEach((prod) => {
    if (productsAddedInCart.includes(prod.id)) {
      const divEle = document.createElement("div");
      divEle.classList.add("cartDiv");
      divEle.innerHTML = `
                          <img src="${prod.img}" alt="product image" class="cartProdImg"/>
                          <p class="cartProdName">${prod.productName}<p>
                          <p class="priceText">Price per product</p>
                          <p class="cartProdPrice">₹ ${prod.price}</p>
                          <p class="prodQuantity"> Quantity:
                          <button id="qtyMinus">-</button>
                          <span id="qtyInNumber">1</span>
                          <button id="qtyPlus">+</button>
                          </p>
                          <a href="#" class="removeItem" data-prodId="${prod.id}">Remove item</a>
                          <hr id="hRuler">
                         `;
      productsCartDialogBox.appendChild(divEle);
    }
  });

  const totalAmountDiv = document.createElement("div");
  totalAmountDiv.classList.add("totalAmountDiv");
  totalAmountDiv.innerHTML = "Total Amount = <strong>₹ 7000</strong>";
  productsCartDialogBox.appendChild(totalAmountDiv);

  const newBtn = document.createElement("button");
  newBtn.id = "closeCart";
  newBtn.innerText = "Close";
  productsCartDialogBox.appendChild(newBtn);
  const closeCartDialogBtn = document.querySelector("#closeCart");

  closeCartDialogBtn.addEventListener("click", () => {
    productsCartDialogBox.close();
  });
});
