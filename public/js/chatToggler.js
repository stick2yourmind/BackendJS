const openChatButton = document.getElementById('chat-action-open')
const closeChatButton = document.getElementById('chat-action-close')
const chat = document.getElementById('chat')
const chatSend = document.getElementById('chat-send')
const inputChat = document.getElementById('msg-action-input')
/* eslint-disable quote-props */
const show = {
  'backdrop-filter': 'contrast(0.5)',
  'border-radius': '1rem',
  'bottom': '4rem',
  'display': 'flex',
  'flex-direction': 'column',
  'height': '48rem',
  'max-height': '48rem',
  'opacity': '1',
  'overflow-y': 'scroll',
  'position': 'fixed',
  'right': '0',
  'transition': 'all ease 0.5s',
  'width': '20rem',
  'z-index': '1'
}
const showChatSend = {
  'align-items': 'center',
  'background-color': 'aliceblue',
  'border': '0.15rem solid #845EC2',
  'border-radius': '1rem',
  'bottom': '1rem',
  'display': 'flex',
  'height': 'auto',
  'justify-items': 'center',
  'margin': '0',
  'max-width': '100%',
  'padding': '0.5rem',
  'position': 'fixed',
  'right': '0',
  'width': '20rem'

}
const showOpenButton = {
  'background': '#845EC2',
  'border': '0.2rem solid aliceblue',
  'border-radius': '1.2rem',
  'bottom': '6rem',
  'color': 'aliceblue',
  'height': '2.4rem',
  'opacity': '1',
  'padding': '0.5rem',
  'position': 'fixed',
  'right': '4rem',
  'transition': 'all ease 0.3s',
  'z-index': '10'
}
const showCloseButton = {
  'align-items': 'center',
  'background': '#845EC2',
  'background-color': 'none',
  'border': '0.2rem solid aliceblue',
  'border-radius': '50%',
  'bottom': '49.5rem',
  'color': 'white',
  'display': 'flex',
  'height': '2rem',
  'justify-content': 'center',
  'opacity': '1',
  'padding': '0.5rem',
  'position': 'fixed',
  'right': '1.5rem',
  'width': '2rem',
  'z-index': '10'
}
const hide = {

  'border': '0',

  'height': '0',
  // "display": "none"
  'min-height': '0',
  'overflow': 'hidden',
  'padding': '0'
  // "opacity":"0",
}
/* eslint-enable quote-props */
const applyStyles = (element, styles) => {
  Object.entries(styles).forEach(([prop, val]) => {
    const [value, pri = ''] = val.split('!')
    element.style.setProperty(prop, value, pri)
  })
}

openChatButton.addEventListener('click', () => {
  console.log('Abrir chat')
  applyStyles(chat, show)
  applyStyles(chatSend, showChatSend)
  applyStyles(closeChatButton, showCloseButton)
  applyStyles(openChatButton, hide)
  inputChat.focus()
})

closeChatButton.addEventListener('click', () => {
  console.log('Cerrar chat')
  applyStyles(chat, hide)
  applyStyles(chatSend, hide)
  applyStyles(closeChatButton, hide)
  applyStyles(openChatButton, showOpenButton)
})

applyStyles(chat, hide)
applyStyles(chatSend, hide)
applyStyles(closeChatButton, hide)
