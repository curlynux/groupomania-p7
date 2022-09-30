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
          sessionStorage.setItem("login", data.post.login);
          sessionStorage.setItem("imageUrl", data.post.imageUrl);
          sessionStorage.setItem("text_post", data.post.post_text)
          sessionStorage.setItem("like", data.post.like)
          sessionStorage.setItem("post_id", data._id)
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
      id.userId = localStorage.getItem("userId")
      id.image = post[0].childNodes[1].src;
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
      const p = document.getElementsByTagName("p");
      const modify = document.getElementsByClassName("modify");
      const applyModif = document.createElement("button")
      const text = document.createElement("textarea");
    text.id = "modified_text"
console.log(text);
      applyModif.innerHTML = "apply modification";
      applyModif.className = "items-center applyModif px-5 py-2.5 text-sm text-black font-medium text-center rounded-lg focus:ring-4 focus:ring-blue-200 hover:bg-pink-300";
      modify[0].onclick = () => 
      {
        const post = document.getElementsByClassName("post");
        const applyModif = document.createElement("button")

        applyModif.innerHTML = "apply modification";
        applyModif.className = "items-center applyModif px-5 py-2.5 text-sm text-black font-medium text-center rounded-lg focus:ring-4 focus:ring-blue-200 hover:bg-pink-300";
        console.log(p[0].textContent);
        text.value = p[0].textContent;
        console.log(text);
        // p[0].remove();
        post[0].appendChild(text);
        post[0].appendChild(applyModif)
        
        var i = 0;
        var modified_text = document.getElementById("modified_text").value
        
        console.log(modified_text);
        sessionStorage.setItem("modified_text", document.getElementById("modified_text").value)
        const sendData = {
          login: document.getElementsByClassName("login")[0].textContent,
          userId: localStorage.getItem("userId"),
          imageUrl: "https://media-mcetv.ouest-france.fr/wp-content/uploads/2022/04/one-piece-odyssey-le-jeu-se-devoile-en-images-avec-luffy-et-sa-bande-1200-min.jpg",
          post_text: sessionStorage.getItem("modified_text"),
          like: 0
        }
        console.log(sendData);
        setTimeout(() => {applyModif.onclick = () => 
        {
          console.log("test");
          fetch(`http://localhost:8080/post/${window.location.href.split("/")[4]}`, 
          {
            method: "PUT",
            mode: "cors",
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
              "Authorization": `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
              "X-Authenticated-Userid": `${JSON.parse(localStorage.getItem("userId"))}`,
          },
          body: JSON.stringify(sendData)
          }).then(res => console.log(res))
          console.log(sendData);
          console.log("modification sent !");
          console.log(document.getElementById("modified_text").value);
        }}, 2000);
      }
    }
    setTimeout(() => modifyPost(), 2000)
  return(<div>
    <Header/>
    <h1>post</h1>
    <div className="post" data-id={sessionStorage.getItem("post_id")}>
      <span className="login">{sessionStorage.getItem("login")}</span>
      <img src={sessionStorage.getItem("imageUrl")} alt="post image" id="image" />
      <div>
        <button className="like">👍</button>
      </div>
      <p>{sessionStorage.getItem("text_post")}</p>
      <div className="divButton">
        <button className="items-center publish px-5 py-2.5 text-sm text-white font-medium text-center rounded-lg focus:ring-4 focus:ring-blue-200 hover:bg-red-800">remove</button>
        <button className="items-center modify px-5 py-2.5 text-sm text-white font-medium text-center rounded-lg focus:ring-4 focus:ring-blue-200 hover:bg-red-800">modify</button>
      </div>
    </div>
  </div>)
}

export default DisplayOnePost;