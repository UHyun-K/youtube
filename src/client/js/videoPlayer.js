const video = document.querySelector("video");
const playBtn = document.getElementById("play");
const muteBtn = document.getElementById("mute");
const volumeRange = document.getElementById("volume");
const currentTime= document.getElementById("currentTime");
const totalTime= document.getElementById("totalTime");
const timeline = document.getElementById("timeline");
const fullScreenBtn = document.getElementById("fullScreen");
const videoContainer = document.getElementById("videoContainer");

let volumeValue =0.5;
video.volume = volumeValue;


const hanldePlayClick = (e)=>{
    if(video.paused){
        video.play();
    }else{
        video.pause();
    }
    playBtn.innerText = video.paused ?  "Play" : "Pause";
}

const hanldeMute = (e)=>{
    if(video.muted){
        video.muted= false;
    }else{
        video.muted= true;
    }
    if(video.volume === 0){
        video.muted= false; 
        volumeValue= 0.5;
        video.volume =0.5;
    }
    muteBtn.innerText = video.muted? "Unmute": "Mute";
    volumeRange.value = video.muted? "0": volumeValue;

} 

const handleVolumeChange=(event)=>{
    const{ target: { value } } =event;

    if(video.muted){
        video.muted =false;
        muteBtn.innerText="Mute";
    }
    volumeValue = value;
    video.volume = value;

    if(video.volume === 0){
        video.muted =true;
        muteBtn.innerText="Unmuted";
    }

}

const formatTime =(seconds) =>{
    return new Date(seconds  * 1000).toISOString().substring(14,19);
} 

const handleLoadedMetaData = ( )=>{
    totalTime.innerText = formatTime(Math.floor(video.duration));
    timeline.max = Math.floor(video.duration);
}
const handleTimeUpdate = ( ) =>{
    currentTime.innerText = formatTime(Math.floor(video.currentTime));
    timeline.value = Math.floor(video.currentTime);
}
const handleTimelineChange =(event)=>{
  const {
      target: { value },
    }= event;
  video.currentTime = value;
}
const handleFullscreen = () => {
    const fullscreen = document.fullscreenElement;
    if (fullscreen) {
      document.exitFullscreen();
      fullScreenBtn.innerText = "Enter Full Screen";
    } else {
      videoContainer.requestFullscreen();
      fullScreenBtn.innerText = "Exit Full Screen";
    }
  };
if (video.readyState == 4) {
    handleLoadedMetadata();
    }

playBtn.addEventListener("click", hanldePlayClick);
muteBtn.addEventListener("click", hanldeMute);
volumeRange.addEventListener("input", handleVolumeChange);
video.addEventListener("loadedmetadata", handleLoadedMetaData);
video.addEventListener("timeupdate", handleTimeUpdate);
timeline.addEventListener("input", handleTimelineChange);
fullScreenBtn.addEventListener("click", handleFullscreen);
