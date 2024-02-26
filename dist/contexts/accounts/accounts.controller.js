"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const users_controller_1 = __importDefault(require("./users/users.controller"));
const accountsController = (0, express_1.Router)();
accountsController.use("/users", users_controller_1.default);
exports.default = accountsController;
