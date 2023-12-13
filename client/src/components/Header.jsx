import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, NavDropdown, Nav, Image, Dropdown, Container } from 'react-bootstrap';
import { useAuth0 } from '@auth0/auth0-react';
import logo_white from '../assets/logo_white.svg';
import { Color } from '../constants/colors.js';
import Avatar from '../assets/avatar.svg';
import { useNavigate, useLocation } from 'react-router-dom';
import dayjs from 'dayjs';
import PropsTypes from 'prop-types';

function Header({ date, userData }) {
	const { isAuthenticated, loginWithRedirect, logout } = useAuth0();
	const navigate = useNavigate();
	let location = useLocation();

	function navElement() {
		return (
			<Nav activeKey={location.pathname}>
				<Nav.Link eventKey='/' onClick={() => navigate('/')}>
					Proposals
				</Nav.Link>
				<Nav.Link eventKey='/applications' onClick={() => navigate('/applications')}>
					Applications
				</Nav.Link>
				<Nav.Link className='d-md-none' eventKey='/notifications'>
					Notifications
				</Nav.Link>
				<Nav.Link className='d-md-none' eventKey='/settings' onClick={() => navigate('/settings')}>
					Settings
				</Nav.Link>
				{isAuthenticated ? (
					<Nav.Link className='d-md-none' eventKey='/logout' onClick={logout}>
						Logout
					</Nav.Link>
				) : (
					<Nav.Link className='d-md-none' eventKey='/login' onClick={loginWithRedirect}>
						Login
					</Nav.Link>
				)}
			</Nav>
		);
	}

	return (
		<>
			<Navbar collapseOnSelect expand='md' style={{ backgroundColor: Color.primary }} variant='dark'>
				<Container fluid>
					<Navbar.Brand style={{ paddingLeft: '20px', paddingRight: 20 }} onClick={() => navigate('/')}>
						<img src={logo_white} alt='Logo' style={{ height: '40px' }} />
					</Navbar.Brand>

					<Navbar.Collapse className='d-none d-md-flex'>{navElement()}</Navbar.Collapse>
					<Nav className='d-flex flex-row'>
						{date ? (
							<Nav.Link eventKey='/settings' onClick={() => navigate('/settings')} style={{ height: 53, paddingRight: 8 }}>
								<div className='d-flex align-items-center justify-content-center' style={{ marginTop: '7px' }}>
									<i className='bi bi-calendar3' style={{ marginRight: 10 }}></i>
									{dayjs(date).format('DD MMM YYYY')}
								</div>
							</Nav.Link>
						) : null}

						<Dropdown align='end' className='d-none d-md-flex'>
							<Dropdown.Toggle variant='primary' id='dropdown-custom'>
								<Container className='d-flex justify-content-between align-items-center'>
									<div style={{ marginRight: 15 }}>
										<div style={{ fontSize: 15 }}>{userData ? userData.name + ' ' + userData.surname : null}</div>
										<div style={{ color: 'rgba(255,255,255,0.5)', float: 'right', fontSize: 12 }}>{userData ? userData.id : null}</div>
									</div>
									<div className='text-center'>
										<Image style={{ height: 33, width: 33 }} src={Avatar} roundedCircle />
									</div>
								</Container>
							</Dropdown.Toggle>

							<Dropdown.Menu>
								<Dropdown.Item onClick={() => navigate('/settings')}>
									<i className='bi bi-gear'></i>
									<span style={{ marginLeft: 15 }}>Settings</span>
								</Dropdown.Item>
								<Dropdown.Divider />
								{isAuthenticated ? (
									<Dropdown.Item onClick={logout}>
										<i className='bi bi-box-arrow-right'></i>
										<span style={{ marginLeft: 15 }}>Logout</span>
									</Dropdown.Item>
								) : (
									<Dropdown.Item onClick={loginWithRedirect}>
										<i className='bi bi-box-arrow-left'></i>
										<span style={{ marginLeft: 15 }}>Login</span>
									</Dropdown.Item>
								)}
							</Dropdown.Menu>
						</Dropdown>
						<Navbar.Toggle aria-controls='responsive-navbar-nav' />
					</Nav>
				</Container>
				<Container className='d-md-none' style={{ display: 'content', textAlign: 'center' }}>
					<Navbar.Collapse id='responsive-navbar-nav' className='d-md-none'>
						{navElement()}
					</Navbar.Collapse>
				</Container>
			</Navbar>
		</>
	);
}

Header.propTypes = {
	date: PropsTypes.string,
	userData: PropsTypes.object,
};

export default Header;
