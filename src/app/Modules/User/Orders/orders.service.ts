import { Orders } from "../user.interface"
import UserModel from "../user.model"



const addNewOrder = async (userId: number, order: Orders) => {

const user = new UserModel()

  const filter = {userId:userId}
  const updatedDoc = {$push:{orders:order}}
  const result = await user.updateOne(filter,updatedDoc)
  if (result.modifiedCount != 0) {
    return true
  }else{
    return false
  }
}


export const userOrderService = {
  addNewOrder
}