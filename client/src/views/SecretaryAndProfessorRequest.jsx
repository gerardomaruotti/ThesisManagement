import { useEffect, useState, useContext } from 'react';
import UserContext from '../contexts/UserContext';
import { Container, Row, Col } from 'react-bootstrap';
import API from '../API';
import PropTypes from 'prop-types';
import { useLoading } from '../contexts/LoadingContext.jsx';
import Loading from '../components/Loading.jsx';
import RapidFilterRequest from '../components/RapidFilterRequest.jsx';
import { handleError } from '../utils/toastHandlers.js';
import RequestCard from '../components/RequestCard.jsx';

const SecretaryAndProfessorRequest = ({ setShowModal, setMsgModal, rapidFilter, setRapidFilter }) => {
	const { accessToken } = useContext(UserContext);
	const { loading, setLoading } = useLoading();
	const [filteredRequests, setFilteredRequests] = useState([]);
	const [requests, setRequests] = useState([]); // 0 pending, 1 accepted by secretary, 2 rejected by secretary, 3 accepted by professor, 4 rejected by professor, 5 request change
	const [internalDirty, setInternalDirty] = useState(false);
	useEffect(() => {
		if (accessToken != null) {
			setLoading(true);
			API.getStudentThesisRequest(accessToken)
				.then((requests) => {
					setRequests(requests);
					setFilteredRequests(requests);
					setLoading(false);
					setInternalDirty(false);
				})
				.catch((err) => {
					handleError(err.message);
					setLoading(false);
					setInternalDirty(false);
				});
		}
	}, [accessToken, internalDirty]);

	useEffect(() => {
		if (requests.length != 0) {
			if (rapidFilter === 'secretary-review') {
				setFilteredRequests(requests.filter((request) => request.status == 0));
			} else if (rapidFilter === 'supervisor-review') {
				setFilteredRequests(requests.filter((request) => request.status == 1));
			} else if (rapidFilter === 'accepted') {
				setFilteredRequests(requests.filter((request) => request.status == 3));
			} else if (rapidFilter === 'rejected') {
				setFilteredRequests(requests.filter((request) => request.status == 2 || request.status == 4));
			} else if (rapidFilter === 'requested-change') {
				setFilteredRequests(requests.filter((request) => request.status == 5));
			}
		}
	}, [rapidFilter, requests]);
	return loading ? (
		<Loading />
	) : (
		<>
			<RapidFilterRequest rapidFilter={rapidFilter} setRapidFilter={setRapidFilter} />
			<Container>
				<Row style={{ marginBottom: 25 }}>
					{filteredRequests.length != 0 ? (
						filteredRequests.map((request) => (
							<RequestCard
								key={request.id}
								request={request}
								setInternalDirty={setInternalDirty}
								setShowModal={setShowModal}
								setMsgModal={setMsgModal}
							/>
						))
					) : (
						<Col style={{ marginTop: 25 }}>
							<p>No request to display</p>
						</Col>
					)}
				</Row>
			</Container>
		</>
	);
};
SecretaryAndProfessorRequest.propTypes = {
	setShowModal: PropTypes.func.isRequired,
	setMsgModal: PropTypes.func.isRequired,
	rapidFilter: PropTypes.string.isRequired,
	setRapidFilter: PropTypes.func.isRequired,
};

export default SecretaryAndProfessorRequest;
