import { bookMarkData } from "./bookmarks.dto";
declare const bookmarksService: {
    getBookMarks: (userId: number) => Promise<{
        id: number;
        authorId: number;
        title: string;
        content: string;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
    removeBookMark: (bookMarkData: bookMarkData) => Promise<{
        id: number;
        userId: number;
        twittId: number;
        createdAt: Date;
    }>;
};
export default bookmarksService;
//# sourceMappingURL=bookmarks.service.d.ts.map