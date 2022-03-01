import Video from "../models/Video";
import Comment from "../models/Comment";
import User from "../models/User";

//Video.find({}, (error, videos) => { });

export const home = async (req, res) => {
  const videos = await Video.find({})
    .sort({ createdAt: "desc" })
    .populate("owner");
  return res.render("home", { pageTitle: "Home", videos });
};

export const watch = async (req, res) => {
  const { id } = req.params;
  const video = await Video.findById(id).populate("owner").populate("comments");
  if (!video) {
    return res.status(404).render("404", { pageTitle: "Video not found" });
  }
  return res.render("watch", { pageTitle: video.title, video });
}

export const getEdit = async (req, res) => {
  const { id } = req.params;
  const {
    user: { _id },
  } = req.session;
  console.log(_id);
  const video = await Video.findById(id).populate("owner");
  if (!video) {
    return res.status(404).render("404", { pageTitle: "Video not found" })
  }
  if (String(video.owner._id) !== String(_id)) {
    return res.status(403).redirect("/");
  }
  return res.render("edit", { pageTitle: `Edit ${video.title} `, video });
};

export const postEdit = async (req, res) => {
  const{
    user:{ _id },
  } = req.session;
  const { id } = req.params;
  const { title, description, hashtags } = req.body;
  const video = await Video.findById(id);
  if (!video) {
    return res.status(404).render("404", { pageTitle: "Video not found" })
  }
  if (String(video.owner._id) !== String(_id)){
    return res.status(403).redirect("/");
  }
  await Video.findByIdAndUpdate(id, {
    title,
    description,
    hashtags: Video.formatHashtags(hashtags),
  })
  req.flash("ok","changes saved" );
  return res.redirect(`/videos/${id}`);
}
export const getUpload = (req, res) => {
  return res.render("upload", { pageTitle: "Upload video" });
}
export const postUpload = async (req, res) => {
  const {
    user: {  _id },
  } = req.session;
  const {path:fileUrl} = req.file;
  const { title, description, hashtags } = req.body;
  try {
    const newVideo = await Video.create({
      title,
      description,
      fileUrl,
      owner: _id,
      hashtags: Video.formatHashtags(hashtags),
    });
    const user = await User.findById(_id);
    user.videos.push(newVideo._id);
    user.save();
    return res.redirect("/");
  } catch (error) {
    console.log(error);
    return res.status(400).render("upload", {
      pageTitle: "Upload video",
      errorMessage: error._message,
    });
  }
}

export const deleteVideo = async (req, res) => {
  const { id } = req.params;
  const {
    user: {  _id },
  } = req.session;
  const video = await Video.findById(id);
  const user = await User.findById(id);
  if(!video){
    return res.status(404).render("404", { pageTitle: "Video not found" });
  }
  if (String(video.owner._id) !== String(_id)){
    req.flash("error","Not Authorized");
    return res.status(403).redirect("/");

  }
  await Video.findByIdAndDelete(id);
  user.videos.splice(user.videos.indexOf(id),1);
  user.save();
  return res.redirect("/");
}

export const search = async (req, res) => {
  const { keyword } = req.query; //req.query is for the URL data.  form when we use get method
  let videos = [];
  if (keyword) {  //페이지에 들어왔을 때  keyword=undefined
    videos = await Video.find({
      title: {
        $regex: new RegExp(keyword, "i")
      },
    }).populate("owner")
    console.log(videos);
  }
  return res.render("search", { pageTitle: "Search", videos });
}

export const registerView = async ( req, res )=> {
  const { id } = req.params ;
  const video = await Video.findById(id);
  if(!video){
    return res.sendStatus(400);
  }
  video.meta.views = video.meta.views +1;
  await video.save();
  return res.sendStatus(200);
}
export const createComment = async (req, res) => {
  const {
    session: { user },
    body: { text },
    params: { id },
  } = req;
  const video = await Video.findById(id);
  if (!video) {
    return res.sendStatus(404);
  }
  const comment = await Comment.create({
    text,
    owner: user._id,
    video: id,
  });
  video.comments.push(comment._id);
  video.save();
  return res.status(201).json({newCommentId: comment._id});
};

export const deleteComment= async(req,res)=>{
  
  const {
    body:{ id : commentId },
    session: {
      user:{ _id : userId}
    },
  }= req;
  const comment =await Comment.findById(commentId);
  const ownerId = String(comment.owner);
  if(userId !== ownerId){
    req.flash("error","Not Authorized");
    return res.status(403).redirect("/");
  } 
  await Comment.findByIdAndDelete(commentId);
  const video= await Video.findOne({comments:commentId});
  let targetId= null;
  for(let i=0; i < video.comments.length; i++ ){
    if(String(video.comments[i]) === String(commentId)){
      targetId = video.comments[i];
    }
  }
  video.comments.splice(video.comments.indexOf(targetId), 1);
  video.save();
  return res.sendStatus(200);
}