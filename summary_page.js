const productsInCart = JSON.parse(localStorage.getItem("cartItems"));

const itemsListDiv = document.querySelector("#itemsList");
const containerDiv = document.createElement("div");
containerDiv.id = "productsContainer";

for (let prodId in productsInCart) {
  const prodDiv = document.createElement("div");
  prodDiv.classList.add("prodDiv");

  products.forEach((prod) => {
    if (prod.id === +prodId) {
      console.log("here...");
      prodDiv.innerHTML = `
            <img src="${prod.img}" alt="product image" class="prodImage"/>
            <h2 class="prodName">${prod.productName}</h2>
            <h3 class="prodPrice">₹ ${prod.price}</h3>
            <p class="prodQuantity">Quantity: ${productsInCart[prodId]}</p>
            `;

      containerDiv.appendChild(prodDiv);
    }
  });
}

itemsListDiv.appendChild(containerDiv);

const priceDetailsDiv = document.querySelector("#priceDetails");

let total = 0;
let itemsQuantity = 0;
for (let prodId in productsInCart) {
  const prodQty = +productsInCart[prodId];
  itemsQuantity += prodQty;
  products.forEach((prod) => {
    if (prod.id === +prodId) {
      const prodPrice = prod.price;
      const prodFinalPrice = prodPrice * prodQty;
      total += prodFinalPrice;
    }
  });
}

const itemsCountDiv = document.createElement("div");
itemsCountDiv.classList.add("priceDiv");
itemsCountDiv.innerHTML = `<span id="itemsCountText">Total Items</span><span id="itemsCountNumber">${itemsQuantity}</span>`;

const priceDiv = document.createElement("div");
priceDiv.classList.add("priceDiv");

priceDiv.innerHTML = `
<span id="priceText">Subtotal</span><span id="priceValue">₹ ${total}</span>
`;

const deliveryCharges = document.createElement("div");
deliveryCharges.classList.add("priceDiv");
deliveryCharges.innerHTML = `
<span id="delvChargeText">Delivery Charges:</span> <span id="delvChargeVal">₹ 60</span>
`;

const subTotalDiv = document.createElement("div");
subTotalDiv.classList.add("priceDiv");
subTotalDiv.innerHTML = `
<span id="subtotalText">Total Payable:</span><span id="subtotalValue">₹ ${total + 60}</span>
`;

const horizontalRuleEle = document.createElement("hr");
horizontalRuleEle.classList.add("priceDetails", "horizontalRuler");

priceDetailsDiv.appendChild(itemsCountDiv);
priceDetailsDiv.appendChild(priceDiv);
priceDetailsDiv.appendChild(deliveryCharges);
priceDetailsDiv.appendChild(horizontalRuleEle);
priceDetailsDiv.appendChild(subTotalDiv);

const divEle = document.createElement("div");
divEle.id = "confirmBtnDiv";
const confirmOrderBtn = document.createElement("button");
confirmOrderBtn.id = "confirmOrderBtn";
confirmOrderBtn.textContent = "Confirm Order";

divEle.appendChild(confirmOrderBtn);

priceDetailsDiv.appendChild(divEle);

const confirmBtn = document.getElementById("confirmOrderBtn");

confirmBtn.addEventListener("click", () => {
  const confirmationDialogBox = document.getElementById("orderConfirmed");
  confirmationDialogBox.showModal();

  setTimeout(() => {
    confirmationDialogBox.close();
    localStorage.setItem("cartItems", JSON.stringify({}));

    window.location.reload(true);
    window.location.href = "index.html";
  }, 3000);
});
