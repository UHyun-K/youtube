import  "regenerator-runtime";
import "dotenv/config";
import "./db"; //파일 자체를 임포트 
import "./models/Video";
import "./models/User";
import "./models/Comment"
import app from "./server";

const PORT = 4000;


const handleListen = () => console.log(`✅server listening port  http://localhost:${PORT}🔥`);
app.listen(PORT, handleListen); //opens the port to listen for connections.