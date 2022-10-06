import Header from "./header";
import { useParams } from "react-router-dom";
import "../assets/post.css";
import { useNavigate } from "react-router-dom";
import AddImage from "./addImage";
import { httpRequest } from "../utils/httpRequest";
import { useState } from "react";
import { useEffect } from "react";

const Post = ({
  _id,
  text,
  post,
  setText,
  handleLike,
  showModify,
  handleRemove,
  handleModify,
  toggleShowModify,
  handleUpload,
}) => (
  <div className="post" data-id={_id}>
    <span className="login">{post.login}</span>
    <img src={post.imageUrl} alt={post.username} id="image" />
    <div>
      <button className="like" onClick={handleLike}>
        👍
      </button>
    </div>
    <p>{post.post_text}</p>
    <div className="divButton">
      <button
        onClick={handleRemove}
        className="items-center publish px-5 py-2.5 text-sm text-white font-medium text-center rounded-lg focus:ring-4 focus:ring-blue-200 hover:bg-red-800"
      >
        remove
      </button>
      <button
        onClick={toggleShowModify}
        className="items-center modify px-5 py-2.5 text-sm text-white font-medium text-center rounded-lg focus:ring-4 focus:ring-blue-200 hover:bg-red-800"
      >
        modify
      </button>
    </div>
    {showModify && (
      <>
        <AddImage />
        <textarea
          defaultValue={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button
          onClick={handleModify}
          className="items-center applyModif px-5 py-2.5 text-sm text-black font-medium text-center rounded-lg focus:ring-4 focus:ring-blue-200 hover:bg-pink-300"
        >
          apply modification
        </button>
      </>
    )}
  </div>
);

function DisplayOnePost() {
  const [image, setImage] = useState([]);
  const [showModify, setShowModify] = useState(false);
  const [text, setText] = useState("");
  const [post, setPost] = useState(null);

  let { id } = useParams();
  const navigate = useNavigate();

  const toggleShowModify = () => setShowModify(!showModify);

  useEffect(() => {
    const effect = async () => {
      if (!id) {
        return navigate("/home", {
          state: { message: "aucun post trouvé" },
        });
      }
      try {
        const post = await httpRequest({ path: `/post/${id}`, method: "GET" });
        console.log(post);
        setText(post.post.post_text);
        setPost(post);
      } catch (error) {}
    };
    effect();
  }, [id, navigate]);

  const deletePost = async () => {
    try {
      const res = await httpRequest({
        path: `/delete/${id}`,
        method: "DELETE",
      });
      console.log(res);
      navigate("/home", { replace: true });
    } catch (error) {
      console.log(error);
    }
  };
  const handleModify = async () => {
    const loaderBg = document.createElement("div");
    const loader = document.createElement("div");
    const fileData = new FormData();
    const imageUrl = document.getElementById("url").value
    const oldImageUrl = document.getElementById("image").src;
    // loader
    loaderBg.className = "bg";
    loader.className = "loader";
    document.getElementById("main").appendChild(loaderBg);
    loaderBg.appendChild(loader);

    // form data
    if (image) {
      fileData.append("image", image);
      fileData.append("imageUrl", image.name);
    }
    if (text.length) fileData.append("post_text", text);

    try {
      const res = await httpRequest({
        path: `/post/${id}`,
        body: { post_text: text, imageUrl: imageUrl.length <5 ? oldImageUrl : imageUrl},
        method: "PUT",
        // isFormData: true,
      });
      console.log(res);
    } catch (error) {
      console.log(error);
    } finally {
      loaderBg.remove();
      // notification();
    }

    // fetch(`http://localhost:8080/post/${id}`, {})

  };
  function modifyPost(event) {
    const p = document.getElementsByTagName("p");
    const modify = document.getElementsByClassName("modify");
    const applyModif = document.createElement("button");
    const text = document.createElement("textarea");

    text.id = "modified_text";
    console.log(text);
    applyModif.innerHTML = "apply modification";
    applyModif.className =
      "items-center applyModif px-5 py-2.5 text-sm text-black font-medium text-center rounded-lg focus:ring-4 focus:ring-blue-200 hover:bg-pink-300";
    modify[0].onclick = () => {
      const post = document.getElementsByClassName("post");
      const applyModif = document.createElement("button");
      const inputFile = document.getElementsByTagName("input")[0];

      applyModif.innerHTML = "apply modification";
      applyModif.className =
        "items-center applyModif px-5 py-2.5 text-sm text-black font-medium text-center rounded-lg focus:ring-4 focus:ring-blue-200 hover:bg-pink-300";
      console.log(p[0].textContent);
      text.value = p[0].textContent;
      console.log(text);
      // p[0].remove();
      post[0].appendChild(text);
      post[0].appendChild(applyModif);
      console.log(post[0]);
      inputFile.style.display = "block";
      

      setTimeout(() => {
        applyModif.onclick = (event) => {
          event.preventDefault();
          var text_value = document.getElementById("modified_text").value;
          const sendData = {
            login: document.getElementsByClassName("login")[0].textContent,
            userId: localStorage.getItem("userId"),
            imageUrl: document.getElementById("image").src,
            post_text: document.getElementById("modified_text").value,
            like: 0,
          };
          inputFile.addEventListener("change", () => {
            event.preventDefault();
            console.log(event.target.files[0]);
            sendData.file = event.target.files[0];
            console.log(sendData);
          });
          sendData.post_text = text_value;
          console.log("POST_TEXT", sendData.post_text);

          fetch(
            `http://localhost:8080/post/${window.location.href.split("/")[4]}`,
            {
              method: "PUT",
              mode: "cors",
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `Bearer ${JSON.parse(
                  localStorage.getItem("token")
                )}`,
                "X-Authenticated-Userid": `${JSON.parse(
                  localStorage.getItem("userId")
                )}`,
              },
              body: JSON.stringify(sendData),
            }
          ).then((res) => console.log(res));
          console.log(sendData);
          console.log("modification sent !");
          window.location.reload();
        };
      }, 2000);
    };
  }

  const handleLike = async () => {
    try {
      const res = await httpRequest({ path: `/like/${id}`, method: "PUT" });

      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div id="main">
      <Header />
      <h1>post</h1>
      {post && (
        <Post
          {...post}
          text={text}
          showModify={showModify}
          setText={setText}
          handleLike={handleLike}
          handleUpload={setImage}
          handleModify={handleModify}
          handleRemove={deletePost}
          toggleShowModify={toggleShowModify}
        />
      )}
    </div>
  );
}

export default DisplayOnePost;
