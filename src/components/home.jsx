import "../assets/home.css"
import Header from "./header"
function Home() 
{
    return(
        <div>
            <Header/>
                <div className="box">        
                    <form>
                    <div className="mb-4 w-full parent bg-gray-50 rounded-lg border border-gray-200 dark:bg-gray-700 dark:border-gray-600">
                        <div className="py-2 px-4 bg-white rounded-b-lg text dark:bg-gray-800">
                            <textarea id="editor" rows="8" className="block px-0 w-full text-sm text-gray-800 bg-white border-0 dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400" placeholder="ecrire un post" required></textarea>
                        </div>
                    </div>
                    <div className="boxbtn">
                        <button type="submit" className="items-center publish px-5 py-2.5 text-sm font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800">
                            Publish post
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