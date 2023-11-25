import { Request, Response } from "express"
import { userService } from "./user.service"



const createNewUser =async (req:Request,res:Response) => {
    try {
        const data = req.body
        const newUser = await userService.insertSingleUserIntoDB(data)
        res.status(200).send(newUser)
    } catch (error) {
        res.status(500).send(error)
    }
} 


const getAllUsersFromDB = async (req:Request,res:Response)=>{
    try {
        const allUsers =await userService.getAllUsersFromDB()
        res.send(allUsers)
    } catch (error) {
        res.status(500).send(error)
    }
}


export const userController = {     
    createNewUser,
    getAllUsersFromDB
}