import "normalize.css"
import Header from "./components/header";
import "./App.css";
// import axios from "axios"

function App() {
    async function createUser()
    {
        const user = document.getElementById("user").value;
        const password = document.getElementById("pswd").value;
        // const formBody = new FormData();
        // formBody.append("email", user)
        // formBody.append("password", password)

        const fromData = {
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
            })
        }
        catch (error)
            {console.log(error)}
        
        

        // var data = {
            // email: user,
            // password: password
        // }
        // await axios.post("http://localhost:8080/api/auth",
        // data).then(response => console.log(response))
        // .catch(error => console.log(error))

    //    await axios({
    //         method: "POST",
    //         url: "http://localhost:8080/api/auth",
    //         data: data,
    //         headers: {
    //             "accept": "application/json",
    //             "Content-Type": "application/json",
                
    //         }
    //     })
    //     .then(response => 
    //     {
    //         console.log(response)
    //         console.log(response.headers);
    //     })
    //     .catch(error => 
    //         {
    //             console.log(error);
    //             document.getElementById("error").innerHTML = error
    //         })
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
                    <input id="user" name="email" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" placeholder="login"/>
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
