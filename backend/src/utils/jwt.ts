import jwt, { SignOptions } from "jsonwebtoken";
import { IUserRole } from "../models/User";
import { env } from "../config/env";

interface JwtPayload {
  id: string;
  role: IUserRole;
}

export const signToken = (payload: JwtPayload): string => {
  const options: SignOptions = { expiresIn: env.jwtExpiresIn as SignOptions["expiresIn"] };
  return jwt.sign(payload, env.jwtSecret, options);
};

export const verifyToken = (token: string): JwtPayload => {
  return jwt.verify(token, env.jwtSecret) as JwtPayload;
};
