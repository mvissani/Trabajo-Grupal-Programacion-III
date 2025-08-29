// Imports
import Carousel from 'react-bootstrap/Carousel';
import restaurante from '../../images/restaurante.jpg';
import pileta from '../../images/pileta.jpg';
import masajes from '../../images/masajes.jpg';
import gimnasio from '../../images/gimnasio.jpg';
import jacuzzi from '../../images/jacuzzi.jpg';
import casino from '../../images/casino.jpg';
import spa from '../../images/spa.jpg';

// Services
function Services() {
  return (
    <Carousel>
      <Carousel.Item>
        <img className="carousel-img" src={restaurante} alt="First slide"/>
        <Carousel.Caption>
          <h3>Restaurante</h3>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img className="carousel-img" src={pileta} alt="Second slide"/>
        <Carousel.Caption>
          <h3>Pileta Climatizada</h3>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img className="carousel-img" src={masajes} alt="Third slide"/>
        <Carousel.Caption>
          <h3>Masajes</h3>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img className="carousel-img" src={gimnasio} alt="Fourth slide"/>
        <Carousel.Caption>
          <h3>Gimnasio</h3>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img className="carousel-img" src={jacuzzi} alt="Fifth slide"/>
        <Carousel.Caption>
          <h3>Jacuzzi</h3>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img className="carousel-img" src={casino} alt="Sixth slide"/>
        <Carousel.Caption>
          <h3>Casino</h3>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img className="carousel-img" src={spa} alt="Seventh slide"/>
        <Carousel.Caption>
          <h3>Spa</h3>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default Services;
