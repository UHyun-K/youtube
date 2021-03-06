

const startBtn = document.getElementById("startBtn");
const video = document.getElementById("preview");

let stream;
let recorder;
let videoFile;

const handleDownload =async()=>{
  
    const a = document.createElement("a");
    a.href= videoFile;
    a.download ="MyRecording.webm";
    document.body.appendChild(a);
    a.click();
    const tracks = stream.getTracks();
    tracks.forEach((track) => {
    track.stop();
    });
    stream = null;
}

const hanldeStop = () =>{
    startBtn.innerText = "Download Recording";
    startBtn.removeEventListener("click",hanldeStop);
    startBtn.addEventListener("click", handleDownload);
    recorder.stop();

}

const handleStart= () => {
    startBtn.innerText ="Stop Recording";
    startBtn.removeEventListener("click",handleStart);
    startBtn.addEventListener("click", hanldeStop);
    recorder = new MediaRecorder(stream);
    recorder.ondataavailable = (e) =>{
        videoFile = URL.createObjectURL(e.data);
        video.srcObject= null; 
        video.src = videoFile;
        video.loop = true;
        video.play();
    } 
    recorder.start();
}

const init = async() =>{
     stream = await navigator.mediaDevices.getUserMedia({
        audio:false,
        video:{width:200, height:300},
    }); 
    video.srcObject = stream;
    video.play();
}
init( );
startBtn.addEventListener("click", handleStart);