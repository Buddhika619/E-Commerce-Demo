import { useEffect, useState } from "react";
import styled from "styled-components";
import { popularProducts } from "../data";
import Product from "./Product";
import axios from "axios";


const Container = styled.div`
    padding: 20px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
`;

const Products = ({cat,filters,sort}) => {
 
  
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([])

  useEffect(() => {
      const getProducts = async() => {
        try {
          //axiso library is used insted of fetch
          const res = await axios.get(cat ? `http://localhost:2121/api/products?category=${cat}` : `http://localhost:2121/api/products`)
          setProducts(res.data)
        } catch (err) {
          
        }
      }
      getProducts()
  },[cat])

  useEffect(() => {
    //if there is a categoy ->set filterd product
    cat && 
      setFilteredProducts(
        products.filter(item => 
          Object.entries(filters).every(([key,value]) =>
          item[key].includes(value)
          )
        )
      )
  },[products, cat, filters]) //dependencies

//  let x =  Object.values(products);
//  console.log(x[0])
//  let b = Date.parse(x[0].createdAt)-Date.parse(x[1].createdAt)
//  console.log(b)


  useEffect(() => {
    if (sort === "newest") {
      setFilteredProducts((prev) =>
      [...prev].sort((a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt)),
      
      );
    } else if (sort === "asc") {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => a.price - b.price),
       
      );
    } else {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => b.price - a.price)
      );
    }
  }, [sort]);

  return (
    <Container>
      {cat
        ? filteredProducts.map((item) => <Product item={item} key={item.id} />)
        : products
            .slice(0, 8)
            .map((item) => <Product item={item} key={item.id} />)}
    </Container>
  );
};

export default Products;
