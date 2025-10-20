import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";

function AboutUs() {
  return (
    <Container
      fluid
      className=" py-5 min-vh-100 d-flex align-items-center"
    >
      <Row className="justify-content-center w-100">
        <Col md={10} lg={8}>
          <Card className="shadow-lg border-0 rounded-4 p-4 p-md-5 bg-info bg-opacity-25">
            <Card.Body>
              <h1 className="display-4 fw-bold text-center mb-5 text-dark">
                Sobre Nosotros
              </h1>

              <p className="fs-5 lh-lg" style={{ textAlign: "justify" }}>
                La historia del <strong>Hotel Starlight</strong> comenzó hace varias décadas, cuando una familia de
                origen <strong>escocés</strong> decidió cumplir su sueño de construir un pequeño hospedaje en la
                ciudad de Rosario. Con esfuerzo, trabajo constante y una profunda vocación por el servicio,
                aquel modesto hotel fue creciendo paso a paso. Gracias al compromiso de sus fundadores y al
                apoyo de diversas empresas locales que colaboraron en su refacción y ampliación año tras año,
                el proyecto fue tomando forma hasta convertirse en el majestuoso complejo que hoy enorgullece
                a toda la comunidad. El <strong>Hotel Starlight</strong> es el reflejo del trabajo intergeneracional,
                la pasión por la hospitalidad y la unión de muchas manos que hicieron posible un sueño que
                perdura con el tiempo.
              </p>

              <p className="fs-5 lh-lg" style={{ textAlign: "justify" }}>
                En el corazón de Rosario, una de las ciudades más dinámicas y encantadoras de la provincia de
                Santa Fe, se alza el <strong>Hotel Starlight</strong>, un lugar donde la elegancia, el confort y la
                calidez humana se unen para ofrecer una experiencia inolvidable. Ubicados en una ciudad pujante,
                reconocida por su actividad comercial, portuaria y agrícola, y por un constante desarrollo
                urbanístico y cultural, somos parte de una comunidad que crece día a día, impulsada por el
                trabajo, la innovación y el espíritu emprendedor de su gente.
              </p>

              <p className="fs-5 lh-lg" style={{ textAlign: "justify" }}>
                Cada rincón del hotel fue diseñado para transmitir armonía, estilo y confort, con habitaciones
                modernas, servicios de primer nivel y un equipo que trabaja con pasión para hacer de cada estadía
                una experiencia única. Creemos que la verdadera hospitalidad nace del respeto, la empatía y el
                deseo de cuidar a quienes nos eligen.
              </p>

              <p className="fs-5 lh-lg" style={{ textAlign: "justify" }}>
                Desde nuestros inicios, en el <strong>Hotel Starlight</strong> nos hemos propuesto brindar mucho más que
                hospedaje: ofrecemos un espacio pensado para descansar, disfrutar y conectar con lo mejor de Rosario.
                Nuestra historia se construye sobre los valores de la excelencia, la hospitalidad y el compromiso
                con la sostenibilidad, buscando siempre generar un impacto positivo en la comunidad y en el medio ambiente.
              </p>

              <p className="fs-5 lh-lg mb-0" style={{ textAlign: "justify" }}>
                En el <strong>Hotel Starlight</strong>, impulsamos acciones de inclusión, desarrollo social y sostenibilidad,
                convencidos de que juntos podemos construir un futuro mejor. Te invitamos a descubrir la magia de Rosario,
                su río imponente, su vida cultural vibrante y su gente amable, mientras disfrutás del confort y la calidez
                que solo Starlight puede ofrecerte. Porque cada visita es una nueva historia… y queremos que la tuya sea inolvidable.
              </p>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default AboutUs;