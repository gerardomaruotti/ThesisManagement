import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Navbar, Button } from 'react-bootstrap';
import { useAuth0 } from '@auth0/auth0-react';
import logo_white from '../assets/logo_white.svg';
import { Color } from '../constants/colors.js';

function Header(props) {
	const { user, isAuthenticated, loginWithRedirect, logout } = useAuth0();

	return (
		<Navbar collapseOnSelect expand='lg' style={{ backgroundColor: Color.primary }} variant='dark'>
			<Container>
				<Navbar.Brand className='me-auto'>
					<img src={logo_white} alt='Logo' style={{ height: '40px' }} />
					{/* Thesis Management */}
				</Navbar.Brand>
				<Navbar.Toggle aria-controls='responsive-navbar-nav' />
				<Navbar.Collapse id='responsive-navbar-nav'>
					<div className='d-flex justify-content-between align-items-center w-100'>
						<div>{/* Empty div to push the name to the center */}</div>
						{isAuthenticated ? (
							<Button style={{ backgroundColor: Color.secondary, border: 0 }} onClick={logout}>
								Logout
							</Button>
						) : (
							<Button variant='light' onClick={loginWithRedirect}>
								Login
							</Button>
						)}
					</div>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
}

export default Header;
