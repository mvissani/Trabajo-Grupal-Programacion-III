import { Navbar, Container, NavDropdown } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import hotelName from "../../images/hotel-name.png";
import { useContext, useState } from "react";
import { AuthenticationContex } from "../services/Auth/Auth.context";

const Header = () => {
  const navigate = useNavigate();

  const { token, handleLogOut } = useContext(AuthenticationContex);

  const [showCuenta, setShowCuenta] = useState(false);

  const LogOut = () => {
    navigate("/home");
    handleLogOut();
  };

  const handleNavDropdownClick = (route, e) => {
    e.preventDefault();
    navigate(route);
  };

  return (
    <>
      <style>
        {`
          .header-nav-link {
            color: white !important;
            font-size: 1.1rem;
            font-weight: 500;
            letter-spacing: 0.5px;
            padding: 0.5rem 1.2rem !important;
            margin: 0 0.3rem;
            position: relative;
            transition: all 0.3s ease;
            text-transform: uppercase;
            cursor: pointer;
          }
          
          .header-nav-link::after {
            content: '';
            position: absolute;
            bottom: 0;
            left: 50%;
            transform: translateX(-50%);
            width: 0;
            height: 2px;
            background: #48c5b7;
            transition: width 0.3s ease;
          }
          
          .header-nav-link:hover {
            color: #48c5b7 !important;
            transform: translateY(-2px);
          }
          
          .header-nav-link:hover::after {
            width: 80%;
          }
          
          .navbar-brand-custom {
            transition: transform 0.3s ease;
          }
          
          .navbar-brand-custom:hover {
            transform: scale(1.05);
          }
          
          .dropdown-item-custom {
            font-size: 1rem;
            font-weight: 500;
            padding: 0.7rem 1.5rem;
            transition: all 0.2s ease;
          }
          
          .dropdown-item-custom:hover {
            background-color: #48c5b7 !important;
            color: white !important;
            transform: translateX(5px);
          }
          
          .navbar-bg-custom {
            background: linear-gradient(135deg, #6c757d 0%, #495057 100%);
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
          }
        `}
      </style>
      <Navbar variant="dark" expand="lg" className="navbar-bg-custom py-3">
        <Container>
          <Navbar.Brand
            onClick={() => navigate("/")}
            style={{ cursor: "pointer" }}
            className="d-flex align-items-center navbar-brand-custom"
          >
            <img
              src={hotelName}
              width="180"
              height="70"
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
                className="header-nav-link"
                menuVariant="light"
                show={false}
                onClick={(e) => handleNavDropdownClick("/", e)}
              />
              <NavDropdown
                title="Habitaciones"
                id="nav-habitaciones"
                className="header-nav-link"
                menuVariant="light"
                show={false}
                onClick={(e) => handleNavDropdownClick("/rooms", e)}
              />
              <NavDropdown
                title="Servicios"
                id="nav-servicios"
                className="header-nav-link"
                menuVariant="light"
                show={false}
                onClick={(e) => handleNavDropdownClick("/services", e)}
              />
              <NavDropdown
                title="Sobre Nosotros"
                id="nav-aboutus"
                className="header-nav-link"
                menuVariant="light"
                show={false}
                onClick={(e) => handleNavDropdownClick("/aboutUs", e)}
              />
              <NavDropdown
                title="Mi Cuenta"
                id="nav-micuenta"
                className="header-nav-link"
                menuVariant="light"
                show={showCuenta}
                onMouseEnter={() => setShowCuenta(true)}
                onMouseLeave={() => setShowCuenta(false)}
                onClick={() => setShowCuenta(!showCuenta)}
              >
                {token ? (
                  <>
                    <NavDropdown.Item
                      onClick={() => navigate("/perfil")}
                      className="dropdown-item-custom text-dark"
                    >
                      Mi Perfil
                    </NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item
                      onClick={() => navigate("/reservation")}
                      className="dropdown-item-custom text-dark"
                    >
                      Mis Reservas
                    </NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item onClick={LogOut} className="dropdown-item-custom text-dark">
                      Cerrar Sesión
                    </NavDropdown.Item>
                  </>
                ) : (
                  <>
                    <NavDropdown.Item
                      onClick={() => navigate("/login")}
                      className="dropdown-item-custom text-dark"
                    >
                      Iniciar Sesión
                    </NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item
                      onClick={() => navigate("/register")}
                      className="dropdown-item-custom text-dark"
                    >
                      Registrarme
                    </NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item
                      onClick={() => navigate("/reservation")}
                      className="dropdown-item-custom text-dark"
                    >
                      Mis Reservas
                    </NavDropdown.Item>
                  </>
                )}
              </NavDropdown>
            </div>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default Header;