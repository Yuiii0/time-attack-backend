import { CreateCommentData, DeleteCommentData, UpdateCommentData } from "./comments.dto";
declare const commnetsService: {
    createComment: (createCommentData: CreateCommentData) => Promise<{
        id: number;
        content: string;
        authorId: number;
        twiitId: number;
        createdAt: Date;
        updatedAt: Date;
    }>;
    updateComment: (updateCommentData: UpdateCommentData) => Promise<{
        updatedAt: Date;
        id: number;
        authorId: number;
        content: string;
        twiitId: number;
    }>;
    deleteComment: (deleteCommentData: DeleteCommentData) => Promise<number>;
};
export default commnetsService;
//# sourceMappingURL=comments.service.d.ts.map