import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";
import globalRouter from "./routers/globalRouter";
import routes from "./routes";
const app = express();

app.use(cookieParser()); // 쿠키 미들웨어 use는 전역적용
app.use(bodyParser.json()); // form데이터를 서버로 받아와서 활용
app.use(bodyParser.urlencoded({extended: true}));
app.use(helmet()); // 기초보안
app.use(morgan("dev")); // 로그

app.use(routes.home, globalRouter);
app.use(routes.users, userRouter);
app.use(routes.videos, videoRouter);

export default app;