import React, { useEffect } from 'react'
import styled from "styled-components"
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { updateFavourites, removeFavourites, addToCart, increaseItemValue, decreaseItemValue } from '../redux/slice';
import { ListItemAvatar } from '@mui/material';
import { useState } from 'react';

function Cart() {


   

    const [total,setTotal] = useState(0);

    const { cart } = useSelector(state => state.project);

    useEffect(()=>{
        calculateTotal();
    },[cart])

    const dispatch = useDispatch();

    console.log(cart)

    const addItemToCart = async(index) => {
        let product = { ...cart[index] }; 
        let flag = await cart?.some(obj => obj.id === product?.id);

        if (!flag) {
            product["num"] = 1;
            dispatch(addToCart([...cart, product]));
            
        } else {
            dispatch(increaseItemValue(product));
        }
        calculateTotal();
    }

    const decreaseItemVal = (index) => {
        let product = { ...cart[index] };
        dispatch(decreaseItemValue(product))
        calculateTotal();
    }

    const calculateTotal= ()=>{
        const newtotal = cart.map(product => product.price * product.num)
                      .reduce((accumulator, currentValue) => accumulator + currentValue, 0); 
        setTotal(newtotal);
    }
    


    return (
        <Container>
            <Header>
                <span>
                    <Link to="/" style={{ textDecoration: "none", color: "black" }} >
                        <KeyboardArrowLeftIcon />
                    </Link>
                </span>
                Shopping Cart ({cart.length > 0 && cart.length})
            </Header>
            <ProductContainer>

                {cart && cart.map((item, index) => (
                    <Product>
                        <div className='info'>
                            <div  >
                                <img className='product-img' src={item.thumbnail} />
                            </div>
                            <div className='name-price' >
                                <p>{item.title}</p>
                                <span>{`$ ${item.price}`}</span>
                            </div>
                        </div>
                        <div className='add-subtract' >
                            <span>
                                <RemoveIcon onClick={()=>decreaseItemVal(index)} sx={{ fontSize: 15 }} />
                            </span>

                            <span className='num' >
                                {item.num}
                            </span>
                            <span>
                                <AddIcon onClick={()=>addItemToCart(index)} sx={{ fontSize: 15 }} />
                            </span>

                        </div>
                    </Product>
                )

                )}

            </ProductContainer>
            <div id="editor" >
                <p>Edit</p>
            </div>

            <BottomWindow>
                <div>
                    <span className='textstylo' >
                        Subtotal
                    </span>
                    <span className='bolder' >
                        {`$ ${total}`}
                    </span>
                </div>

                <div>
                    <span className='textstylo' >
                        Delivery
                    </span>
                    <span className='bolder' >
                        $2.00
                    </span>
                </div>

                <div>
                    <span className='textstylo' >
                        Total
                    </span>
                    <span className='bolder' >
                    {`$ ${total + 2.00}`}
                    </span>
                </div>
                <div>
                    <button>Proceed To checkout</button>
                </div>



            </BottomWindow>
        </Container>

    )
}

export default Cart

const Container = styled.div`
padding: 40px 20px;
font-family: "Manrope";
#editor{
    display: flex;
    justify-content: end;
    font-size: 13px;
    color:#2A4BA0;
}
`

const Header = styled.div`
display: flex;
gap:20px;
align-items: center;

span{
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #F8F9FB;
    border-radius: 50%;
    padding: 6px;
}
`

const ProductContainer = styled.section`
display: flex;
flex-direction: column;
margin: 20px 0px;
overflow-y: scroll;
`

const Product = styled.div`
display: flex;
align-items: center;
justify-content: space-between;
padding: 10px 0px;
margin: 5px 0px;
border-bottom: 1px solid #EBEBFB;

.info{
    display: flex;
    gap:20px;
}

.product-img{
    width: 50px;
}

.name-price{
    display: flex;
    flex-direction: column;

    p{
        font-size: 15px;
    }

    span{
        font-size: 13px;
    }
}

.add-subtract{
    display: flex;

    .num{
        background:none;
    }

    span{
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: #F8F9FB;
        height: 20px;
        width: 20px;
        border-radius: 50%;
        padding: 16px;
    }
}
`

const BottomWindow = styled.div`
position: absolute;
bottom:0;
left: 0;
width: 100%;
border-radius: 26px;
background: #F8F9FB;
padding-top: 20px;


div{
    display: flex;
    justify-content: space-between;
    padding: 5px 25px;

    span{
        font-size: 15px;
    }

    .bolder{
        font-weight: bold;
    }
}

button{
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    padding: 17px;
    margin: 20px 0px;
    background: #2A4BA0;
    outline: none;
    border: none;
    border-radius: 19px;
    font-size: 15px;
    color: white;
    font-family: "Manrope";
}

.textstylo{
    color:#616A7D;
}

`