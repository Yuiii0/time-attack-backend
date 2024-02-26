import { Router } from "express";
import accountsController from "./accounts/accounts.controller";
import bookmarksControllers from "./tweets/bookmarks/bookmarks.controller";
import tweetsController from "./tweets/tweets.controller";

const controllers = Router();

controllers.use("/health-check", (req, res) => {
  res.status(200).send("OK");
});
controllers.use("/accounts", accountsController);
controllers.use("/tweets", tweetsController);
controllers.use("/bookmarks", bookmarksControllers);

export default controllers;
