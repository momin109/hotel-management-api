import {
  findAllUsers,
  countUser,
  updateUserRole,
  updateUserStatus,
  deleteUser,
} from "./user.service.js";
import {
  getTransformedItems,
  getHATEOASForAllItems,
  getPagination,
} from "../../utils/query.js";
import { defaults } from "../../config/defaults.js";

export const getAllUsers = async (req, res, next) => {
  const page = parseInt(req.query.page) || defaults.page;
  const limit = parseInt(req.query.limit) || defaults.limit;
  const sortType = req.query.sortType || defaults.sortType;
  const sortBy = req.query.sortBy || defaults.sortBy;
  const search = req.query.search || defaults.search;

  try {
    const users = await findAllUsers({
      page,
      limit,
      sortType,
      sortBy,
      search,
    });

    const data = getTransformedItems({
      items: users,
      selection: ["id", "name", "email", "role", "createdAt", "updatedAt"],
      path: "/users",
    });

    const totalUsers = await countUser({ search });
    const pagination = getPagination({ totalUsers, limit, page });

    const links = getHATEOASForAllItems({
      url: req.url,
      path: req.path,
      query: req.query,
      hasNest: !!pagination.next,
      hasPrev: !!pagination.prev,
    });

    res.status(200).json({ data, pagination, links });
  } catch (error) {
    next(error);
  }
};

export const changeUserRole = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { role } = req.body;

    const updateUser = await updateUserRole(id, role);

    res
      .status(200)
      .json({ message: "User role updated successfully", data: updateUser });
  } catch (error) {
    console.log("update role fail");
    next(error);
  }
};

export const changeUserStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const updatedUser = await updateUserStatus(id, status);

    res
      .status(200)
      .json({ message: "User status update successfully", data: updatedUser });
  } catch (error) {
    next(error);
  }
};

export const removeUserById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const result = await deleteUser(id);

    res.status(200).json({
      message: result.message,
    });
  } catch (error) {
    next(error);
  }
};
