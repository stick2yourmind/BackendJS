const subtract = document.getElementById('subtract-button')
const add = document.getElementById('add-button')
const quantity = document.getElementById('quantity')
const buyForm = document.getElementById('buy-form')
const productId = document.getElementById('product-id')
const productStock = document.getElementById('product-stock')
const DEFAULT_QUANTITY = 1
const CART_LS = 'cart'

const getCart = () => {
  return (JSON.parse(localStorage.getItem(CART_LS)) || [])
}
/* eslint-disable */
let cart = getCart()

/* eslint-enable */

// cart = [{
//   _id: '1212-sdas2-asd',
//   quantity: 3
// }, {
//   _id: 'asdads-awdsad-asdsasd',
//   quantity: 10
// }]

const subtractQuantity = () => {
  console.log('subtractQuantity clicked')
  quantity.value = (!isNaN(quantity.value) && Number(quantity.value) > 1) ? (Number(quantity.value) - 1) : DEFAULT_QUANTITY
}
const addQuantity = () => {
  console.log('addQuantity clicked')
  quantity.value = (!isNaN(quantity.value) && Number(quantity.value))
    ? Number(quantity.value) < productStock.value
      ? Number(quantity.value) + 1
      : productStock.value
    : DEFAULT_QUANTITY
}

const addItemLocalStorage = (productId, quantity) => {
  cart = getCart()
  const newCart = [...cart, { _id: productId, quantity }]
  localStorage.setItem(CART_LS, JSON.stringify(newCart))
}

const removeItemLocalStorage = (productId) => {
  cart = getCart()
  const newCart = cart.filter(item => item._id !== productId)
  localStorage.setItem(CART_LS, JSON.stringify(newCart))
}

const updateItemLocalStorage = (productId, quantity) => {
  cart = getCart()
  const newCart = cart.map(item =>
    item._id === productId
      ? { _id: item._id, quantity }
      : item)
  localStorage.setItem(CART_LS, JSON.stringify(newCart))
}

const addItemToCart = (e) => {
  console.log('item added to cart')
  console.log(e)
  e.preventDefault()
  e.stopPropagation()
  const id = productId.value
  const quantityOrdered = quantity.value
  const wasItemAdded = cart.some(item => item._id === id)
  !wasItemAdded
    ? addItemLocalStorage(id, quantityOrdered)
    : updateItemLocalStorage(id, quantityOrdered)
}

let prevQuantity = cart?.find(item => item?._id === productId.value)?.quantity
prevQuantity = Number(prevQuantity) || DEFAULT_QUANTITY
if (prevQuantity < productStock.value) { quantity.value = prevQuantity } else {
  quantity.value = DEFAULT_QUANTITY
  removeItemLocalStorage(productId.value)
}

subtract.addEventListener('click', subtractQuantity)
add.addEventListener('click', addQuantity)
buyForm.addEventListener('submit', addItemToCart)

// Set an array of JSON to localStorage
// let localStorage.setItem("cart", JSON.stringify(cart))
// Get array of JSON from localStorage
// let storedNames = JSON.parse(localStorage.getItem("names"))
