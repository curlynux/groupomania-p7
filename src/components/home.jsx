import "../assets/home.css"
import Header from "./header"





function Home() 
{
    function notification() 
    {
        const div = document.getElementsByClassName("notif")[0];
        const bg = document.createElement("div")
        const strong = document.createElement("strong");
        const message = document.createElement("span");
        const icon = document.createElement("span");
        const svg = document.createElement("svg");
        const path = document.createElement("path");

        bg.setAttribute("class", "bg-green-100 border border-green-400 text-green-700 px-4 py-4 notification rounded relative");
        strong.setAttribute("class", "font-bold");
        message.setAttribute("class", "block sm:inline msg");
        icon.setAttribute("class", "absolute top-0 bottom-0 right-0 px-4 py-3");
        svg.setAttribute("class", "fill-current h-6 w-6 text-green-500");

        bg.setAttribute("role", "alert");
        svg.setAttribute("role", "button");
        svg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
        svg.setAttribute("viewBox", "0 0 20 20");

        path.setAttribute("d", "M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z");

        strong.innerHTML = "NEW POST !";
        message.innerHTML = "vous avez publié un nouveau post";
        
        div.appendChild(bg);
        bg.appendChild(strong);
        bg.appendChild(message);
        bg.appendChild(icon);
        icon.appendChild(svg);
        svg.appendChild(path);

        setTimeout(() => bg.remove(), 5000)
    }

    return(
        <div>
            <Header/>
            <h1>create post</h1>        
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
                        <button type="submit" onClick={() => notification()} className="items-center publish px-5 py-2.5 text-sm font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800">
                            publish post
                        </button>
                        <button className="bg-transparent image text-blue-700 font-semibold py-2 px-4 border border-blue-500 rounded">
                            Add image
                        </button>
                    </div>
                    
                    </form>
                 </div>
        </div>
    )
}

export default Home;