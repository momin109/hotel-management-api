import AppError from "../../utils/appError.js";
import profileService from "./profile.service.js";

export const updateProfile = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const updates = req.body;
    const updateUser = await profileService.updateProfile(userId, updates);

    res.status(200).json({
      message: "Profile update successfully",
      data: updateUser,
    });
  } catch (error) {
    console.log("profile update fail");
    next(error);
  }
};

export const changePassword = async (req, res, next) => {
  const { currentPassword, newPassword } = req.body;
  if (!currentPassword || !newPassword) {
    return next(new AppError("Please provide current and new password", 400));
  }

  try {
    const userId = req.user.id;
    await profileService.changePassword(userId, currentPassword, newPassword);

    res.status(200).json({
      message: "Password changed successfully",
    });
  } catch (error) {
    next(error);
  }
};
