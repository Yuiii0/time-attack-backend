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
const express_1 = require("express");
const userOnly_guard_1 = __importDefault(require("../../../guards/userOnly.guard"));
const user_profile_service_1 = __importDefault(require("../user-profile/user-profile.service"));
const users_service_1 = __importDefault(require("./users.service"));
const usersController = (0, express_1.Router)();
usersController.post("/sign-up", users_service_1.default.signUp);
usersController.post("/log-in", users_service_1.default.logIn);
usersController.put("/", userOnly_guard_1.default, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { nickname, description } = req.body;
    const userId = req.user.id;
    const updateUserProfileData = {
        userId,
        nickname,
        description,
    };
    const userProfile = yield user_profile_service_1.default.updateUser(updateUserProfileData);
    res.json(userProfile);
}));
usersController.get("/:userId", user_profile_service_1.default.getUser);
usersController.get("/:userId/followings", user_profile_service_1.default.getFollowings);
usersController.get("/:userId/followers", user_profile_service_1.default.getFollwers);
exports.default = usersController;
