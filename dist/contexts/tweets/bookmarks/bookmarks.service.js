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
const getBookMarks = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield client_prisma_1.default.user.findUnique({
        where: { id: userId },
        select: { bookmark: { select: { twitt: true } } },
    });
    if (!user)
        throw new Error("No User");
    const bookMarkedList = user.bookmark.map((bookmarkedTwit) => bookmarkedTwit.twitt);
    return bookMarkedList;
});
const toggleBookMarked = (bookMarkData) => __awaiter(void 0, void 0, void 0, function* () {
    const { tweetId, userId } = bookMarkData;
    const isBookMarked = yield client_prisma_1.default.bookMarkPost.findUnique({
        where: { userId_twittId: { userId, twittId: tweetId } },
    });
    if (isBookMarked) {
        yield client_prisma_1.default.bookMarkPost.delete({
            where: { userId_twittId: { userId, twittId: tweetId } },
        });
        return false;
    }
    else {
        yield client_prisma_1.default.bookMarkPost.create({
            data: { twittId: tweetId, userId },
        });
        return true;
    }
});
// const addBookMark = async (bookMarkData: bookMarkData) => {
//   const { tweetId, userId } = bookMarkData;
//   const parsedTweetId = Number(tweetId);
//   const isBookMark = await prismaClient.bookMarkPost.findUnique({
//     where: { userId_twittId: { userId, twittId: parsedTweetId } },
//   });
//   if (!isBookMark) {
//     const bookMarkedTweet = await prismaClient.bookMarkPost.create({
//       data: { twittId: parsedTweetId, userId },
//       include: { twitt: true },
//     });
//     return bookMarkedTweet;
//   } else {
//     throw new Error("Twitter is already bookmarked");
//   }
// };
const removeBookMark = (bookMarkData) => __awaiter(void 0, void 0, void 0, function* () {
    const { tweetId, userId } = bookMarkData;
    const isBookMarked = yield client_prisma_1.default.bookMarkPost.findUnique({
        where: { userId_twittId: { userId, twittId: tweetId } },
    });
    if (isBookMarked) {
        const bookMarkedTweet = yield client_prisma_1.default.bookMarkPost.delete({
            where: { userId_twittId: { userId, twittId: tweetId } },
        });
        return bookMarkedTweet;
    }
    else {
        throw new Error("Twitter is not bookmarked");
    }
});
const bookmarksService = {
    getBookMarks,
    removeBookMark,
};
exports.default = bookmarksService;
