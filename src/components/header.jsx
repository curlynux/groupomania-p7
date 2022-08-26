import image from "../assets/logo.png"
import "../assets/header.css"
function Header() 
{
    return(
        
        <div className="contain">
            <img src={image}/>
        </div>
    )
}

export default Header;