import { useState } from "react";

function AddImage({ setImage }) {
  const [selectedImage, setSelectedImage] = useState(null);

  const [image, setImageLocal] = useState([]);

  const displayFile = (event) => {
    const file = event.target.files[0];
    console.log(event.target.files[0]);
    setSelectedImage(file);
    setImage(file);
    setImageLocal(file);
  };

  const removeImage = () => {
    setSelectedImage(null);
    setImageLocal(null);
  };
setTimeout(() => 
{
  if(window.location.href === "http://localhost:3000/home")
    document.getElementById("allInput")
  if(window.location.href != "http://localhost:3000/home")
    document.getElementById("imageToSend").remove()
}, 200)

  return (
    <div>
      {selectedImage && (
        <div>
          <img
            alt="uploaded"
            id="preview"
            src={URL.createObjectURL(selectedImage)}
          />
          <br />
          <button id="removePhoto" onClick={removeImage}>
            Remove
          </button>
        </div>
      )}
      <br />
      <div id="allInput">
      <input type="text" id="url" placeholder="image url" style={{border: "2px solid black"}}/>
      <input type="file" id="imageToSend" name="UploadImage" onChange={displayFile} />
      </div>
    </div>
  );
}

export default AddImage;
