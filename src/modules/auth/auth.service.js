import {
  userExist,
  createUser,
  findUserByEmail,
} from "../user/user.service.js";
import { generateToken } from "../token/token.service.js";
import { hashMatched } from "../../utils/hashing.js";
import { badRequest } from "../../utils/error.js";

const register = async ({ name, email, password }) => {
  //check if user already exist
  const existingUser = await userExist(email);
  if (existingUser) {
    throw badRequest("User already exist");
  }

  const user = await createUser({ name, email, password });

  const payload = {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
  };

  const accessToken = generateToken({ payload });
  return { accessToken };
};

// Login Service
const login = async ({ email, password }) => {
  const user = await findUserByEmail(email);

  if (!user) {
    throw badRequest("invalid credential");
  }

  const isValid = await hashMatched(password, user.password);
  if (!isValid) {
    throw badRequest("invalid credential");
  }

  const payload = {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
  };

  const accessToken = generateToken({ payload });
  return { accessToken };
};

export default { register, login };
