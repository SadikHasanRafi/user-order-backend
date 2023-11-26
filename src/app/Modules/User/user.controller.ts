import { Request, Response } from "express"
import { userService } from "./user.service"
import { errorMessageForServer } from "../../Utility/errorResponse"
import { successResponseForOperation } from "../../Utility/successResponse"

const createNewUser = async (req: Request, res: Response) => {
  try {
    const data = req.body
    const newUser = await userService.insertSingleUserIntoDB(data)
    
    res.status(200).send(successResponseForOperation(
       true,
      "User created successfully!",
      newUser
    ))
  } catch (error) {
    const err = errorMessageForServer(
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
    res.status(200).send(successResponseForOperation(
      true,
      "Users fetched successfully!",
      allUsers
    ))

  } catch (error) {
    const err = errorMessageForServer(
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
    res.status(200).send(successResponseForOperation(
      true,
      "User fetched successfully!",,
      result
    ))
  } catch (error) {
    const err = errorMessageForServer(
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
    res.status(200).send(successResponseForOperation(
      true,
      "User updated successfully!",,
      result
    ))
  } catch (error) {

    const err = errorMessageForServer(
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
    res.status(200).send(successResponseForOperation(
      true,
      "User deleted successfully!",
      null
    ))
  } catch (error) {
    const err = errorMessageForServer(
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
