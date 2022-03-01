const socket = io('http://localhost:8080')

const productList = document.getElementById('productListContainerHome')

const chatRoom = document.getElementById('chatRoom')
const chatBody = document.getElementById('chatBody')

const formNewProduct = document.getElementById('formNewProduct')
const formTitle = document.getElementById('formTitle')
const formPrice = document.getElementById('formPrice')
const formThumbnail = document.getElementById('formThumbnail')

const formLogin = document.getElementById('formLogin')
const inputUser = document.getElementById('inputUser')
const logOut = document.getElementById('logOut')


const userLoggedWelcome = document.getElementById('userLoggedWelcome')
const userLoggedContainer = document.getElementById('userLoggedContainer')

const formNewMsg = document.getElementById('formNewMsg')
const inputNewMsg = document.getElementById('inputNewMsg')

let userLogged = null

formNewProduct.addEventListener('submit', (e) => {
  e.preventDefault()
  const msg = {
    title: formTitle.value,
    price: formPrice.value,
    thumbnail: formThumbnail.value
  }
  socket.emit('newProduct', msg)
  formTitle.value = ''
  formPrice.value = ''
  formThumbnail.value = ''
})

formLogin.addEventListener('submit', (e) => {
  e.preventDefault()
  userLogged = inputUser.value
  if(userLogged!==''){
    const user = {
      user: userLogged
    }
    socket.emit('newUserLogged', user)
    inputUser.value = ''
    userLoggedWelcome.innerText = `Bienvenido ${userLogged}`
    formLogin.style.display = "none"
    userLoggedContainer.style.display = "flex"
    chatBody.style.display = "block"

  }

})

logOut.addEventListener('click', (e) => {
  e.preventDefault()
  userLogged = ''
  formLogin.style.display = "flex"
  userLoggedContainer.style.display = "none"
  chatBody.style.display = "none"
})

formNewMsg.addEventListener('submit', (e) => {
  e.preventDefault()
  const newMsg = {
    user: userLogged,
    msg: inputNewMsg.value
  }
  socket.emit('newMsg', newMsg)
  inputNewMsg.value = ''
})

const renderProduct = (product) => {
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

const renderNewMsg = (newMsg) => {
  const divNewMsg = document.createElement("div")
  const pUser = document.createElement("p")
  const pDate = document.createElement("p")
  const pMsg = document.createElement("p")
  divNewMsg.classList.add('chatMsg')
  pUser.classList.add('chatMsgUser')
  pDate.classList.add('chatMsgDate')
  pMsg.classList.add('chatMsgMsg')
  pUser.innerHTML = `${newMsg.user}`
  pDate.innerHTML = `[${newMsg.date}] :`
  pMsg.innerHTML = `${newMsg.msg}`
  divNewMsg.appendChild(pUser)
  divNewMsg.appendChild(pDate)
  divNewMsg.appendChild(pMsg)
  // divNewMsg.innerText = `${pUser[0]} [${pDate}]: ${pMsg}`
  return divNewMsg
}

socket.on('products', (products) => {
  products.forEach( product => productList.appendChild(renderProduct(product)))
})

socket.on('newProduct', (product) => productList.appendChild(renderProduct(product) ))

socket.on('newMsg', (newMsg) => chatRoom.appendChild(renderNewMsg(newMsg) ))

socket.on('messages', (messages) => {
  if(Array.isArray(messages) && messages.length)
    messages.forEach((msg)=> chatRoom.appendChild(renderNewMsg(msg)))
})
