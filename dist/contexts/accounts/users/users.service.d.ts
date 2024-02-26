import { NextFunction, Request, Response } from "express";
declare const usersService: {
    signUp: (req: Request<never, unknown, {
        email: string;
        password: string;
        nickname: string;
        description: string;
    }>, res: Response, next: NextFunction) => Promise<void>;
    logIn: (req: Request, res: Response, next: NextFunction) => Promise<void>;
};
export default usersService;
//# sourceMappingURL=users.service.d.ts.map