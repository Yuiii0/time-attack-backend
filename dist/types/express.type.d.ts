import { User } from "@prisma/client";
declare global {
    namespace Express {
        interface Request {
            user: User | null;
        }
    }
}
//# sourceMappingURL=express.type.d.ts.map