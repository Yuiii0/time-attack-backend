import prismaClient from "../../../prisma/client.prisma";
import { bookMarkData } from "./bookmarks.dto";

const getBookMarks = async (userId: number) => {
  const user = await prismaClient.user.findUnique({
    where: { id: userId },
    select: { bookmark: { select: { twitt: true } } },
  });
  if (!user) throw new Error("No User");

  const bookMarkedList = user.bookmark.map(
    (bookmarkedTwit) => bookmarkedTwit.twitt
  );

  return bookMarkedList;
};

const toggleBookMarked = async (bookMarkData: bookMarkData) => {
  const { tweetId, userId } = bookMarkData;
  const isBookMarked = await prismaClient.bookMarkPost.findUnique({
    where: { userId_twittId: { userId, twittId: tweetId } },
  });
  if (isBookMarked) {
    await prismaClient.bookMarkPost.delete({
      where: { userId_twittId: { userId, twittId: tweetId } },
    });
    return false;
  } else {
    await prismaClient.bookMarkPost.create({
      data: { twittId: tweetId, userId },
    });

    return true;
  }
};

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
const removeBookMark = async (bookMarkData: bookMarkData) => {
  const { tweetId, userId } = bookMarkData;
  const isBookMarked = await prismaClient.bookMarkPost.findUnique({
    where: { userId_twittId: { userId, twittId: tweetId } },
  });
  if (isBookMarked) {
    const bookMarkedTweet = await prismaClient.bookMarkPost.delete({
      where: { userId_twittId: { userId, twittId: tweetId } },
    });
    return bookMarkedTweet;
  } else {
    throw new Error("Twitter is not bookmarked");
  }
};

const bookmarksService = {
  getBookMarks,
  removeBookMark,
};

export default bookmarksService;
