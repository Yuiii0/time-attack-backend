import { Request, Response } from "express";
import { UpdateUserProfileData } from "./../../../../dist/contexts/accounts/user-profile/user-profile.type.d";
declare const userProfileService: {
    updateUser: (updateUserProfileData: UpdateUserProfileData) => Promise<{
        userId: number;
        nickname: string | null;
        description: string | null;
    }>;
    getUser: (req: Request<{
        userId: string;
    }>, res: Response) => Promise<void>;
    getFollowings: () => void;
    getFollwers: () => void;
};
export default userProfileService;
//# sourceMappingURL=user-profile.service.d.ts.map