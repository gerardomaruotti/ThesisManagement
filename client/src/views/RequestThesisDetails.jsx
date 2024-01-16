import { useEffect, useState, useContext } from 'react';
import UserContext from '../contexts/UserContext';
import API from '../API';
import PropTypes from 'prop-types';
import { useLoading } from '../contexts/LoadingContext.jsx';
import Loading from '../components/Loading.jsx';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, Card, Col, Container, Row, Offcanvas } from 'react-bootstrap';
import DetailsRequestLeftBar from '../components/DetailsRequestLeftBar.jsx';
import { handleError } from '../utils/toastHandlers.js';

const RequestThesisDetails = ({ setShowModal, setMsgModal }) => {
	const { accessToken, isSecretary } = useContext(UserContext);
	const { loading, setLoading } = useLoading();
	const { id } = useParams();
	const navigate = useNavigate();
	const [request, setRequest] = useState({}); // 0 pending, 1 accepted by secretary, 2 rejected by secretary, 3 accepted by professor, 4 rejected by professor, 5 request change
	const [internalDirty, setInternalDirty] = useState(false);
	const [showDetails, setShowDetails] = useState(false);

	const handleClose = () => setShowDetails(false);
	const handleShow = () => setShowDetails(true);

	function handleBack() {
		isSecretary ? navigate('/') : navigate('/requests');
	}

	useEffect(() => {
		if (accessToken != null) {
			setLoading(true);
			API.getStudentThesisRequest(accessToken)
				.then((requests) => {
					setRequest(requests.find((request) => request.id == id));
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

	return loading ? (
		<Loading />
	) : (
		<>
			<Container style={{ marginTop: 25, marginBottom: 25 }}>
				{request == null ? null : (
					<Row style={{ display: 'flex', alignItems: 'start' }}>
						<Col md={4} className='d-none d-md-flex'>
							<Card style={{ padding: 20, position: 'sticky', top: 25 }} className='custom-card'>
								<DetailsRequestLeftBar request={request} setInternalDirty={setInternalDirty} setMsgModal={setMsgModal} setShowModal={setShowModal} />
							</Card>
						</Col>
						<Col md={8}>
							<Card style={{ padding: 20 }} className='custom-card'>
								<Row>
									<Col className='d-flex align-items-center d-none d-md-flex'>
										<Button variant='outline-primary' style={{ borderRadius: 50, width: 75 }} onClick={handleBack}>
											<i className='bi bi-arrow-left'></i>
										</Button>
									</Col>
									<Col md={10}>
										<div style={{ fontWeight: 'bold', fontSize: 30 }}>{request.title}</div>
									</Col>
								</Row>
								<Row>
									<Col md={12}>
										<div style={{ fontWeight: 'bold', fontSize: 15, marginTop: 15, color: '#E6782B' }}> Description </div>
										<div style={{ fontWeight: 'medium', fontSize: 15, marginTop: 15, whiteSpace: 'pre-line' }}>{request.description}</div>
									</Col>
								</Row>
								{!request.notes ? null : (
									<Row>
										<Col md={12}>
											<div style={{ fontWeight: 'bold', fontSize: 15, marginTop: 15, color: '#E6782B' }}>Changes requested by the supervisor </div>
											<div style={{ fontWeight: 'medium', fontSize: 15, marginTop: 15, whiteSpace: 'pre-line' }}>{request.notes}</div>
										</Col>
									</Row>
								)}
								<Col className='d-md-none' style={{ textAlign: 'center', marginTop: 20 }}>
									<Button variant='primary' onClick={handleShow}>
										Show more details
									</Button>
								</Col>
							</Card>
						</Col>
					</Row>
				)}
			</Container>

			<Offcanvas show={showDetails} onHide={handleClose}>
				<Offcanvas.Header closeButton>
					<Offcanvas.Title>Details</Offcanvas.Title>
				</Offcanvas.Header>
				<Offcanvas.Body>
					<DetailsRequestLeftBar request={request} setInternalDirty={setInternalDirty} setMsgModal={setMsgModal} setShowModal={setShowModal} />
				</Offcanvas.Body>
			</Offcanvas>
		</>
	);
};

RequestThesisDetails.propTypes = {
	setShowModal: PropTypes.func.isRequired,
	setMsgModal: PropTypes.func.isRequired,
};

export default RequestThesisDetails;
