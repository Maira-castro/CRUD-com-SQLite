import express from 'express'
import { deleteUser, getAllUsers,getUserFilterId,getUserId,postCreateUsers, updateUser } from '../controllers/userController.js'
const router = express.Router()

router.get("/",getAllUsers)
router.post("/",postCreateUsers)
router.delete("/:id",deleteUser)
router.put("/:id",updateUser)
router.get("/:id",getUserId)
router.get("/name/name/",getUserFilterId)
export default router