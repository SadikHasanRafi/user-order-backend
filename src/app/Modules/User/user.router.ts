import Router from "express";
import { userController } from "./user.controller";

const userRoute = Router();

userRoute.put("/:userId/orders", userController.addNewOrder);
userRoute.get("/:userId/orders", userController.getSingleUserOrderController);
userRoute.get("/:userId/orders/total-price", userController.getTotalPrice);

userRoute.get("/:userId", userController.getSingleUser);

userRoute.put("/:userId", userController.updateSingleUser);

userRoute.delete("/:userId", userController.deleteSingleUser);

userRoute.post("/", userController.createNewUser);
userRoute.get("/", userController.getAllUsers);

export default userRoute;
