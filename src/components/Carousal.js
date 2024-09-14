import Carousel from 'react-bootstrap/Carousel';
import 'bootstrap/dist/css/bootstrap.min.css';
import styled from 'styled-components';


function Carousal({ images }) {
  return (
    <Container>
      <Carousel>
       { images && images.map((pic,index)=>(
        <Carousel.Item key={index} >
          <img style={{ width: "100vw", height: "220px" }} src={pic} />
        </Carousel.Item>
        ))}

      </Carousel>
    </Container>
  );
}

export default Carousal;

const Container = styled.div`


.carousel-control-prev-icon , .carousel-control-next-icon {
    display: none;
}
.carousel-indicators {
left:-200px;
}

.carousel-indicators .active {
    opacity: 1;
    background-color:#F9B023 ;
}
` 