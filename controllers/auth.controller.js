const {response} = require('express'); 
const Usuario = require('../models/Usuario');
const bcrypt = require('bcryptjs');


const crearUsuario = async (req, res=response)=>{

    const {email, name, password} = req.body; 
    try{
        //Verificar email
        let usuario = await Usuario.findOne({email});
        if(usuario){
            return res.status(400).json({
                ok:false,
                msg:'El email ya está registrado'
            });
        }
        //Crear usuario con el modelo 
        dbUser = new Usuario(req.body);
        //Hashear la contraseña
        const salt  = bcrypt.genSaltSync();
        dbUser.password = bcrypt.hashSync(password,salt); 
        //Hashear la contraseña


        //Generar JWT
    

        //Crear usuario de DB 
        await dbUser.save(); 

        //Respuesta exitosa
        return res.status(201).json({
            ok:true,
            uid:dbUser.id,
            name
        }); 

    }catch(error){
        console.log("Error",error)
        return res.status(500).json({
            ok:false,
            msg:'Por favor hable con el administrador'
        });
    }
}

const loginUsuario = (req, res=response)=>{
    const {email, password} = req.body; 
    
    return res.json({
        ok:true,
        msg:'Login usuario /new'
    })
}

const revalidarToken = (req, res)=>{
    return res.json({
        ok:true,
        msg:'Renew'
    })
}


module.exports = {
    crearUsuario,
    loginUsuario, 
    revalidarToken
}