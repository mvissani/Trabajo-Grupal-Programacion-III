import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";
import hotelName from '../../images/hotel-name.png';

const Header = () => {
    return (
        <Navbar variant="dark" expand="lg" className="bg-secondary">
            <Container>
                <Navbar.Brand href="/" className="d-flex align-items-center">
                    <img
                        src={hotelName}
                        width="150"
                        height="60"
                        className="d-inline-block align-top"
                        alt="Starlight Hoteles"
                    />
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="navbar-nav" />
                <Navbar.Collapse id="navbar-nav" className="justify-content-end">
                    <Nav>
                        {/* Items principales */}
                        <Nav.Link href="/">Inicio</Nav.Link>
                        <Nav.Link href="/rooms">Habitaciones</Nav.Link>
                        <Nav.Link href="/services">Servicios</Nav.Link>

                        {/* Dropdowns que se mantienen */}
                        <NavDropdown id="nav-dropdown-about" title="Sobre Nosotros" menuVariant="light">
                            <NavDropdown.Item href="/aboutUs">¿Quiénes Somos?</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="/reviews">Reseñas</NavDropdown.Item>
                        </NavDropdown>

                        <NavDropdown id="nav-dropdown-account" title="Mi Cuenta" menuVariant="light">
                            <NavDropdown.Item href="/login">Iniciar Sesión</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="/register">Registrarme</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="/reservation">Mis Reservas</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Header;
