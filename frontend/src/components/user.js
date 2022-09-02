import { useState, useEffect} from "react";
import axios from "../api/axios";

const Users = () => 
{
    const [users, setUsers] = useState();

    useEffect(() => 
    {
        let isMounted = true;
        const controller = new AbortController();

        const getUsers = async () => 
        {
            try 
            {
                const response = await axios.get("/users", 
                { signal: controller.signal })
                console.log(response.data);
                isMounted && setUsers(response.data)

            }
            catch (error)
                {console.log(error);}
        }
        getUsers();
        // return () => 
        // {
        //     isMounted = false;
        //     controller.abort;
        // }
    }, [])
    return(
        <article>
            <h2>user list</h2>
            {users?.length 
            ? (<ul>{users.map((user, i) => 
            <li key={i}>{user?.username}</li>)}</ul>)
        : <p>no user to display</p>}
        </article>
    )
}

export default Users;