import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient()

//criar um novo produto
export const postProduct = async (req, res) => {
    try {
        const { name, description, price, stock } = req.body
        const create = await prisma.product.create({
            data: {
                name, description, price, stock
            }
        })
        res.status(201).json(create)
    } catch (error) {
        res.status(500).json({ message: "erro ao adicionar produto!" })
    }
}

//listar todos os produtos
export const getListProducts = async (req, res) => {
    try {
        const list = await prisma.product.findMany()
        res.status(200).json(list)
    } catch (error) {
        res.status(500).json({ message: "erro ao retornar produtos!" })
    }
}

//procurar por id
export const getProductId = async (req, res) => {
    try {
        const id = parseInt(req.params.id)
        const productByID = await prisma.product.findUnique({
            where: { id }
        })
        if(!productByID){
            res.status(404).json({message:"produto com esse id não existe!"})
        }
        res.status(200).json(productByID)
    } catch (error) {
        res.status(500).json({ message: "erro ao procurar produto!" })
    }
}

//atualizar produto
export const putProduct = async (req, res) => {
    try {
        const id = parseInt(req.params.id)
        const { name, description, price, stock } = req.body
        const updateProduct = await prisma.product.update({
            where: {
                id
            },
            data: { name, description, price, stock }
        })
        res.status(200).json(updateProduct)
    }
    catch (error) {
        res.status(500).json({ message: "erro ao atualizar produto!" })
    }
}

//deletar produto
export const deleteProduct = async (req, res) => {
    try {
        const id = parseInt(req.params.id)
        await prisma.product.delete({
            where: { id }
        })
        res.json({ message: "produto excluido com sucesso!" })
    } catch (error) {
        res.status(500).json({ message: "erro ao deletar produto!" })
    }
}