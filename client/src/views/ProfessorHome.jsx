import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Button, Container, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import ProposalCard from '../components/ProposalCard';

function ProfessorHome(props) {
	const { user, isAuthenticated, loginWithRedirect, logout } = useAuth0();
	const navigate = useNavigate();

	return (
		<Container>
			<Row style={{ marginBottom: 25 }}>
				{props.thesis != [] ? props.thesis.map((thesis, index) => (
					<ProposalCard key={thesis.ID} isProfessor={1} thesis={thesis} />)) : null}
			</Row>
			<Button variant='primary' className='insert-proposal' style={{ borderRadius: 50 }} onClick={() => navigate('/proposals/add')}>
				<i className='bi bi-plus' style={{ fontSize: '1.5rem' }}></i>
			</Button>
		</Container>
	);
}

export default ProfessorHome;
