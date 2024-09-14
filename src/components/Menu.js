import React from 'react'
import styled from 'styled-components'
import home from "../assets/home.png"
import category from "../assets/Category.png"
import favourite from "../assets/favourite.png"
import more from "../assets/more.png"

function Menu() {
  return (
    <Container>
        <li  className='active'>
            <img src={home} />
            <p>Home</p>
        </li>

        <li>
            <img src={category} />
            <p>Category</p>
        </li>

        <li>
            <img src={favourite} />
            <p>Favourite</p>
        </li>

        <li>
            <img src={more} />
            <p>More</p>
        </li>
      
    </Container>
  )
}

export default Menu

const Container = styled.ul`
background-color: white;
position: fixed;
z-index: 10;
left: 0;
bottom:-30px;
width: 100vw;
display: flex;
justify-content: space-around;
align-items: center;
list-style: none;
font-family: "Manrope", sans-serif;
box-shadow: 0px 0px 10px 5px rgba(163, 165, 184, 0.25);
padding: 20px 20px;
border-radius: 25px;




li{
    display: flex;
    flex-direction: column;
    align-items: center;
   
    img{
        width: 20px;
    }
}

.active{
    background: #1E222B;
    padding: 20px;
    border-radius: 50%;
    margin-top: -60px;

    img{
    background: #E0B420;
    border-radius: 50%;
    padding: 1px;
    width: 25px;
    }

    p{
        display: none;
    }
}


`