import { NextFunction, Request, Response } from "express";
declare function authMiddleWare(req: Request, res: Response, next: NextFunction): Promise<void>;
export default authMiddleWare;
//# sourceMappingURL=authenticator.middleware.d.ts.map