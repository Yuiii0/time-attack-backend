import { User } from "@prisma/client";
import bcrypt from "bcrypt";
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

import { JWT_SECRET_KEY } from "../../../config";
import prismaClient from "../../../prisma/client.prisma";

const signUp = async (
  req: Request<
    never,
    unknown,
    { email: string; password: string; nickname: string; description: string }
  >,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password, nickname, description } = req.body;

    if (!email.trim()) throw new Error("No email");
    if (!password.trim()) throw new Error("No password");
    if (password.length < 8) throw new Error("Too short password");

    const encryptedPassword = await bcrypt.hash(password, 12);

    const user = await prismaClient.user.create({
      data: {
        email,
        encryptedPassword,
        profile: { create: { nickname, description } },
      },
      select: { id: true, email: true },
    });

    res.json(user);
  } catch (e) {
    next(e);
  }
};
const logIn = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;
    const user = await prismaClient.user.findUnique({
      where: { email },
    });
    if (!user) throw new Error("No User");

    const isVerfied = await bcrypt.compare(password, user.encryptedPassword);
    if (!isVerfied) throw new Error("Invalid Password");

    const accessToken = generateAccessToken(user);

    res.json(accessToken);
  } catch (e) {
    next(e);
  }
};

const generateAccessToken = (user: User) => {
  const accessToken = jwt.sign({ id: user.id }, JWT_SECRET_KEY, {
    subject: user.id.toString(),
  });
  return accessToken;
};

const usersService = {
  signUp,
  logIn,
};
export default usersService;
