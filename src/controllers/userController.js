//NESTE ARQUIVO IREMOS PROGRAMAR O QUE SERÁ FEITO AO ACESSAR AQUELA ROTA
import { PrismaClient } from '@prisma/client';//IMPORTAR O PRISMA CLIENT PARA USAR OS METODOS PRONTOS PARA O CRUD
import { generateToken, hashPassword } from "../utils/auth.js"
import bcrypt from 'bcrypt'
const prisma = new PrismaClient();

//RETORNAR TODOS OS USUARIOS
export const getAllUsers = async (req, res) => {
    try {
        const users = await prisma.user.findMany()
        res.status(200).json(users)
    } catch (error) {
        res.status(500).json({ message: "erro ao procurar usuarios!" })
    }
}

//CRIAR USUARIO
export const postCreateUsers = async (req, res) => {
    try {
        const { name, email, password } = req.body
        //se der certo
        if (!name || !email) {
            res.status(400).json({ erro: "Os dados são obrigatorios!" })
        } else {
            const newUsuario = await prisma.user.create({
                data: { name, email, password }
            })
            res.status(201).json(newUsuario)
        }
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
    const { name, email } = req.body
    try {
        await prisma.user.update({ where: { id }, data: { name, email } })
        if (!name && !email) {
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

//REGISTRAR USUARIO
export const registerUser = async (req, res) => {
    const { name, email, password } = req.body
    try {
        //criar a senha do usuário hasheada
        const hashedPassword = await hashPassword(password)

        //cria o usuario no banco de dados
        //onde iremos guardar a senha já hasheada
        const newRegistedUser = await prisma.user.create({
            data: {
                name: name,
                email: email,
                password: hashedPassword
            }
        })

        //gerar um token JWT
        //   const token = generateToken(newRegistedUser)

        res.status(201).json({
            name: newRegistedUser.name,
            email: newRegistedUser.email,
            // token: token
        })
    } catch (error) {
        res.status(400).json({
            message: "erro ao registrar usuario!",
            detalhes: `${error.message} \n ${error.stack}`,

        })
    }
}

//FAZENDO LOGIN
export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body; //passo o email e senha 
    
        const usuario = await prisma.user.findUnique({ where: { email } });// Verifica se o usuário existe com base no email

        if (!usuario) {
            return res.status(400).json({ message: "Usuário não encontrado" });
        }//se nao encontrar usuario
    
        const senhaValida = await bcrypt.compare(password, usuario.password);// Compara a senha fornecida com a senha hasheada do banco

        if (!senhaValida) {
            return res.status(401).json({ message: "Senha inválida" });
        }//se a senha não estiver de acordo com a base de dados

        const token = generateToken(usuario);// Gera o token JWT

        res.status(200).json({
            message: "Login realizado com sucesso!",
            token: token,
        });
        
        
    } catch (error) {
        res.status(500).json({
            message: "Erro ao fazer login",
            detalhes: `${error.message}\n${error.stack}`,
        });
    }
};
