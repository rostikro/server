import { Schema } from "mongoose";
import { conn1, conn2 } from "../database";

const MarkSchema = new Schema(
  {
    id: {
      ref: "users",
      type: Schema.Types.ObjectId,
    },
    subject: {
      type: Number,
      required: true,
    },
    mark: {
      type: Number,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    description: {
      type: String,
      required: false,
    },
  },
  { versionKey: false }
);

const Marks = conn1.model("marks", MarkSchema);
export default Marks;
