const buyerParent = document.getElementById('cart-order-container')
const buyerContainer = document.createElement('form')
const submitButton = document.createElement('button')
const cartIdInfo = document.createElement('p')

const CART_LS_POST = 'cart'

const endpointPost = {
  postAddProductToCart: (cartId) => `http://localhost:8080/api/order-cart/${cartId}/productos`,
  postCloseCart: (cartId) => `http://localhost:8080/api/order-cart/${cartId}`,
  postCreateCart: () => 'http://localhost:8080/api/order-cart'
}

const checkoutCartNode = () => {
  // Class
  buyerContainer.classList.add('cart-buy-checkout')
  // Fullfillment
  submitButton.innerHTML = 'Finalizar compra'
  submitButton.type = 'submit'
  //
  buyerContainer.appendChild(submitButton)
  buyerContainer.appendChild(cartIdInfo)

  const lastSibling = buyerParent.lastElementChild
  lastSibling.insertAdjacentElement('afterend', buyerContainer)
}
const renderCheckoutCartNode = () => {
  checkoutCartNode()
}

const getCartFromLSPost = () => {
  return (JSON.parse(localStorage.getItem(CART_LS_POST)) || [])
}

// const getData = async (endpointPost) => {
//   let data = {}
//   try {
//     const dataFetched = await fetch(endpointPost)
//     data = await dataFetched.json()
//   } catch (e) {
//     data = { ...e, error: true }
//   }
//   return data
// }

const postData = async (endpointPost, data) => {
  console.log('endpointPost')
  console.log(endpointPost)
  console.log('data')
  console.log(data)
  try {
    const responseFetched = await fetch(endpointPost, {
      body: JSON.stringify(data),
      headers: {
        'Content-type': 'application/json; charset=UTF-8'
      },
      method: 'POST'
    })
    data = await responseFetched.json()
  } catch (e) {
    data = { ...e, error: true }
  }
  return data
}

const addProductsToDB = async () => {
  const cartFromLS = getCartFromLSPost()
  // Creating a cart
  const newCartDataFetched = await postData(endpointPost.postCreateCart())
  const newCart = await newCartDataFetched.result._id
  console.log('newCart id:')
  console.log(newCart)
  // Adding items to cart
  cartFromLS.map(async product => {
    const dataProduct = { prodId: product._id, quantity: product.quantity }
    const responseFetched = await postData(endpointPost.postAddProductToCart(newCart), dataProduct)
    console.log('responseFetched')
    console.log(responseFetched)
  })
  await postData(endpointPost.postCloseCart(newCart), {})
  return newCart
}

setTimeout(renderCheckoutCartNode, 4000)
const submitCheckout = async (e) => {
  e.preventDefault()
  e.stopPropagation()
  const cartId = await addProductsToDB()
  cartIdInfo.innerHTML = `Código de identificación de su compra: ${cartId}`
  localStorage.clear()
}

buyerContainer.addEventListener('submit', submitCheckout)
