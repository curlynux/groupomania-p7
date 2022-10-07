import Header from "./header";
import { useParams } from "react-router-dom";
import "../assets/post.css";
import { useNavigate } from "react-router-dom";
// import AddImage from "./addImage";
import { httpRequest } from "../utils/httpRequest";
import { useState, useEffect } from "react";

const Post = ({
  _id,
  text,
  post,
  setText,
  setImage,
  handleLike,
  showModify,
  handleRemove,
  handleModify,
  toggleShowModify
}) => {
const [imageUrl, setImageUrl] = useState("");
const [user, setUser] = useState({})
  async function handleUpdate() 
  {
    const res = await httpRequest({path: `/post/${window.location.href.split("/")[4]}`, method: "PUT", body: {imageUrl, post_text: text}})
    
  }
  useEffect(() => 
  {
    const res = httpRequest({path: `/user`, method: "GET"})
    res.then(data => 
    {
      setUser(data)
      console.log(post);
      console.log(data)
    });
    
  }, [])
  return (
  <div className="post" data-id={_id}>
    <span className="login">{post.login}</span>
    <img src={post.imageUrl} alt={post.username} id="image" />
    <div>
      <button className="like" onClick={handleLike}>
        👍
      </button>
    </div>
    <p>{post.post_text}</p>
    {
      user?.role === "admin" || user._id === post.userId && (
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
      )
    }
    {showModify && (
      <>
        {/* <AddImage setImage={setImage}/> */}
        <label htmlFor="imageUrl">image url</label>
        <input type="text" value={imageUrl} onChange={(event) => setImageUrl(event.target.value)} id="imageUrl" placeholder="image url" style={{border: "2px solid black"}}/>
        <textarea
          defaultValue={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button
          onClick={handleUpdate}
          className="items-center applyModif px-5 py-2.5 text-sm text-black font-medium text-center rounded-lg focus:ring-4 focus:ring-blue-200 hover:bg-pink-300"
        >
          apply modification
        </button>
      </>
    )}
  </div>

)};

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
  }


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
    if (text && text.length) fileData.append("post_text", text);

    try {
      console.log(image);
      const textValue = document.getElementsByTagName("textarea")[0].value;
      const sendData = {
        post_text: textValue,
        imageUrl: imageUrl.length < 5 ? oldImageUrl : imageUrl
      }
      await httpRequest({
        path: `/post/${id}`,
        body: JSON.stringify(sendData),
        // body: fileData, 
        method: "PUT",
        isFormData: true,
      }).then(res => console.log(res))
      console.log(textValue, imageUrl);
    } catch (error) {
      console.log(error);
    } finally {
      loaderBg.remove();
      // notification();
    }

    // fetch(`http://localhost:8080/post/${id}`, {})

  };
  

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
          setImage={setImage}
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
