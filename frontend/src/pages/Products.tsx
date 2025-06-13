import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";

interface Product {
  _id: string;
  name: string;
  price: number;
  description?: string;
  image?: string;
}

const Products = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const { role } = useContext(AuthContext);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/products");
        setProducts(res.data);
      } catch (err) {
        alert("Failed to fetch products");
      }
    };
    fetchProducts();
  }, []);

  return (
    <div>
      <h2>Products</h2>
      {(role === "admin" || role === "staff") && <Link to="/create-product">Create Product</Link>}
      <ul>
        {products.map((p) => (
          <li key={p._id}>
            <h3>{p.name}</h3>
            <p>Price: ${p.price}</p>
            <p>{p.description}</p>
            {p.image && <img src={p.image} alt={p.name} width={100} />}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Products;
