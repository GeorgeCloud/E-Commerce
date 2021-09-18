import data from './data.js';

const itemsCart = [];
const ul_list = document.getElementById("shop-items");

// Unused
function uniqueCartCount(){
  return Object.keys(itemsCart).length;
}

function addItem(item){
  const item_id = item.getAttribute("id");
  if (itemsCart.hasOwnProperty(item_id)){
    itemsCart[item_id][1] += 1;
  }
  else {
    itemsCart[item_id] = [item, 1];
  }
}

function removeItem(item){
  if (itemsCart.hasOwnProperty(item)){
    delete itemsCart[item]
  }
  // Before refactor
  // for (let i = 0; i < cartCount(); i += 1){
  //   if (item == itemsCart[i]){
  //     itemsCart.splice(i, 1)
  //   }
  // }
}

for (let i = 0; i < data.length; i += 1){
  console.log("iterating through data.js");
  // create li tag for each item
  const newLi = document.createElement('li');
  ul_list.appendChild(newLi);

  // Add figure tag to list item
  const figure = document.createElement('figure');
  newLi.appendChild(figure);

  // Add image to figure
  const img = document.createElement('img');
  img.className = `gif item-${i}`;
  img.src = data[i].image;
  figure.appendChild(img);

  // Add figcation to figure
  const figcation_decr = document.createElement('figcaption')
  figcation_decr.innerText = data[i].desc;
  figure.appendChild(figcation_decr);

  // Add p to figure
  const price = document.createElement('p');
  price.innerText = `$${data[i].price}`
  figure.appendChild(price)

  // Add button to figure
  const button = document.createElement('button');
  button.id = data[i].name;
  button.dataset.price = data[i].price;
  button.className = "add-to-cart";
  button.innerHTML = "Add to Cart";
  figure.appendChild(button);
}

const qtyAndTotal = document.createElement('div');
qtyAndTotal.className = "qty-and-total";
ul_list.appendChild(qtyAndTotal);

const itemInCart = document.createElement('p');
itemInCart.innerText = `Items in cart: ${itemsCart.length}`;
qtyAndTotal.appendChild(itemInCart);

const cartTotalPrice = document.createElement('p');
cartTotalPrice.innerText = `Total = $0`;
qtyAndTotal.appendChild(cartTotalPrice);

// display Cart
const divCart = document.createElement('div');
divCart.className = "cart";
ul_list.appendChild(divCart);

const cartArray = document.createElement('ul');
divCart.appendChild(cartArray);

// const cartTotalPrice = document.createElement('p');
// cartTotalPrice.innerText = `Total = $0`;
// qtyAndTotal.appendChild(cartTotalPrice);

function updateCart(){
  let totalCartPrice = 0;
  let itemsCount = 0;

  Object.keys(itemsCart).forEach(function(key) {
    const item = itemsCart[key];
    itemsCount += 1 * item[1];
    totalCartPrice += parseInt(item[0].getAttribute("data-price")) * item[1];
  });

  itemInCart.innerText = `Items in cart: ${itemsCount}`;
  cartTotalPrice.innerText = `Total = $${totalCartPrice}`;
  // For loop all items in cart
  itemsCart.forEach(function(item) {
    const itemInCart = document.createElement('li');   // v ${quantity}
    itemInCart.innerHTML = `<b>${item.getAttribute("id")} $${item.getAttribute("data-price")} x  = $total_of_this_item}</b>`;
    cartArray.appendChild(itemInCart);
  });
}

// Listen to button clicks
document.querySelectorAll(".add-to-cart").forEach(function(item) {
    item.addEventListener("click", function() {
      addItem(item);
      updateCart();
    });
});
