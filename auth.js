import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import "dotenv/config";
import models from './models'

const auth = {
    checkHeaders: async (req, res, next) => {
        const token = req.headers["x-token"];
        if(token){
          try{
            const {usuario, email} = jwt.verify(token, process.env.SECRET )
            req.usuario = usuario
            req.email = email
          }catch(e){
            //INVALID token
            const newToken = await auth.checkToken(token)
            req.usuario = newToken.usuario
            req.email = newToken.email
            if(newToken.token){
              res.set("Access-Control-Expose-Headers", "x-token")
              res.set("x-token", newToken.token)
            }
          }
        }
        next()
      },
      checkToken: async (token) =>{
        let idUsuario=null;
        try{
          const {usuario} = await jwt.decode(token);
          idUsuario=usuario;
        }catch(e){
          return {}
        }
        const usuario = await models.Usuario.findOne({_id:idUsuario});
        const [newToken] = auth.getToken(usuario)
        return {
          usuario: usuario._id,
          email: usuario.email,
          token: newToken
        }
      },
      getToken:  ({_id, email} )=>{
        const newToken = jwt.sign({usuario: _id, email: email }, process.env.SECRET, { expiresIn: '10s'})
        // const refreshToken = jwt.sign({usuario: _id}, process.env.SECRET, { expiresIn: '10m'})
    
        return [newToken];
      },
    // getToken: ({_id}, SECRET) => {
    //     const newToken = jwt.sign({usuario: _id}, process.env.SECRET, {expiresIn: '5d'})
    //     const refreshToken = jwt.sign({usuario: _id}, process.env.SECRET, {expiresIn: '10m'})

    //     return [newToken, refreshToken];
    // },
    login: async (email, claveDeAcceso, Usuario) => {
        const usuario = await Usuario.findOne({email})
        if(!usuario){
            return {
                success: false,
                errors: [{path: 'email', message: 'Correo no existe'}]
            }
        }
        const validClaveDeAcceso = await bcrypt.compare(claveDeAcceso, usuario.claveDeAcceso)
        if(!validClaveDeAcceso){
            return {
                success: false,
                errors: [{path: 'Clave de acceso', message: 'Clave de acceso inválida'}]
            }
        }
        
        const [token] = auth.getToken(usuario)
        // const [token, refreshToken] = auth.getToken(usuario)
        // console.log(token);
        // console.log(refreshToken);

        return {
            success: true,
            token,
            errors: []
        }
    }
}

export default auth