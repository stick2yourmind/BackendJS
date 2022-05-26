const cartParent = document.getElementById('cart-order-container')

const endpoint = {
  getProductById: (prodId) => `http://localhost:8080/api/productos/${prodId}`,
  postAddProductToCart: (cartId) => `http://localhost:8080/api/order-cart/${cartId}/productos`,
  postCreateCart: () => 'http://localhost:8080/api/order-cart'
}
const CART_LS = 'cart'

const addCartItemNode = (product, quantity) => {
  // Dom
  const itemContainer = document.createElement('div')
  const itemImg = document.createElement('img')
  const itemInfo = document.createElement('div')
  const itemInfoTitle = document.createElement('p')
  const itemInfoPrice = document.createElement('p')
  const itemInfoQuantity = document.createElement('p')
  const itemInfoSubtotal = document.createElement('p')
  const itemDeleteContainer = document.createElement('div')
  const itemDeleteButton = document.createElement('button')
  const itemDeleteImg = document.createElement('img')
  // Class
  itemContainer.classList.add('cart-order-item')
  itemImg.classList.add('cart-order-item-img')
  itemInfo.classList.add('cart-order-item-info')
  itemInfoTitle.classList.add('cart-order-item-info-title')
  itemInfoPrice.classList.add('cart-order-item-info-price')
  itemInfoQuantity.classList.add('cart-order-item-info-quantity')
  itemInfoSubtotal.classList.add('cart-order-item-info-subtotal')
  itemDeleteContainer.classList.add('cart-order-item-delete')
  // Fullfillment
  itemImg.src = product.foto
  itemInfoTitle.innerHTML = product.nombre
  itemInfoPrice.innerHTML = `Precio: ${product.precio}`
  itemInfoQuantity.innerHTML = `Cantidad: ${quantity}`
  itemInfoSubtotal.innerHTML = `Subtotal: ${Math.round(quantity * product.precio * 100) / 100}`
  itemDeleteImg.src = `${location.protocol + '//' + location.host}/icons/delete.svg`
  //
  itemContainer.appendChild(itemImg)
  itemInfo.appendChild(itemInfoTitle)
  itemInfo.appendChild(itemInfoPrice)
  itemInfo.appendChild(itemInfoQuantity)
  itemInfo.appendChild(itemInfoSubtotal)
  itemContainer.appendChild(itemInfo)
  itemDeleteButton.appendChild(itemDeleteImg)
  itemDeleteContainer.appendChild(itemDeleteButton)
  itemContainer.appendChild(itemDeleteContainer)

  cartParent.appendChild(itemContainer)
}

const getCartFromLS = () => {
  return (JSON.parse(localStorage.getItem(CART_LS)) || [])
}

/* eslint-disable */
let cartFromLS = getCartFromLS()
/* eslint-enable */
const getData = async (endpoint) => {
  let data = {}
  try {
    const dataFetched = await fetch(endpoint)
    data = await dataFetched.json()
  } catch (e) {
    data = { ...e, error: true }
  }
  return data
}

const renderProducts = () => {
  cartFromLS.map(async product => {
    const dataFetched = await (getData(endpoint.getProductById(product._id)))
    console.log('dataFetched')
    console.log(dataFetched)
    addCartItemNode(dataFetched.product, product.quantity)
  })
}

renderProducts()
