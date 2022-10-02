import Header from "./header"
import { useParams } from 'react-router-dom';
import "../assets/post.css";
import { useNavigate } from "react-router-dom";
import AddImage from "./addImage"

function DisplayOnePost()
{
  let { id } = useParams();
  const navigate = useNavigate();
  
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
    
    function modifyPost(event) 
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
        const inputFile = document.getElementsByTagName("input")[0]

        applyModif.innerHTML = "apply modification";
        applyModif.className = "items-center applyModif px-5 py-2.5 text-sm text-black font-medium text-center rounded-lg focus:ring-4 focus:ring-blue-200 hover:bg-pink-300";
        console.log(p[0].textContent);
        text.value = p[0].textContent;
        console.log(text);
        // p[0].remove();
        post[0].appendChild(text);
        post[0].appendChild(applyModif)
        console.log(post[0]);
        inputFile.style.display = "block";
        // inputFile.addEventListener("change", (event) => 
        // {
        //   console.log(event.target.files[0]);
        //   const fileForm = new FormData();
        //   fileForm.append("file", event.target.files[0])
        //   fetch(`http://localhost:8080/post/${window.location.href.split("/")[4]}`, 
        //   {
        //     method: "PUT",
        //     mode: "cors",
        //     headers: {
        //       "Authorization": `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
        //       "X-Authenticated-Userid": `${JSON.parse(localStorage.getItem("userId"))}`,
        //     },
        //     body: fileForm
        //   }).then(res => 
        //   {
        //     console.log("file sent !");
        //     console.log(res)
        //   });
        // });
        
        

        setTimeout((event) => {
          // event.preventDefault()
        applyModif.onclick = (event) => 
        {
          event.preventDefault()
          var text_value = document.getElementById("modified_text").value;
          const sendData = {
            login: document.getElementsByClassName("login")[0].textContent,
            userId: localStorage.getItem("userId"),
            imageUrl: document.getElementById("image").src,
            post_text: document.getElementById("modified_text").value,
            like: 0
          }
          inputFile.addEventListener("change", () => 
          {
            event.preventDefault()
            console.log(event.target.files[0])
            sendData.file = event.target.files[0]
            console.log(sendData);
          } ) 
          sendData.post_text = text_value;
          console.log("POST_TEXT", sendData.post_text);

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
          window.location.reload()
        }}, 2000);
      }
    }
    setTimeout(() => modifyPost(), 1000)
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
      <AddImage/>
    </div>
    
  </div>)
}

export default DisplayOnePost;