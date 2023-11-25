import Router, { Request, Response } from "express"
import { userController } from "./user.controller"


const userRoute = Router()


userRoute.get('/',userController.getAllUsers  )

userRoute.post("/create-new-user", userController.createNewUser )

userRoute.get("/:userId",userController.getSingleUser )

userRoute.put("/:userId",userController.updateSingleUser)



export default userRoute





