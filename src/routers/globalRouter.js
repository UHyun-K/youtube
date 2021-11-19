import express from "express"; //자바스크립트에서는 모든 파일이 자기만의 세계를 가지기 때문에 익스프레스  따로 임폴트 하지 않으면 사용 할 수 없다.
//하나의 파일에서 돌아가는 환경 만들어야함 ,모듈 개별적임 
import { join, login } from "../controllers/userController";
import { trending, search } from "../controllers/videoController";

const globalRouter = express.Router();  //create global router



globalRouter.get('/', trending); //config globla router
globalRouter.get('/join', join);
globalRouter.get('/login', login);
globalRouter.get('/search', search);


export default globalRouter; //export golbal router  파일 전체가 아닌 globalRouter 라는 "변수"만 export