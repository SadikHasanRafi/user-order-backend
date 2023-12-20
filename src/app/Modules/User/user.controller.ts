import { Request, Response } from "express"
import { userService } from "./user.service"
import { errorMessageForServer } from "../../Utility/errorResponse"
import { successResponseForOperation } from "../../Utility/successResponse"
import userValidationSchema from "./user.validation"
import { Orders } from "./user.interface"
import { userOrderService } from "./Orders/orders.service"

const createNewUser = async (req: Request, res: Response) => {
  try {
    const data = req.body
    if (data) {
      const validationResult =await userValidationSchema.validate(data)
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
    if(result!=null){
      res
        .status(200)
        .send(
          successResponseForOperation(true, "User fetched successfully!", result),
        )
    }else{
      res.status(404).send(errorMessageForServer(false,"User not found",404,"User not found!"))
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

const updateSingleUser = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId
    const updatedData = req.body
    if (updatedData) {
      const validationResult = await userValidationSchema.validate(updatedData)
      if (validationResult.value) {
        const result = await userService.updateSingleUserInDB(Number(userId),updatedData)
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
      }else if(validationResult.error){
        const errors = validationResult.error.details.map((error) => {
          return {
            field: error.path.join("."),
            message: error.message,
          };
        });
      
        res.status(200).send(errorMessageForServer(false,errors[0]?.message,200,errors[0]?.message))
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
    // const user = new UserModel()
    const result = await userOrderService.addNewOrder(Number(userId),data)

    if (req.body.productName) {
      if (result && result.success) {
        res.status(200).send(result)
      }else{
        res.status(404).send(result)
      }      
    }else{
      res.status(404).send(errorMessageForServer(false,"Unable to fetch order data",404,"Unable to fetch other data."))
    }
  } catch (error) {
    res.status(404).send(errorMessageForServer(false,"Failed to create order.",404,"Failed to update."))
  }
}


const getSingleUserOrderController = async (req: Request, res: Response) =>{
  try {
    const userId = req.params.userId
    const result = await userOrderService.getSingleUserOrderFromDB(Number(userId))
    if (result != null) {
      res.status(200).send(successResponseForOperation(true,"Order fetched successfully!",result))
    }else{
      res.status(404).send(errorMessageForServer(false,"Failed to fetched order.",404,"Failed to fetched user order."))
    }
  } catch (error) {
    res.status(404).send(errorMessageForServer(false,"Failed to fetched order.",404,"Failed to fetched user order."))
  }
}


const getTotalPrice = async(req:Request,res:Response) => {
  try {
    const userId = req.params.userId
    const result = await userOrderService.calculateTotalPrice(Number(userId))
    if (result != null) {
      res.status(200).send(successResponseForOperation(true,"Total price calculated successfully!",{totalPrice:result}))
    }else{
      res.status(404).send(errorMessageForServer(false,"Failed to calculate.",404,"Failed to calculate."))
    }
  } catch (error) {
    res.status(404).send(errorMessageForServer(false,"Failed to fetch the user.",404,"Failed to fetch the user."))
  }
}


export const userController = {
  createNewUser,
  getAllUsers,
  getSingleUser,
  updateSingleUser,
  deleteSingleUser,
  addNewOrder,
  getSingleUserOrderController,
  getTotalPrice
}
