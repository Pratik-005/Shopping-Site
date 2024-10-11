import React, { useEffect, useState } from "react";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import styled from "styled-components";
import star from "../assets/Star.png";
import Carousal from "../components/Carousal";
import { useLocation, Link } from "react-router-dom";
import axios from "axios";

function ProductInfo() {
  const [product, setProduct] = useState({});
  const location = useLocation();

  useEffect(() => {
    const fetcher = async () => {
      const res = await axios.get(
        `https://dummyjson.com/products/${location.pathname.split("/")[2]}`
      );
      setProduct(res.data);
      console.log(res.data);
    };
    fetcher();
  }, [location.pathname]);

  const times = Array.from({ length: Math.trunc(Math.ceil(product?.rating)) });

  return (
    <Container>
      <Header>
        <span>
          <Link to="/" style={{ color: "black" }}>
            <KeyboardArrowLeftIcon />
          </Link>
        </span>
        <Link to="/cart" style={{ color: "black", textDecoration: "none" }}>
          <div id="cart">
            <ShoppingBagOutlinedIcon />
            <span>4</span>
          </div>
        </Link>
      </Header>

      <h3>{product?.brand}</h3>
      <h3>{product?.title}</h3>

      <Ratings>
        <span>
          {times.map((_, index) => (
            <img key={index} src={star} alt="Star" />
          ))}
        </span>
        <span>{product?.stock} Reviews</span>
      </Ratings>

      <ImageContainer>
        <Carousal images={product?.images} />
      </ImageContainer>

      <DiscountContainer>
        <span id="bolder">{`$ ${product?.price}`}</span>
        <span id="discount">{`$${(
          (product?.discountPercentage / 100) *
          product?.price
        ).toFixed(2)} OFF`}</span>
      </DiscountContainer>

      <BTNContainer>
        <button id="left">Add to Cart</button>
        <button id="right">Buy Now</button>
      </BTNContainer>

      <BottomContainer>
        <span>Details</span>
        <p>{product?.description}</p>
      </BottomContainer>
    </Container>
  );
}

export default ProductInfo;

const Container = styled.div`
  padding: 40px 20px;
  font-family: "Manrope";

  h3 {
    font-weight: bold;
    font-size: 30px;
    margin: 15px 0;
  }

  @media (min-width: 768px) {
    padding: 60px 40px;

    h3 {
      font-size: 40px;
    }
  }
`;

const Ratings = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  padding: 0 20px;

  img {
    width: 20px;
  }
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;

  > span {
    background-color: #f8f9fb;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 16px;
  }

  #cart {
    display: flex;
    align-items: center;

    span {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 20px;
      height: 20px;
      padding: 3px 6px;
      background-color: #ffc83a;
      border-radius: 50%;
      margin-left: -16px;
    }
  }
`;

const ImageContainer = styled.div`
  background-color: antiquewhite;
  width: 100%;
  height: 220px;
  margin: 10px 0;
`;

const DiscountContainer = styled.div`
  display: flex;
  gap: 20px;
  padding: 0 20px;
  margin: 25px 0;

  #discount {
    background: #2a4ba0;
    border-radius: 20px;
    font-size: 11px;
    padding: 3px 12px;
    color: white;
  }

  #bolder {
    font-weight: bold;
    color: #2a4ba0;
  }
`;

const BTNContainer = styled.div`
  padding: 0 20px;
  display: flex;
  justify-content: space-between;

  #left,
  #right {
    width: 140px;
    padding: 15px 25px;
    border-radius: 12px;
    outline: none;
  }

  #left {
    border: 2px solid #2a4ba0;
    background: transparent;
  }

  #right {
    background: #2a4ba0;
    color: white;
    border: none;
  }
`;

const BottomContainer = styled.div`
  padding: 20px;
  margin: 10px 0;

  p {
    color: #8891a5;
    font-size: 15px;
  }
`;
