import React from "react";
import styled from "styled-components";
import home from "../assets/home.png";
import category from "../assets/Category.png";
import favourite from "../assets/favourite.png";
import more from "../assets/more.png";

function Menu() {
  return (
    <Container>
      <MenuItem className="active">
        <img src={home} alt="Home" />
        <p>Home</p>
      </MenuItem>

      <MenuItem>
        <img src={category} alt="Category" />
        <p>Category</p>
      </MenuItem>

      <MenuItem>
        <img src={favourite} alt="Favourite" />
        <p>Favourite</p>
      </MenuItem>

      <MenuItem>
        <img src={more} alt="More" />
        <p>More</p>
      </MenuItem>
    </Container>
  );
}

export default Menu;

const Container = styled.ul`
  background-color: white;
  position: fixed;
  z-index: 10;
  left: 0;
  bottom: 20px; /* Adjusted to sit above the bottom */
  width: 100vw;
  display: flex;
  justify-content: space-around;
  align-items: center;
  list-style: none;
  font-family: "Manrope", sans-serif;
  box-shadow: 0px 0px 10px 5px rgba(163, 165, 184, 0.25);
  padding: 10px 20px; /* Adjusted padding for a tighter look */
  border-radius: 25px;

  @media (min-width: 768px) {
    padding: 15px 30px; /* Increased padding on larger screens */
  }
`;

const MenuItem = styled.li`
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer; /* Change cursor to pointer on hover */

  img {
    width: 24px; /* Increased size for better visibility */
    transition: transform 0.3s; /* Add transition for hover effect */
  }

  p {
    margin-top: 5px; /* Space between image and text */
    font-size: 14px; /* Consistent text size */
    color: #333; /* Dark text for visibility */
    text-align: center; /* Center text */
  }

  &:hover img {
    transform: scale(1.1); /* Slightly enlarge icon on hover */
  }

  &.active {
    background: #1e222b;
    padding: 10px; /* Adjusted padding */
    border-radius: 50%;
    position: relative; /* Position relative for active state */

    img {
      background: #e0b420;
      border-radius: 50%;
      padding: 3px; /* Slight padding for active icon */
      width: 30px; /* Larger icon when active */
    }

    p {
      display: none; /* Hide text for active state */
    }
  }
`;
