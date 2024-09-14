import React, { useEffect, useState } from 'react'
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import styled from 'styled-components';
import star from "../assets/Star.png"
import halfstar from "../assets/halfstar.png"
import Carousal from '../components/Carousal';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';

function ProuctInfo() {

    const [product, setProduct] = useState([]);

    const location = useLocation();


    useEffect(() => {
        const fetcher = async () => {
            const res = await axios.get(`https://dummyjson.com/products/${location.pathname.split("/")[2]}`)
            setProduct(res.data);
            console.log(res.data)
        }
        fetcher();
    }, [])

    const times = Array.from({ length: Math.trunc(Math.ceil(parseInt(product?.rating))) });

    return (
        <Container>
            <Header>
                <span>
                    <Link to="/" style={{ color: "black" }}>
                        <KeyboardArrowLeftIcon />
                    </Link>
                </span>
                <Link to="/cart" style={{ color: "black", textDecoration: "none" }}>
                    <div id="cart" >

                        <ShoppingBagOutlinedIcon />
                        <span>4</span>
                    </div>
                </Link>
            </Header>

            <h3 style={{ fontWeight: "300", marginTop: "20px" }} > {product?.brand} </h3>
            <h3> {product?.title}</h3>

            <Ratings>
                <span>
                    {times.map((_, index) => (
                        <img key={index} src={star} />
                    ))
                    }


                </span>
                <span>
                    {product?.stock} Reviews
                </span>
            </Ratings>

            <ImageConatainer>
                <Carousal images={product?.images} />
            </ImageConatainer>

            <DiscountContainer>
                <span id="bolder" >
                    {`$ ${product?.price}`}
                </span>
                <span id="discount" >
                    { `$${(((product?.discountPercentage)/100)*(product?.price)).toFixed(2)} ` }OFF
                </span>
            </DiscountContainer>

            <BTNContainer>
                <button id="left" >
                    Add to Cart
                </button>
                <button id="right" >
                    Buy Now
                </button>
            </BTNContainer>

            <BottomConatiner>
                <span>
                    Details
                </span>
                <p>
                   {product?.description}
                </p>
            </BottomConatiner>

        </Container>
    )
}

export default ProuctInfo

const Container = styled.div`
padding: 40px 0px;
font-family: "Manrope";

h3{
    font-weight: bold;
    font-size: 40px;
    font-family: "Manrope";
    margin: 15px 5px;
    padding: 0px 20px;
}
`

const Ratings = styled.div`
display: flex;
gap: 10px;
align-items: center;
padding: 0px 20px;
img{
    width: 20px;
}
`

const Header = styled.div`
display: flex;
justify-content: space-between;
align-items: center;
padding: 0px 20px;

>span{
    background-color: #F8F9FB;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 16px;
    width: 7px;
    height: 7px;
}

#cart{
    display: flex;
    align-items: center;
    
    span{
        display: flex;
        justify-content: center;
        align-items: center;
        width: 20px;
        height: 20px;
        padding: 3px;
        background-color: #FFC83A;
        padding: 0px 6px;
        border-radius: 50%;
        margin-left: -16px;
        margin-top: -19px;
    }
}
`

const ImageConatainer = styled.div`
background-color: antiquewhite;
width: 100%;
height: 220px;
margin: 10px 0px;
`
const DiscountContainer = styled.div`
display: flex;
gap: 20px;
padding: 0px 20px;
margin: 25px 0px;
#discount{
    background: #2A4BA0;
    border-radius: 20px;
    font-size: 11px;
    padding: 3px 12px;
    color: white;
}

#bolder{
    font-weight: bold;
    color:#2A4BA0;
}
`

const BTNContainer = styled.div`
padding:  0px 20px ;
display: flex;
justify-content: space-between;

#left{
    width: 140px;
    padding: 15px 25px;
    border: 2px solid #2A4BA0;
    outline: none;
    border-radius: 12px;
    background: transparent;
}

#right{
    width: 140px;
    padding: 15px 25px;
    background: #2A4BA0;
    outline: none;
    border-radius: 12px;
    color: white;
    border: none;
}

`

const BottomConatiner = styled.div`
padding:20px;
margin: 10px 0px;
p{
    color:#8891A5;
    font-size: 15px;
}
`