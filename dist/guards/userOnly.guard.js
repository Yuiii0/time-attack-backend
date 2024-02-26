"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function userOnly(req, _, next) {
    const user = req.user;
    if (!user)
        throw new Error("Unauthorized");
    next();
}
exports.default = userOnly;
