import { Container, Row, Button } from 'react-bootstrap';
import { useLoading } from '../LoadingContext';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import StudentRequestCard from '../components/StudentRequestCard';
import Loading from '../components/Loading.jsx';
import PropsTypes from 'prop-types';
import API from '../API.jsx';

function StudentRequests({ accessToken, handleError }) {
	const navigate = useNavigate();
	const { loading, setLoading } = useLoading();
	const [requests, setRequests] = useState([]);

	useEffect(() => {
		setLoading(true);
		if (!accessToken) return;
		API.getStudentThesisRequest(accessToken)
			.then((req) => {
				setRequests(req);
			})
			.catch((err) => {
				handleError(err);
			})
			.finally(() => setLoading(false));
	}, [accessToken]);

	return loading ? (
		<Loading />
	) : (
		<Container>
			<Row>
				{requests.length > 0 ? (
					requests.map((request) => {
						return <StudentRequestCard key={request.id} request={request} />;
					})
				) : (
					<h1 style={{ textAlign: 'center', marginTop: 50 }}>No thesis request made</h1>
				)}
			</Row>
			<Button
				variant='primary'
				className='insert-proposal'
				style={{ borderRadius: 50 }}
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
	accessToken: PropsTypes.string,
	handleError: PropsTypes.func,
};

export default StudentRequests;
