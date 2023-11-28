import { Request, Response } from "express"
import { userService } from "./user.service"
import { errorMessageForServer } from "../../Utility/errorResponse"
import { successResponseForOperation } from "../../Utility/successResponse"
import userValidationSchema from "./user.validation"
import { Orders } from "./user.interface"
import { userOrderService } from "./Orders/orders.service"
import UserModel from "./user.model"

const createNewUser = async (req: Request, res: Response) => {
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
    await userService.deleteSingleUserInDB(Number(userId))
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

const addNewOrder = async (req:Request,res:Response) => {
  try {
    const userId = req.params.userId
    const data:Orders = req.body
    const user = new UserModel()

    if (!await user.isUserExists(Number(userId))) {
      if (await user.isProductExists(Number(userId),data)) {
        //add new product and send response
        if (await userOrderService.addNewOrder(Number(userId),data)) {
          res.status(200).send(successResponseForOperation(true,"Order Created Successfully",null))
        }else{
            res.status(404).send(errorMessageForServer(false,"Failed to create order.",404,"Failed to update."))
        }
  
      }else{
          res.status(404).send(errorMessageForServer(false,"Product already in your cart.",404,"Product already in your cart."))
      }
    }else{
      res.status(404).send(errorMessageForServer(false,"User not found.",404,"User not found."))
  }


  } catch (error) {
    console.log("🚀 ~ file: user.controller.ts:161 ~ addNewOrder ~ error:", error)
    res.status(404).send(errorMessageForServer(false,"Failed to create order.",404,"Failed to update."))
  }
}



export const userController = {
  createNewUser,
  getAllUsers,
  getSingleUser,
  updateSingleUser,
  deleteSingleUser,
  addNewOrder
}
