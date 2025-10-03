import { Navbar, Container, NavDropdown } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import hotelName from '../../images/hotel-name.png';
import { useState } from "react";

const Header = () => {
    const navigate = useNavigate();
    // estado para controlar el menu de "Mi Cuenta"
    const [showCuenta, setShowCuenta] = useState(false);

    // handler para los dropdowns vacios
    const handleNavDropdownClick = (route, e) => {
        e.preventDefault();
        navigate(route);
    };

    return (
        <Navbar variant="dark" expand="lg" className="bg-secondary">
            <Container>
                <Navbar.Brand onClick={() => navigate("/")} style={{ cursor: "pointer" }} className="d-flex align-items-center">
                    <img
                        src={hotelName}
                        width="150"
                        height="60"
                        className="d-inline-block align-top"
                        alt="Starlight Hoteles"
                    />
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="navbar-nav" />
                <Navbar.Collapse id="navbar-nav">
                    <div className="ms-auto d-flex align-items-center">
                        <NavDropdown
                            title="Inicio"
                            id="nav-inicio"
                            className="mx-2"
                            menuVariant="light"
                            show={false}
                            onClick={e => handleNavDropdownClick("/", e)}
                        />
                        <NavDropdown
                            title="Habitaciones"
                            id="nav-habitaciones"
                            className="mx-2"
                            menuVariant="light"
                            show={false}
                            onClick={e => handleNavDropdownClick("/rooms", e)}
                        />
                        <NavDropdown
                            title="Servicios"
                            id="nav-servicios"
                            className="mx-2"
                            menuVariant="light"
                            show={false}
                            onClick={e => handleNavDropdownClick("/services", e)}
                        />
                        <NavDropdown
                            title="Sobre Nosotros"
                            id="nav-aboutus"
                            className="mx-2"
                            menuVariant="light"
                            show={false}
                            onClick={e => handleNavDropdownClick("/aboutUs", e)}
                        />
                        <NavDropdown
                            title="Mi Cuenta"
                            id="nav-micuenta"
                            className="mx-2"
                            menuVariant="light"
                            show={showCuenta}
                            onMouseEnter={() => setShowCuenta(true)}
                            onMouseLeave={() => setShowCuenta(false)}
                            onClick={() => setShowCuenta(!showCuenta)}
                        >
                            <NavDropdown.Item onClick={() => navigate("/login")} className="text-dark">Iniciar Sesión</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item onClick={() => navigate("/register")} className="text-dark">Registrarme</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item onClick={() => navigate("/reservation")} className="text-dark">Mis Reservas</NavDropdown.Item>
                        </NavDropdown>
                    </div>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Header;
