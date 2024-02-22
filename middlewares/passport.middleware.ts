import passport from "passport";
import { localStrategy } from "./passport_local.middleware";

passport.use(localStrategy);

passport.serializeUser((user: any, done) => {
    done(null, user);
});

passport.deserializeUser((user: any, done) => {
    done(null, user);
});

export default passport;