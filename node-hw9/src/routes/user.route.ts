import { Router, Request, Response, NextFunction } from "express";
import validator from "validator";
import passport from "../passport.ts";
import { IUser } from "../dto/user.dto.ts";
import { loginUser, registerUser } from "../services/user.service.ts";


const userRouter = Router();

userRouter.post("/login", async (req: Request, res: Response, next: NextFunction) => {
  passport.authenticate('local', async (err: Error, user: IUser, info:{ message: string }) => {
    if (err) {
      return res.status(500).json({ message: 'Internal server error' });
    }
    if (!user) {
      return res.status(401).json({ message: info.message });
    }
    const {email, password} = req.body
    try {

      const token = await loginUser(email, password);
      return res.status(200).json({ message: 'Login successful', token: `Bearer ${token}` });
    } catch (error) {
      return res.status(401).json({ message: error.message });
    }
  
   
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

    const token = await registerUser(username, email, password);  

    if (typeof token !== 'string') {
      return res.status(400).json({ message: token.error });
    }

    return res.status(201).json({ message: "Registration successful", token: `Bearer ${token}` });
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error'});
  }
});

export default userRouter;