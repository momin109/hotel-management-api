import User from "./user.model.js";
import AppError from "../../utils/appError.js";

/**
 * Find user by email (with password included)
 */
export const findUserByEmail = async (email) => {
  return await User.findOne({ email }).select("+password");
};

/**
 * Check if user exists by email
 */
export const userExist = async (email) => {
  const user = await User.findOne({ email });
  return Boolean(user); // returns true/false
};

/**
 * Create a new user
 */
export const createUser = async ({ name, email, password }) => {
  const user = new User({ name, email, password });
  await user.save();

  // Remove password before returning
  const userObj = user.toObject();
  delete userObj.password;

  return {
    ...userObj,
    id: user.id,
  };
};

//get all users
export const findAllUsers = async ({
  page = 1,
  limit = 10,
  sortType = "asc",
  sortBy = "createdAt",
  search = "",
}) => {
  const sortStr = `${sortType === "dsc" ? "-" : ""}${sortBy}`;

  const filter = {
    $or: [
      { name: { $regex: search, $options: "i" } },
      { email: { $regex: search, $options: "i" } },
      { phone: { $regex: search, $options: "i" } },
    ],
  };

  const users = await User.find(filter)
    .sort(sortStr)
    .skip((page - 1) * limit)
    .limit(limit)
    .select("-password");

  return users.map((user) => ({
    ...user._doc,
    id: user.id,
  }));
};

//count all user
export const countUser = ({ search = "" }) => {
  const filter = {
    $or: [
      { name: { $regex: search, $options: "i" } },
      { email: { $regex: search, $options: "i" } },
      { phone: { $regex: search, $options: "i" } },
    ],
  };
  return User.countDocuments(filter);
};

//get single user

export const findSingleUser = async ({ id, expand = "" }) => {
  if (!id) throw new AppError("id is required", 400);

  const expendList = expand.split(",").map((item) => item.trim());
  let query = User.findById(id).select(
    "-password -resetPasswordToken -resetPasswordExpire"
  );

  if (expendList.includes("createdBy")) {
    query = query.populate({
      path: "createdBy",
      select: "name email",
      strictPopulate: false,
    });
  }

  const user = await query;

  if (!user) throw new AppError("user not found", 404);

  return {
    ...user._doc,
    id: user.id,
  };
};

// update user role
export const updateUserRole = async (id, role) => {
  const user = await User.findByIdAndUpdate(
    id,
    { role },
    { new: true, runValidators: true }
  ).select("-password");

  if (!user) throw new AppError("User not found", 404);

  return {
    ...user._doc,
    id: user.id,
  };
};

// Update user's status by id

export const updateUserStatus = async (id, status) => {
  const user = User.findByIdAndUpdate(
    id,
    { status },
    { new: true, runValidators: true }
  ).select("-password");

  if (!user) throw new AppError("User not found", 404);

  return {
    ...user._doc,
    id: user.id,
  };
};

export const deleteUser = async (id) => {
  const user = await User.findByIdAndDelete(id);
  if (!user) throw new AppError("User not found", 404);
  return { message: "User deleted Successfully" };
};
