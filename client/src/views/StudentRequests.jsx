import { Container, Row, Button } from 'react-bootstrap';
import { useLoading } from '../LoadingContext';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import StudentRequestCard from '../components/StudentRequestCard';
import Loading from '../components/Loading.jsx';
import PropsTypes from 'prop-types';
import API from '../API.jsx';

function StudentRequests({ accessToken }) {
	const navigate = useNavigate();
	const { loading, setLoading } = useLoading();
	const [requests, setRequests] = useState([]);

	useEffect(() => {
		setLoading(true);
		API.getStudentThesisRequests(accessToken)
			.then((req) => {
				setRequests(req);
			})
			.catch((err) => {
				console.log(err);
			})
			.finally(() => setLoading(false));
	}, [accessToken]);

	return loading ? (
		<Loading />
	) : (
		<Container>
			<Row style={{ marginBottom: 25 }}>
				{requests.map((request) => {
					return <StudentRequestCard key={request.id} request={request} />;
				})}
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
};

export default StudentRequests;
