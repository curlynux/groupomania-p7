import { useState } from "react";

function AddImage()
{
    const [selectedImage, setSelectedImage] = useState(null);
    const img = document.createElement("img");
    const br = document.createElement("br");
    const button = document.createElement("button");
    const br2 = document.createElement("br");
    const input = document.createElement("input");

    img.setAttribute("alt", "image")
    img.id = "preview";
    img.src = URL.createObjectURL(selectedImage)

    button.id = "removePhoto";
    button.onclick = () => setSelectedImage(null)
    button.innerHTML = "Remove";

    input.setAttribute("type", "file");
    input.id = "sendImage";
    input.name = "UploadImage";
    input.onchange = (event) => 
    {
        console.log(event.target.files[0]);
        setSelectedImage(event.target.files[0]);
    }

    document.getElementsByClassName("justdiv")[0]
    .appendChild(img)
    document.getElementsByClassName("justdiv")[0]
    .appendChild(br)
    document.getElementsByClassName("justdiv")[0]
    .appendChild(button)

    document.getElementsByClassName("fileDiv")[0]
    .appendChild(br2)
    document.getElementsByClassName("fileDiv")[0]
    .appendChild(input)
}

export default AddImage;