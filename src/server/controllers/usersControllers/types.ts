import type { Request } from "express";
import type { JwtPayload } from "jsonwebtoken";

export interface LoginUserBody {
  username: string;
  password: string;
}

export interface UserTokenPayload extends JwtPayload {
  username: string;
  id: string;
}

export interface RegisterUserBody extends LoginUserBody {
  email: string;
}

export interface CustomRequest extends Request {
  userId: string;
}
