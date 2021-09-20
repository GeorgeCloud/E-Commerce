import data from './data.js';

const itemsCart = [];
const ul_list = document.getElementById("shop-items");

// Unused
function uniqueCartCount(){
  return Object.keys(itemsCart).length;
}

function removeOneItemFromCart(item_id){
  (itemsCart[item_id][1] > 1) ? (itemsCart[item_id][1] -= 1) : deleteItemFromCart(item_id); // refactor
  updateCart();
}

function deleteItemFromCart(item_id){
  if (itemsCart.hasOwnProperty(item_id)){
    // Does not care if item quantity is greater than 1
    delete itemsCart[item_id]
    document.querySelector(`form[data-id="${item_id}"] p`).closest("form").remove();
  }
  updateCart();
}

function addItem(itemButton){
  const item_id = itemButton.getAttribute("id");
  const item_price = parseInt(itemButton.getAttribute("data-price"));

  if (itemsCart.hasOwnProperty(item_id)){
    itemsCart[item_id][1] += 1;
  }

  else {
    // If item not in dict yet then set quantity to 1
    itemsCart[item_id] = [itemButton, 1];

    const cartForm = document.createElement('form');
    cartForm.setAttribute("data-id", item_id);
    divCart.appendChild(cartForm);

    const itemContent = document.createElement('p');
    itemContent.innerHTML = `${item_id} $${item_price} x 1 = $${item_price}`;
    cartForm.appendChild(itemContent);

    const removeCartItem = document.createElement('button');
    removeCartItem.setAttribute("data-id", item_id);
    removeCartItem.innerHTML = "Remove";
    removeCartItem.type="button";
    cartForm.appendChild(removeCartItem);

    removeCartItem.addEventListener("click", function() {
      console.log(`[${item_id}] clicked to remove item from cart`)
      deleteItemFromCart(item_id);
    });

    const addOneItem = document.createElement('button');
    addOneItem.innerHTML = "+";
    addOneItem.type="button";
    cartForm.appendChild(addOneItem);

    addOneItem.addEventListener("click", function() {
      itemsCart[item_id][1] += 1;
      updateCart();
    });

    const removeOneItem = document.createElement('button');
    removeOneItem.innerHTML = "-";
    removeOneItem.type="button";
    cartForm.appendChild(removeOneItem);

    removeOneItem.addEventListener("click", function() {
      removeOneItemFromCart(item_id);
    });

    const setItemQuantity = document.createElement('input');
    setItemQuantity.type = "number";
    setItemQuantity.min = 1;
    cartForm.appendChild(setItemQuantity);

    setItemQuantity.onchange = function(e){
      itemsCart[item_id][1] = parseInt(e.target.value);
      updateCart();
    }
  }
  updateCart();
}

for (let i = 0; i < data.length; i += 1){
  const newLi = document.createElement('li');
  ul_list.appendChild(newLi);

  const figure = document.createElement('figure');
  newLi.appendChild(figure);

  // Add image to figure
  const img = document.createElement('img');
  img.className = `gif item-${i}`;
  img.src = data[i].image;
  figure.appendChild(img);

  const figcation_decr = document.createElement('figcaption')
  figcation_decr.innerText = data[i].desc;
  figure.appendChild(figcation_decr);

  const price = document.createElement('p');
  price.innerText = `$${data[i].price}`
  figure.appendChild(price);

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
itemInCart.innerText = "Items in cart: 0";
qtyAndTotal.appendChild(itemInCart);

const cartTotalPrice = document.createElement('p');
cartTotalPrice.innerText = "Total = $0";
qtyAndTotal.appendChild(cartTotalPrice);

// display Cart
const divCart = document.createElement('div');
divCart.className = "cart";
ul_list.appendChild(divCart);

function updateCart(){
  let totalCartPrice = 0;
  let itemsCount = 0;

  Object.keys(itemsCart).forEach(function(key){
    const item = itemsCart[key];
    const item_price = parseInt(item[0].getAttribute("data-price"));

    itemsCount += item[1]; // 0?
    totalCartPrice += item_price * item[1];
    document.querySelector(`form[data-id="${key}"] p`).innerText = `${key} $${item_price} x ${item[1]} = $${item_price * item[1]}`;
  });

  itemInCart.innerText = `Items in cart: ${itemsCount}`;
  cartTotalPrice.innerText = `Total = $${totalCartPrice}`;
}

document.querySelectorAll(".add-to-cart").forEach(function(item) {
    item.addEventListener("click", function() {
      addItem(item);
      updateCart();
    });
});
