import Carousel from "react-bootstrap/Carousel";
import "bootstrap/dist/css/bootstrap.min.css";
import styled from "styled-components";

function Carousal({ images }) {
  return (
    <Container>
      <Carousel>
        {images &&
          images.map((pic, index) => (
            <Carousel.Item key={index}>
              <Image src={pic} alt={`Slide ${index + 1}`} />
            </Carousel.Item>
          ))}
      </Carousel>
    </Container>
  );
}

export default Carousal;

const Container = styled.div`
  max-width: 1200px; /* Set a max width for desktop */
  margin: auto; /* Center the carousel */
  position: relative; /* For proper positioning of controls */

  .carousel-control-prev-icon,
  .carousel-control-next-icon {
    background-color: rgba(0, 0, 0, 0.5); /* Add a background for visibility */
    border-radius: 50%; /* Make controls round */
    width: 40px; /* Adjust width for larger controls */
    height: 40px; /* Adjust height for larger controls */
  }

  .carousel-indicators {
    bottom: 10px; /* Position indicators */
  }

  .carousel-indicators .active {
    opacity: 1;
    background-color: #f9b023;
  }
`;

const Image = styled.img`
  width: 100%; /* Ensure the image takes full width */
  height: auto; /* Maintain aspect ratio */
  max-height: 500px; /* Set a max height for images */
  object-fit: cover; /* Cover the area while maintaining aspect ratio */
`;
