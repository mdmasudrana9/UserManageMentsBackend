import { Tuser } from './user.interface'
import { userModel } from './user.model'

const userCreateIntoDB = async (userData: Tuser) => {
  const result = await userModel.create(userData)
  return result
}

const getAllUserIntoDB = async () => {
  const result = await userModel.find()
  return result
}

const updateSingleUserIntoDB = async (
  userId: string,
  updateUserData: Partial<Tuser>,
) => {
  const result = await userModel.findOneAndUpdate(
    { userId },
    { $set: updateUserData },
    { new: true, runValidators: true },
  )
  return result
}

const getSingleUSerIntoDB = async (userId: any) => {
  const result = await userModel.findOne({ userId })
  return result
}

const deleteSingleUserIntoDB = async (userId: any) => {
  const result = await userModel.updateOne(
    { userId },
    { $set: { isDelete: true } },
  )
  return result
}

export const userService = {
  userCreateIntoDB,
  getSingleUSerIntoDB,
  getAllUserIntoDB,
  updateSingleUserIntoDB,
  deleteSingleUserIntoDB,
}
