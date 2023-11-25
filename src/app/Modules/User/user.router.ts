import Router, { Request, Response } from "express"
import { userController } from "./user.controller"


const userRoute = Router()


userRoute.get('/',userController.getAllUsersFromDB  )

userRoute.post("/create-new-user", userController.createNewUser )







export default userRoute