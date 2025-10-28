import { Navbar, Container, NavDropdown } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import hotelName from "../../images/hotel-name.png";
import { useContext, useEffect, useState } from "react";
import { AuthenticationContex } from "../services/Auth/Auth.context";
import "./header.css";
import { UserTypeContext } from "../services/Auth/UserType.context";

const Header = () => {
  const navigate = useNavigate();
  const { userType, userTokenType } = useContext(UserTypeContext);
  const { token, handleLogOut } = useContext(AuthenticationContex);
  const [showCuenta, setShowCuenta] = useState(false);
  useEffect(() => {
    userTokenType(token);
  });
  const LogOut = () => {
    navigate("/home");
    handleLogOut();
  };
  const isAdmin = () => {
    if (userType === "admin") {
      return true;
    } else if (userType === "sysadmin") {
      return true;
    } else return false;
  };

  const handleNavDropdownClick = (route, e) => {
    e.preventDefault();
    navigate(route);
  };

  return (
    <>
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
                      onClick={() => navigate("/profile")}
                      className="dropdown-item-custom text-dark"
                    >
                      Mi Perfil
                    </NavDropdown.Item>

                    <NavDropdown.Divider />
                    {isAdmin() ? (
                      <>
                        <NavDropdown.Item
                          onClick={() => navigate("/admin")}
                          className="dropdown-item-custom text-dark"
                        >
                          Panel de administracion
                        </NavDropdown.Item>
                        <NavDropdown.Divider />
                      </>
                    ) : (
                      ""
                    )}
                    <NavDropdown.Item
                      onClick={LogOut}
                      className="dropdown-item-custom text-dark"
                    >
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
                      Reservar
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
