import { Container, Row, Col, Card } from "react-bootstrap";

function AboutUs() {
  return (
    <Container
      fluid
      className="py-5 min-vh-100 d-flex align-items-center justify-content-center"
      style={{
        backgroundColor: "#f8f9fa",
      }}
    >
      <Row className="justify-content-center w-100">
        <Col md={10} lg={8}>
          <Card
            className="shadow-lg border-0 rounded-4 overflow-hidden"
            style={{
              position: "relative",
              backgroundImage: `
                linear-gradient(
                  rgba(255, 255, 255, 0.7),
                  rgba(255, 255, 255, 0.7)
                ),
                url('https://ik.imagekit.io/rooxjlwlq/104428596_3160449064012043_7821808509995572554_n%20(1).jpg?updatedAt=1761705390903')
              `,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              filter: "grayscale(100%) contrast(110%) brightness(108%)",
            }}
          >
            <Card.Body className="p-5 text-dark text-center">
              <h1
                className="display-5 fw-bold text-uppercase mb-5 text-secondary"
                style={{
                  textShadow:
                    "2px 2px 4px rgba(45, 175, 235, 0.25), 0px 0px 10px rgba(124, 81, 243, 0.39)",
                  letterSpacing: "1px",
                }}
              >
                Sobre Nosotros
              </h1>

              <div
                className="fs-4 lh-lg fw-normal"
                style={{
                  color: "#1a1a1a",
                  textAlign: "justify",
                  textShadow: "1px 1px 3px rgba(138, 210, 223, 0.39)",
                }}
              >
                <p className="mb-4">
                  La historia del{" "}
                  <span className="fw-semibold text-primary">
                    Hotel Starlight
                  </span>{" "}
                  comenzó hace varias décadas, cuando una familia de origen{" "}
                  <span className="fw-semibold text-primary">escocés</span>{" "}
                  decidió cumplir su sueño de construir un pequeño hospedaje en
                  la ciudad de Rosario. Con esfuerzo, trabajo constante y una
                  profunda vocación por el servicio, aquel modesto hotel fue
                  creciendo paso a paso. Gracias al compromiso de sus fundadores
                  y al apoyo de diversas empresas locales, el proyecto fue
                  tomando forma hasta convertirse en el majestuoso complejo que
                  hoy enorgullece a toda la comunidad.
                </p>

                <p className="mb-4">
                  En el corazón de{" "}
                  <span className="fw-semibold text-primary">Rosario</span>, una
                  de las ciudades más dinámicas y encantadoras de la provincia
                  de Santa Fe, se alza el{" "}
                  <span className="fw-semibold text-primary">
                    Hotel Starlight
                  </span>
                  , un lugar donde la elegancia, el confort y la calidez humana
                  se unen para ofrecer una experiencia inolvidable. Somos parte
                  de una comunidad que crece día a día, impulsada por el
                  trabajo, la innovación y el espíritu emprendedor de su gente.
                </p>

                <p className="mb-4">
                  Cada rincón del hotel fue diseñado para transmitir armonía,
                  estilo y confort, con habitaciones modernas, servicios de
                  primer nivel y un equipo que trabaja con pasión para hacer de
                  cada estadía una experiencia única. Creemos que la verdadera
                  hospitalidad nace del respeto, la empatía y el deseo de cuidar
                  a quienes nos eligen.
                </p>

                <p className="mb-4">
                  Desde nuestros inicios, en el{" "}
                  <span className="fw-semibold text-primary">
                    Hotel Starlight
                  </span>{" "}
                  nos hemos propuesto brindar mucho más que hospedaje: ofrecemos
                  un espacio pensado para descansar, disfrutar y conectar con lo
                  mejor de Rosario. Nuestra historia se construye sobre los
                  valores de la excelencia, la hospitalidad y el compromiso con
                  la sostenibilidad.
                </p>

                <p className="mb-0">
                  En el{" "}
                  <span className="fw-semibold text-primary">
                    Hotel Starlight
                  </span>
                  , impulsamos acciones de inclusión, desarrollo social y
                  sostenibilidad, convencidos de que juntos podemos construir un
                  futuro mejor. Te invitamos a descubrir la magia de Rosario, su
                  río imponente, su vida cultural vibrante y su gente amable,
                  mientras disfrutás del confort y la calidez que solo Starlight
                  puede ofrecerte.
                </p>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default AboutUs;
