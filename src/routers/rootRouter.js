import express from "express"; //자바스크립트에서는 모든 파일이 자기만의 세계를 가지기 때문에 익스프레스  따로 임폴트 하지 않으면 사용 할 수 없다.
//하나의 파일에서 돌아가는 환경 만들어야함 ,모듈 개별적임 
import { getJoin, postJoin, getLogin, postLogin } from "../controllers/userController";
import { home, search } from "../controllers/videoController";

const rootRouter = express.Router();  //create global router



rootRouter.get('/', home); //config globla router
rootRouter.route('/join').get(getJoin).post(postJoin);
rootRouter.route('/login').get(getLogin).post(postLogin);
rootRouter.get('/search', search);


export default rootRouter; //export golbal router  파일 전체가 아닌 globalRouter 라는 "변수"만 export