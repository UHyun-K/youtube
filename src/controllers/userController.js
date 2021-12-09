import User from "../models/User";
import fetch from "node-fetch";
import bcrypt from "bcrypt";


export const getJoin = (req, res) => res.render("join", { pageTitle: "Join" });
export const postJoin = async (req, res) => {
    console.log(req.body);
    const { name, username, email, password, password2, location } = req.body;
    const exists = await User.exists({ $or: [{ username }, { email }] });
    const pageTitle = "Join";
    if (password !== password2) {
        return res.status(400).render("join", {
            pageTitle,
            errorMessage: "Password confirmation does not match."
        });
    }
    if (exists) {
        return res.status(400).render("join", {
            pageTitle,
            errorMessage: "This username/email is already taken.",
        })
    }
    try {
        await User.create(
            {
                name,
                username,
                email,
                password,
                location
            }
        );
        return res.redirect("/login");
    } catch (error) {
        return res.status(4000).render("join", {
            pageTitle: "Join",
            errorMessage: error._message,
        });
    }

};
export const getLogin = (req, res) => res.render("login", { pageTitle: "Login" });
export const postLogin = async (req, res) => {
    const { username, password } = req.body;
    const pageTitle = "Login";
    const user = await User.findOne({ username });
    if (!user) {
        return res.status(400).render("login", {
            pageTitle,
            errorMessage: "An account with this username does not exists"
        });
    }
    const ok = await bcrypt.compare(password, user.password);
    if (!ok) {
        return res.status(400).render("login", {
            pageTitle,
            errorMessage: "Wrong password",
        });
    }
    req.session.loggedIn = true;
    req.session.user = user;
    return res.redirect("/");
}
export const startGithubLogin = (req, res) => {
    const baseUrl = `https://github.com/login/oauth/authorize`;
    const config = {
        client_id: process.env.GH_CLIENT,
        allow_signup: false,
        scope: "read:user user:email",
    }
    const params = new URLSearchParams(config).toString();
    const finalUrl = `${baseUrl}?${params}`;
    return res.redirect(finalUrl);
}

export const finishGithubLogin = async (req, res) => {
    const baseUrl = `https://github.com/login/oauth/authorize`;
    const config = {
        client_id: process.env.GH_CLIENT,
        clinet_secret: process.env.GH_SECRET,
        code: req.query.code,
    }
    const params = new URLSearchParams(config).toString();
    const finalUrl = `${baseUrl}?${params}`;
    const data = await fetch(finalUrl, {
        method: "POST",  //finalUrl 에 POST요청 보낼 것임 fetch로 데이터받아오고 
        headers: {
            Accept: "application/json" //JSON을 return받기위해서는
        },
    })
    const json = await data.json();//그데이터에서 json을 추출  
    console.log(json);
    res.send(JSON.stringify(json));
}
export const edit = (req, res) => res.render("edit");
export const remove = (req, res) => res.send("Remove user");

export const logout = (req, res) => res.send("Logout");
export const see = (req, res) => res.send("See user");





