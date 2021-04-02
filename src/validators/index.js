import { check } from "express-validator";

const username = check("username", "Username is required").not().isEmpty();
const password = check(
  "password",
  "Password must be of minimum 6 chars"
).isLength({ min: 6 });

export const LoginValidation = [username, password];
