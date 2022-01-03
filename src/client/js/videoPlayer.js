const video = document.querySelector("video");
const playBtn = document.getElementById("play");
const playBtnIcon = playBtn.querySelector("i");
const muteBtn = document.getElementById("mute");
const muteBtnIcon = document.getElementById("i");
const volumeRange = document.getElementById("volume");
const currentTime= document.getElementById("currentTime");
const totalTime= document.getElementById("totalTime");
const timeline = document.getElementById("timeline");
const fullScreenBtn = document.getElementById("fullScreen");
const fullScreenIcon = fullScreenBtn.querySelector("i");
const videoContainer = document.getElementById("videoContainer");
const videoControls = document.getElementById("videoControls");

let controlsTimeout = null;
let controlsMovementTimeout = null;
let volumeValue =0.5;
video.volume = volumeValue;


const hanldePlayClick = (e)=>{
    if(video.paused){
        video.play();
    }else{
        video.pause();
    }
    playBtnIcon.classList = video.paused ?  "fas fa-play" :  "fas fa-pause";
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
    muteBtnIcon.classList = video.muted? "fas fa-volume-up": "fas fa-volume-up";
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
      fullScreenIcon.classList = "fas fa-expand";
    } else {
      videoContainer.requestFullscreen();
      fullScreenIcon.classList = "fas fa-compress";
    }
  };
  const hideControls = () => {
    videoControls.classList.remove("showing");
  }
  const  handleMouseMove = ( )=>{
      if(controlsTimeout){
          clearTimeout(controlsTimeout);
          controlsTimeout = null;
      }

    if(controlsMovementTimeout){
        clearTimeout(controlsMovementTimeout);
        controlsMovementTimeout =null;
    }
    videoControls.classList.add("showing");
    controlsMovementTimeout = setTimeout(hideControls, 3000);
  }

  const handleMouseLeave = ( )=> {
    controlsTimeout = setTimeout(hideControls,  3000);


  }

const handleKeydown = (e) =>{
    if(e.keyCode == 32){
        hanldePlayClick();
    }
}
if (video.readyState === 4) {
    handleLoadedMetadata();
}

playBtn.addEventListener("click", hanldePlayClick);
muteBtn.addEventListener("click", hanldeMute);
volumeRange.addEventListener("input", handleVolumeChange);
video.addEventListener("loadedmetadata", handleLoadedMetaData);
video.addEventListener("timeupdate", handleTimeUpdate);
video.addEventListener("click", hanldePlayClick);
videoContainer.addEventListener("mousemove", handleMouseMove);
videoContainer.addEventListener("mouseleave", handleMouseLeave);
timeline.addEventListener("input", handleTimelineChange);
fullScreenBtn.addEventListener("click", handleFullscreen);
window.addEventListener("keydown", handleKeydown);
