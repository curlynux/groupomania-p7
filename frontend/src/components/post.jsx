import { useParams } from 'react-router-dom';


function DisplayOnePost()
{
  let { id } = useParams();

  fetch(`http://localhost:8080/post/${id}`, 
  {
    method: "GET",
    mode: "cors",
    headers: {
        "Authorization": `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
        "X-Authenticated-Userid": `${JSON.parse(localStorage.getItem("userId"))}`,
    }
  }).then(response => 
    {
        console.log(response)
        response.json().then(data => 
        {
            console.log(data.post)
        });
    });

  return(<div>
    <h1>test</h1>
  </div>)
}

export default DisplayOnePost;