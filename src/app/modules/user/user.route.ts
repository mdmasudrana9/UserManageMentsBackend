import express from 'express'
import { userController } from './user.controller'

const router = express.Router()

//will call the controller function to create a student

router.post('/create-user', userController.createUser)
router.get('/', userController.getAllUser)
router.get('/:userId', userController.getSingleuser)
router.patch('/:userId', userController.updateUser)
router.delete('/:userId', userController.softDeleteUser)

export const userRoutes = router
