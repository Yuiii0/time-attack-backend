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
const client_prisma_1 = __importDefault(require("../../prisma/client.prisma"));
const createTweet = (createTweetData) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, content, authorId } = createTweetData;
    const tweet = yield client_prisma_1.default.twitt.create({
        data: {
            title,
            content,
            author: { connect: { id: authorId } },
        },
    });
    return tweet;
});
const getTweets = () => __awaiter(void 0, void 0, void 0, function* () {
    const tweets = yield client_prisma_1.default.twitt.findMany({
        orderBy: {
            id: "desc",
        },
        include: { comments: true },
    });
    return tweets;
});
const updateTweet = (updateTweetData, tweetId) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, content, authorId } = updateTweetData;
    const parsedTweetId = Number(tweetId);
    if (isNaN(parsedTweetId))
        throw new Error("TweetId is not a number");
    const tweet = yield client_prisma_1.default.twitt.update({
        where: { id: parsedTweetId, authorId },
        data: { title, content },
        select: {
            id: true,
            title: true,
            content: true,
            authorId: true,
            updatedAt: true,
        },
    });
    if (!tweet)
        throw new Error("Tweet Not Found");
    return tweet;
});
const deleteTweet = (tweetId, authorId) => __awaiter(void 0, void 0, void 0, function* () {
    const parsedTweetId = Number(tweetId);
    if (isNaN(parsedTweetId))
        throw new Error("TweetId is not a number");
    yield client_prisma_1.default.twitt.delete({ where: { id: parsedTweetId, authorId } });
    return parsedTweetId;
});
const tweetsService = {
    createTweet,
    getTweets,
    updateTweet,
    deleteTweet,
};
exports.default = tweetsService;
