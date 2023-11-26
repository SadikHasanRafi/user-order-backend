import { Request, Response } from "express"
import { userService } from "./user.service"
import errorMessage from "../../Utility/errorResponse"

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
    const err = errorMessage(
      false,
      "Found some issue in this route.",
      500,
      "Found some issue in this route."
    )
    res.send(err)
  }
}

const getSingleUser = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId //here userId is only string
    const result = await userService.getSingleDataFromDB(Number(userId))
    res.send(result)
  } catch (error) {
    const err = errorMessage(
      false,
      "User not found",
      404,
      "User not found"
    )
    res.send(err)
  }
}

const updateSingleUser = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId
    const updatedData = req.body
    const result = await userService.updateSingleUserInDB(Number(userId),updatedData)
    res.status(200).send(result)
  } catch (error) {

    res.send(error)
  }
}

const deleteSingleUser = async (req:Request,res:Response) => {
  try {
    const userId = req.params.userId
    const result = await userService.deleteSingleUserInDB(Number(userId))
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
  deleteSingleUser
}
