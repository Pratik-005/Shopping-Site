import React, { useEffect, useState } from "react";
import styled from "styled-components";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  updateFavourites,
  removeFavourites,
  addToCart,
  increaseItemValue,
  decreaseItemValue,
} from "../redux/slice";

function Cart() {
  const [total, setTotal] = useState(0);
  const { cart } = useSelector((state) => state.project);
  const dispatch = useDispatch();

  useEffect(() => {
    calculateTotal();
  }, [cart]);

  const addItemToCart = (index) => {
    let product = { ...cart[index] };
    if (!cart.some((obj) => obj.id === product.id)) {
      product["num"] = 1;
      dispatch(addToCart([...cart, product]));
    } else {
      dispatch(increaseItemValue(product));
    }
    calculateTotal();
  };

  const decreaseItemVal = (index) => {
    let product = { ...cart[index] };
    dispatch(decreaseItemValue(product));
    calculateTotal();
  };

  const calculateTotal = () => {
    const newtotal = cart
      .map((product) => product.price * product.num)
      .reduce((accumulator, currentValue) => accumulator + currentValue, 0);
    setTotal(newtotal);
  };

  return (
    <Container>
      <Header>
        <span>
          <Link to="/" style={{ textDecoration: "none", color: "black" }}>
            <KeyboardArrowLeftIcon />
          </Link>
        </span>
        Shopping Cart ({cart.length > 0 && cart.length})
      </Header>
      <ProductContainer>
        {cart &&
          cart.map((item, index) => (
            <Product key={index}>
              <div className="info">
                <img
                  className="product-img"
                  src={item.thumbnail}
                  alt={item.title}
                />
                <div className="name-price">
                  <p>{item.title}</p>
                  <span>{`$ ${item.price}`}</span>
                </div>
              </div>
              <div className="add-subtract">
                <span>
                  <RemoveIcon
                    onClick={() => decreaseItemVal(index)}
                    sx={{ fontSize: 15 }}
                  />
                </span>
                <span className="num">{item.num}</span>
                <span>
                  <AddIcon
                    onClick={() => addItemToCart(index)}
                    sx={{ fontSize: 15 }}
                  />
                </span>
              </div>
            </Product>
          ))}
      </ProductContainer>
      <div id="editor">
        <p>Edit</p>
      </div>
      <BottomWindow>
        <div>
          <span className="textstylo">Subtotal</span>
          <span className="bolder">{`$ ${total}`}</span>
        </div>
        <div>
          <span className="textstylo">Delivery</span>
          <span className="bolder">$2.00</span>
        </div>
        <div>
          <span className="textstylo">Total</span>
          <span className="bolder">{`$ ${total + 2.0}`}</span>
        </div>
        <div>
          <button>Proceed To Checkout</button>
        </div>
      </BottomWindow>
    </Container>
  );
}

export default Cart;

const Container = styled.div`
  padding: 40px 20px;
  font-family: "Manrope";

  #editor {
    display: flex;
    justify-content: flex-end;
    font-size: 13px;
    color: #2a4ba0;
  }

  @media (min-width: 768px) {
    padding: 60px 40px;
  }
`;

const Header = styled.div`
  display: flex;
  gap: 20px;
  align-items: center;

  span {
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #f8f9fb;
    border-radius: 50%;
    padding: 6px;
  }

  @media (min-width: 768px) {
    font-size: 20px;
  }
`;

const ProductContainer = styled.section`
  display: flex;
  flex-direction: column;
  margin: 20px 0;
  overflow-y: auto; /* Allow vertical scrolling if necessary */

  @media (min-width: 768px) {
    margin: 30px 0;
  }
`;

const Product = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 0;
  margin: 5px 0;
  border-bottom: 1px solid #ebebfb;

  .info {
    display: flex;
    gap: 20px;
  }

  .product-img {
    width: 50px;
  }

  .name-price {
    display: flex;
    flex-direction: column;

    p {
      font-size: 15px;
    }

    span {
      font-size: 13px;
    }
  }

  .add-subtract {
    display: flex;

    .num {
      background: none;
      margin: 0 10px; /* Add margin for spacing */
    }

    span {
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #f8f9fb;
      height: 30px;
      width: 30px;
      border-radius: 50%;
      padding: 4px;
    }
  }

  @media (min-width: 768px) {
    .product-img {
      width: 70px; /* Larger image for desktop */
    }
  }
`;

const BottomWindow = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  border-radius: 26px;
  background: #f8f9fb;
  padding-top: 20px;

  div {
    display: flex;
    justify-content: space-between;
    padding: 5px 25px;

    span {
      font-size: 15px;
    }

    .bolder {
      font-weight: bold;
    }
  }

  button {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    padding: 17px;
    margin: 20px 0;
    background: #2a4ba0;
    outline: none;
    border: none;
    border-radius: 19px;
    font-size: 15px;
    color: white;
    font-family: "Manrope";
  }

  .textstylo {
    color: #616a7d;
  }
`;
