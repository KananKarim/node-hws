import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { User } from "./entity/users.entity.ts";
import bcrypt from "bcrypt";

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    async (email, password, done) => {
      try {
        const user = await User.findOne({ where: { email } });

        if (!user) {
          return done(null, false, { message: "User not found" });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
          return done(null, false, { message: "Invalid Password" });
        }

        return done(null, user);
      } catch (error) {
        return done(error);
      }
    }
  )
);


export default passport;