import { useState } from "react";

function AddImage({ setImage }) {
  const [selectedImage, setSelectedImage] = useState(null);

  const displayFile = (event) => {
    const file = event.target.files[0];

    setSelectedImage(file);
    setImage(file);
  };

  const removeImage = () => {
    setSelectedImage(null);
    setImage(null);
  };

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
      <input type="file" name="UploadImage" onChange={displayFile} />
    </div>
  );
}

export default AddImage;
