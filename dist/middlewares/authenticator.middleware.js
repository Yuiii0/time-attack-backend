"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = require("jsonwebtoken");
const config_1 = require("../config");
const client_prisma_1 = __importDefault(require("../prisma/client.prisma"));
function authMiddleWare(req, res, next) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        req.user = null;
        const accessToken = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split("Bearer ")[1];
        if (!accessToken)
            return next();
        try {
            const { sub: id } = (0, jsonwebtoken_1.verify)(accessToken, config_1.JWT_SECRET_KEY);
            const user = yield client_prisma_1.default.user.findUnique({
                where: { id: Number(id) },
            });
            if (!user)
                throw new Error("Deleted User");
            req.user = user;
            next();
        }
        catch (e) {
            return next(e);
        }
    });
}
exports.default = authMiddleWare;
