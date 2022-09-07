import "normalize.css"
import Header from "./components/header";
import "./App.css";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function App() {
    const navigate = useNavigate();
    const token = localStorage.getItem("token");
    useEffect(() => {if(token) navigate("/home", 
        {replace: true})}, [navigate, token])
    async function createUser()
    {
        const user = document.getElementById("user").value;
        const password = document.getElementById("pswd").value;
        const username = document.getElementById("username").value;
        const fromData = {
            username: username,
            email: user,
            password: password
        }
        try {
            let result = await fetch("http://localhost:8080/api/auth", 
            {
                method: "POST",
                mode: "cors",
                headers: {
                    "accept": "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(fromData)
            }).then(() => navigate("/login", {replace: true}))
        }
        catch (error)
            {console.log(error)}
    }

  return (
    <div>
      <Header/>
      <h1>Inscription</h1>
        <div className="flex justify-center">
            <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" method="post" action="/">
                <div className="mb-4">
                    <label className="block test-gray-700 text-sm font-bold mb-2" htmlFor="username">
                        Nom d'utilisateur
                    </label>
                    <input id="username" name="username" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" placeholder="login"/>
                    <label className="block test-gray-700 text-sm font-bold mb-2" htmlFor="username">
                        Email
                    </label>
                    <input id="user" name="email" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="email" placeholder="email"/>
                </div>
                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                        Mot de passe
                    </label>
                    <input id="pswd" name="password" className="shadow appearance-none border  rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" type="password" placeholder="*********"/>
                </div>
                <div className="flex items-center infoBox justify-between">
                    <button onClick={createUser} className="hover:bg-red-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
                        Inscription
                    </button>
                    <a className="inline-block align-baseline ml-2 font-bold text-sm text-blue-500 hover:text-blue-800" href="/login">
                        deja un compte ? connecter vous.
                    </a>
                </div>
                <p id="error"></p>
            </form>
        </div>  
    </div>
  );
}

export default App;
