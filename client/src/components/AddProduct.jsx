import React, { useState } from "react";
import axios from "axios";

const Addproduct = (props) => {
  const [product, setProduct] = useState({
    title: "",
    description: "",
    price: "",
    instock: "",
    image: "",
  });
  /* const imageUpload = (e) => {
    setProduct({
      ...product,
      image: e.target.files[0],
    });
  }; */

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    const formData = new FormData(); // Corrected capitalization
    formData.append("title", product.title);
    formData.append("description", product.description);
    formData.append("price", product.price);
    formData.append("instock", product.instock);
    if (product.image) {
      formData.append("myfile", product.image);
    }
    try {
      const response = await axios.post(
        "http://localhost:5000/api/product/addproduct",
        formData,
        {
          headers: {
            "auth-token": localStorage.getItem("token"), // Added headers object for the token
          },
        }
      );
      console.log(response.data);
      props.showAlert("Added successfully", "success");

      setProduct({
        title: "",
        description: "",
        price: "",
        instock: "",
        image: "", // Reset image state
      });
    } catch (error) {
      console.error(error);
      props.showAlert("Failed to add product", "danger");
    }
  };

  const handleChange = (e) => {
    if (e.target.type === "file") {
        setProduct({
            ...product,
            [e.target.name]: e.target.files[0] // Correcting the value for a single file
        });
    } else {
        setProduct({
            ...product,
            [e.target.name]: e.target.value
        });
    }
  };
  return (
    <div className="container">
      <h4>Add your product here</h4>

      <form encType="multipart/form-data" onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Title
          </label>
          <input
            type="text"
            className="form-control"
            id="title"
            name="title"
            value={product.title}
            onChange={handleChange}
            aria-describedby="emailHelp"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <input
            type="text"
            className="form-control"
            name="description"
            value={product.description}
            onChange={handleChange}
            id="description"
            aria-describedby="emailHelp"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Price
          </label>
          <input
            type="number"
            name="price"
            value={product.price}
            onChange={handleChange}
            className="form-control"
            id="price"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="instock" className="form-label">
            Instock
          </label>
          <input
            type="number"
            name="instock"
            value={product.instock}
            onChange={handleChange}
            className="form-control"
            id="instock"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="image" className="form-label">
            Choose images
          </label>
          <input
            type="file"
            multiple
            name="image"
            onChange={handleChange}
            className="form-control"
            id="image"
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Addproduct;
