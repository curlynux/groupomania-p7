import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Header from "./header";
import { Post } from "./singlePost";
import LogoutButton from "./logoutButton";
import AddImage from "./addImage";
import { httpRequest } from "../utils/httpRequest";
import "../assets/home.css";
import "../assets/loader.css";

function Home() {
  const [image, setImage] = useState([]);
  const [text, setText] = useState("");
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();
  var userId = JSON.parse(localStorage.getItem("userId"))

  const getPost = async () => {
    try {
      const post = await httpRequest({ path: "/post", method: "GET" });
      console.log(post);
      setPosts(post);
    } catch (error) {console.log(error)}
    
      if(userId === "6319fc45f375ce7c71b7b6b8") console.log("admin", userId);
  };

  function notification() {
    const div = document.getElementsByClassName("notif")[0];
    const bg = document.createElement("div");
    const strong = document.createElement("strong");
    const message = document.createElement("span");
    const icon = document.createElement("span");

    bg.setAttribute(
      "class",
      "bg-green-100 border border-green-400 text-green-700 px-4 py-4 notification rounded relative"
    );
    strong.setAttribute("class", "font-bold");
    message.setAttribute("class", "block sm:inline msg");

    bg.setAttribute("role", "alert");

    strong.innerHTML = "NEW POST !";
    message.innerHTML = "vous avez publié un nouveau post";

    div.appendChild(bg);
    bg.appendChild(strong);
    bg.appendChild(message);
    bg.appendChild(icon);

    setTimeout(() => {
      bg.remove();
      getPost();
    }, 5000);
  }

  const createPost = async (event) => {
    event.preventDefault();
    
    if(userId !== "6319fc45f375ce7c71b7b6b8")
    {
      const loaderBg = document.createElement("div");
      const loader = document.createElement("div");
      const fileData = new FormData();
  
      loaderBg.className = "bg";
      loader.className = "loader";
      document.getElementById("main").appendChild(loaderBg);
      loaderBg.appendChild(loader);
  
      if (image) {
        fileData.append("image", image);
        fileData.append("imageUrl", JSON.stringify(image.name));
      }
      if (text.length) fileData.append("post_text", text);
  
      fileData.append("login", localStorage.getItem("login"));
      fileData.append("like", 0);
      fileData.append("userId", localStorage.getItem("userId"));
  
      try {
        const { post } = await httpRequest({
          path: "/post",
          body: fileData,
          isFormData: true,
        });
        setPosts([...posts, post]);
        setText("");
      } catch (error) {
        console.log(error);
      } finally {
        loaderBg.remove();
        notification();
      }
    }
    else
    {
      alert("user admin cannot post");
      console.log("user admin cannot post");
    }
  };

  const handleLike = async (id) => {
    try {
      const res = await httpRequest({ path: `/like/${id}`, method: "PUT" });

      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getPost();
  }, []);

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await httpRequest({ path: "/user", method: "GET" });

        localStorage.setItem("login", response.username);
      } catch (error) {
        localStorage.clear();
        navigate("/login", { replace: true });
      }
    };

    fetch();
  }, [navigate]);

  return (
    <div id="main">
      <Header />
      <h1>create post</h1>
      <LogoutButton />
      <div className="flex flex-col">
        <form name="form" onSubmit={(event) => createPost(event)}>
          <div className="mb-4 w-full parent bg-gray-50 rounded-lg border border-gray-200">
            <div className="py-2 px-4 bg-white rounded-b-lg text">
              <textarea
                id="editor"
                rows="8"
                maxLength={240}
                onChange={(event) => setText(event.target.value)}
                name="text"
                className="block px-0 w-full text-sm text-gray-800 bg-white border-0  focus:ring-0 "
                placeholder="ecrire un post"
              />
            </div>
          </div>
          <div className="notif"></div>
          <div className="boxbtn">
            <button
              type="submit"
              className="items-center publish px-5 py-2.5 text-sm text-white font-medium text-center rounded-lg focus:ring-4 focus:ring-blue-200 hover:bg-red-800"
            >
              publish post
            </button>
          </div>
          <AddImage setImage={setImage} />
        </form>
        <div id="feed">
          <h1>Feed</h1>
          {posts.map((post, key) => (
            <Post key={key} {...post} handleLike={() => handleLike(post._id)} />
          )).reverse()}
        </div>
      </div>
    </div>
  );
}

export default Home;
