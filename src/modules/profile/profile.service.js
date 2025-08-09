import User from "../user/user.model.js";
import AppError from "../../utils/appError.js";
import { hashMatched } from "../../utils/hashing.js";

//update profile
const updateProfile = async (userId, updates) => {
  const allowedFields = [
    "dateOfBirth",
    "address",
    "profilePic",
    "gender",
    "phone",
    "name",
    "email",
  ];

  const filteredUpdates = {};

  allowedFields.forEach((field) => {
    if (updates[field] !== undefined) filteredUpdates[field] = updates[field];
  });

  const updatedUser = await User.findByIdAndUpdate(userId, filteredUpdates, {
    new: true,
    runValidators: true,
  }).select("-password");

  if (!updatedUser) throw new AppError("user not found", 404);

  return updatedUser;
};

//changed password
const changePassword = async (userId, currentPassword, newPassword) => {
  const user = await User.findById(userId).select("+password");
  if (!user) throw new AppError("user not found", 404);

  const isMatch = await hashMatched(currentPassword, user.password);
  if (!isMatch) throw new AppError("Current password is incorrect", 400);

  user.password = newPassword;
  await user.save();
};

export default { updateProfile, changePassword };
