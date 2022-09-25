import Header from "./header"
import { useParams } from 'react-router-dom';
import "../assets/post.css";
import { useNavigate } from "react-router-dom";

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
          const modify = document.createElement("button");
          const buttonDiv = document.createElement("div");

          
          buttonDiv.className = "divButton"
          post[0].appendChild(login);
          post[0].appendChild(image);
          post[0].appendChild(divLike);
          divLike.appendChild(like);
          divLike.appendChild(disLike);
          post[0].appendChild(textPost);
          remove.innerHTML = "delete"
          remove.className = "items-center publish px-5 py-2.5 text-sm text-white font-medium text-center rounded-lg focus:ring-4 focus:ring-blue-200 hover:bg-red-800"
          modify.className = "items-center modify px-5 py-2.5 text-sm text-white font-medium text-center rounded-lg focus:ring-4 focus:ring-blue-200 hover:bg-red-800"
          // post[0].appendChild(remove)
          post[0].dataset.id = id;
          modify.innerHTML = "modify";
          // post[0].appendChild(modify)
          post[0].appendChild(buttonDiv);

          buttonDiv.appendChild(remove);
          buttonDiv.appendChild(modify);

          login.innerHTML = data.post.login;
          image.src = data.post.imageUrl;
          like.innerHTML = "👍";
          disLike.innerHTML = "👎";
          textPost.innerHTML = data.post.post_text;
          
          return;
        });
    });
    const navigate = useNavigate();

    function deletePost() 
    {
      const post = document.getElementsByClassName("post");
      const deleteButton = document.getElementsByClassName("publish");
      const id = {}
      id.post_id = post[0].dataset.id
      id.image = post[0].childNodes[1].src;
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
            navigate("/home", {replace: true})
          });
        } catch (error) {
          console.log(error);
        }
      })
    }
    setTimeout(() => deletePost(), 1000)
    function modifyPost() 
    {
      const post = document.getElementsByClassName("post");
      const applyModif = document.getElementsByClassName("applyModif");
      // console.log(post[0].childNodes[3]);
      const p = document.getElementsByTagName("p");
      var text = document.createElement("textarea")
      const modify = document.getElementsByClassName("modify");
      modify[0].onclick = () => 
      {
        const post = document.getElementsByClassName("post");
        const applyModif = document.createElement("button")

        applyModif.innerHTML = "apply modification";
        applyModif.className = "items-center applyModif px-5 py-2.5 text-sm text-black font-medium text-center rounded-lg focus:ring-4 focus:ring-blue-200 hover:bg-pink-300";
        console.log(p[0].textContent);
        text.value = p[0].textContent;
        // p[0].remove();
        post[0].appendChild(text);
        post[0].appendChild(applyModif)

        console.log(applyModif);
        applyModif.onclick = () => 
        {
          const post = document.getElementsByClassName("post");
  
          console.log("test");
          const id = {}
          id.post_id = post[0].dataset.id
          console.log(id);
          const sendData = {}
          fetch(`http://localhost:8080/post/${id.post_id}`, 
          {
            method: "GET",
            mode: "cors",
            headers: {
              "Authorization": `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
              "X-Authenticated-Userid": `${JSON.parse(localStorage.getItem("userId"))}`,
            }
          }).then(res => res.json().then(data => 
          {
            const textModif = document.getElementsByTagName("textarea");
            textModif[0].setAttribute("id", "textModified");
            console.log(data.post);
            console.log(textModif[0].value);
  
            sendData.login = data.post.login;
            sendData.imageUrl = data.post.imageUrl;
            sendData.post_text = textModif[0].value;
            sendData.like = data.post.like;
            sendData.disLike = data.post.disLike;
  
            fetch(`http://localhost:8080/post/${id.post_id}`, 
            {
              method: "PUT",
              mode: "cors",
              headers: {
                "Authorization": `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
                "X-Authenticated-Userid": `${JSON.parse(localStorage.getItem("userId"))}`,
              },
              body: sendData
            }).then(res => console.log(res))
          }))
          setTimeout(() => console.log(sendData), 1000)
        }
      }
      
      // window.onload = () => 
      // {
        console.log("test");
        
      // }
      
        // fetch(`http://localhost:8080/post/${id.post_id}`, 
        // {
        //   method: "POST",
        //   mode: "cors",
        //   headers: {
        //     Accept: 'application/json',
        //     'Content-Type': 'application/json',
        //     "Authorization": `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
        //     "X-Authenticated-Userid": `${JSON.parse(localStorage.getItem("userId"))}`,
        // },
        // body:
        // });
    }
    setTimeout(() => modifyPost(), 2000)
  return(<div>
    <Header/>
    <h1>post</h1>
    <div className="post"></div>
  </div>)
}

export default DisplayOnePost;