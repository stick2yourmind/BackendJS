# Desafio motores de plantilla
- [Consigna](#consigna)
- [Uso de motores de plantilla](#uso-de-motores-de-plantilla)
- [Conclusión y motor de plantilla preferido](#conclusion-y-motor-de-plantilla-preferido)

# Consigna
Utilizando la misma API de productos del proyecto entregable de la clase
anterior, construir un web server (no REST) que incorpore:

1. Un formulario de carga de productos en la ruta raíz (configurar la ruta
    '/productos' para recibir el POST, y redirigir al mismo formulario).

2. Una vista de los productos cargados (utilizando plantillas de
    handlebars) en la ruta GET '/productos'.

3. Ambas páginas contarán con un botón que redirija a la otra.
   
4. Manteniendo la misma funcionalidad reemplazar el motor de plantillas
    handlebars por pug.

5. Manteniendo la misma funcionalidad reemplazar el motor de plantillas
    handlebars por ejs.

6. Por escrito, indicar cuál de los tres motores de plantillas prefieres para tu
    proyecto y por qué.

# Uso de motores de plantilla
Los motores de plantillas fueron implementadas en diferentes branchs, pero antes de poder utilizarlas se debe clonar el repositorio y hacer un 
fetch de todas las branch.

### Pasos iniciales antes de implementar la branch deseada:
```
git clone https://github.com/stick2yourmind/BackendJS.git
cd BackendJS
git branch -r | grep -v '\->' | sed "s,\x1B\[[0-9;]*[a-zA-Z],,g" | while read remote; do git branch --track "${remote#origin/}" "$remote"; done
git fetch --all
git pull --all
```

### Implementación de los diferentes motores de plantillas:
 - [Motor de plantilla Handlebars: Implementado en la branch main](#motor-de-plantilla-handlebars-implementado-en-la-branch-main)
 - [Motor de plantilla Pug: Implementado en la branch pugRendered](#motor-de-plantilla-pug-implementado-en-la-branch-pugrendered)
 - [Motor de plantilla Ejs: Implementado en la branch ejsRendered](#motor-de-plantilla-ejs-implementado-en-la-branch-ejsrendered)
#### Motor de plantilla Handlebars: Implementado en la branch main:
```
git stash
git checkout main
npm install
```
#### Motor de plantilla Pug: Implementado en la branch pugRendered:
```
git stash
git checkout pugRendered
npm install
```
#### Motor de plantilla Ejs: Implementado en la branch ejsRendered:
```
git stash
git checkout ejsRendered
npm install
```

# Conclusion y motor de plantilla preferido:
El motor de plantilla Pug fue mi preferido, pude realizar lo mismo con menos código y lo mejor es que quedo mucho mas legible.
La única consideración es tener cuidado con la identación.

Handlebars y EJS son mas amigables, para la primera vez que se usa un motor de plantillas, pero añaden mas lineas de código 
de las que me gustan: al mantener la estructura de maquetación con las etiquetas es sencillo de interpretar. 

EJS en particular no me gustó nada, su uso obliga al excesivo uso de etiquetas <%, <%=, <%=- y %>. Al tener que agregar 
mas etiquetas tambien se perdia la identación de los nodos internos cuando es necesario utilizar código javascript, dificultando la interpretación.
