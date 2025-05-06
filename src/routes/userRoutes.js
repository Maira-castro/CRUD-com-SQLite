import express from 'express'
import { deleteUser, getAllUsers, getUserFilterId, getUserId, postCreateUsers, updateUser } from '../controllers/userController.js'
import { validate } from '../middleware/validate.js'
import { createUserSchema, updateUserSchema } from '../schemas/userSchemas.js'
const router = express.Router()

router.get("/", getAllUsers)
router.post("/", validate(createUserSchema), postCreateUsers) //a função validate para validar os dados de criação
//e atribuir o schema correspondete
router.delete("/:id", deleteUser)
router.put("/:id", validate(updateUserSchema), updateUser)
router.get("/:id", getUserId)
router.get("/name/name/", getUserFilterId)

export default router