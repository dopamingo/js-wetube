import routes from "./routes";

export const localsMiddleware = (req, res, next) => {
  res.locals.siteName = "WeTube";
  res.locals.routes = routes;
  res.locals.user = { // fake 유저정보
    isAuthenticated: true,
    id: 1
  };
  next();
};