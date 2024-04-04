import { secreto } from "../config.js";
import jwt from "jsonwebtoken" 

export function createaccesstoekn(payload){

    return new Promise((resolve, reject) => {
        jwt.sign(
        payload,
        secreto,
        {
            expiresIn: "1d",
        },
        (err,token) =>{
            if (err) reject(err);
            resolve(token)
        }
        
        );
    })
}