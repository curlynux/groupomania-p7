import image from "../assets/logo.png"
import "../assets/header.css"
import "../assets/smartphone/header.css"

function Header() 
{
    return(
        <div className="contain">
            <img src={image} alt="logo" />
        </div>
    )
}

export default Header;