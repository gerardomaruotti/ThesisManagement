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

	const requestObj = {
		id: 1,
		title: 'Thesis Title',
		description: 'Thesis Description',
		supervisor: 'Professor Name',
		state: 3,
		request_date: '2024-01-04',
		approval_date: '2024-01-04',
	};

	const requestObj2 = {
		id: 2,
		title: 'Thesis Title',
		description: 'Thesis Description',
		supervisor: 'Professor Name',
		state: 1,
		request_date: '2024-01-04',
		approval_date: '2024-01-04',
	};

	const requestObj3 = {
		id: 3,
		title: 'Thesis Title',
		description: 'Thesis Description',
		supervisor: 'Professor Name',
		state: 2,
		request_date: '2024-01-04',
		approval_date: '2024-01-04',
	};

	const requestObj4 = {
		id: 4,
		title: 'Thesis Title',
		description: 'Thesis Description',
		supervisor: 'Professor Name',
		state: 0,
		request_date: '2024-01-04',
		approval_date: '2024-01-04',
	};

	const requestObj5 = {
		id: 5,
		title: 'Thesis Title',
		description: 'Thesis Description',
		supervisor: 'Professor Name',
		state: 4,
		request_date: '2024-01-04',
		approval_date: '2024-01-04',
	};

	const requestObj6 = {
		id: 6,
		title: 'Thesis Title',
		description: 'Thesis Description',
		supervisor: 'Professor Name',
		state: 5,
		request_date: '2024-01-04',
		approval_date: '2024-01-04',
	};

	const requestsArray = [requestObj, requestObj2, requestObj3, requestObj4, requestObj5, requestObj6];

	useEffect(() => {
		setRequests(requestsArray);
	}, []);

	// useEffect(() => {
	// 	setLoading(true);
	// 	API.getRequests(accessToken)
	// 		.then((req) => {
	// 			setRequests(req);
	// 		})
	// 		.catch((err) => {
	// 			console.log(err);
	// 		})
	// 		.finally(() => setLoading(false));
	// }, [accessToken]);

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
