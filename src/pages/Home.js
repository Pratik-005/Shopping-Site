import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import axios from "axios";
import { Link, useNavigate } from 'react-router-dom';

import Snackbar, { SnackbarOrigin } from '@mui/material/Snackbar';

import search from "../assets/search.png"
import coupon from "../assets/coupon.png"
import heartunfilled from "../assets/heartunfilled.png"
import heartfilled from "../assets/heartfilled.png"
import addbtn from "../assets/addbtn.png"

import { updateFavourites, removeFavourites, addToCart, increaseItemValue } from '../redux/slice';

import Menu from '../components/Menu';
import { useDispatch, useSelector } from 'react-redux';


function Home() {

  const [products, setProducts] = useState([]);

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const [state, setState] = React.useState({
    open: false,
    vertical: 'top',
    horizontal: 'center',
  });
 

  const { vertical, horizontal, open } = state ; 


  const handleClick = (newState) => () => {
    setState({ ...newState, open: true });
  };
  const handleClose = () => {
    setState({ ...state, open: false });
  };



  const { favourites } = useSelector(state => state.project);
  const { cart } = useSelector(state => state.project);

  console.log(cart)

  useEffect(() => {
    const fetcher = async () => {
      const res = await axios.get("https://dummyjson.com/products");
      setProducts(res.data.products);
    }
    fetcher()
  }, [])


  const addProductToFavourite = (index) => {
    const product = products[index];
    dispatch(updateFavourites([...favourites, product]));
    handleClick({ vertical: 'bottom', horizontal: 'center' });
  }

  const removeProductFromFavourite = (index) => {
    const product = products[index];
    dispatch(removeFavourites(product));
  }

  const addItemToCart = (index) => {
    let product = { ...products[index] }; // Create a new object with spread operator
    let flag = cart?.some(obj => obj.id === product?.id);
  
    if (!flag) {
      product["num"] = 1;
      dispatch(addToCart([...cart, product]));
    } else {
      dispatch(increaseItemValue(product));
    }
  }

  return (
    <>
      <Header>
        <div id="name" >
          <div>
            <p style={{ fontWeight: "500" }} >
              Hey, Rahul
            </p>
          </div>
          <Link to="/cart" style={{ textDecoration: "none" }} >
            <div >

              <ShoppingBagOutlinedIcon style={{ color: "white" }} />
              {cart.length !== 0 && <span id="cartval" >{cart?.length}</span>}
            </div>
          </Link>
        </div>

        <SearchBox>
          <span><img src={search} /></span>
          <span>
            <input type='text' placeholder='Search Products or store' />
          </span>
        </SearchBox>

        <Address>
          <div>
            <p>DELIVERY TO</p>
            <span id="addressval" ><p>Green Way 3000, Sylhet</p>
              <KeyboardArrowDownIcon style={{ color: "#A9B4BC" }} />
            </span>

          </div>

          <div>
            <p>WITHIN</p>
            <span id="addressval" ><p>1 Hour</p>
              <KeyboardArrowDownIcon style={{ color: "#A9B4BC" }} />
            </span>
          </div>
        </Address>
      </Header>

      <CouponsConatiner>
        <Coupon>
          <span>
            <img src={coupon} />
          </span>
          <span>
            <p id="getter" >
              Get
            </p>
            <h3>50% OFF</h3>
            <p >On first 03 orders</p>
          </span>
        </Coupon>

        <Coupon>
          <span>
            <img src={coupon} />
          </span>
          <span>
            <p id="getter" >
              Get
            </p>
            <h3>50% OFF</h3>
            <p >On first 03 orders</p>
          </span>
        </Coupon>

        <Coupon>
          <span>
            <img src={coupon} />
          </span>
          <span>
            <p id="getter" >
              Get
            </p>
            <h3>50% OFF</h3>
            <p >On first 03 orders</p>
          </span>
        </Coupon>
      </CouponsConatiner>

      <ProductContainer>
        <h2>Recommended</h2>

        <div>

          {products && products.map((item, index) => (


            <Product key={index}  >
              <span  >
                {favourites?.some(obj => obj.id === item.id) ? <img onClick={() => removeProductFromFavourite(index)} className='heart' src={heartfilled} />
                  : <img onClick={() => addProductToFavourite(index)} className='heart' src={heartunfilled} />
                }
              </span>
              <img onClick={() => navigate(`productinfo/${item.id}`)} className='product-img' src={item.thumbnail} />
              <div className='adddbtn-container' >
                <  span className='price' >
                  $ {item.price}
                </span>
                <span id="add-btn" >
                  <img src={addbtn} onClick={() => addItemToCart(index)} />
                </span>
              </div>
              < p onClick={() => navigate(`productinfo/${item.id}`)} className="product-name" >{item.title}</p>
            </Product>
          ))

          }

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
  )
}

export default Home;


const Header = styled.div`
background-color: #2A4BA0;
padding:  40px 20px;
padding-bottom: 5px;

#name{
    display: flex;
    justify-content: space-between;
    align-items: center;

    div{
      display: flex;
      align-items: center;
      justify-content: center;
    }

    p{
      display: contents;
      font-size:22px;
      color:white;
      font-family: "Manrope", sans-serif;
      justify-self: center;
      align-self: center;
    }

    #cartval{
      margin-left: -13px;
      margin-top: -13px;
      color:white;
      font-weight: bold;
      height: 20px;
      width: 20px;
      padding: 2px;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius:50%;
      background-color: #FFC83A;
    }
}
`

const SearchBox = styled.div`
display: flex;
gap:20px;
margin: 35px 0px;
background: #153075;
padding: 15px;
border-radius: 25px;

input{
  width: 100%;
    background: transparent;
    border: none;
    outline:none;
}
`

const Address = styled.div`
font-family: "Manrope", sans-serif;
display: flex;
justify-content: space-between;

p:nth-child(1){
  color:#A9B4BC;
  font-size: 14px;
  font-weight: 500;
}

#addressval{
  display: flex;
  margin-top: -10px;
  p{
    
    color:white;
    font-size: 15px;
  }
}
`

const CouponsConatiner = styled.section`
padding: 25px 20px;
display: flex;
gap:20px;
overflow-x: scroll;
`

const Coupon = styled.div`
font-family: "Manrope", sans-serif;
background-color: #F9B023;
display: flex;
gap:23px;
padding: 10px 20px;
border-radius:15px;
color:white;
align-items: center;
height: 140px;

h3{
  font-weight: bold;
  font-size: 25px;
  margin-top: -15px;
}

#getter{
  font-size: 30px;
}

img{
  height: 75px;
}

span :nth-child(2){
  width: 125px;
}
`

const ProductContainer = styled.section`
padding: 20px;
padding-top:0px;
font-family: "Manrope", sans-serif;
font-size: 30px;
font-weight: 400;

>div {
    display: flex;
    flex-wrap: wrap;
    gap:20px;
}

h2{
  font-weight: 400;
    font-size: 32px;
}
`

const Product = styled.div`
background-color: #F8F9FB;
display: flex;
flex-grow: 2;
flex-direction: column;
width: 40%;
border-radius: 15px;
padding: 10px;

.price{
  font-weight: bold;
    font-size: 16px;
}

.product-img{
  align-self: center;
  width:80%;
  height: fit-content;
  height: 65px;
  margin: 10px 0px;
}

.product-name{
  color:#616A7D;
  font-size: 13px;
}

.heart{
  width: 20px;
}

.adddbtn-container{
  display: flex;
  justify-content: space-between;
  align-items: center;
}


`


