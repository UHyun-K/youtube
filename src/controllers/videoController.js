

export const trending = (req, res) => {
  const videos = [
    {
      title: "hello",
      rating: 5,
      comments: 2,
      createdAt: "2 minutes ago",
      views: 59,
      id: 1.
    },
    {
      title: "2nd",
      rating: 5,
      comments: 2,
      createdAt: "2 minutes ago",
      views: 59,
      id: 1.
    },
    {
      title: "3rd",
      rating: 5,
      comments: 2,
      createdAt: "2 minutes ago",
      views: 59,
      id: 1.
    },

  ];
  return res.render("home", { pageTitle: "home", videos });
};
export const see = (req, res) => res.render("watch");
export const edit = (req, res) => res.render("edit");

export const search = (req, res) => res.send("Search");
export const upload = (req, res) => res.send("Upload");
export const deleteVideo = (req, res) => {
  console.log(req.params);
  return res.send("Delete video")
};



