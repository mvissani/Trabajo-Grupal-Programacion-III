import { Navbar, Container, Nav } from "react-bootstrap";
import { useNavigate } from "react-router";

const NavBar = () => {
	console.log("pepio");
	return (
		<Navbar className="bg-secondary">
			<Container>
				<Navbar.Brand href="/home">Starligth Hoteles</Navbar.Brand>
				<Nav>
					<Nav.Link href="/home"> Home </Nav.Link>
					<Nav.Link href="/reservation"> Reserva Ahora </Nav.Link>
					<Nav.Link href="/sales"> Habitaciones y Promociones </Nav.Link>
					<Nav.Link href="/aboutUs"> Nosotros </Nav.Link>
					<Nav.Link href="/login"> login </Nav.Link>
				</Nav>
			</Container>
		</Navbar>
	);
};

export default NavBar;
