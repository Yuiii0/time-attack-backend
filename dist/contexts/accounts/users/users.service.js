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
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../../../config");
const client_prisma_1 = __importDefault(require("../../../prisma/client.prisma"));
const signUp = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password, nickname, description } = req.body;
        if (!email.trim())
            throw new Error("No email");
        if (!password.trim())
            throw new Error("No password");
        if (password.length < 8)
            throw new Error("Too short password");
        const encryptedPassword = yield bcrypt_1.default.hash(password, 12);
        const user = yield client_prisma_1.default.user.create({
            data: {
                email,
                encryptedPassword,
                profile: { create: { nickname, description } },
            },
            select: { id: true, email: true },
        });
        res.json(user);
    }
    catch (e) {
        next(e);
    }
});
const logIn = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const user = yield client_prisma_1.default.user.findUnique({
            where: { email },
        });
        if (!user)
            throw new Error("No User");
        const isVerfied = yield bcrypt_1.default.compare(password, user.encryptedPassword);
        if (!isVerfied)
            throw new Error("Invalid Password");
        const accessToken = generateAccessToken(user);
        res.json(accessToken);
    }
    catch (e) {
        next(e);
    }
});
const generateAccessToken = (user) => {
    const accessToken = jsonwebtoken_1.default.sign({ id: user.id }, config_1.JWT_SECRET_KEY, {
        subject: user.id.toString(),
    });
    return accessToken;
};
const usersService = {
    signUp,
    logIn,
};
exports.default = usersService;
