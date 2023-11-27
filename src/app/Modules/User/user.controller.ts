import { Request, Response } from "express"
import { userService } from "./user.service"
import { errorMessageForServer } from "../../Utility/errorResponse"
import { successResponseForOperation } from "../../Utility/successResponse"
import Joi from "joi"
import userValidationSchema from "./user.validation"

const createNewUser = async (req: Request, res: Response) => {
  //todo start working from here plz
  try {
    const data = req.body
    if (data) {
      const validationResult = userValidationSchema.validate(data)
      if (validationResult.value) {
        const newUser = await userService.insertSingleUserIntoDB(data)
        res
          .status(200)
          .send(
            successResponseForOperation(
              true,
              "User created successfully!",
              newUser,
            ),
          )
      } else {
        res.status(400).send(validationResult.error?.details[0].message)
      }
    }
  } catch (error) {
    const err = errorMessageForServer(
      false,
      `Your ${req.method} in ${req.baseUrl} not fount.`,
      500,
      `Your ${req.method} in ${req.baseUrl} not fount.`,
    )
    res.send(err)
  }
}

const getAllUsers = async (req: Request, res: Response) => {
  try {
    const allUsers = await userService.getAllUsersFromDB()
    res
      .status(200)
      .send(
        successResponseForOperation(
          true,
          "Users fetched successfully!",
          allUsers,
        ),
      )
  } catch (error) {
    const err = errorMessageForServer(
      false,
      `Your ${req.method} in ${req.baseUrl} not fount.`,
      500,
      `Your ${req.method} in ${req.baseUrl} not fount.`,
    )
    res.send(err)
  }
}

const getSingleUser = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId //here userId is only string
    const result = await userService.getSingleDataFromDB(Number(userId))
    res
      .status(200)
      .send(
        successResponseForOperation(true, "User fetched successfully!", result),
      )
  } catch (error) {
    const err = errorMessageForServer(
      false,
      `Your ${req.method} in ${req.baseUrl} not fount.`,
      500,
      `Your ${req.method} in ${req.baseUrl} not fount.`,
    )
    res.send(err)
  }
}

const updateSingleUser = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId
    const updatedData = req.body
    const result = await userService.updateSingleUserInDB(
      Number(userId),
      updatedData,
    )

    if (result === null) {
      const err = errorMessageForServer(
        false,
        `Your ${req.method} in ${req.baseUrl} not fount.`,
        200,
        `Your ${req.method} in ${req.baseUrl} not fount.`,
      )
      res.send(err)
    } else if (result !== null) {
      res
        .status(200)
        .send(
          successResponseForOperation(
            true,
            "User updated successfully!",
            result,
          ),
        )
    }
  } catch (error) {
    const err = errorMessageForServer(
      false,
      `Your ${req.method} in ${req.baseUrl} not fount.`,
      500,
      `Your ${req.method} in ${req.baseUrl} not fount.`,
    )
    res.send(err)
  }
}

const deleteSingleUser = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId
    const result = await userService.deleteSingleUserInDB(Number(userId))
    res
      .status(200)
      .send(
        successResponseForOperation(true, "User deleted successfully!", null),
      )
  } catch (error) {
    const err = errorMessageForServer(
      false,
      `Your ${req.method} in ${req.baseUrl} not fount.`,
      500,
      `Your ${req.method} in ${req.baseUrl} not fount.`,
    )
    res.send(err)
  }
}

export const userController = {
  createNewUser,
  getAllUsers,
  getSingleUser,
  updateSingleUser,
  deleteSingleUser,
}
