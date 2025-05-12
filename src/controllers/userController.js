//NESTE ARQUIVO IREMOS PROGRAMAR O QUE SERÁ FEITO AO ACESSAR AQUELA ROTA
import { PrismaClient } from '@prisma/client';//IMPORTAR O PRISMA CLIENT PARA USAR OS METODOS PRONTOS PARA O CRUD
const prisma = new PrismaClient();

//RETORNAR TODOS OS USUARIOS
export const getAllUsers = async (req, res) => {
    try {
        const users = await prisma.user.findMany({
            // omit:{
            //     password:true
            // }
        })
        res.status(200).json(users)
    } catch (error) {
        res.status(500).json({ message: "erro ao procurar usuarios!" })
    }
}

//CRIAR USUARIO
export const postCreateUsers = async (req, res) => {

    try { //se der certo
        const { name, email,password } = req.body
       
            const newUsuario = await prisma.user.create({
                data: { name, email,password }
            })
            res.status(201).json(newUsuario)
    }
    catch (error) {
        //se der errado
        res.status(500).json({
            message: "erro ao criar usuario!",
            error: error.message
        })
    }
}

//DELETAR USUARIO
export const deleteUser = async (req, res) => {
    try {
        const id = parseInt(req.params.id)
        await prisma.user.delete({ where: { id } })
        res.status(200).json({ message: 'delete' })
    } catch (error) {
        res.status(500).json({
            message: "usuario com este id não existe!",
            error: error.message
        })
    }
}

//ATUALIZAR USUARIO
export const updateUser = async (req, res) => {
    const id = parseInt(req.params.id)
    const { name, email,password } = req.body
    try {
        await prisma.user.update({ where: { id }, data: { name, email,password } })
        if (!name && !email && !password) {
            res.status(400).json({ message: "é necessário atualizar ao menos um campo!" })
        }
        res.status(200).json({ message: 'usuario atualizado!' })
    } catch (error) {
        res.status(500).json({
            message: "não foi possivel atualizar usuario!",
            error: error.message
        })
    }
}

//RETORNAR USUARIO POR ID
export const getUserId = async (req, res) => {
    try {
        const id = parseInt(req.params.id)
        const users = await prisma.user.findUnique({ where: { id } })
        if (!users) {
            return res.status(400).json({ message: "Usuário com este id não existe!" })
        }
        res.json(users)
    }
    catch (error) {
        res.json(500).json({
            message: "erro ao procurar usuario!",
            error: error.message
        })
    }
}

//RETORNAR POR ID COM CONDIÇÃO
export const getUserFilterId = async (req, res) => {
    const letra = req.body.letra
    const userers = await prisma.user.findMany({
        where: {
            name: {
                startsWith: letra,
            },
        },
    })
    res.status(200).json(userers)
}