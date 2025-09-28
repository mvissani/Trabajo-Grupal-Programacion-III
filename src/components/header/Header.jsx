import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";
import hotelName from "../../images/hotel-name.png";
import { useNavigate } from "react-router";

const Header = () => {
	const navigate = useNavigate();

	const goTo = (path) => {
		navigate(path);
	};

	return (
		<Navbar variant="dark" expand="lg" className="bg-secondary">
			<Container>
				<Navbar.Brand
					onClick={() => goTo("home")}
					className="d-flex align-items-center"
				>
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
						<NavDropdown
							id="nav-dropdown-reservas"
							title="Reservas"
							menuVariant="light"
						>
							<NavDropdown.Item onClick={() => goTo("rooms")}>
								Habitaciones
							</NavDropdown.Item>
							<NavDropdown.Divider />
							<NavDropdown.Item onClick={() => goTo("services")}>
								Servicios
							</NavDropdown.Item>
							<NavDropdown.Divider />
							<NavDropdown.Item onClick={() => goTo("sales")}>
								Ofertas
							</NavDropdown.Item>
						</NavDropdown>
						<NavDropdown
							id="nav-dropdown-about"
							title="Sobre Nosotros"
							menuVariant="light"
						>
							<NavDropdown.Item onClick={() => goTo("aboutUs")}>
								¿Quiénes Somos?
							</NavDropdown.Item>
							<NavDropdown.Divider />
							<NavDropdown.Item onClick={() => goTo("reviews")}>
								Reseñas
							</NavDropdown.Item>
						</NavDropdown>
						<NavDropdown
							id="nav-dropdown-account"
							title="Mi Cuenta"
							menuVariant="light"
						>
							<NavDropdown.Item onClick={() => goTo("login")}>
								Iniciar Sesión
							</NavDropdown.Item>
							<NavDropdown.Divider />
							<NavDropdown.Item onClick={() => goTo("register")}>
								Registrarme
							</NavDropdown.Item>
							<NavDropdown.Divider />
							<NavDropdown.Item onClick={() => goTo("reservation")}>
								Mis Reservas
							</NavDropdown.Item>
						</NavDropdown>
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
};

export default Header;
