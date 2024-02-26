"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const accounts_controller_1 = __importDefault(require("./accounts/accounts.controller"));
const bookmarks_controller_1 = __importDefault(require("./tweets/bookmarks/bookmarks.controller"));
const tweets_controller_1 = __importDefault(require("./tweets/tweets.controller"));
const controllers = (0, express_1.Router)();
controllers.use("/health-check", (req, res) => {
    res.status(200).send("OK");
});
controllers.use("/accounts", accounts_controller_1.default);
controllers.use("/tweets", tweets_controller_1.default);
controllers.use("/bookmarks", bookmarks_controller_1.default);
exports.default = controllers;
