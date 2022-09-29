import "../assets/home.css"
import Header from "./header"
import LogoutButton from "./logoutButton";
import AddImage from "./addImage";
import "../assets/loader.css"

function Home() 
{
    var headers = new Headers();
    headers.set("Authorization", `Bearer ${JSON.parse(localStorage.getItem("token"))}`)
    headers.set("X-Authenticated-Userid", `${JSON.parse(localStorage.getItem("userId"))}`)
    try 
    {
        fetch("/home", 
        {
            method: "GET",
            headers: headers,
            mode: "cors"
        });
    }
    catch (error)
    {console.log(error)}

    function notification() 
    {
        const div = document.getElementsByClassName("notif")[0];
        const bg = document.createElement("div")
        const strong = document.createElement("strong");
        const message = document.createElement("span");
        const icon = document.createElement("span");

        
        bg.setAttribute("class", "bg-green-100 border border-green-400 text-green-700 px-4 py-4 notification rounded relative");
        strong.setAttribute("class", "font-bold");
        message.setAttribute("class", "block sm:inline msg");

        bg.setAttribute("role", "alert");
      
        strong.innerHTML = "NEW POST !";
        message.innerHTML = "vous avez publié un nouveau post";
        
        div.appendChild(bg);
        bg.appendChild(strong);
        bg.appendChild(message);
        bg.appendChild(icon);


        setTimeout(() => 
        {bg.remove(); getPost()}, 5000)
    }

    fetch("http://localhost:8080/user", 
        {
            method: "GET",
            mode: "cors",
            headers: {
            "Authorization": `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
            "X-Authenticated-Userid": `${JSON.parse(localStorage.getItem("userId"))}`
            }
        }).then(res => 
        {
            console.log(res);
            res.json().then(data => 
            {
                localStorage.setItem("login", data.username)
            });
        });
    function createPost(event) 
    {
        event.preventDefault();
        console.log(event);
        
        var textValue = document.getElementById("editor").value;
        const loaderBg = document.createElement("div")
        const loader = document.createElement("div")
        const file = event.target[3].files[0]
        const fileData = new FormData()
        
        console.log(event.target[3].files[0]);

        

        fileData.append("image", file)
        fileData.append("login", localStorage.getItem("login"))
        fileData.append("imageUrl", JSON.stringify(file.name))
        fileData.append("post_text", textValue)
        fileData.append("like", 0)
        fileData.append("disLike", 0)
        fileData.append("userId", localStorage.getItem("userId"))
        console.log("FILE DATA", fileData);
        try
        {
            fetch("http://localhost:8080/post", 
            {
                method: "POST",
                mode: "cors",
                headers: {
                    "Authorization": `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
                    "X-Authenticated-Userid": `${JSON.parse(localStorage.getItem("userId"))}`,
                },
                body: fileData
            }).then(response => console.log(response))
        } catch (error)
        {console.log(error)}

        loaderBg.className = "bg";
        loader.className = "loader";
        document.getElementById("main").appendChild(loaderBg);
        loaderBg.appendChild(loader);

        var removeLoader = () => 
        {
            loaderBg.remove();
            notification();
            createPost()
        }
            setTimeout(removeLoader, 5000)
    }
    
    function getPost()
    {   
        fetch("http://localhost:8080/post",
        {
            method: "GET",
            mode: "cors",
            headers: {
                "Authorization": `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
                "X-Authenticated-Userid": `${JSON.parse(localStorage.getItem("userId"))}`,
            }
        }).then(res => 
        {
            return res.json().then(data => 
            {
                // console.log(data);
                for(var item of data)
                {
                    // console.log(item.post);
                    if(data.length > 0)
                    {
                        const feed = document.getElementById("feed");
                        const post = document.createElement("div");
                        const login = document.createElement("span");
                        const image = document.createElement("img");
                        const divLike = document.createElement("div");
                        const like = document.createElement("button");
                        const disLike = document.createElement("button");
                        const textPost = document.createElement("p");
                        const likeText = document.createElement("span");
                        const disLikeText = document.createElement("span");
                        const a = document.createElement("a")

                        post.className = "post";
                        login.className = "login";
                        image.className = "post_image";
                        likeText.className = "likeText"
                        disLikeText.className = "disLikeText"
                        textPost.className = "text_post";
                        like.className = "likeButton";
                        disLike.className = "disLikeButton";
                        
                        
                        feed.appendChild(post);
                        feed.appendChild(a);
                        a.appendChild(post);
                        post.appendChild(login);
                        post.appendChild(image);
                        
                        post.appendChild(divLike);
                        divLike.appendChild(like);
                        divLike.appendChild(disLike);
                        divLike.appendChild(likeText);
                        divLike.appendChild(disLikeText);
                        post.appendChild(textPost);
                        

                        login.innerHTML = item.post.login;
                        image.src = item.post.imageUrl;
                        like.innerHTML = "👍";
                        disLike.innerHTML = "👎";
                        textPost.innerHTML = item.post.post_text;
                        post.dataset.id = item._id;
                        a.href = `http://localhost:3000/post/${post.dataset.id}`
                        console.log(post["dataset"].id);

                        
                    }
                }
                
            });
        })
    
    }
    getPost();
    return(
        <div id="main">
            <Header/>
            <h1>create post</h1>      
            <LogoutButton />  
            <div className="flex">
                <form name="form" onSubmit={(event) => createPost(event)}>
                    <div className="mb-4 w-full parent bg-gray-50 rounded-lg border border-gray-200">
                        <div className="py-2 px-4 bg-white rounded-b-lg text">
                            <textarea id="editor" rows="8" maxLength={240} name="text" className="block px-0 w-full text-sm text-gray-800 bg-white border-0  focus:ring-0 " placeholder="ecrire un post"></textarea>
                        </div>
                    </div>
                    <div className="notif"></div>
                    <div className="boxbtn">
                        <button type="submit" className="items-center publish px-5 py-2.5 text-sm text-white font-medium text-center rounded-lg focus:ring-4 focus:ring-blue-200 hover:bg-red-800">
                            publish post
                        </button>
                    </div>
                    <AddImage/>
                    <div id="feed">
                        <h1>Feed</h1>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Home;