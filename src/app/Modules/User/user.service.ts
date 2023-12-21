import { User } from "./user.interface";
import UserModel from "./user.model";

const insertSingleUserIntoDB = async (userData: User) => {
  const result = await UserModel.create(userData);
  return result;
};

const getAllUsersFromDB = async () => {
  const result = await UserModel.find();
  return result;
};

const getSingleDataFromDB = async (userId: number) => {
  const user = new UserModel();
  const response = await user.isUserExists(userId);
  if (response) {
    const data = await UserModel.findOne(
      {
        userId: userId,
      },
      { password: 0 },
    );
    return data;
  }
  return null;
};

const updateSingleUserInDB = async (userId: number, updatedData: User) => {
  const user = new UserModel();

  if ((await user.isUserExists(userId)) && updatedData) {
    const { age } = updatedData;
    const data = await UserModel.updateOne(
      { userId: userId },

      {
        $set: {
          age: age,
        },
      },
      { upsert: false },
    );
    return data;
  }

  return null;
};

const deleteSingleUserInDB = async (userId: number) => {
  const user = new UserModel();

  if (await user.isUserExists(userId)) {
    const data = await UserModel.deleteOne({ userId: userId });
    return data;
  }

  return null;
};

export const userService = {
  insertSingleUserIntoDB,
  getAllUsersFromDB,
  getSingleDataFromDB,
  updateSingleUserInDB,
  deleteSingleUserInDB,
};
