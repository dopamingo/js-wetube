import passport from "passport";
import GithubStrategy from "passport-github";
import KakaoStrategy from "passport-kakao";
import User from "./models/User";
import { githubLoginCallback, kakaoLoginCallback
} from "./controllers/userController";
import routes from "./routes";

passport.use(User.createStrategy()); //유저 아이디, 비번 입력확인

passport.use(
    new GithubStrategy(
      {
        clientID: process.env.GH_ID,
        clientSecret: process.env.GH_SECRET,
        callbackURL: "http://localhost:4000/auth/github/callback"
      },
      githubLoginCallback
    )
  );

passport.use(
  new KakaoStrategy(
    {
      clientID: process.env.KK_ID,
      callbackURL: "http://localhost:4000/oauth"
    },
    kakaoLoginCallback
  )
);

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(id, done){
  User.findById(id, function(err, user){
  done(err, user);
  });
});

// passport.deserializeUser(function(user, done) {
//   done(null, user);
// });