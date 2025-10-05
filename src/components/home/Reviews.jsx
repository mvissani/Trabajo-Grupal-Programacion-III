import { Carousel, Container } from "react-bootstrap";
import "../../App.scss";

const reviews = [
  {
    rating: 9.4,
    text: "Muy bien estado de las habitaciones, muy buena la pileta climatizada  y la atención del personal. Nos comentaron que estuvimos en un sector que había sido renovado. Buena decisión la de no permitir menores en el spa después de las 18.00. Mucho lujo , mi novia feliz de la vida ! La pasamos genial !!",
    author: "CHINO HOFFMAN",
    image: "https://ik.imagekit.io/rooxjlwlq/13706584104d365df4ff159e616f7458991198a25d2.jpg?updatedAt=1759274525392",
  },
  {
    rating: 9.4,
    text: "Un hotel que guarda buena relación entre categoría, precio, oferta y servicios. La atención es destacada, el ambiente moderno y distendido, el restaurant muy bueno, el desayuno continental sin palabras. Me he hospedado muchas veces y siempre quiero volver.",
    author: "JAVIER LAMPA",
    image: "https://ik.imagekit.io/rooxjlwlq/termal-brihuega-1-1024x683.jpg?updatedAt=1759273489389",
  },
  {
    rating: 9.8,
    text: "Estuvimos en una suite, muy amplia, buenas camas y servicios. Detalles en la atención. Excelentes instalaciones del hotel, spa y piscinas. Muy cómodo el acceso a Rosario por Oroño. Excelente atención del personal; mención especial para Pehuén, siempre atento a lo que necesitáramos.",
    author: "IGNACIO M.",
    image: "https://ik.imagekit.io/rooxjlwlq/1555945783-5cbdd93772607-thumb.jpg?updatedAt=1759273490403"
  },
    {
    rating: 8.9,
    text: "Viajamos en familia y quedamos fascinados. Las actividades para los chicos, habitaciones espaciosas y un trato excelente por parte de todo el personal. Lo recomiendo 100%",
    author: "THIAGO M.",
    image: "https://ik.imagekit.io/rooxjlwlq/568.jpg?updatedAt=1759274667196",
  },
    {
    rating: 8.8,
    text: "“Un lugar soñado. Me sorprendió la decoración moderna y elegante. El servicio de transfer al aeropuerto fue muy puntual. Sin dudas, volveré a alojarme aquí en mi próximo viaje.”",
    author: "SOFIA SUAREZ.",
    image: "https://ik.imagekit.io/rooxjlwlq/20f6593f-6f02-4e98-bd3c-f3d1a3091ba0.jpg?updatedAt=1759274962232"
  },
    {
    rating: 9.8,
    text: "“Todo muy bien organizado. El check-in fue rápido y sencillo. El gimnasio está muy bien equipado y el casino es impresionante. La habitación era espaciosa y cómoda, con una vista increíble de la ciudad. El personal fue muy amable y atento durante toda nuestra estancia.”",
    author: "FRANCO P",
    image: "https://ik.imagekit.io/rooxjlwlq/10-oria-berasateguijpg-1640773358.avif?updatedAt=1757456274226",
  },
    
  {
    rating: 8.6,
    text: "“La experiencia fue increíble. La habitación impecable, el personal muy amable y siempre dispuesto a ayudar. El desayuno superó mis expectativas, muy variado y fresco. Definitivamente volvería.”",
    author: "MARTINA V.",
    image: "https://ik.imagekit.io/rooxjlwlq/24-hours-gym-r0lg4mkl4m.jpeg?updatedAt=1759175524156",
  },
  {
    rating: 8.2,
    text: "La ubicación es excelente, cerca de todo. El servicio de limpieza muy bueno y rápido. Lo único que mejoraría sería el WiFi, que a veces se cortaba. Por lo demás, todo perfecto”",
    author: "JORGELINA.",
    image: "https://ik.imagekit.io/rooxjlwlq/laoliviaspa-1024x683.jpg?updatedAt=1759274320069",
  },
];

export default function Reviews() {
  return (
    <section className="reviews-section">
      <Container fluid className="p-0">
        <Carousel fade interval={6000} controls indicators={false}>
          {reviews.map((review, index) => (
            <Carousel.Item key={index}>
              <div
                className="review-slide d-flex align-items-center justify-content-center text-center"
                style={{
                  backgroundImage: `url(${review.image})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  minHeight: "500px",
                }}
              >
                <div
                  className="bg-dark bg-opacity-50 p-4 rounded shadow-lg"
                  style={{ maxWidth: "700px" }}
                >
                  <h2 className="fw-bold text-white">{review.rating}</h2>
                  <p className="text-white fst-italic">{review.text}</p>
                  <h6 className="text-white mt-3">{review.author}</h6>
                </div>
              </div>
            </Carousel.Item>
          ))}
        </Carousel>
      </Container>
    </section>
  );
}