import "../assets/signup.css";
import { Link } from "react-router-dom";
import Header from "./header";
import { useNavigate } from "react-router-dom";

function Login() 
{
    const navigate = useNavigate();
    async function login() 
    {
        const user = document.getElementById("email").value;
        const password = document.getElementById("password").value;
        
        const fromData = {
            email: user,
            password: password
        }
        try {
                await fetch("http://curlynux1.freeboxos.fr:49154/login", 
            {
                method: "POST",
                mode: "cors",
                headers: {
                    "accept": "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(fromData)
            }).then(async (response) => 
                {
                    return await response.json()
                        .then(data => 
                        {
                            console.log(data)
                            localStorage.setItem("token", JSON.stringify(data.token));
                            localStorage.setItem("userId", JSON.stringify(data.userId));
                            navigate("/home", {replace: true})
                        })
                    })
                }
        catch (error)
            {console.log(error)}
    }
   
    
    // useEffect(() => {},[navigate, token])

    return(
        <div>
            <Header/>
            <h1>Connexion</h1>
            <div className="flex justify-center">
                <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                    <div className="mb-4">
                        <label className="block test-gray-700 text-sm font-bold mb-2" htmlFor="username">
                            nom d'utilisateur
                        </label>
                        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="email" type="text" placeholder="email"/>
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                            mot de passe
                        </label>
                        <input className="shadow appearance-none border  rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="*********"/>
                    </div>
                        <div className="flex items-center justify-between">
                        <button onClick={login} className="hover:bg-red-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
                            Login
                        </button>
                        <Link className="inline-block align-baseline ml-2 font-bold text-sm text-blue-500 hover:text-blue-800" to="/">
                            pas de compte ? inscrivez vous.
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login;