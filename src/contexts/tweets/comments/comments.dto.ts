export type CreateCommentData = {
  authorId: number;
  content: string;
  tweetId: string;
};
export type UpdateCommentData = {
  authorId: number;
  content: string;
  tweetId: string;
  commentId: string;
};
export type DeleteCommentData = {
  authorId: number;
  tweetId: string;
  commentId: string;
};
