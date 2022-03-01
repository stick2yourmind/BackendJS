const fs = require('fs')
const colors = require('colors')

const NEW_FILE = 1

const arrObj = [{                                                                                                                                                    
    title: 'Escuadra',                                                                                                                                 
    price: 123.45,                                                                                                                                     
    thumbnail: 'https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png'                                                                                                                                                                               
  },                                                                                                                                                   
  {                                                                                                                                                    
    title: 'Calculadora',                                                                                                                              
    price: 234.56,                                                                                                                                     
    thumbnail: 'https://cdn3.iconfinder.com/data/icons/education-209/64/calculator-math-tool-school-256.png'                                                                                                                                                                                  
  },                                                                                                                                                   
  {                                                                                                                                                    
    title: 'Globo Terráqueo',                                                                                                                          
    price: 345.67,                                                                                                                                     
    thumbnail: 'https://cdn3.iconfinder.com/data/icons/education-209/64/globe-earth-geograhy-planet-school-256.png'                                                                                                                                                                               
  }]


const resetFileFn = async (path) => {
    try {
        fs.promises.writeFile(path, '')
    }
    catch(err){
        console.log(`Error in resetFileFn: \n
        ${err}`)
    }
        
}
const saveFn = async (path, data, isNew=0) => {
    let id = null
    // console.log(`isNew: ${isNew}`)
    try {
        if(data.id == 1 || isNew==NEW_FILE)
            fs.promises.appendFile(path, `${JSON.stringify(data)}`)
            else
            fs.promises.appendFile(path, `, ${JSON.stringify(data)}`)
        id = data.id
    }
    catch(err){
        console.log(`Ha ocurrido un error al intentar guardar el objeto 
        con id: ${data.id}`)
    }
    finally{
        return id
    }
        
}

const lastID = (path, encode) => {
    let lastID = 0
    try{
        let dataReaded = fs.readFileSync(path, encode)
        let arrReaded = dataReaded.match(/{[\n\r'"\wáéíóú¿?¡! :,.\/-]+[}]/g)
        lastID = JSON.parse(arrReaded.pop()).id
    }
    catch(err){
        console.log(`Error in lastID: Probablemente archivo vacio. id inicial será 1.`)
    }
    finally{
        return lastID
    }
}

const readFnId = async(path, encode, id) => {
    let objSelected = null
    try{
        let strReaded = await fs.promises.readFile(path, encode)
        let arrReaded = strReaded.match(/{[\n\r'"\wáéíóú¿?¡! :,.\/-]+[}]/g)
        for(let i=0; i<arrReaded.length; i++){
            let objAux = JSON.parse(arrReaded[i])
            if(objAux.id == id){
                objSelected = objAux
                break
            }
        }
        if(objSelected === null)
            throw (`--- Error when tried to get an specified object, there is no object with id: ${id}, obj returned will be null ---`)
    }
    catch(err){
        console.log(`Error in readFnId: \n
        ${err}`)
    }
    finally{
        return objSelected
    }
}

const readFnAll = async(path, encode) => {
    let arrAll = null
    try{
        let strReaded = await fs.promises.readFile(path, encode)
        arrAll = strReaded.match(/{[\n\r'"\wáéíóú¿?¡! :,.\/-]+[}]/g)
        for(i=0; i<arrAll.length; i++){
            arrAll[i] = JSON.parse(arrAll[i])
        }
    }
    catch(err){
        console.log('error in readFnId: empty file or unable to access.')
    }
    finally{
        return arrAll
    }
}

const deleteFnID = async(path, id) => {
    let arrAllData, i = 0
    try{
        arrAllData = await readFnAll(path, 'utf-8')
        for(; i<arrAllData.length; i++){
            let objAux = JSON.parse(arrAllData[i])
            if(objAux.id == id){
                arrAllData.splice(i, 1)
                resetFileFn(path)
                    .then(()=>{
                        saveFn(path, JSON.parse(arrAllData[0]), NEW_FILE)
                        for(i=1;i<arrAllData.length;i++){
                            saveFn(path, JSON.parse(arrAllData[i]))
                        }
                    })                 
            }
        }
    }
    catch(err){
        console.log(`Error in deleteFnID: ${err}`)
    }
}

class fileChat{
    constructor(fileName){
        this.id = new Number(lastID(fileName, 'utf-8') + 1)
        this.fileName = fileName
    }
    save(objectToSave){
        // Guardar objeto y retorna su id
        objectToSave['id'] = this.id++
        return saveFn(`./${this.fileName}`, objectToSave)
    }
    getById(id){
        // Retorna el objeto con el id indicado o null si no existe
        return readFnId(`./${this.fileName}`, 'utf-8', id)
    }
    getAll(){
        // Retorna un array con todos los objetos
        return readFnAll(`./${this.fileName}`, 'utf-8')
    }
    deleteById(id){
        // Elimina el objeto con el id indicado
        return deleteFnID(`./${this.fileName}`, id)
    }
    deleteAll(){
        // Elimina todos los objetos del presente archivo
        return resetFileFn(`./${this.fileName}`)
    }

}

const test = async() =>{
nuevoArchivo = new fileChat('productos.txt')
let id = await nuevoArchivo.save(arrObj[0])
console.log(colors.bold.bgWhite.black(`Objeto guardado, id: ${id} \n`))
id = await nuevoArchivo.save(arrObj[1])
console.log(colors.bold.bgWhite.black(`Objeto guardado, id: ${id} \n`))
id = await nuevoArchivo.save(arrObj[2])
console.log(colors.bold.bgWhite.black(`Objeto guardado, id: ${id} \n`))
let obj = await nuevoArchivo.getById(5)
console.log(colors.bold.bgWhite.black(`Lectura del objeto con id: ${obj.id}`), `\n ${JSON.stringify(obj)}`)
let arr = await nuevoArchivo.getAll()
console.log(colors.bold.bgWhite.black(`Lectura de todos los objetos del archivo:`), `\n ${arr}`)
console.log(`Tipo de arr: ${typeof(arr)}`)
await nuevoArchivo.deleteById(3)
console.log(colors.bold.bgWhite.black(`Eliminado el elemento con id 3, se verificará con un getAll.`))
arr = await nuevoArchivo.getAll()
console.log(colors.bold.bgWhite.black(`Lectura de todos los objetos del archivo:`), `\n ${arr}`)
// await nuevoArchivo.deleteAll()
// console.log(colors.bold.bgWhite.black(`Eliminado todos los elementos del archivo. Se verificará con un getAll.`))
arr = await nuevoArchivo.getAll()
console.log(colors.bold.bgWhite.black(`Lectura de todos los objetos del archivo:`), `\n ${arr}`)
}

// test()

module.exports = {
    fileChat,
    arrObj
}