import { useState } from "react";

function AddImage()
{
    const image = document.getElementsByClassName("image")[0];
    const [selectedImage, setSelectedImage] = useState(null);
    
    return(
        <div>
            {selectedImage && (
            <div>
                <img alt="image" id="preview" src={URL.createObjectURL(selectedImage)} />
                <br />
                <button id="removePhoto" onClick={() => setSelectedImage(null)} >Remove</button>
            </div>)}
            <br/>
            <input type="file" id="sendImage" name="UploadImage" onChange={event => 
                {
                    console.log(event.target.files[0])
                    setSelectedImage(event.target.files[0])
                }} />
        </div>
    )
}

export default AddImage;