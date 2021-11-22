import express from "express";//import express nodemodules/express/index.js
import morgan from "morgan";
import globalRouter from "./routers/globalRouter";
import videoRouter from "./routers/videoRouters";
import userRouter from "./routers/userRouters";

const PORT = 4000;

const app = express();//create Express aplication
const logger = morgan("dev");

app.set("views", process.cwd() + "/src/views");
app.set("view engine", "pug");
app.use(logger);
app.use("/", globalRouter);
app.use("/videos", videoRouter);
app.use("/users", userRouter);




const handleListen = () => console.log(`server listening port  http://localhost:${PORT}🔥`);
app.listen(PORT, handleListen);