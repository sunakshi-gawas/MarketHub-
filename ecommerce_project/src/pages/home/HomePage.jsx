import axios from "axios";
import { useEffect, useState } from "react";
import { Header } from "../../components/Header";
import { ProductsGrid } from "./ProductsGrid";
import "./HomePage.css";

export function HomePage({ cart , loadCart}) {
  const [products, setProducts] = useState([]);

  useEffect(() => {// whemn we are using a async awit inside useEffect we need to create a function inside useEffect and call it
    const getHomeData = async () => {
      const response = await axios.get("/api/products");
      setProducts(response.data); 
    };
    getHomeData();
  }, []);

  // this is the simple version without using state to store products and get from backend

  return (
    <>
      <title>Ecommerce Project </title>

      <Header cart={cart} />

      <div className="home-page">
        <ProductsGrid products={products} loadCart={loadCart} />
      </div>
    </>
  );
}
