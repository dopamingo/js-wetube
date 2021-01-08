// 서버만들기 (Nodejs&express)
// github Repo → gitignore (표준) → [README.md](http://readme.md) (기본설정)
// require = 모듈을 가져오는 것.
// app.listen(포트) = 포트설정
// scripts 생성 (node index.js) = 시작설정하기

import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
const app = express();

// Routing
// GET = 단순히 페이지를 가져오는 것.
// POST = 정보를 전달.
// req & res
// req = POST 로 전달한 정보를 요청해서, 정보를 받음 !
// res = 정보를 응답! ( res.send )

//ES6 코드 맛보기
const handleHome = (req, res) => res.send("Hello from my ass");
// function handleHome(req, res){
//     res.send('hello from home!');
// }
const handleProfile = (req, res) => res.send("You are on my profile");

app.use(cookieParser()); // 쿠키 미들웨어 use는 전역적용
app.use(bodyParser.json()); // form데이터를 서버로 받아와서 활용
app.use(bodyParser.urlencoded({extended: true}));
app.use(helmet()); // 기초보안
app.use(morgan("dev")); // 로그

app.get("/", handleHome); // 라우팅, 콜백함수

app.get("/profile", handleProfile);

export default app;