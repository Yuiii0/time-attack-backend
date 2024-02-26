import { Router } from "express";
import userOnly from "../../../guards/userOnly.guard";
import bookmarksService from "./bookmarks.service";

const bookmarksControllers = Router();

bookmarksControllers.get("/", userOnly, async (req, res, next) => {
  const userId = req.user!.id;

  try {
    const BookMarkedTweets = await bookmarksService.getBookMarks(userId);
    res.send(BookMarkedTweets);
  } catch (e) {
    next(e);
  }
});

export default bookmarksControllers;
