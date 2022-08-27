import "../assets/signup.css"
import { Link } from "react-router-dom"
import Header from "./header"
function Login() 
{
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
                        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="login"/>
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                            mot de passe
                        </label>
                        <input className="shadow appearance-none border  rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="*********"/>
                        {/* <p class="text-red-500 text-xs italic">Please choose a password.</p> */}
                    </div>
                        <div className="flex items-center justify-between">
                        <button className="hover:bg-red-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
                            connexion
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