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
        Accept: "application/json",
        "Content-Type": "application/json",
        "Authorization": `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
        "X-Authenticated-Userid": `${JSON.parse(localStorage.getItem("userId"))}`,
    }
  }).then(async response => 
    {
        console.log(response)
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
      const deleteButton = document.getElementsByClassName("publish");
      const id = new Object();
      id.post_id = post[0].dataset.id
      
      console.log(id);
      deleteButton[0].addEventListener("click", () => 
      {
        try {
          fetch(`http://localhost:8080/delete/${id.post_id}`, 
          {
            method: "POST",
            mode: "cors",
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
              "Authorization": `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
              "X-Authenticated-Userid": `${JSON.parse(localStorage.getItem("userId"))}`,
          },
          body: JSON.stringify(id)
          }).then(res => 
          {
            console.log(res)
            window.location.reload()
          });
        } catch (error) {
          console.log(error);
        }
        console.log("click");
      })
      console.log(post[0].dataset.id);

    }
    setTimeout(() => deletePost(), 1000)
  return(<div>
    <Header/>
    <h1>post</h1>
    <div className="post"></div>
  </div>)
}

export default DisplayOnePost;