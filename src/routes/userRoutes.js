import express from 'express'
import { deleteUser, getAllUsers,getUserFilterId,getUserId,loginUser,postCreateUsers, registerUser, updateUser } from '../controllers/userController.js'
import { authenticate } from '../utils/auth.js'
import {validate} from '../middleware/validate.js'
import { createUserSchema, loginSchema, updateUserSchema } from '../schemas/userSchemas.js'
const router = express.Router()

router.get("/", getAllUsers)
router.delete("/:id",authenticate, deleteUser)//coloquei minha função authenticate
router.put("/:id", authenticate,validate(updateUserSchema), updateUser)
router.get("/:id", getUserId)
router.get("/name/name/", getUserFilterId)
router.post("/", validate(createUserSchema), postCreateUsers) //a função validate para validar os dados de criação
router.post("/register",registerUser)
router.post("/login",validate(loginSchema),loginUser)

export default router