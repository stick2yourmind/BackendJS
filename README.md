Example of .env file:

```
TWILIO_ACCOUNT_SID = 'adsasd234343as'
TWILIO_TOKEN = 'asdal2w3223asj'
MONGO_ATLAS_URI = 'mongodb+srv://alrer:<pass>@xaaaa.asdww.mongodb.net/<collection>?retryWrites=true&w=majority'
HOST = '0.0.0.0'
SERVER_MODE = 1
PASSPORT_SECRET = 'secret'
PERS = 'MONGO'
PORT = 8080
SELLER_EMAIL_PASS = 'asdaqoekqo'
SELLER_EMAIL_SERVICE = 'gmail',
SELLER_EMAIL = 'test@gmail.com'
TWILIO_SMS = '+541144445555'
TWILIO_WHATSAPP = 'whatsapp:+5491144445555'
DOMAIN = 'http://localhost:8080'
EMAIL_PORT = 465
```

example of crud operation at /api/graphql endpoint:
```
query getById{
  getProductById(id:"62ba41cfb0225a36e8297c10"){
    nombre
    precio
  }
}
query getAll{
  getAllProducts{
    foto
    nombre
  }
}

mutation createProduct{
  createProduct(payload:{
    descripcion: "Esta cocina Whirlpool te ayudará a lucirte y sorprender a todos tus comensales. Su diseño y funcionalidad te garantizan el mejor desempeño para que elabores tus platos de una manera cómoda y práctica.\n\nSeguridad para tu hogar\nEn caso de que se apague la llama, la válvula de seguridad incorporada bloqueará la salida de gas, evitando derroches y accidentes. Así, ¡solo tendrás que preocuparte por cocinar!\n\nTemporizador incorporado\nCon esta función podrás programar el tiempo de cocción de los alimentos evitando así el recalentamiento. Esto te permitirá hacer otras tareas del hogar dejando que el horno haga todo el trabajo. Además evitarás las molestias de que se quemen tus comidas por cualquier descuido.",
    foto: "https://http2.mlstatic.com/D_NQ_NP_845203-MLA40242429396_122019-O.webp",
    nombre: "Cocina Whirlpool WFX57DI",
    precio: 83899,
    stock: 25
  }){
    nombre
    id
  }
}

mutation updateProduct{
  updateProductById(id: "62ba41cfb0225a36e8297c10", payload:{
    nombre: "Cocina Whirlpool WFX57DI gas natural"
  }){
    nombre
  }
}

mutation deleteProduct{
  deleteProductById(id: "62ba41cfb0225a36e8297c10"){
    sucess
  }
}
```