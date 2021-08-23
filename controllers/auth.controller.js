const {response} = require('express'); 
const Usuario = require('../models/Usuario');
const bcrypt = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt');


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
        const token = await generarJWT(dbUser.id,name); 

        //Crear usuario de DB 
        await dbUser.save(); 

        //Respuesta exitosa
        return res.status(201).json({
            ok:true,
            uid:dbUser.id,
            name, 
            email,
            token
        }); 

    }catch(error){
        console.log("Error",error)
        return res.status(500).json({
            ok:false,
            msg:'Por favor hable con el administrador'
        });
    }
}

const loginUsuario = async (req, res=response)=>{
    const {email, password} = req.body; 
    try{

        const dbUser = await Usuario.findOne({email})
        if(!dbUser ){
            return res.status(400).json({
                ok:false,
                msg:'Las credenciales no son válidas'
            }); 
        }
        const validPassword = bcrypt.compareSync(password,dbUser.password);
        if(!validPassword){
            return res.status(400).json({
                ok:false,
                msg:'Las credenciales no son válidas'
            }); 
        }

        //Generar JWT
        const token = await generarJWT(dbUser.id, dbUser.name); 

        //Respuesta correcta
        return res.json({
            ok:true,
            uid:dbUser.id,
            name: dbUser.name, 
            email,
            token
        })
    }catch(error){
        console.log(error);
        return res.status(500).json({
            ok:false,
            msg: 'Hable con el administrador'
        }); 
    }
    return res.json({
        ok:true,
        msg:'Login usuario /new'
    })
}

const revalidarToken = async (req, res)=>{
    const {uid} = req; 
    // leer BD
    const dbUser = await Usuario.findById(uid); 



    const token = await generarJWT(uid,dbUser.name);
    return res.json({
        ok:true,
        uid,
        name:dbUser.name,
        email:dbUser.email,
        token
    })
}


module.exports = {
    crearUsuario,
    loginUsuario, 
    revalidarToken
}