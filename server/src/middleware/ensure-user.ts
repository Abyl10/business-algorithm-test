import { Request, Response, NextFunction } from "express";

export interface UserRequest extends Request {
  user?: { userId: string };
}

export const ensureUser = (
  req: UserRequest,
  res: Response,
  next: NextFunction
) => {
  if (!req.user) {
    return res.status(401).send({ message: "Unauthorized" });
  }
  next();
};
