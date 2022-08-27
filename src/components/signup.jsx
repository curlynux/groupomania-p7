import "../assets/signup.css"
import { Link } from "react-router-dom";
function Signup() 
{
    return(
        <div>
            <div className="flex justify-center">
            <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <div className="mb-4">
                <h1>Inscription</h1>
<p>test</p>
                    <label className="block test-gray-700 text-sm font-bold mb-2" htmlFor="username">
                        nom d'utilisateur test
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
                    <a className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" href="/login">
                        deja un compte ? connecter vous.
                    </a>
                </div>
            </form>
        </div>
        </div>
    )
}

export default Signup;