# Desafio websockets
- [Desafio websockets](#desafio-websockets)
- [Consigna](#consigna)
- [Nuevas secciones:](#nuevas-secciones)

# Consigna

1. Puede haber varios clientes conectados simultáneamente y en cada uno de ellos se reflejarán
    los cambios que se realicen en los productos sin necesidad de recargar la vista.

2. Cuando un cliente se conecte, recibirá la lista de productos a representar en la vista.

3. En la parte inferior del formulario de ingreso se presentará el centro de mensajes almacenados en el
    servidor, donde figuren los mensajes de todos los usuarios identificados por su email.
   
4. El formato a representar será: email (texto negrita en azul) [fecha y hora (DD/MM/YYYY
    HH:MM:SS)](texto normal en marrón) : mensaje (texto italic en verde)

5. Además incorporar dos elementos de entrada: uno para que el usuario ingrese su email (obligatorio
    para poder utilizar el chat) y otro para ingresar mensajes y enviarlos mediante un botón.

6. Los mensajes deben persistir en el servidor en un archivo (ver segundo entregable).


# Nuevas secciones:
Se han añadido dos secciones: 
 - Lista de productos actualizable dinamicamente, usando websockets.
 - Chat con contenido dinamico, usando websockets.
<p align="center">
  <img src="https://github.com/stick2yourmind/BackendJS/blob/main/capturas_entrega/nuevas-secciones.JPG?raw=true" alt="nuevas secciones"/>
</p>
La sección de productos disponibles se actualiza dinamicamente al ingresar un nuevo producto.
La sección de chat posee un login de usuario, el usuario debe ser un email. Una vez logueado se visualizara la sección de chat y logout.
<p align="center">
  <img src="https://github.com/stick2yourmind/BackendJS/blob/main/capturas_entrega/seccion-chat-con-websockets-etapa-01.JPG?raw=true" alt="seccion de login"/>
</p>
Luego de logearse se visualizara la sala de chat junto a un mensaje de bienvenida:
<p align="center">
  <img src="https://github.com/stick2yourmind/BackendJS/blob/main/capturas_entrega/seccion-chat-con-websockets-etapa-02.JPG?raw=true" alt="seccion de login - bienvenida"/>
</p>
Para escribir un nuevo mensaje se utiliza el input y el boton de enviar o enter:
<p align="center">
  <img src="https://github.com/stick2yourmind/BackendJS/blob/main/capturas_entrega/seccion-chat-con-websockets-etapa-03.JPG?raw=true" alt="seccion de login - bienvenida"/>
</p>
Una vez enviado el mensaje se visualiza en la sala de chat y el mensaje es almacenado en el archivo chat.txt alojado en el servidor:
<p align="center">
  <img src="https://github.com/stick2yourmind/BackendJS/blob/main/capturas_entrega/seccion-chat-con-websockets-etapa-04.JPG?raw=true" alt="seccion de login - nuevo usuario"/>
</p>
Se posee persistencia del chat en un archivo llamado chat.txt alojado en el servidor, por lo tanto, es posible visualizar conversaciones
que ocurrieron incluso antes de loguearse con un nuevo usuario:
<p align="center">
  <img src="https://github.com/stick2yourmind/BackendJS/blob/main/capturas_entrega/seccion-chat-con-websockets-etapa-05.JPG?raw=true" alt="seccion de login - nuevo usuario"/>
</p>
De la misma manera varios usuarios pueden interactuar recibiendo los mensajes de manera inmediate, al dispararse un evento de websockets
se añade el contenido nuevo de manera dinamica:
<p align="center">
  <img src="https://github.com/stick2yourmind/BackendJS/blob/main/capturas_entrega/seccion-chat-con-websockets-etapa-06.JPG?raw=true" alt="seccion de login - nuevo comentario"/>
</p>
Ejemplo de un tercer usuario que interactua con otros usuarios que se conectaron incluso antes que este entrase a la sala de chat:
<p align="center">
  <img src="https://github.com/stick2yourmind/BackendJS/blob/main/capturas_entrega/seccion-chat-con-websockets-etapa-07.JPG?raw=true" alt="seccion de login - tercer usuario"/>
</p>
Si se desea salir de la sala solo es necesario presionar el boton "salir" y se volvera a la sección de login de usuario: 
<p align="center">
  <img src="https://github.com/stick2yourmind/BackendJS/blob/main/capturas_entrega/seccion-chat-con-websockets-etapa-07.JPG?raw=true" alt="seccion de login - tercer usuario"/>
</p>
