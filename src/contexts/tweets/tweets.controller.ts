import { Router } from "express";
import userOnly from "../../guards/userOnly.guard";
import { bookMarkData } from "./bookmarks/bookmarks.dto";
import bookmarksService from "./bookmarks/bookmarks.service";
import {
  CreateCommentData,
  DeleteCommentData,
  UpdateCommentData,
} from "./comments/comments.dto";
import commnetsService from "./comments/comments.service";
import tweetsService from "./tweets.service";
import { CreateTweetData, UpdateTweetData } from "./tweets.type";

const tweetsController = Router();

tweetsController.post("/", userOnly, async (req, res, next) => {
  const { title, content } = req.body;
  const authorId = req.user!.id;
  const createTweetData: CreateTweetData = {
    authorId,
    title,
    content,
  };
  const tweet = await tweetsService.createTweet(createTweetData);
  res.json(tweet);
});
tweetsController.get("/", async (_, res, next) => {
  try {
    const tweets = await tweetsService.getTweets();
    res.json(tweets);
  } catch (e) {
    next(e);
  }
});
tweetsController.patch("/:tweetId", userOnly, async (req, res, next) => {
  const tweetId = req.params.tweetId;
  const { title, content } = req.body;
  const authorId = req.user!.id;
  const updateTweetData: UpdateTweetData = {
    authorId,
    title,
    content,
  };

  try {
    const tweet = await tweetsService.updateTweet(updateTweetData, tweetId);
    res.json(tweet);
  } catch (e) {
    next(e);
  }
});
tweetsController.delete("/:tweetId", userOnly, async (req, res, next) => {
  const tweetId = req.params.tweetId;
  const authorId = req.user!.id;

  try {
    const deletedTweetId = await tweetsService.deleteTweet(tweetId, authorId);
    res.json(deletedTweetId);
  } catch (e) {
    next(e);
  }
});
tweetsController.post(
  "/:tweetId/comments",
  userOnly,
  async (req, res, next) => {
    const tweetId = req.params.tweetId;
    const { content } = req.body;
    const authorId = req.user!.id;

    const createCommentData: CreateCommentData = {
      authorId,
      tweetId,
      content,
    };

    try {
      const comment = await commnetsService.createComment(createCommentData);
      res.json(comment);
    } catch (e) {
      next(e);
    }
  }
);
tweetsController.patch(
  "/:tweetId/comments/:commentId",
  userOnly,
  async (req, res, next) => {
    const tweetId = req.params.tweetId;
    const commentId = req.params.commentId;
    const { content } = req.body;
    const authorId = req.user!.id;

    const updateCommentData: UpdateCommentData = {
      authorId,
      tweetId,
      content,
      commentId,
    };
    try {
      const comment = await commnetsService.updateComment(updateCommentData);
      res.json(comment);
    } catch (e) {
      next(e);
    }
  }
);
tweetsController.delete(
  "/:tweetId/comments/:commentId",
  userOnly,
  async (req, res, next) => {
    const tweetId = req.params.tweetId;
    const commentId = req.params.commentId;
    const authorId = req.user!.id;

    const deleteCommentData: DeleteCommentData = {
      authorId,
      tweetId,
      commentId,
    };
    try {
      const deletedCommentId = await commnetsService.deleteComment(
        deleteCommentData
      );
      res.json(deletedCommentId);
    } catch (e) {
      next(e);
    }
  }
);
tweetsController.post(
  "/:tweetId/bookmarks",
  userOnly,
  async (req, res, next) => {
    const tweetId = Number(req.params.tweetId);
    const userId = req.user!.id;
    const bookMarkData: bookMarkData = {
      userId,
      tweetId,
    };

    const isBookMarked = await bookmarksService.toggleBookMarked(bookMarkData);

    res.send(isBookMarked);
  }
);

tweetsController.delete(
  "/:tweetId/bookmarks",
  userOnly,
  async (req, res, next) => {
    const tweetId = Number(req.params.tweetId);
    const userId = req.user!.id;
    const bookMarkData: bookMarkData = {
      userId,
      tweetId,
    };

    const isBookMarked = await bookmarksService.removeBookMark(bookMarkData);

    res.send(isBookMarked);
  }
);

export default tweetsController;
