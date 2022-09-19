import Header from "./header"
import { useParams } from 'react-router-dom';
import "../assets/post.css";

function DisplayOnePost()
{
  let { id } = useParams();

  fetch(`http://localhost:8080/post/${id}`, 
  {
    method: "GET",
    mode: "cors",
    headers: {
        "Authorization": `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
        "X-Authenticated-Userid": `${JSON.parse(localStorage.getItem("userId"))}`,
    }
  }).then(async response => 
    {
        console.log(response)
        console.log("post called");
        await response.json().then(data => 
        {
          const login = document.createElement("span");
          const image = document.createElement("img");
          const divLike = document.createElement("div");
          const like = document.createElement("button");
          const disLike = document.createElement("button");
          const textPost = document.createElement("p");
          const post = document.getElementsByClassName("post");
          const remove = document.createElement("button");

          post[0].appendChild(login);
          post[0].appendChild(image);
          post[0].appendChild(divLike);
          divLike.appendChild(like);
          divLike.appendChild(disLike);
          post[0].appendChild(textPost);
          remove.innerHTML = "delete"
          remove.className = "items-center publish px-5 py-2.5 text-sm text-white font-medium text-center rounded-lg focus:ring-4 focus:ring-blue-200 hover:bg-red-800"
          post[0].appendChild(remove)
          post[0].dataset.id = id;

          login.innerHTML = data.post.login;
          image.src = data.post.imageUrl;
          like.innerHTML = "👍"
          disLike.innerHTML = "👎"
          textPost.innerHTML = data.post.post_text
          console.log(data.post);
          
          return;
        });
    });

    function deletePost() 
    {
      const post = document.getElementsByClassName("post");
      fetch("http://localhost:8080/post", 
      {
        method: "POST",
        mode: "cors",
        headers: {
          "Authorization": `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
          "X-Authenticated-Userid": `${JSON.parse(localStorage.getItem("userId"))}`,
      },
      body: JSON.stringify(post[0].dataset.id)
      })
      console.log(post[0].dataset.id);
    }
    deletePost()
  return(<div>
    <Header/>
    <h1>post</h1>
    <div className="post"></div>
  </div>)
}

export default DisplayOnePost;