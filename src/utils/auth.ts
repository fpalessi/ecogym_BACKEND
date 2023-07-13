import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { ObjectId } from "mongoose";

export interface JwtUserPayload extends jwt.JwtPayload {
  userId: ObjectId;
  userName: string;
}

const privateKey: string = process.env.PRIVATE_KEY as string;
const publicKey: string = process.env.PUBLIC_KEY as string;

export const hashPassword = async (password: string) =>
  await bcrypt.hash(password, await bcrypt.genSalt());

export const checkPassword = async (
  password: string,
  validPassword: string
) => {
  return await bcrypt.compare(password, validPassword);
};

export const createJWT = (object: JwtUserPayload) =>
  jwt.sign(object, privateKey);

export const verifyJwt = (token: string) => {
  return jwt.verify(token, publicKey);
};

export const getJwtFromHeaders = (headers: string) => {
  return headers.split(" ")[1];
};

export const BEARER_JWT = "Bearer ";
