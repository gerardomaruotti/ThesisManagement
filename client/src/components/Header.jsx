import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Button } from 'react-bootstrap';
import { useAuth0 } from '@auth0/auth0-react';
import logo_white from '../assets/logo_white.svg';
import { Color } from '../constants/colors.js';

function Header(props) {
	const { user, isAuthenticated, loginWithRedirect, logout } = useAuth0();

	return (
		<Navbar collapseOnSelect expand='lg' style={{ backgroundColor: Color.primary }} variant='dark'>
			<Navbar.Brand className='me-auto' style={{ paddingLeft: '20px' }}>
				<img src={logo_white} alt='Logo' style={{ height: '40px' }} />
				{/* Thesis Management */}
			</Navbar.Brand>
			<Navbar.Toggle aria-controls='responsive-navbar-nav' />
			<Navbar.Collapse id='responsive-navbar-nav'>
				<div className='d-flex justify-content-between align-items-center w-100' style={{ paddingRight: '20px' }}>
					<div>{/* Empty div to push the name to the center */}</div>
					{isAuthenticated ? (
						<Button style={{ backgroundColor: Color.secondary, border: 0, width: 100, borderRadius: 50, color: 'white' }} size='sm' onClick={logout}>
							<div className='headerButton'>LOGOUT</div>
						</Button>
					) : (
						<Button style={{ width: 100, borderRadius: 50 }} variant='light' size='sm' onClick={loginWithRedirect}>
							<div className='headerButton'>LOGIN</div>
						</Button>
					)}
				</div>
			</Navbar.Collapse>
		</Navbar>
	);
}

export default Header;
