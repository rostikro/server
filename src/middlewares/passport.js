import passport from "passport";
import { User } from "../models";
import { Strategy, ExtractJwt } from "passport-jwt";
import { SECRET as secretOrKey } from "../constants";

const opts = {
  secretOrKey,
  jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme("Bearer"),
};

passport.use(
  new Strategy(opts, async ( payload , done) => {
    try {
      let user = await User.findById(payload.id);
      if (!user) throw new Error("User not found");
      if(user.role !== payload.role) throw new Error("Hacker");
      return done(null, user.getUserInfo());
    } catch (e) {
        console.log(e);
      done(null, false);
    }
  })
);
