import express from 'express'
import { deleteUser, getAllUsers,getUserFilterId,getUserId,loginUser,postCreateUsers, registerUser, updateUser } from '../controllers/userController.js'
import { authenticate } from '../utils/auth.js'
const router = express.Router()

router.get("/",getAllUsers)
router.post("/",postCreateUsers)
router.delete("/:id",authenticate,deleteUser)//coloquei minha função authenticate
router.put("/:id",authenticate,updateUser)//coloquei minha função authenticate
router.get("/:id",getUserId)
router.get("/name/name/",getUserFilterId)
router.post("/register",registerUser)
router.post("/login",loginUser)

export default router