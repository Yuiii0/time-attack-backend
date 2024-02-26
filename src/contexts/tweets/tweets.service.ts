import prismaClient from "../../prisma/client.prisma";
import { CreateTweetData, UpdateTweetData } from "./tweets.type";

const createTweet = async (createTweetData: CreateTweetData) => {
  const { title, content, authorId } = createTweetData;
  const tweet = await prismaClient.twitt.create({
    data: {
      title,
      content,
      author: { connect: { id: authorId } },
    },
  });
  return tweet;
};
const getTweets = async () => {
  const tweets = await prismaClient.twitt.findMany({
    orderBy: {
      id: "desc",
    },
    include: { comments: true },
  });
  return tweets;
};
const updateTweet = async (
  updateTweetData: UpdateTweetData,
  tweetId: string
) => {
  const { title, content, authorId } = updateTweetData;
  const parsedTweetId = Number(tweetId);
  if (isNaN(parsedTweetId)) throw new Error("TweetId is not a number");

  const tweet = await prismaClient.twitt.update({
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
  if (!tweet) throw new Error("Tweet Not Found");

  return tweet;
};
const deleteTweet = async (tweetId: string, authorId: number) => {
  const parsedTweetId = Number(tweetId);
  if (isNaN(parsedTweetId)) throw new Error("TweetId is not a number");

  await prismaClient.twitt.delete({ where: { id: parsedTweetId, authorId } });
  return parsedTweetId;
};

const tweetsService = {
  createTweet,
  getTweets,
  updateTweet,
  deleteTweet,
};

export default tweetsService;
