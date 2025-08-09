import AppError from "../utils/appError.js";
import { verifyToken } from "../modules/token/token.service.js";
import User from "../modules/user/user.model.js";

const protect = async (req, res, next) => {
  try {
    // 1. get token from headers
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      return next(new AppError("You are not logged in! Please log in.", 401));
    }

    // 2. verify token (✅ এখানে object আকারে পাঠাও)
    const decoded = verifyToken({ token });

    // 3. check if user still exists
    const currentUser = await User.findById(decoded.id);
    if (!currentUser) {
      return next(
        new AppError("The user belonging to this token no longer exists.", 401)
      );
    }

    // 4. grant access
    req.user = currentUser;
    next();
  } catch (error) {
    console.error("❌ Protect middleware error:", error);
    next(error);
  }
};

export default protect;
