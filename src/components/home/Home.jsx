import starlightless from '../../images/starlightless.PNG';
import { Container, Row, Col, Image } from "react-bootstrap";
function Home() {

    return (   
         <div>
        <div className='covertor-imagen-fondo'>
        
        <Image
        src ={starlightless}
        alt="Hotel de lujo" 
        fluid
        className='estilo-imagen-fondo'
        />
        
        <p>Hotel de Lujo ubicado en zona centrica</p>
        </div>
           <Container> 
            <Row>

           
            <Col> 
            <p>En pleno corazón de Rosario, este hotel 5 estrellas combina elegancia y modernidad para ofrecer una experiencia única. Su diseño sofisticado y ambientes amplios brindan el máximo confort tanto para viajes de negocios como para escapadas de placer. </p>
            <p>A pocas cuadras del Monumento a la Bandera y de la peatonal Córdoba, la ubicación es ideal para quienes buscan comodidad y cercanía a los principales atractivos turísticos y comerciales de la ciudad. Cada detalle está pensado para garantizar bienestar y exclusividad.</p>
            <p>El hotel cuenta con habitaciones de lujo, spa, piscina y servicio de primer nivel. Además, se encuentra muy cerca de la vibrante avenida Pellegrini, reconocida por su variada oferta gastronómica, lo que permite disfrutar de la mejor cocina local a pasos del alojamiento.</p>
            </Col>
             <Col>
            
            </Col>
            
            </Row>




           </Container>
        </div>
    )
}

export default Home
