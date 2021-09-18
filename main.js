import data from './data.js';

const itemsCart = [];
const ul_list = document.getElementById("shop-items");

function addItem(item){
  itemsCart.push(item);
}

function removeItem(item){
  for (let i = 0; i < itemsCart.length; i += 1){
    if (item == itemsCart[i]){
      itemsCart.splice(i, 1)
    }
  }
}

function getCartTotal(){
  let totalCartPrice = 0;
  for (let i = 0; i < itemsCart.length; i += 1){
    totalCartPrice += parseInt(itemsCart[i].getAttribute("data-price"));
  }
  return totalCartPrice
}

// const allItems = document.querySelector("#shop-items");
// const itemsArray = document.querySelectorAll(".add-to-cart");



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
  img.className = `item item-${i}`;
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

const divCart = document.createElement('div');
divCart.className = "cart";
ul_list.appendChild(divCart);

const linkToCart = document.createElement('a');
linkToCart.href = "https://www.google.com";
divCart.appendChild(linkToCart);

const itemInCart = document.createElement('p');
itemInCart.innerText = `Items in cart: ${itemsCart.length}`;
linkToCart.appendChild(itemInCart);

const cartTotalPrice = document.createElement('p');
cartTotalPrice.innerText = `Total = $0`;
divCart.appendChild(cartTotalPrice);

function updateCart(){
  itemInCart.innerText = `Items in cart: ${itemsCart.length}`;
  cartTotalPrice.innerText = `Total = $${getCartTotal()}`;
}

// Listen to button clicks
document.querySelectorAll(".add-to-cart").forEach(function(item) {
    item.addEventListener("click", function() {
      addItem(item);
      updateCart();
    });
});
