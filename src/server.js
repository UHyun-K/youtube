
import express from "express";//import express nodemodules/express/index.js
import morgan from "morgan";
import rootRouter from "./routers/rootRouter";
import videoRouter from "./routers/videoRouters";
import userRouter from "./routers/userRouters";



const app = express();//create Express aplication
const logger = morgan("dev");
//configure app
app.set("views", process.cwd() + "/src/views");
app.set("view engine", "pug");
app.use(logger);
app.use(express.urlencoded({ extended: true }));
app.use("/", rootRouter);
app.use("/videos", videoRouter);
app.use("/users", userRouter);



export default app;