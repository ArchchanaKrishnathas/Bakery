import React, { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const CreateProduct = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState<number | "">("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post(
        "http://localhost:5000/api/products",
        { name, price, description, image },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      navigate("/");
    } catch (err) {
      alert("Failed to create product");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Create Product</h2>
      <input placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
      <input
        type="number"
        placeholder="Price"
        value={price}
        onChange={(e) => setPrice(Number(e.target.value))}
        required
      />
      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <input placeholder="Image URL" value={image} onChange={(e) => setImage(e.target.value)} />
      <button type="submit">Create</button>
    </form>
  );
};

export default CreateProduct;
