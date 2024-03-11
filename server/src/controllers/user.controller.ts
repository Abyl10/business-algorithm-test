import { Request, Response } from "express";
import { User } from "../models/user.model";
import { UserRequest } from "../middleware/ensure-user";

export const getMe = async (req: UserRequest, res: Response) => {
  try {
    const user = await User.findById(req.user?.userId).select("-password");
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    res.send(user);
  } catch (error: any) {
    res
      .status(500)
      .send({ message: "Error fetching user", error: error.message });
  }
};
