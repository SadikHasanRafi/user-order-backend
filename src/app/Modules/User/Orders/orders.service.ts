import { errorMessageForServer } from "../../../Utility/errorResponse"
import { successResponseForOperation } from "../../../Utility/successResponse"
import { Orders } from "../user.interface"
import UserModel from "../user.model"



const addNewOrder = async (userId: number, order: Orders) => {

const user = new UserModel()


  const isUserExist =await user.isUserExists(userId)

  if ( isUserExist) {
    const filter = {userId:userId}
    const currentUser = await UserModel.findOne(filter)
    const result = await UserModel.findOneAndUpdate(filter, { $push: { orders: order } }, { new: true })

    if (currentUser) {
      const userCurrentOrder = currentUser?.toObject().orders.length
      if (result && result?.toObject().orders.length > userCurrentOrder ) {
  
        return successResponseForOperation(true,"Order created successfully!",null)
      }
    }

   else{
      return errorMessageForServer(false,"Unable to update.",404,"Internal server issue.")
    }
  }else {
    return errorMessageForServer(false,"User not found",404,"User not found!")
  }

}

const getSingleUserOrderFromDB = async(userId: number)=>{
  const user = new UserModel()
  const response = await user.isUserExists(userId)
  if (response) {
    const data = await UserModel.findOne({userId: userId}, { _id: 0, orders: 1 }).select('orders');
    if (data) {
      return data.orders
    }
  }
  return null
}

const calculateTotalPrice =async (userId:number)=>{
  const user = new UserModel()
  const response = await user.isUserExists(userId)
  if (response) {
    const result = await getSingleUserOrderFromDB(userId)
    const totalPrice = result?.reduce((sum:number,current:any)=>{
      return sum+(current.price*current.quantity)
    },0)
    return totalPrice
  }
  return null

}



export const userOrderService = {
  addNewOrder,getSingleUserOrderFromDB,calculateTotalPrice
}