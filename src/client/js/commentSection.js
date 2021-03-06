const videoContainer = document.getElementById("videoContainer");
const form = document.getElementById("commentForm");



const addComment = (text,id)=>{
    const videoComments = document.querySelector(".video__comments ul")
    const newComment = document.createElement("li");
    const removeBtns = newComment.querySelectorAll(".removeBtn");
    newComment.dataset.id = id;
    newComment.className= "video__comment";
    const icon = document.createElement("i");
    icon.className= "fas fa-comment";
    const span = document.createElement("span");
    span.innerText = ` ${text}`;
    const span2 = document.createElement("span");
    span2.innerText=`❌`;
    span2.className ="removeBtn";
    newComment.appendChild(icon);
    newComment.appendChild(span);
    newComment.appendChild(span2);
    videoComments.prepend(newComment);
    removeBtns.forEach((i)=> i.addEventListener("click", deleteComment ));
}

const handleSubmit = async(event) => {
    event.preventDefault();

    const textarea = form.querySelector("textarea");
    const text= textarea.value;
    const videoId = videoContainer.dataset.id;
    if(text === ""){
        return;
    }
    const response =await fetch(`/api/videos/${videoId}/comment`,{
        method:"POST",
        headers:{
            "Content-Type":"application/json",
        },
        body:JSON.stringify({text}),
    });


    if(response.status === 201){
        textarea.value="";
        const {newCommentId}= await response.json();
        addComment(text, newCommentId);
    }

}
if(form){
    form.addEventListener("submit",handleSubmit);
}



 const deleteComment = async(event)=>{
    const li = event.target.parentElement;
    const {id} = li.dataset;
    await fetch (`/api/comment/delete/${id}`,{
        method:"DELETE",
        headers: {
            "Content-Type": "application/json",
          },
        body: JSON.stringify({ id }),
    });
    li.remove();
    console.log(removeBtns);
  }
  const removeBtns = document.querySelectorAll(".removeBtn");

  removeBtns.forEach((i)=> i.addEventListener("click", deleteComment ));

