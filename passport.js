import passport from "passport";
import User from "./models/User";

passport.use(User.createStrategy()); //유저 아이디, 비번 입력확인

passport.serializeUser(User.serializeUser()); // 함수 숏컷
passport.deserializeUser(User.deserializeUser());