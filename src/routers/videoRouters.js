import express from "express";
import { watch, getEdit, postEdit, getUpload, postUpload, deleteVideo } from "../controllers/videoController";
import{protectorMiddleware} from "../middlewares"

const videoRouter = express.Router();

/// /upload 와 /:id  순서가 바뀌면  위에서부터  내려와서 해석하므로 /upload -> /:id 로 인식함 
videoRouter.get("/:id([0-9a-f]{24})", watch); // /upload가 아니네  한줄 내려가서 /:id 구나!
videoRouter.route("/:id([0-9a-f]{24})/edit").all(protectorMiddleware).get(getEdit).post(postEdit);
videoRouter.route("/:id([0-9a-f]{24})/delete").all(protectorMiddleware).get(deleteVideo);
videoRouter.route("/upload").all(protectorMiddleware).get(getUpload).post(postUpload);

export default videoRouter;