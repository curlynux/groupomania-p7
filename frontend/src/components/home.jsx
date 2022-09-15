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

    function sendPost(event)
    {
        event.preventDefault();
        createPost()
        const login = document.getElementsByClassName("login")[0].textContent;
        const imageUrl = document.getElementsByClassName("post_image")[0].src;
        const text = document.getElementsByClassName("text_post")[0].textContent;
        const like = document.getElementsByClassName("likeText")[0].textContent;
        const disLike = document.getElementsByClassName("disLikeText")[0].textContent;
        const file = event.target[3].files[0]
        const fileData = new FormData()
        console.log(event.target[3].files[0]);

        fileData.append("image", file)
        fileData.append("login", login)
        fileData.append("imageUrl", imageUrl)
        fileData.append("post_text", text)
        fileData.append("like", like)
        fileData.append("disLike", disLike)
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
    }
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


        setTimeout(() => {bg.remove()}, 5000)
    }

    function createPost() 
    {
        const feed = document.getElementById("feed");
        const post = document.createElement("div");
        const login = document.createElement("span");
        const image = document.createElement("img");
        var arr = [];
        const divLike = document.createElement("div");
        const like = document.createElement("button");
        const disLike = document.createElement("button");
        const preview = document.getElementById("preview")
        const postData = [];
        var textValue = document.getElementById("editor").value;
        const textPost = document.createElement("p")
        const likeText = document.createElement("span")
        const disLikeText = document.createElement("span")
        const loaderBg = document.createElement("div")
        const loader = document.createElement("div")


        likeText.className = "likeText"
        disLikeText.className = "disLikeText"
        like.innerHTML = "👍";
        disLike.innerHTML = "👎";
        divLike.appendChild(like);
        divLike.appendChild(disLike);
        divLike.className = "vote";
        likeText.innerHTML = 0
        disLikeText.innerHTML = 0
        divLike.appendChild(likeText)
        divLike.appendChild(disLikeText)

        post.setAttribute("class", "post");
        login.setAttribute("class", "login");
        textPost.className = "text_post";
        textPost.innerHTML = textValue;
        
        loaderBg.className = "bg";
        loader.className = "loader";
        document.getElementById("main").appendChild(loaderBg);
        loaderBg.appendChild(loader);

        while(arr.length < 1)
        {
            var r = Math.floor(Math.random() * 1000) + 1;
            if(arr.indexOf(r) === -1) arr.push(r);
            console.log(arr[0]);
            image.src = `https://picsum.photos/id/${arr[0]}/200/300`
        }
        

        login.innerHTML = "login";
        feed.appendChild(post);
        post.appendChild(login);
        post.appendChild(image);

        image.alt = "img_post";
        image.className = "post_image";
        console.log(post);
        post.append(divLike);
        post.appendChild(textPost);

        image.src = preview.src;
        const newPostData = [textValue, image.src];

        postData.push(newPostData);
        console.log(postData);
        localStorage.setItem("postData", postData);

        var removeLoader = () => 
        {
            loaderBg.remove();
            notification();
            sendPost()

            // document.getElementById("editor").value = "";

        }
            setTimeout(removeLoader, 5000)
    }
    

    return(
        <div id="main">
            <Header/>
            <h1>create post</h1>      
            <LogoutButton />  
            <div className="flex">
                <form name="form" onSubmit={(event) => sendPost(event)}>
                    <div className="mb-4 w-full parent bg-gray-50 rounded-lg border border-gray-200">
                        <div className="py-2 px-4 bg-white rounded-b-lg text">
                            <textarea id="editor" rows="8" name="text" className="block px-0 w-full text-sm text-gray-800 bg-white border-0  focus:ring-0 " placeholder="ecrire un post"></textarea>
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