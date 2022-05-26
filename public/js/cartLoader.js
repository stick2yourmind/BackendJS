const cartParent = document.getElementById('cart-order-container')

const CART_LS = 'cart'

const addCartItemNode = (productId, quantity) => {
  const div = document.createElement('div')
  div.classList.add('cart-order-item')
  cartParent.appendChild(div)
}

const getCart = () => {
  return (JSON.parse(localStorage.getItem(CART_LS)) || [])
}

/* eslint-disable */
let cartFromLS = getCart()
/* eslint-enable */
