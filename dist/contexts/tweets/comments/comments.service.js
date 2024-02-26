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
const client_prisma_1 = __importDefault(require("../../../prisma/client.prisma"));
const createComment = (createCommentData) => __awaiter(void 0, void 0, void 0, function* () {
    const { authorId, tweetId, content } = createCommentData;
    const parsedTweetId = Number(tweetId);
    if (isNaN(parsedTweetId))
        throw new Error("TweetId is not a number");
    const comment = yield client_prisma_1.default.comment.create({
        data: {
            content,
            authorId,
            twiitId: parsedTweetId,
        },
    });
    return comment;
});
const updateComment = (updateCommentData) => __awaiter(void 0, void 0, void 0, function* () {
    const { authorId, tweetId, commentId, content } = updateCommentData;
    const parsedTweetId = Number(tweetId);
    const parsedCommentId = Number(commentId);
    if (isNaN(parsedTweetId))
        throw new Error("TweetId is not a number");
    if (isNaN(parsedCommentId))
        throw new Error("CommentId is not a number");
    const comment = yield client_prisma_1.default.comment.update({
        where: { authorId, twiitId: parsedTweetId, id: parsedCommentId },
        data: {
            content,
        },
        select: {
            id: true,
            content: true,
            twiitId: true,
            authorId: true,
            updatedAt: true,
        },
    });
    return comment;
});
const deleteComment = (deleteCommentData) => __awaiter(void 0, void 0, void 0, function* () {
    const { authorId, commentId, tweetId } = deleteCommentData;
    const parsedTweetId = Number(tweetId);
    const parsedCommentId = Number(commentId);
    if (isNaN(parsedTweetId))
        throw new Error("TweetId is not a number");
    if (isNaN(parsedCommentId))
        throw new Error("CommentId is not a number");
    yield client_prisma_1.default.comment.delete({
        where: { id: parsedCommentId, authorId, twiitId: parsedTweetId },
    });
    return parsedCommentId;
});
const commnetsService = {
    createComment,
    updateComment,
    deleteComment,
};
exports.default = commnetsService;
