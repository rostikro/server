import { config } from "dotenv";

config();

export const DB1 = process.env.DB1;
export const DB2 = process.env.DB2;
export const PORT = process.env.PORT;
export const SECRET = process.env.SECRET;