import { CreateTweetData, UpdateTweetData } from "./tweets.type";
declare const tweetsService: {
    createTweet: (createTweetData: CreateTweetData) => Promise<{
        id: number;
        authorId: number;
        title: string;
        content: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    getTweets: () => Promise<({
        comments: {
            id: number;
            content: string;
            authorId: number;
            twiitId: number;
            createdAt: Date;
            updatedAt: Date;
        }[];
    } & {
        id: number;
        authorId: number;
        title: string;
        content: string;
        createdAt: Date;
        updatedAt: Date;
    })[]>;
    updateTweet: (updateTweetData: UpdateTweetData, tweetId: string) => Promise<{
        id: number;
        authorId: number;
        title: string;
        content: string;
        updatedAt: Date;
    }>;
    deleteTweet: (tweetId: string, authorId: number) => Promise<number>;
};
export default tweetsService;
//# sourceMappingURL=tweets.service.d.ts.map