import React, { useEffect, useState } from "react";
import styled from "styled-components";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Snackbar from "@mui/material/Snackbar";

import search from "../assets/search.png";
import coupon from "../assets/1569377.png";
import heartunfilled from "../assets/heartunfilled.png";
import heartfilled from "../assets/heartfilled.png";

import {
  updateFavourites,
  removeFavourites,
  addToCart,
  increaseItemValue,
} from "../redux/slice";

import Menu from "../components/Menu";
import { useDispatch, useSelector } from "react-redux";

function Home() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [state, setState] = React.useState({
    open: false,
    vertical: "top",
    horizontal: "center",
  });
  const { vertical, horizontal, open } = state;
  const { favourites } = useSelector((state) => state.project);
  const { cart } = useSelector((state) => state.project);

  useEffect(() => {
    const fetcher = async () => {
      const res = await axios.get("https://dummyjson.com/products");
      setProducts(res.data.products);
    };
    fetcher();
  }, []);

  const addProductToFavourite = (index) => {
    const product = products[index];
    dispatch(updateFavourites([...favourites, product]));
    handleClick({ vertical: "bottom", horizontal: "center" });
  };

  const removeProductFromFavourite = (index) => {
    const product = products[index];
    dispatch(removeFavourites(product));
  };

  const addItemToCart = (index) => {
    let product = { ...products[index] };
    let flag = cart?.some((obj) => obj.id === product?.id);

    if (!flag) {
      product["num"] = 1;
      dispatch(addToCart([...cart, product]));
    } else {
      dispatch(increaseItemValue(product));
    }
  };

  const handleClick = (newState) => () => {
    setState({ ...newState, open: true });
  };

  const handleClose = () => {
    setState({ ...state, open: false });
  };

  return (
    <>
      <Header>
        <div id="name">
          <div>
            <p style={{ fontWeight: "500" }}>Hey, Rahul</p>
          </div>
          <Link to="/cart" style={{ textDecoration: "none" }}>
            <div>
              <ShoppingBagOutlinedIcon style={{ color: "white" }} />
              {cart.length !== 0 && <span id="cartval">{cart?.length}</span>}
            </div>
          </Link>
        </div>

        <SearchBox>
          <span>
            <img src={search} />
          </span>
          <span>
            <input type="text" placeholder="Search Products or store" />
          </span>
        </SearchBox>

        <Address>
          <div>
            <p>DELIVERY TO</p>
            <span id="addressval">
              <p>Green Way 3000, Sylhet</p>
              <KeyboardArrowDownIcon style={{ color: "#A9B4BC" }} />
            </span>
          </div>

          <div>
            <p>WITHIN</p>
            <span id="addressval">
              <p>1 Hour</p>
              <KeyboardArrowDownIcon style={{ color: "#A9B4BC" }} />
            </span>
          </div>
        </Address>
      </Header>

      <CouponsContainer>
        <Coupon>
          <span>
            <img src={coupon} />
          </span>
          <span>
            <p id="getter">Get</p>
            <h3>50% OFF</h3>
            <p>On first 03 orders</p>
          </span>
        </Coupon>

        <Coupon>
          <span>
            <img src={coupon} />
          </span>
          <span>
            <p id="getter">Get</p>
            <h3>50% OFF</h3>
            <p>On first 03 orders</p>
          </span>
        </Coupon>

        <Coupon>
          <span>
            <img src={coupon} />
          </span>
          <span>
            <p id="getter">Get</p>
            <h3>50% OFF</h3>
            <p>On first 03 orders</p>
          </span>
        </Coupon>
      </CouponsContainer>

      <ProductContainer>
        <h2>Recommended</h2>

        <div>
          {products &&
            products.map((item, index) => (
              <Product key={index}>
                <span>
                  {favourites?.some((obj) => obj.id === item.id) ? (
                    <img
                      onClick={() => removeProductFromFavourite(index)}
                      className="heart"
                      src={heartfilled}
                    />
                  ) : (
                    <img
                      onClick={() => addProductToFavourite(index)}
                      className="heart"
                      src={heartunfilled}
                    />
                  )}
                </span>
                <img
                  onClick={() => navigate(`productinfo/${item.id}`)}
                  className="product-img"
                  src={item.thumbnail}
                />
                <p
                  onClick={() => navigate(`productinfo/${item.id}`)}
                  className="product-name"
                >
                  {item.title}
                </p>
                <span className="price">$ {item.price}</span>
                <div className="button-container">
                  <button
                    className="cart-btn"
                    onClick={() => addItemToCart(index)}
                  >
                    Add to Cart
                  </button>
                  <button
                    className="buy-btn"
                    onClick={() => addItemToCart(index)}
                  >
                    Buy Now
                  </button>
                </div>
              </Product>
            ))}
        </div>

        <Snackbar
          anchorOrigin={{ vertical, horizontal }}
          open={open}
          onClose={handleClose}
          message="I love snacks"
          key={vertical + horizontal}
        />
      </ProductContainer>

      <Menu />
    </>
  );
}

