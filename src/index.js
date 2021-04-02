import express from "express";
import helmet from "helmet";
import cors from "cors";
import { success, error } from "consola";
import passport from "passport";
import { PORT } from "./constants";
import userAPI from "./apis/userAPI";
import marksAPI from "./apis/marksAPI";

require("./middlewares/passport");

const app = express();
const parser = express.json();

app.use(cors());
app.use(helmet());
app.use(parser);
app.use(passport.initialize());

app.use("/users", userAPI);
app.use("/marks", marksAPI);

// Start server function
const startServer = async () => {
  try {
    app.listen(PORT, () => {
      success(`Server started on port ${PORT}`);
    });
  } catch (err) {
    // If error
    error(`Unable to connect to DB \n ${err}`);
  }
};

startServer();
