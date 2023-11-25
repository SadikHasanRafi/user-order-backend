import { User } from "./user.interface";
import UserModel from "./user.model";



const insertSingleUserIntoDB = async (userData : User) => {
    await console.log("🚀 ~ file: user.service.ts:7 ~ insertSingleUserIntoDB ~ userData:", userData)
    

    const result = await UserModel.create(userData);
    return result;
}


export const userService = {
    insertSingleUserIntoDB
}