import 'bootstrap/dist/css/bootstrap.min.css';
import StudentApplicationCard from '../components/StudentApplicationCard';
import { useEffect, useState } from 'react';
import { Container, Row } from 'react-bootstrap';
import { useLoading } from '../LoadingContext';
import Loading from '../components/Loading.jsx';
import API from '../API.jsx';
import PropTypes from 'prop-types';

//Status: 0 pending, 1 accepted, 2 rejected, 3 canceled
function StudentApplications({ accessToken, handleError }) {
	const { loading, setLoading } = useLoading();
	const [applications, setApplications] = useState([]);

	useEffect(() => {
		setLoading(true);
		API.getApplications(accessToken)
			.then((app) => {
				setApplications(app);
				setLoading(false);
			})
			.catch((err) => {
				handleError(err);
				setLoading(false);
			});
	}, []);

	return loading ? (
		<Loading />
	) : (
		<Container>
			<Row style={{ marginBottom: 25 }}>
				{applications.length > 0 ? (
					applications.map((application, index) => <StudentApplicationCard key={index} application={application} />)
				) : (
					<div className='d-flex justify-content-center align-items-center min-vh-100'>
						<div className='text-center'>
							<h1>No application has been made</h1>
						</div>
					</div>
				)}
			</Row>
		</Container>
	);
}

StudentApplications.propTypes = {
	accessToken: PropTypes.string.isRequired,
	handleError: PropTypes.func.isRequired,
};

export default StudentApplications;
