import { z } from 'zod'

//name -> tem que ser string e com minimo de 3 caractere
//email -> tem que ser string com o tipo email
//password -> tem que ser string e com minimo de 6 caractere

//CREATE USUARIO
 export const createUserSchema = z.object({
    name: z.string().min(3),
    email: z.string().email(),
    password: z.string().min(8).regex(/[A-Za-z]/)
})

//UPDATE USUARIO - optional() -> o usuario nao é obrigado a atualizar todos os campos
export const updateUserSchema = z.object({
    name: z.string().min(3).optional(),
    email: z.string().email().optional(),
    password: z.string().min(8).regex(/[A-Za-z]/).optional()
})

