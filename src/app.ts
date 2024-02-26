import bodyParser from "body-parser";
import express from "express";
import controllers from "./contexts/index.context";
import authMiddleWare from "./middlewares/authenticator.middleware";

const app = express();
const PORT = 5050;
const jsonParser = bodyParser.json();

app.use(authMiddleWare);
app.use(jsonParser);
app.use(controllers);

//middleware

app.listen(PORT, () => {
  console.log(`listening ${PORT}`);
});
