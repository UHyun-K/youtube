import express from "express";
import { see, edit, upload, deleteVideo } from "../controllers/videoController";


const videoRouter = express.Router();

videoRouter.get("/upload", upload); /// /upload 와 /:id  순서가 바뀌면  위에서부터  내려와서 해석하므로 /upload -> /:id 로 인식함 
videoRouter.get("/:id(\\d+)", see); // /upload가 아니네  한줄 내려가서 /:id 구나!
videoRouter.get("/:id(\\d+)/edit", edit);
videoRouter.get("/:id(\\d+)/delete", deleteVideo);



export default videoRouter;