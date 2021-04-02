import mongoose from "mongoose";
import { DB1, DB2 } from "../constants";

const opts = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
};

const conn1 = mongoose.createConnection(DB1, opts);

const conn2 = mongoose.createConnection(DB2, opts);

export { conn1, conn2 };
