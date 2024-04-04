import {z} from 'zod';

export const registerSchema = z.object({
    username: z.string({
        required_error: 'Username es requerido'
    }),
    email: z.string({
        required_error: 'Email es requerido'
    }).email({
        message: 'Email invalido'
    }),
    password: z.string({
        required_error: 'Password is required'
    }).min(6,{
        message: 'Password debe tener al menos 6 caracteres'
    }),
    numeroTelefono: z.string({
        required_error:'numero telefonico requerido'
    }),
    rut: z.string({
        required_error:'rut requerido'
    }),
    sexo: z.string({
        required_error:'sexo requerido'
    }), 
    direccion: z.string({
        required_error:'direccion requerida'
    }),
    region: z.string({
        required_error:'region requerida'
    }),
    comuna: z.string({
        required_error:'comuna requerida'
    }),
    provincia: z.string({
        required_error:'provincia requerida'
    }),
})

export const loginSchema = z.object({
    email: z.string({
        required_error: 'Email es requerido'
    }).email({
        message: 'Email invalido'
    }),
    password: z.string({
        required_error: 'Password is required'
    }).min(6,{
        message: 'Password debe tener al menos 6 caracteres'
    })
})