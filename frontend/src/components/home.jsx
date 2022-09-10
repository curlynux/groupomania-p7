import "../assets/home.css"
import Header from "./header"
import LogoutButton from "./logoutButton";
import AddImage from "./addImage";

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


        setTimeout(() => bg.remove(), 5000)
    }

    function createPost(event) 
    {
        event.preventDefault();
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
        // const textValue = document.getElementById("textarea").value;

        like.innerHTML = "👍";
        disLike.innerHTML = "👎";
        divLike.appendChild(like);
        divLike.appendChild(disLike);
        divLike.className = "vote";
        post.setAttribute("class", "post");
        login.setAttribute("class", "login");
    
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
        image.alt = "img_post"
        image.className = "post_image"
        console.log(post);
        post.append(divLike)
        // image.src = preview.src
        // postData.push(textValue)
        postData.push(image.src)
        console.log(postData);
        localStorage.setItem("postData", postData)

        notification();
    }

    function addImage(event)
    {
        event.preventDefault();
        const divImageFile = document.getElementById("imageFile")
        
    }

    return(
        <div id="main">
            <Header/>
            <h1>create post</h1>      
            <LogoutButton />  
            
            <div className="flex">
                <form>
                    <div className="mb-4 w-full parent bg-gray-50 rounded-lg border border-gray-200">
                        <div className="py-2 px-4 bg-white rounded-b-lg text">
                            <textarea id="editor" rows="8" className="block px-0 w-full text-sm text-gray-800 bg-white border-0  focus:ring-0 " placeholder="ecrire un post" required></textarea>
                            <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                                <div className="bg-blue-600 h-2.5 rounded-full" style={{width: "45%"}}></div>
                            </div>
                        </div>
                    </div>
                    <div className="notif"></div>
                    <div className="boxbtn">
                        <button type="submit" onClick={(event) => createPost(event)} className="items-center publish px-5 py-2.5 text-sm text-white font-medium text-center rounded-lg focus:ring-4 focus:ring-blue-200 hover:bg-red-800">
                            publish post
                        </button>
                        <button onClick={(event) => addImage(event)} className="bg-transparent image font-semibold py-2 px-4">
                            Add image
                        </button>
                    </div>
                    <div id="imageFile">
                        <AddImage/>
                    </div>

                    <div id="feed">
                        <h1>Feed</h1>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Home;