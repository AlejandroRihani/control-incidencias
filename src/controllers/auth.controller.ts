import { Request, Response } from "express";
import  AppDataSource  from "../data-source";
import { User } from "../entity/User.entity";
import { encrypt } from "../helpers/encrypt";

export class AuthController {
  static async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        res.status(400).json({ message: "Email and password are required" });
        return;
      }

      const userRepository = AppDataSource.getRepository(User);
      const user = await userRepository.findOne({ where: { email } });

      if (!user) {
        res.status(404).json({ message: "User not found" });
        return;
      }

      const isPasswordValid = encrypt.comparepassword(user.password, password);
      if (!isPasswordValid) {
        res.status(401).json({ message: "Invalid credentials" });
        return;
      }

      const token = encrypt.generateToken({ id: user.id });
      res.status(200).json({ message: "Login successful", user, token });
      return;
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
      return;
    }
  }

  static async getProfile(req: Request, res: Response) {
    const currentUser = req["currentUser"];

    if (!currentUser) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    const userRepository = AppDataSource.getRepository(User);
    const user = await userRepository.findOne({
      where: { id: currentUser.id },
    });

    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    const { password, ...userWithoutPassword } = user;
    res.status(200).json(userWithoutPassword);
    return;
  }
}
