import express from "express";
import { deleteProduct, getListProducts, getProductId, postProduct, putProduct } from "../controllers/productController.js";
import { CreateProduct, UpdateProduct } from "../schemas/productSchemas.js";
import { validate } from "../middleware/validate.js";
const router = express.Router()

//cria um novo produto
router.get("/",getListProducts)
//lista todos os produtos
router.post("/",validate(CreateProduct),postProduct)
//busca um produto pelo ID
router.get("/:id",getProductId)
// atualiza um produto pelo ID
router.put("/:id",validate(UpdateProduct),putProduct)
//remove um produto pelo ID
router.delete("/:id",deleteProduct)

export default router