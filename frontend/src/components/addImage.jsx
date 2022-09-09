import { useState } from "react";

function AddImage()
{
    const image = document.getElementsByClassName("image")[0];
    const [selectedImage, setSelectedImage] = useState(null);
    
    return(
        <div>
            <h1>upload image and display it</h1>
            {selectedImage && (
            <div>
                <img alt="image" src={URL.createObjectURL(selectedImage)} />
                <br />
                <button onClick={() => setSelectedImage(null)} >Remove</button>
            </div>)}
            <br/>
            <input type="file" name="UploadImage" onChange={event => 
                {
                    console.log(event.target.files[0])
                    setSelectedImage(event.target.files[0])
                }} />
        </div>
    )
}

export default AddImage;