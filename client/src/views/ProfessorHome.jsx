import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Button, Container, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import ProposalCard from '../components/ProposalCard';
import { useAuth0 } from '@auth0/auth0-react';
import { useEffect } from 'react';

function ProfessorHome(props) {
	const navigate = useNavigate();
	const { loginWithRedirect, isAuthenticated, isLoading } = useAuth0();

	useEffect(() => {
		if (!isAuthenticated && !isLoading) {
			loginWithRedirect();
		}
	}, [isAuthenticated, isLoading]);

	return (
		<Container>
			<Row style={{ marginBottom: 25 }}>
				{props.thesis != [] ? props.thesis.map((thesis, index) => <ProposalCard key={thesis.ID} isProfessor={1} thesis={thesis} />) : null}
			</Row>
			<Button variant='primary' className='insert-proposal' style={{ borderRadius: 50 }} onClick={() => navigate('/proposals/add')}>
				<i className='bi bi-plus' style={{ fontSize: '1.5rem' }}></i>
			</Button>
		</Container>
	);
}

export default ProfessorHome;
