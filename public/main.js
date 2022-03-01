const socket = io('http://localhost:8080')

const productList = document.getElementById('productListContainerHome')
const formNewProduct = document.getElementById('formNewProduct')
const formTitle = document.getElementById('formTitle')
const formPrice = document.getElementById('formPrice')
const formThumbnail = document.getElementById('formThumbnail')


formNewProduct.addEventListener('submit', (e) => {
  e.preventDefault()
  const msg = {
    title: formTitle.value,
    price: formPrice.value,
    thumbnail: formThumbnail.value
  }
  console.log('msg: ', msg)
  socket.emit('newProduct', msg)
  formTitle.value = ''
  formPrice.value = ''
  formThumbnail.value = ''
})

const renderProduct = (product) => {
  console.log('product', product)
  let htmlProduct = `<img src='${  product.thumbnail }' alt='${ product.title }' class="imgProduct">
  <div class="infoProduct">
      <h4 class='titleProduct'> ${ product.title } </h4>
      <h4 class='priceProduct'> $ ${ product.price } </h4>
  </div>`
  const liProduct = document.createElement("li")
  liProduct.classList.add('productContainerHome')
  liProduct.innerHTML = htmlProduct
  return liProduct
}

socket.on('products', (products) => {
  products.forEach( product => productList.appendChild(renderProduct(product)))
})

socket.on('newProduct', (product) => productList.appendChild(renderProduct(product) ))


