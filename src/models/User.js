import { Schema } from "mongoose";
import { hash, compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { SECRET } from "../constants";
import { pick } from "lodash";
import { conn1 } from "../database";

const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["student", "teacher"],
  },
  class: {
    type: String,
    required: false,
  },
});

UserSchema.pre("save", async function (next) {
  let user = this;
  if (!user.isModified("password")) return next();
  user.password = await hash(user.password, 12);
  next();
});

UserSchema.methods.comparePassword = async function (password) {
  return await compare(password, this.password);
};

UserSchema.methods.generateJWT = async function () {
  let payload = {
    id: this._id,
    role: this.role,
  };
  return await sign(payload, SECRET, { expiresIn: "1 hour" });
};

UserSchema.methods.getUserInfo = function () {
  return pick(this, ["_id", "name", "email", "role", "class"]);
};

const User = conn1.model("users", UserSchema);
export default User;
