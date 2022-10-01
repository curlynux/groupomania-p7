import { useState } from "react";

function AddImage()
{
    const [selectedImage, setSelectedImage] = useState(null);
    function displayFile(event) 
    {
        console.log(event.target.files[0]);
        setSelectedImage(event.target.files[0]);
        var files = event.target.files[0];
        
    }
    
    return(
        <div style={{display: "block"}}>
            {selectedImage && (
            <div>
                <img alt="image" style={{display: "block"}} id="preview" src={URL.createObjectURL(selectedImage)} />
                <br />
                <button id="removePhoto"style={{display: "block"}} onClick={() => setSelectedImage(null)} >Remove</button>
            </div>)}
            <br/>
            <input type="file" style={{display: "block"}}id="sendImage" name="UploadImage" onChange={displayFile}/>
        </div>
    )
}

export default AddImage;