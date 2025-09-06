
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
            <p>
              En pleno corazón de Rosario, este hotel 5 estrellas combina
              elegancia y modernidad para ofrecer una experiencia única. Su
              diseño sofisticado y ambientes amplios brindan el máximo confort
              tanto para viajes de negocios como para escapadas de placer.{" "}
            </p>
            <p>
              A 2 km del Monumento a la Bandera y a pocas cuadras de la peatonal
              Córdoba, la ubicación es ideal para quienes buscan comodidad y
              cercanía a los principales atractivos turísticos y comerciales de
              la ciudad. Cada detalle está pensado para garantizar bienestar y
              exclusividad.
            </p>
            <p>
              El hotel cuenta con habitaciones de lujo, spa, piscina climatizada y servicio
              de primer nivel. Además, se encuentra muy cerca de la vibrante
              avenida Pellegrini, reconocida por su variada oferta gastronómica,
              lo que permite disfrutar de la mejor cocina local a pasos del
              alojamiento.
            </p>
            <div className="amenities-grid mt-4">
              <div className="amenity">
                <Image
                  src="https://ik.imagekit.io/rooxjlwlq/restaurant.jpeg?updatedAt=1756837680315"
                  n
                  alt="Hotel - hero"
                  width={80}  
                   height={80}
                />
              </div>
              <div className="amenity">
                <Image
                  src="https://ik.imagekit.io/rooxjlwlq/wiFi.jpeg?updatedAt=1756837680481"
                  n
                  alt="Hotel - hero"
                  width={80}  
                   height={80}
                />
                </div>
              <div className="amenity">
                <Image
                  src="https://ik.imagekit.io/rooxjlwlq/pileta%20climatizada.jpeg?updatedAt=1756837680876"
                  n
                  alt="Hotel - hero"
                  width={80}  
                   height={80}
                />
                </div>
              <div className="amenity">
                <Image
                  src="https://ik.imagekit.io/rooxjlwlq/estacionamiento.jpeg?updatedAt=1756837680521"
                  n
                  alt="Hotel - hero"
                  width={80}  
                   height={80}
                />
                </div>
              <div className="amenity">
                <Image
                  src="https://ik.imagekit.io/rooxjlwlq/caja%20de%20seguridad.jpeg?updatedAt=1756837682258"
                  n
                  alt="Hotel - hero"
                   width={80}  
                   height={80}
                />
                </div>
              <div className="amenity">
                <Image
                  src="https://ik.imagekit.io/rooxjlwlq/camara%20permanente.jpeg?updatedAt=1756837680623"
                  n
                  alt="Hotel - hero"
                   width={80}  
                   height={80}
                />
                </div>
              <div className="amenity">
                <Image
                  src="https://ik.imagekit.io/rooxjlwlq/lavanderia%20y%20tintoreria.jpeg?updatedAt=1756837682964"
                  n
                  alt="Hotel - hero"
                   width={80}  
                   height={80}
                />
                </div>
              <div className="amenity">
                <Image
                  src="https://ik.imagekit.io/rooxjlwlq/yacuzzi.jpeg?updatedAt=1756837680332"
                  n
                  alt="Hotel - hero"
                   width={80}  
                   height={80}
                />
                </div>
                <div className="amenity">
                <Image
                  src="https://ik.imagekit.io/rooxjlwlq/casino.jpeg?updatedAt=1756837680979"
                  n
                  alt="Hotel - hero"
                   width={80}  
                   height={80}
                />
                </div>
                <div className="amenity">
                <Image
                  src="https://ik.imagekit.io/rooxjlwlq/gimnasio.jpeg?updatedAt=1756837680656"
                  n
                  alt="Hotel - hero"
                   width={80}  
                   height={80}
                />
                </div>
                <div className="amenity">
                <Image
                  src="https://ik.imagekit.io/rooxjlwlq/spa.jpeg?updatedAt=1756837680729"
                  n
                  alt="Hotel - hero"
                   width={80}  
                   height={80}
                />
                </div>
                <div className="amenity">
                <Image
                  src="https://ik.imagekit.io/rooxjlwlq/centrodeconvenciones.jpeg?updatedAt=1756837680809"
                  n
                  alt="Hotel - hero"
                   width={80}  
                   height={80}
                />
                </div>
            </div>
          </Col>
          <Col md={4}>
            <Card className="hotel-card text-center">
              <Card.Body>
                <Image
                  src={hotelName}
                  alt="Logo Hotel"
                  fluid
                  style={{ maxWidth: "120px", margin: "0 auto 15px" }}
                />

                <div className="d-flex justify-content-between align-items-center py-3 border-bottom">
                  <div>
                    <div className="label">Check in</div>
                    <div className="time">14:00</div>
                  </div>
                  <div className="text-muted">|</div>
                  <div className="text-end">
                    <div className="label">Check out</div>
                    <div className="time">10:00</div>
                  </div>
                </div>

                <div className="py-3">
                  <div className="small text-muted">Dirección</div>
                  <div>Boulevard Oroño 1234</div>
                  <div>CP 2000 Rosario · Santa Fe · Argentina</div>
                  <div className="mt-3">
                    <div className="small text-muted">Tel.</div>
                    <div>+54 341 4223456</div>
                  </div>
                  <div className="mt-3">
                    <div className="small text-muted">Reservas</div>
                    <div>starlighthoteles@gmail.com</div>
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
