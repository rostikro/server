import { Schema } from "mongoose";
import { pick } from "lodash";
import { conn1, conn2 } from "../database";

const SubjectArraySchema = new Schema({
  id: { type: Number, required: true },
  subject: { type: String, required: true },
});

const SubjectsSchema = new Schema(
  {
    id: {
      type: String,
      required: true,
    },
    count: {
      type: Number,
      required: true,
    },
    subjects: [SubjectArraySchema],
  },
  { versionKey: false }
);

SubjectsSchema.methods.getInfo = function () {
  return pick(this, ["subjects"]);
}

const Subjects = conn1.model("subjects", SubjectsSchema);
export default Subjects;
