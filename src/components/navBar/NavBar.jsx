import {Navbar, Container, Nav} from "react-bootstrap"
import {useNavigate} from "react-router"


const NavBar = () =>  {
    console.log("pepio")
    return (    
        <Navbar className="bg-secondary">
            <Container>
                <Navbar.Brand href="/home">
                    B-lue Hoteles
                </Navbar.Brand>
                <Nav>
                    <Nav.Link href="/reservation"> Reserva ahora! </Nav.Link>
                    <Nav.Link href="/aboutUs"> Sobre Nosotros </Nav.Link>
                    <Nav.Link href="/login"> login </Nav.Link>
                    <Nav.Link href="/register"> register </Nav.Link>
                    <Nav.Link href="/sales"> sales </Nav.Link>
                    <Nav.Link href="/blablabla"> blablabla </Nav.Link>
                </Nav>

            </Container>
        </Navbar>
    )
}

export default NavBar