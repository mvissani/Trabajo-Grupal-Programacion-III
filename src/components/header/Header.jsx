import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";
import hotelName from "../../images/hotel-name.png";
import { useNavigate } from "react-router";

const Header = () => {
	const navigate = useNavigate();
	const navigateToRooms = () => {
		navigate("/rooms");
	};

	const navigateToAbout = () => {
		navigate("/aboutUs");
	};

	const navigateToReviews = () => {
		navigate("/reviews");
	};
	const navigateToServices = () => {
		navigate("/services");
	};

	const navigateToHome = () => {
		navigate("/");
	};

	const navigateToSales = () => {
		navigate("/sales");
	};
	const navigateToLogin = () => {
		navigate("/login");
	};
	const navigateToRegister = () => {
		navigate("/register");
	};

	const navigateToReservation = () => {
		navigate("/reservation");
	};

	return (
		<Navbar variant="dark" expand="lg" className="bg-secondary">
			<Container>
				<Navbar.Brand
					onClick={navigateToHome}
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
							<NavDropdown.Item onClick={navigateToRooms}>
								Habitaciones
							</NavDropdown.Item>
							<NavDropdown.Divider />
							<NavDropdown.Item onClick={navigateToServices}>
								Servicios
							</NavDropdown.Item>
							<NavDropdown.Divider />
							<NavDropdown.Item onClick={navigateToSales}>
								Ofertas
							</NavDropdown.Item>
						</NavDropdown>
						<NavDropdown
							id="nav-dropdown-about"
							title="Sobre Nosotros"
							menuVariant="light"
						>
							<NavDropdown.Item onClick={navigateToAbout}>
								¿Quiénes Somos?
							</NavDropdown.Item>
							<NavDropdown.Divider />
							<NavDropdown.Item onClick={navigateToReviews}>
								Reseñas
							</NavDropdown.Item>
						</NavDropdown>
						<NavDropdown
							id="nav-dropdown-account"
							title="Mi Cuenta"
							menuVariant="light"
						>
							<NavDropdown.Item onClick={navigateToLogin}>
								Iniciar Sesión
							</NavDropdown.Item>
							<NavDropdown.Divider />
							<NavDropdown.Item onClick={navigateToRegister}>
								Registrarme
							</NavDropdown.Item>
							<NavDropdown.Divider />
							<NavDropdown.Item onClick={navigateToReservation}>
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
