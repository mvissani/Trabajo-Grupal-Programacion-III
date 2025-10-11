import { Container, Row, Col } from "react-bootstrap";

function AboutUs() {
  return (
    <Container fluid className="min-vh-100 d-flex align-items-center py-5 bg-light">
      <Row className="justify-content-center w-100">
        <Col md={10} lg={8}>
          <h2 className="mb-4 text-center">Sobre Nosotros</h2>

          <p className="fw-semibold">
            En el corazón de Rosario, una de las ciudades más dinámicas y encantadoras de la provincia de Santa Fe,
            se alza el Hotel Starlight, un lugar donde la elegancia, el confort y la calidez humana se unen para
            ofrecer una experiencia inolvidable. Ubicados en una ciudad pujante, reconocida por su actividad comercial,
            portuaria y agrícola, y por un constante desarrollo urbanístico y cultural, somos parte de una comunidad
            que crece día a día, impulsada por el trabajo, la innovación y el espíritu emprendedor de su gente.
          </p>

          <p className="fw-border">
            Cada rincón del hotel fue diseñado para transmitir armonía, estilo y confort, con habitaciones modernas,
            servicios de primer nivel y un equipo que trabaja con pasión para hacer de cada estadía una experiencia
            única. Creemos que la verdadera hospitalidad nace del respeto, la empatía y el deseo de cuidar a quienes
            nos eligen.
          </p>

          <p className="fw-border">
            Desde nuestros inicios, en el Hotel Starlight nos hemos propuesto brindar mucho más que hospedaje: ofrecemos
            un espacio pensado para descansar, disfrutar y conectar con lo mejor de Rosario. Nuestra historia se
            construye sobre los valores de la excelencia, la hospitalidad y el compromiso con la sostenibilidad,
            buscando siempre generar un impacto positivo en la comunidad y en el medio ambiente.
          </p>

          <p className="fw-border">
            En el Hotel Starlight, impulsamos acciones de inclusión, desarrollo social y sostenibilidad, convencidos de
            que juntos podemos construir un futuro mejor. Te invitamos a descubrir la magia de Rosario, su río
            imponente, su vida cultural vibrante y su gente amable, mientras disfrutás del confort y la calidez que solo
            Starlight puede ofrecerte. Porque cada visita es una nueva historia… y queremos que la tuya sea inolvidable.
          </p>
        </Col>
      </Row>
    </Container>
  );
}

export default AboutUs;

