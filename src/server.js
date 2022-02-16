
import express from "express";//import express nodemodules/express/index.js
import morgan from "morgan";
import session from "express-session";
import flash from "express-flash";
import MongoStore from "connect-mongo"
import { localsMiddleware } from "./middlewares"
import rootRouter from "./routers/rootRouter";
import videoRouter from "./routers/videoRouters";
import userRouter from "./routers/userRouters";
import apiRouter from "./routers/apiRouter";


const app = express();//create Express aplication
const logger = morgan("dev");
//configure app
app.set("views", process.cwd() + "/src/views");
app.set("view engine", "pug");
app.use(logger);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.use(session({
    secret: process.env.COOKIE_SECRET,
    resave: false,
    saveUnintialized: false,
    store: MongoStore.create({ mongoUrl: process.env.DB_URL }),
}));


app.use(flash());
app.use(localsMiddleware);
app.use("/uploads", express.static("uploads"));
app.use("/static", express.static("assets"));
app.use("/", rootRouter);
app.use("/videos", videoRouter);
app.use("/users", userRouter);
app.use("/api", apiRouter);



export default app;