import Router, { Request, Response } from "express"
import { userController } from "./user.controller"


const userRoute = Router()


userRoute.get('/', async (req:Request,res:Response)=>{
    // console.log(req.url)
    res.send({ bal : "res"})
})

userRoute.post("/create-new-user", userController.createNewUser )







export default userRoute