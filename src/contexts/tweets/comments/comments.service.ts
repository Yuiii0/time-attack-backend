import prismaClient from "../../../prisma/client.prisma";
import {
  CreateCommentData,
  DeleteCommentData,
  UpdateCommentData,
} from "./comments.dto";

const createComment = async (createCommentData: CreateCommentData) => {
  const { authorId, tweetId, content } = createCommentData;
  const parsedTweetId = Number(tweetId);
  if (isNaN(parsedTweetId)) throw new Error("TweetId is not a number");

  const comment = await prismaClient.comment.create({
    data: {
      content,
      authorId,
      twiitId: parsedTweetId,
    },
  });
  return comment;
};
const updateComment = async (updateCommentData: UpdateCommentData) => {
  const { authorId, tweetId, commentId, content } = updateCommentData;
  const parsedTweetId = Number(tweetId);
  const parsedCommentId = Number(commentId);
  if (isNaN(parsedTweetId)) throw new Error("TweetId is not a number");
  if (isNaN(parsedCommentId)) throw new Error("CommentId is not a number");

  const comment = await prismaClient.comment.update({
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
};
const deleteComment = async (deleteCommentData: DeleteCommentData) => {
  const { authorId, commentId, tweetId } = deleteCommentData;
  const parsedTweetId = Number(tweetId);
  const parsedCommentId = Number(commentId);
  if (isNaN(parsedTweetId)) throw new Error("TweetId is not a number");
  if (isNaN(parsedCommentId)) throw new Error("CommentId is not a number");

  await prismaClient.comment.delete({
    where: { id: parsedCommentId, authorId, twiitId: parsedTweetId },
  });
  return parsedCommentId;
};

const commnetsService = {
  createComment,
  updateComment,
  deleteComment,
};

export default commnetsService;
