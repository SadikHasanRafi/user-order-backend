import { Request, Response } from "express"
import { userService } from "./user.service"
import errorMessage from "../../Utility/errorResponse"

const createNewUser = async (req: Request, res: Response) => {
  try {
    const data = req.body
    const newUser = await userService.insertSingleUserIntoDB(data)
    res.status(200).send(newUser)
  } catch (error) {
    const err = errorMessage(
      false,
      `Your ${req.method} in ${req.baseUrl} not fount.`,
      500,
      `Your ${req.method} in ${req.baseUrl} not fount.`
    )
    res.send(err)
  }
}

const getAllUsers = async (req: Request, res: Response) => {
  try {
    const allUsers = await userService.getAllUsersFromDB()
    res.send(allUsers)
  } catch (error) {
    const err = errorMessage(
      false,
      `Your ${req.method} in ${req.baseUrl} not fount.`,
      500,
      `Your ${req.method} in ${req.baseUrl} not fount.`
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
      `Your ${req.method} in ${req.baseUrl} not fount.`,
      500,
      `Your ${req.method} in ${req.baseUrl} not fount.`
    )
    res.send(err)
  }
}

const updateSingleUser = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId
    const updatedData = req.body
    const result = await userService.updateSingleUserInDB(Number(userId), updatedData)
    res.status(200).send(result)
  } catch (error) {

    const err = errorMessage(
      false,
      `Your ${req.method} in ${req.baseUrl} not fount.`,
      500,
      `Your ${req.method} in ${req.baseUrl} not fount.`
    )
    res.send(err)
  }
}

const deleteSingleUser = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId
    const result = await userService.deleteSingleUserInDB(Number(userId))
    res.status(200).send(result)
  } catch (error) {
    const err = errorMessage(
      false,
      `Your ${req.method} in ${req.baseUrl} not fount.`,
      500,
      `Your ${req.method} in ${req.baseUrl} not fount.`
    )
    res.send(err)
  }
}

export const userController = {
  createNewUser,
  getAllUsers,
  getSingleUser,
  updateSingleUser,
  deleteSingleUser
}
