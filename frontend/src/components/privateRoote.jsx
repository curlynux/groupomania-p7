import { Outlet, Navigate } from "react-router-dom"


function PrivateRoote() 
{
  let auth = {"token": false}
  return(
    auth.token ? <Outlet/> : <Navigate to="/login" />
    
  )
}

export default PrivateRoote;