import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import { localsMiddleware } from "./middlewares";
import routes from "./routes";
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";
import globalRouter from "./routers/globalRouter";

const app = express();

app.use(helmet()); // 기초보안
app.use(function(req, res, next) {
    res.setHeader("Content-Security-Policy", "script-src 'self' https://archive.org");
    return next();
    }); // 비디오 안 나온느 현상 임시 해결
app.set("view engine", "pug") // 기본 디렉토리는 /view
app.use("/uploads", express.static("uploads"));
app.use(cookieParser()); // 쿠키 미들웨어 use는 전역적용
app.use(bodyParser.json()); // form데이터를 서버로 받아와서 활용
app.use(bodyParser.urlencoded({extended: true}));
app.use(morgan("dev")); // 로그
app.use(localsMiddleware);

app.use(routes.home, globalRouter);
app.use(routes.users, userRouter);
app.use(routes.videos, videoRouter);

export default app;