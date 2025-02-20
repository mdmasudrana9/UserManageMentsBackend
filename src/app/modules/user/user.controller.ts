import { Request, Response } from 'express'
import { userService } from './user.service'
import userZodValidationSchema from './user.validation'

const createUser = async (req: Request, res: Response) => {
  try {
    const { userData } = req.body.user
    const zodparseData = userZodValidationSchema.parse(userData)
    const result = await userService.userCreateIntoDB(zodparseData)
    res.status(200).json({
      success: true,
      message: 'User created successfully',
      data: result,
    })
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Some Thing went wrong',
      error: error,
    })
  }
}

const getAllUser = async (req: Request, res: Response) => {
  try {
    const result = await userService.getAllUserIntoDB()
    res.status(200).json({
      success: true,
      message: 'All user fatched successfully',
      data: result,
    })
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Something went Wrong',
      error: error,
    })
  }
}

const getSingleuser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params
    const result = await userService.getSingleUSerIntoDB(userId)
    res.status(200).json({
      success: true,
      message: 'Single user fatched successfully',
      data: result,
    })
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Somethings went Wrong',
      error: error,
    })
  }
}

const updateUser = async (req: Request, res: Response) => {
  const { userId } = req.params
  const updateUserData = req.body
  try {
    const result = await userService.updateSingleUserIntoDB(
      userId,
      updateUserData,
    )
    res.status(200).json({
      success: true,
      message: 'update user successfully',
      data: result,
    })
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Some things went wrong',
      error: error,
    })
  }
}

const softDeleteUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params
    const result = await userService.deleteSingleUserIntoDB(userId)
    res.status(200).json({
      success: true,
      message: 'user delete successfully',
      data: result,
    })
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Some Thing went wrong',
      error: error,
    })
  }
}

export const userController = {
  createUser,
  getAllUser,
  getSingleuser,
  updateUser,
  softDeleteUser,
}
