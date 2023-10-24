import { Router, Request, Response, NextFunction } from "express";
import { User } from "../entity/users.entity.ts";
import bcrypt from "bcrypt";
import validator from "validator";
import jwt from "jsonwebtoken";
import passport from "../passport.ts";
import { IUser } from "../dto/user.dto.ts";


const userRouter = Router();

userRouter.post("/login", async (req: Request, res: Response, next: NextFunction) => {
  passport.authenticate('local', (err: Error, user: IUser, info:{ message: string }) => {
    if (err) {
      return res.status(500).json({ message: 'Internal server error' });
    }
    if (!user) {
      return res.status(401).json({ message: info.message });
    }

    const token = jwt.sign({ userId: user.id }, process.env.SECRET_KEY, {
      expiresIn: '10h',
    });
    return res.status(200).json({ message: 'Login successful', token: `Bearer ${token}` });
  })(req, res, next);

});

userRouter.post("/register", async (req: Request, res: Response) => {

  try {
    const { username, email, password, confirmPassword } = req.body;

    if (!username || !email || !password || !confirmPassword) {
      return res.status(400).json({ message: `please enter credentials` });
    }

    if (!validator.isEmail(email)) {
      return res.status(400).json({ message: `Invalid email format` });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ message: `passwords don't match` });
    }

    const existingUser = await User.findOne({
      where: [{ email }, { username }],
    });

    if (existingUser) {
      return res
        .status(400)
        .json({ message: "User with this email or username already exists" });
    }

    const user = new User();
    user.email = email;
    user.username = username;
    user.password = await bcrypt.hash(password, 10);

    await user.save();

    const token = jwt.sign({ userId: user.id }, process.env.SECRET_KEY, {
      expiresIn: "10h",
    });
    return res.status(201).json({ message: "Registration successful", token: `Bearer ${token}` });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
});

export default userRouter;