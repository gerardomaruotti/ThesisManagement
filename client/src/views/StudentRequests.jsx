import { Container, Row, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import PropsTypes from 'prop-types';
import RequestCard from '../components/RequestCard';

function StudentRequests({ hasApplied, requests, hasRequested }) {
	const navigate = useNavigate();

	return (
		<Container>
			<Row>
				{requests.length > 0 ? (
					requests.map((request) => {
						return <RequestCard key={request.id} request={request} />;
					})
				) : (
					<h1 style={{ textAlign: 'center', marginTop: 50 }}>No thesis request made</h1>
				)}
			</Row>
			<Button
				variant='primary'
				className='insert-proposal'
				style={{ borderRadius: 50 }}
				disabled={hasRequested || hasApplied}
				onClick={() => {
					navigate('/requests/add');
				}}
			>
				<i className='bi bi-plus' style={{ fontSize: '1.5rem' }}></i>
			</Button>
		</Container>
	);
}

StudentRequests.propTypes = {
	requests: PropsTypes.array.isRequired,
	hasApplied: PropsTypes.bool.isRequired,
	hasRequested: PropsTypes.bool.isRequired,
};

export default StudentRequests;
