import { User } from "./user.interface"
import UserModel from "./user.model"

const insertSingleUserIntoDB = async (userData: User) => {
  await console.log(
    "🚀 ~ file: user.service.ts:7 ~ insertSingleUserIntoDB ~ userData:",
    userData,
  )
  const result = await UserModel.create(userData)
  return result
}

const getAllUsersFromDB = async () => {
  const result = await UserModel.find()
  return result
}

const getSingleDataFromDB = async (userId: number) => {
  const user = new UserModel()
  if (await user.isUserExists(userId)) {
    const data = await UserModel.findOne({
      userId: userId,
    })
    return data
  }

  return null
}

//todo start work from here update a single data
//todo here I have to get specific that field that has not been updated
const updateSingleUserInDB = async (userId: number) => {
  const user = new UserModel()

  if (await user.isUserExists(userId)) {
    const data = await UserModel.updateOne(
      { userId: userId },

      {
        $set: {
          plot: `A harvest of random numbers, such as: ${Math.random()}`,
        },
      },
      { upsert: false },
    )
    return data
  }

  return null
}

export const userService = {
  insertSingleUserIntoDB,
  getAllUsersFromDB,
  getSingleDataFromDB,
  updateSingleUserInDB,
}
