import React, { useState, useRef, useEffect } from "react";

const Toolbar = ({ handleAddItem, setToolbarHeight }) => {
  const [formData, setFormData] = useState({
    image: "",
    title: "",
    description: "",
  });

  const toolbarRef = useRef(null);
  const refHeight = toolbarRef.current?.clientHeight;

  useEffect(() => {
    setToolbarHeight(refHeight);
  }, [refHeight, setToolbarHeight]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    const acceptedFileTypes = ["image/jpeg", "image/png", "image/gif"];

    if (file && acceptedFileTypes.includes(file.type)) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        setFormData((prevFormData) => ({
          ...prevFormData,
          image: reader.result,
        }));
      };
    } else {
      alert("Please upload a valid image file (JPEG, PNG, or GIF).");
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!formData.image) {
      alert("Please select an image.");
    } else {
      handleAddItem(formData);
      setFormData({
        image: "",
        title: "",
        description: "",
      });
    }
  };

  return (
    <div className="toolbar" ref={toolbarRef}>
      <form id="toolbar-form" onSubmit={handleSubmit}>
        <div>
          <input type="file" onChange={handleFileChange} />
        </div>
        <div>
          <input
            type="text"
            name="title"
            value={formData.title}
            placeholder="Title"
            onChange={handleChange}
          />
        </div>
        <div>
          <textarea
            rows={1}
            name="description"
            value={formData.description}
            placeholder="Description"
            onChange={handleChange}
            style={{ resize: "none" }}
          />
        </div>
        <div>
          <button type="submit">Add Item</button>
        </div>
      </form>
    </div>
  );
};

export default Toolbar;
