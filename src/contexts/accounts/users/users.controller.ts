import { Router } from "express";
import userOnly from "../../../guards/userOnly.guard";
import userProfileService from "../user-profile/user-profile.service";
import { UpdateUserProfileData } from "../user-profile/user-profile.type";
import usersService from "./users.service";

const usersController = Router();

usersController.post("/sign-up", usersService.signUp);
usersController.post("/log-in", usersService.logIn);
usersController.put("/", userOnly, async (req, res, next) => {
  const { nickname, description } = req.body;
  const userId = req.user!.id;
  const updateUserProfileData: UpdateUserProfileData = {
    userId,
    nickname,
    description,
  };

  const userProfile = await userProfileService.updateUser(
    updateUserProfileData
  );
  res.json(userProfile);
});
usersController.get("/:userId", userProfileService.getUser);
usersController.get("/:userId/followings", userProfileService.getFollowings);
usersController.get("/:userId/followers", userProfileService.getFollwers);

export default usersController;
