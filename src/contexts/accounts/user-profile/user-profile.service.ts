import { Request, Response } from "express";
import prismaClient from "../../../prisma/client.prisma";
import { UpdateUserProfileData } from "./../../../../dist/contexts/accounts/user-profile/user-profile.type.d";

const updateUserProfile = async (
  updateUserProfileData: UpdateUserProfileData
) => {
  const { userId, nickname, description } = updateUserProfileData;
  const userProfile = await prismaClient.userProfile.update({
    where: { userId },
    data: { nickname, description },

    select: { userId: true, nickname: true, description: true },
  });
  if (!userProfile) throw new Error("User Not Found");

  return userProfile;
};
const getUser = async (req: Request<{ userId: string }>, res: Response) => {
  const parsedUserId = Number(req.params.userId);
  if (isNaN(parsedUserId)) throw new Error("UserId is not a number");

  const userProfile = await prismaClient.userProfile.findUnique({
    where: { userId: parsedUserId },
    select: {
      userId: true,
      nickname: true,
      description: true,
      updatedAt: true,
    },
  });
  res.json(userProfile);
};
const getFollowings = () => {};
const getFollwers = () => {};

const userProfileService = {
  updateUser: updateUserProfile,
  getUser,
  getFollowings,
  getFollwers,
};
export default userProfileService;