export default Home;

const Header = styled.div`
  background-color: #2a4ba0;
  padding: 15px 20px;
  display: flex;
  flex-direction: column;

  #name {
    display: flex;
    justify-content: space-between;
    align-items: center;

    div {
      display: flex;
      align-items: center;
    }

    p {
      font-size: 22px;
      color: white;
      font-family: "Manrope", sans-serif;
    }

    #cartval {
      margin-left: -10px;
      margin-top: -10px;
      color: white;
      font-weight: bold;
      height: 20px;
      width: 20px;
      padding: 2px;
      border-radius: 50%;
      background-color: #ffc83a;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 12px;
    }
  }

  @media (min-width: 768px) {
    flex-direction: row;
    padding: 15px 40px;

    #name {
      flex: 1;
    }
  }
`;

const SearchBox = styled.div`
  display: flex;
  gap: 20px;
  margin: 35px 0;
  background: #153075;
  padding: 15px;
  border-radius: 25px;

  input {
    width: 100%;
    background: transparent;
    border: none;
    outline: none;
  }

  @media (min-width: 768px) {
    margin: 50px 0;
  }
`;

const Address = styled.div`
  display: flex;
  justify-content: space-between;

  p {
    color: #a9b4bc;
    font-size: 14px;
    font-weight: 500;
  }

  #addressval {
    display: flex;
    margin-top: -10px;

    p {
      color: white;
      font-size: 15px;
    }
  }

  @media (min-width: 768px) {
    justify-content: flex-start;
  }
`;

const CouponsContainer = styled.section`
  padding: 25px 20px;
  display: flex;
  gap: 20px;
  justify-content: center; // Center the coupon boxes horizontally
  overflow-x: auto;

  @media (min-width: 768px) {
    padding: 30px 40px;
    overflow: hidden;
    flex-wrap: wrap;
    justify-content: center; // Ensure it's also centered on larger screens
  }
`;

const Coupon = styled.div`
  background-color: #f9b023;
  display: flex;
  gap: 23px;
  padding: 10px 20px;
  border-radius: 15px;
  color: white;
  align-items: center;
  height: 140px;
  flex: 1;

  h3 {
    font-weight: bold;
    font-size: 25px;
    margin-top: -15px;
  }

  img {
    height: auto;
    max-height: 75px;
    width: auto;
  }

  @media (min-width: 768px) {
    flex: 0 1 30%;
  }
`;

const ProductContainer = styled.section`
  padding: 20px;
  font-family: "Manrope", sans-serif;
  font-size: 30px;
  font-weight: 400;

  > div {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
  }

  h2 {
    font-weight: 400;
    font-size: 32px;
  }
`;

const Product = styled.div`
  background-color: #f8f9fb;
  display: flex;
  flex-direction: column;
  border-radius: 15px;
  padding: 10px;
  width: calc(50% - 20px);

  @media (min-width: 768px) {
    width: calc(25% - 20px);
  }

  .price {
    font-weight: bold;
    font-size: 16px;
  }

  .product-img {
    align-self: center;
    width: 100%;
    max-height: 150px;
    object-fit: contain;
    margin: 10px 0;
  }

  .product-name {
    color: #616a7d;
    font-size: 13px;
    text-align: center;
  }

  .heart {
    width: 24px;
    cursor: pointer;
  }

  .button-container {
    display: flex;
    justify-content: space-between;
    margin-top: 10px;
    width: 100%;

    .cart-btn,
    .buy-btn {
      flex: 1;
      margin: 0 5px;
      padding: 5px 8px;
      font-size: 12px;
      cursor: pointer;
    }

    .cart-btn {
      background-color: #ffc83a;
      border: none;
      border-radius: 5px;
      transition: background-color 0.3s;

      &:hover {
        background-color: #e0b420;
      }
    }

    .buy-btn {
      background-color: #2a4ba0;
      color: white;
      border: none;
      border-radius: 5px;
      transition: background-color 0.3s;

      &:hover {
        background-color: #1e222b;
      }
    }
  }
`;
