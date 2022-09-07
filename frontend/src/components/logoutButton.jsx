import {useNavigate} from "react-router-dom"

function Logout() 
{
    const navigate = useNavigate();
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");

    // try {
    //     fetch("http://localhost:8080/api/auth", 
    //     {
    //         method: "POST",
    //         mode: "cors",
    //     }).then(() => 
    //         {
                
    //         })
    //     }
    // catch (error)
    //     {console.log(error)}

    function removeCredentials()
    {
        const logoutButton = document.getElementById("logout");
        logoutButton.onclick = () => 
        {
            if(token && userId)
            {
                localStorage.removeItem("token")
                localStorage.removeItem("userId")
            }
            console.log("test");
            navigate("/login", { replace: true })
        }
    }
    
    return(
        <div>
            <button type="submit" id="logout" onClick={removeCredentials} className="items-center publish px-5 py-2.5 text-sm text-white font-medium text-center rounded-lg focus:ring-4 focus:ring-blue-200 hover:bg-red-800">
                logout
            </button>
        </div>
    )
}

export default Logout;