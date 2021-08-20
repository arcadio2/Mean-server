const  mongoose  = require("mongoose");


const dbConnection= async()=>{
    try{
        await mongoose.connect(process.env.BD_CNN, {
            useNewUrlParser:true,
            useUnifiedTopology:true,
            useCreateIndex:true
        });
        console.log('BAse de datos a la escucha')

    }catch(error){
        console.log(error); 
        throw new Error('Error al iniciar base de datos');
    }
}


module.exports = {
    dbConnection
}