import mongoose from "mongoose";

mongoose.connect(" mongodb://127.0.0.1:27017/youtube", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}); //mongoose가 database와 연결 해줌 


const db = mongoose.connection;

const handleOpen = () => console.log("✅Connected to DB")
const handleError = () => console.log("DB Error", error);

db.on("error", handleError); //listen
db.once("open", handleOpen);