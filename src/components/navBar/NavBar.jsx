import {Navbar, Container, Nav} from "react-bootstrap"

import { useNavigate } from 'react-router'


const NavBar = () =>  {
    const navigate = useNavigate()

    return (    
        <Navbar>
            <Container>
                <Navbar.Brand>
                    B-lue Hoteles
                </Navbar.Brand>
                <Nav>
                    <Nav.Link > Nosotros </Nav.Link>
                    <Nav.Link > Nuestras ofertas </Nav.Link>
                    <Nav.Link > blablabla </Nav.Link>
                </Nav>

            </Container>
        </Navbar>
    )
}

export default NavBar