import User from '../models/usuario.model.js'
import bcrypt from 'bcryptjs'
import { createaccesstoekn } from '../libs/jwt.js'
import jwt from 'jsonwebtoken'
import { secreto } from '../config.js'

export const register = async (req, res) => {
    const { username, email, password, rut, numeroTelefono, fechaNacimiento, sexo, direccion, region, comuna, provincia } = req.body

    try {

        const userFound = await User.findOne({ email })
        if (userFound)
            return res.status(400).json(["email ya existente"])

        const passwordHash = await bcrypt.hash(password, 10)

        const newuser = new User({
            username,
            email,
            password: passwordHash,
            rut,
            numeroTelefono,
            fechaNacimiento,
            sexo,
            direccion,
            region,
            comuna,
            provincia
        })
        const userSaved = await newuser.save();

        const token = await createaccesstoekn({ id: userSaved._id })
        res.cookie('token', token);

        res.json({
            id: userSaved._id,
            username: userSaved.user,
            email: userSaved.email,

            creacion: userSaved.createdAt,
            actualizado: userSaved.updatedAt
        })

    } catch (error) {
        res.status(500).json({ message: error.message });
    }

}

export const login = async (req, res) => {

    const { email, password } = req.body

    try {
        const registrado = await User.findOne({ email });
        if (!registrado) return res.status(400).json({ message: "Email incorrecto" })

        const P_correcta = await bcrypt.compare(password, registrado.password);
        if (!P_correcta) return res.status(400).json({ message: "Contraseña incorrecta" })


        const token = await createaccesstoekn({ id: registrado._id })
        res.cookie('token', token);

        res.json({
            id: registrado._id,
            username: registrado.user,
            email: registrado.email,
            creacion: registrado.createdAt,
            actualizado: registrado.updatedAt
        })

    } catch (error) {
        res.status(500).json({ message: error.message });
    }


}

export const logout = (req, res) => {
    res.cookie('token', "", {
        expires: new Date(0),
    })
    return res.sendStatus(200);
}

export const profile = async (req, res) => {

    const userFound = await User.findById(req.user.id)

    if (!userFound) return res.status(400).json({ message: "no usuario" });

    return res.json({
        id: userFound._id,
        username: userFound.user,
        email: userFound.email,
    })

}

export const verifyToken = async (req, res) => {
    const { token } = req.cookies

    if (!token) return res.status(401).json({ message: 'no autorizado' })

    jwt.verify(token, secreto, async (err, user) => {
        if (err) return res.status(401).json({ message: 'no autorizado' })

        const userFound = await User.findById(user.id)
        if (!userFound) return res.status(401).json({ message: 'no autorizado' })

        return res.json({
            if: userFound._id,
            username: userFound.username,
            email: userFound.email,
        })
    })
}