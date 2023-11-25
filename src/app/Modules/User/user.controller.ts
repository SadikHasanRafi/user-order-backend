import { Request, Response } from "express"
import { userService } from "./user.service"

const createNewUser = async (req: Request, res: Response) => {
  try {
    const data = req.body
    const newUser = await userService.insertSingleUserIntoDB(data)
    res.status(200).send(newUser)
  } catch (error) {
    res.status(500).send(error)
  }
}

const getAllUsers = async (req: Request, res: Response) => {
  try {
    const allUsers = await userService.getAllUsersFromDB()
    res.send(allUsers)
  } catch (error) {
    res.status(500).send(error)
  }
}

const getSingleUser = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId //here userId is only string
    const result = await userService.getSingleDataFromDB(Number(userId))
    res.send(result)
  } catch (error) {
    res.status(500).send(error)
  }
}

const updateSingleUser = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId
    const result = await userService.updateSingleUserInDB(Number(userId))
    res.status(200).send(result)
  } catch (error) {
    res.status(500).send(error)
  }
}

export const userController = {
  createNewUser,
  getAllUsers,
  getSingleUser,
  updateSingleUser,
}
