import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';

function ProfessorHome() {
	const { user, isAuthenticated, loginWithRedirect, logout } = useAuth0();
	const navigate = useNavigate();

	return (
		<Button variant='primary' className='insert-proposal' style={{ borderRadius: 50 }} onClick={() => navigate('/proposals/add')}>
			<i className='bi bi-plus' style={{ fontSize: '1.5rem' }}></i>
		</Button>
	);
}

export default ProfessorHome;
