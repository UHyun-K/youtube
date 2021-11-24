import express from "express";
import { watch, getEdit, postEdit, upload } from "../controllers/videoController";


const videoRouter = express.Router();

videoRouter.get("/upload", upload); /// /upload 와 /:id  순서가 바뀌면  위에서부터  내려와서 해석하므로 /upload -> /:id 로 인식함 
videoRouter.get("/:id(\\d+)", watch); // /upload가 아니네  한줄 내려가서 /:id 구나!
videoRouter.route("/:id(\\d+)/edit").get(getEdit).post(postEdit);




export default videoRouter;