
const signinAction = document.getElementById('signin-action')
const signupAction = document.getElementById('signup-action')
const signinForm = document.getElementById('signin-container')
const signupForm = document.getElementById('signup-container')
/* eslint-disable quote-props */
const show = {
  'align-items': 'center',
  'display': 'flex',
  'flex-direction': 'column',
  'justify-content': 'center'
}

const hide = {
  'display': 'none'
}
/* eslint-enable quote-props */
const applyStyles = (element, styles) => {
  Object.entries(styles).forEach(([prop, val]) => {
    const [value, pri = ''] = val.split('!')
    element.style.setProperty(prop, value, pri)
  })
}

signinAction.addEventListener('click', () => {
  console.log('Ingresar clicleado')
  applyStyles(signinForm, show)
  applyStyles(signupForm, hide)
})

signupAction.addEventListener('click', () => {
  console.log('Registrarse clicleado')
  applyStyles(signinForm, hide)
  applyStyles(signupForm, show)
})
