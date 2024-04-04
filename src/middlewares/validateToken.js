import jwt  from "jsonwebtoken";
import { secreto } from "../config.js";

export const authRequired = (req,res,next) =>{

    const {token} = req.cookies;
    if(!token)
         return res.status(401).json({message:"falta iniciar sesion"});

             jwt.verify(token, secreto, (err,user) =>{
                 if (err) return res.status(403).json({message: "invalidtoken"});

                 req.user = user

                 next();

            })


}