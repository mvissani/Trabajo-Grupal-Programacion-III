import {Navbar, Container, Nav} from "react-bootstrap"
import hotelName from '../../images/hotel-name.png';
// import {useNavigate} from "react-router"

const Header = () =>  {
    return (    
        <Navbar className="bg-secondary">
            <Container>
                <Navbar.Brand href="/home">
                    <img src={hotelName} width="150" height="60" className="d-inline-block align-top" alt="Starlight Hoteles"/>
                </Navbar.Brand>
                <Nav>
                    <Nav.Link href="/reservation"> ¡Reserva ahora! </Nav.Link>
                    <Nav.Link href="/aboutUs"> Sobre Nosotros </Nav.Link>
                    <Nav.Link href="/login"> Iniciar Sesión </Nav.Link>
                    <Nav.Link href="/register"> Registrarme </Nav.Link>
                    <Nav.Link href="/sales"> Ofertas </Nav.Link>
                    <Nav.Link href="/services"> Servicios </Nav.Link>
                </Nav>
            </Container>
        </Navbar>
    )
}

export default Header