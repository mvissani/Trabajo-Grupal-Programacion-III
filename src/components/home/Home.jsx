
import hotelName from "../../images/hotel-name.png";
import { Container, Row, Col, Image, Card } from "react-bootstrap";
import Map from "./Map";
import Reviews from "./Reviews";
import BookingBar from "./BookingBar";
import Patrocinadores from "./Patrocinadores";
import Carrusel from "./Carrusel";

function Home() {
  return (
    <div>
      <div className="full-bleed">
        <BookingBar/>

        
        <Image
          src="https://ik.imagekit.io/rooxjlwlq/Fachada_Sur_Gran_Hotel_Miramar_(M%C3%A1laga).jpg?updatedAt=1756832780904"
          
          alt="Hotel - hero"
          className="hero-img hero--halfUp"
        />
      </div>
      <Container>
        <Row>
  <Col>
      {/* Párrafos estilizados */}
      <div className="mb-4">
        <p className="lead fs-5 fw-light text-dark mt-4 mb-4">
          En pleno corazón de Rosario, este hotel 5 estrellas combina elegancia y
          modernidad para ofrecer una experiencia única. Su diseño sofisticado y
          ambientes amplios brindan el máximo confort tanto para viajes de negocios
          como para escapadas de placer.
        </p>
        <p className="fs-5 fw-light text-dark mb-4">
          A 2 km del Monumento a la Bandera y a pocas cuadras de la peatonal
          Córdoba, la ubicación es ideal para quienes buscan comodidad y cercanía a
          los principales atractivos turísticos y comerciales de la ciudad. Cada
          detalle está pensado para garantizar bienestar y exclusividad.
        </p>
        <p className="fs-5 fw-light text-dark">
          El hotel cuenta con habitaciones de lujo, spa, piscina climatizada y
          servicio de primer nivel. Además, se encuentra muy cerca de la vibrante
          avenida Pellegrini, reconocida por su variada oferta gastronómica, lo que
          permite disfrutar de la mejor cocina local a pasos del alojamiento.
        </p>
      </div>

      {/* Amenities */}
      <div className="row g-3 mt-4">
        {[
          "https://ik.imagekit.io/rooxjlwlq/restaurant.jpeg?updatedAt=1756837680315",
          "https://ik.imagekit.io/rooxjlwlq/wiFi.jpeg?updatedAt=1756837680481",
          "https://ik.imagekit.io/rooxjlwlq/pileta%20climatizada.jpeg?updatedAt=1756837680876",
          "https://ik.imagekit.io/rooxjlwlq/estacionamiento.jpeg?updatedAt=1756837680521",
          "https://ik.imagekit.io/rooxjlwlq/caja%20de%20seguridad.jpeg?updatedAt=1756837682258",
          "https://ik.imagekit.io/rooxjlwlq/camara%20permanente.jpeg?updatedAt=1756837680623",
          "https://ik.imagekit.io/rooxjlwlq/lavanderia%20y%20tintoreria.jpeg?updatedAt=1756837682964",
          "https://ik.imagekit.io/rooxjlwlq/yacuzzi.jpeg?updatedAt=1756837680332",
          "https://ik.imagekit.io/rooxjlwlq/casino.jpeg?updatedAt=1756837680979",
          "https://ik.imagekit.io/rooxjlwlq/gimnasio.jpeg?updatedAt=1756837680656",
          "https://ik.imagekit.io/rooxjlwlq/spa.jpeg?updatedAt=1756837680729",
          "https://ik.imagekit.io/rooxjlwlq/centrodeconvenciones.jpeg?updatedAt=1756837680809",
        ].map((src, index) => (
          <div
            className="col-4 col-md-3 col-lg-2 d-flex justify-content-center"
            key={index}
          >
            <div
              className="shadow rounded-2 p-2 bg-light d-flex align-items-center justify-content-center"
              style={{ width: "70px", height: "70px" }}
            >
              <Image
                src={src}
                alt={`Amenity ${index + 1}`}
                width={50}
                height={50}
                className="img-fluid"
              />
            </div>
          </div>
        ))}
      </div>
    </Col>
  



          <Col md={4}>
            <Card className="hotel-card text-center shadow-lg border-0 rounded-4 p-3">
  <Card.Body>
    <Image
      src={hotelName}
      alt="Logo Hotel"
      fluid
      style={{ maxWidth: "200px", margin: "20px auto 20px" }}
    />

    {/* Check-in y Check-out */}
    <div className="d-flex justify-content-between align-items-center py-4 border-bottom fs-5">
      <div>
        <div className="fw-bold text-primary">Check in</div>
        <div className="fs-4">14:00</div>
        
      </div>
      <div className="text-muted fs-3">|</div>
      <div className="text-end">
        <div className="fw-bold text-primary">Check out</div>
        <div className="fs-4">10:00</div>
      </div>
    </div>

    {/* Información general */}
    <div className="py-4 fs-5">
      <div className="text-uppercase text-muted small mb-1">Dirección</div>
      <div className="fw-semibold">Boulevard Oroño 1234</div>
      <div>CP 2000 · Rosario · Santa Fe · Argentina</div>

      <div className="mt-1">
        <div className="text-uppercase text-muted small mb-1">Tel.</div>
        <div className="fw-semibold">+54 341 4223456</div>
      </div>

      <div className="mt-1">
        <div className="text-uppercase text-muted small mb-1">Reservas</div>
        <div className="fw-semibold">starlighthoteles@gmail.com</div>
      </div>
    </div>
  </Card.Body>
</Card>

          </Col>
        </Row>
      </Container>
      <Reviews/>
      <Carrusel/>
      
      <Map/>
      
      <Patrocinadores/>
      
    </div>
  );
}

export default Home;
