import Router from "express"
import { userController } from "./user.controller"

const userRoute = Router()

userRoute.post("/create-new-user", userController.createNewUser)

userRoute.put("/:userId/orders",userController.addNewOrder)


userRoute.get("/:userId", userController.getSingleUser)

userRoute.put("/:userId", userController.updateSingleUser)

userRoute.delete("/:userId", userController.deleteSingleUser)

userRoute.get("/", userController.getAllUsers)

export default userRoute
