const express = require('express'); 
const cors = require( 'cors');
const path = require('path');
const { dbConnection } = require('./db/config');
require('dotenv').config()
//Crear el servidor de expreesss
//console.log(process.env)
const app=express(); 


/**----BASE DE DATOS--------- */

dbConnection()

app.listen(process.env.PORT,()=>{
    console.log('Servidor corriendo en el puerto',4000);
})

/**MIDDLEWARES */

/**---------PUBLIC-------------- */
app.use(express.static('public'))

//cors 
app.use(cors()); 
//LECTURA Y PARSEO DEL BODY
app.use(express.json()); 



//Rutas
app.use('/api/auth',require('./routes/auth'))

//Manejar las demás rutas
app.get('*',(req,res)=>{
    res.sendFile(path.resolve(__dirname, 'public/index.html')); 
})
