"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userOnly_guard_1 = __importDefault(require("../../guards/userOnly.guard"));
const bookmarks_service_1 = __importDefault(require("./bookmarks/bookmarks.service"));
const comments_service_1 = __importDefault(require("./comments/comments.service"));
const tweets_service_1 = __importDefault(require("./tweets.service"));
const tweetsController = (0, express_1.Router)();
tweetsController.post("/", userOnly_guard_1.default, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, content } = req.body;
    const authorId = req.user.id;
    const createTweetData = {
        authorId,
        title,
        content,
    };
    const tweet = yield tweets_service_1.default.createTweet(createTweetData);
    res.json(tweet);
}));
tweetsController.get("/", (_, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tweets = yield tweets_service_1.default.getTweets();
        res.json(tweets);
    }
    catch (e) {
        next(e);
    }
}));
tweetsController.patch("/:tweetId", userOnly_guard_1.default, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const tweetId = req.params.tweetId;
    const { title, content } = req.body;
    const authorId = req.user.id;
    const updateTweetData = {
        authorId,
        title,
        content,
    };
    try {
        const tweet = yield tweets_service_1.default.updateTweet(updateTweetData, tweetId);
        res.json(tweet);
    }
    catch (e) {
        next(e);
    }
}));
tweetsController.delete("/:tweetId", userOnly_guard_1.default, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const tweetId = req.params.tweetId;
    const authorId = req.user.id;
    try {
        const deletedTweetId = yield tweets_service_1.default.deleteTweet(tweetId, authorId);
        res.json(deletedTweetId);
    }
    catch (e) {
        next(e);
    }
}));
tweetsController.post("/:tweetId/comments", userOnly_guard_1.default, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const tweetId = req.params.tweetId;
    const { content } = req.body;
    const authorId = req.user.id;
    const createCommentData = {
        authorId,
        tweetId,
        content,
    };
    try {
        const comment = yield comments_service_1.default.createComment(createCommentData);
        res.json(comment);
    }
    catch (e) {
        next(e);
    }
}));
tweetsController.patch("/:tweetId/comments/:commentId", userOnly_guard_1.default, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const tweetId = req.params.tweetId;
    const commentId = req.params.commentId;
    const { content } = req.body;
    const authorId = req.user.id;
    const updateCommentData = {
        authorId,
        tweetId,
        content,
        commentId,
    };
    try {
        const comment = yield comments_service_1.default.updateComment(updateCommentData);
        res.json(comment);
    }
    catch (e) {
        next(e);
    }
}));
tweetsController.delete("/:tweetId/comments/:commentId", userOnly_guard_1.default, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const tweetId = req.params.tweetId;
    const commentId = req.params.commentId;
    const authorId = req.user.id;
    const deleteCommentData = {
        authorId,
        tweetId,
        commentId,
    };
    try {
        const deletedCommentId = yield comments_service_1.default.deleteComment(deleteCommentData);
        res.json(deletedCommentId);
    }
    catch (e) {
        next(e);
    }
}));
tweetsController.post("/:tweetId/bookmarks", userOnly_guard_1.default, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const tweetId = Number(req.params.tweetId);
    const userId = req.user.id;
    const bookMarkData = {
        userId,
        tweetId,
    };
    const isBookMarked = yield bookmarks_service_1.default.toggleBookMarked(bookMarkData);
    res.send(isBookMarked);
}));
tweetsController.delete("/:tweetId/bookmarks", userOnly_guard_1.default, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const tweetId = Number(req.params.tweetId);
    const userId = req.user.id;
    const bookMarkData = {
        userId,
        tweetId,
    };
    const isBookMarked = yield bookmarks_service_1.default.removeBookMark(bookMarkData);
    res.send(isBookMarked);
}));
exports.default = tweetsController;
