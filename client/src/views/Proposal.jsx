import 'bootstrap/dist/css/bootstrap.min.css';
import { Row, Col, Card, Button, Container, Form, Offcanvas, Modal } from 'react-bootstrap';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import API from '../API.jsx';
import { useLoading } from '../LoadingContext.jsx';
import Loading from '../components/Loading.jsx';
import DetailsProposalLeftBar from '../components/DetailsProposalLeftBar.jsx';
import PropTypes from 'prop-types';
import ModalWithUpload from '../components/ModalWithUpload.jsx';

function Proposal({ accessToken, handleError, handleSuccess, isProfessor, applications, hasApplied, setDirty }) {
	const { loading, setLoading } = useLoading();
	const navigate = useNavigate();
	const [thesis, setThesis] = useState(null);
	const [showDetails, setShowDetails] = useState(false);
	const { id } = useParams();
	const location = useLocation();
	const [showModal, setShowModal] = useState(false);
	const [cv, setCv] = useState(null);

	const handleClose = () => setShowDetails(false);
	const handleShow = () => setShowDetails(true);

	useEffect(() => {
		if (accessToken != null) {
			setLoading(true);
			API.getThesisByID(id, accessToken)
				.then((thesis) => {
					setThesis(thesis);
				})
				.catch((err) => {
					handleError(err);
				})
				.finally(() => {
					setLoading(false);
				});
		}
	}, [accessToken]);

	function apply(event) {
		setShowModal(false);
		const formData = new FormData();
		formData.append('file', cv);
		API.ThesisApply(id, accessToken, cv ? formData : null)
			.then(() => {
				setCv(null);
				handleSuccess('Application accepted');
				setDirty(true);
			})
			.catch((err) => {
				setCv(null);
				handleError(err);
			});
	}

	function handleRedirect() {
		const fromHome = location.state?.fromHome;

		if (fromHome) {
			navigate(-1);
		} else {
			navigate('/');
		}
	}

	return loading ? (
		<Loading />
	) : (
		<>
			<Container style={{ marginTop: 25, marginBottom: 25 }}>
				{thesis == null ? null : (
					<Row style={{ display: 'flex', alignItems: 'start' }}>
						<Col md={4} className='d-none d-md-flex'>
							<Card style={{ padding: 20, position: 'sticky', top: 25 }} className='custom-card'>
								<DetailsProposalLeftBar
									id={id}
									thesis={thesis}
									apply={() => setShowModal(true)}
									isProfessor={isProfessor}
									applications={applications}
									hasApplied={hasApplied}
								/>
							</Card>
						</Col>
						<Col md={8}>
							<Card style={{ padding: 20 }} className='custom-card'>
								<Row>
									<Col className='d-flex align-items-center d-none d-md-flex'>
										<Button variant='outline-primary' style={{ borderRadius: 50, width: 75 }} onClick={handleRedirect}>
											<i className='bi bi-arrow-left'></i>
										</Button>
									</Col>
									<Col md={10}>
										<div style={{ fontWeight: 'bold', fontSize: 30 }}>{thesis.title}</div>
									</Col>
								</Row>
								<Row>
									<Col md={12}>
										<div style={{ fontWeight: 'bold', fontSize: 15, marginTop: 15, color: '#E6782B' }}> Description </div>
										<div style={{ fontWeight: 'medium', fontSize: 15, marginTop: 15, whiteSpace: 'pre-line' }}>{thesis.description}</div>
									</Col>
								</Row>
								{thesis.requiredKnowledge == '' ? null : (
									<Row>
										<Col md={12}>
											<div style={{ fontWeight: 'bold', fontSize: 15, marginTop: 15, color: '#E6782B' }}> Required Knowledge </div>
											<div style={{ fontWeight: 'medium', fontSize: 15, marginTop: 15, whiteSpace: 'pre-line' }}>{thesis.requiredKnowledge}</div>
										</Col>
									</Row>
								)}
								{thesis.notes == '' ? null : (
									<Row>
										<Col md={12}>
											<div style={{ fontWeight: 'bold', fontSize: 15, marginTop: 15, color: '#E6782B' }}> Notes </div>
											<div style={{ fontWeight: 'medium', fontSize: 15, marginTop: 15, whiteSpace: 'pre-line' }}>{thesis.notes}</div>
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
					<DetailsProposalLeftBar id={id} thesis={thesis} apply={() => setShowModal(true)} isProfessor={isProfessor} applications={applications} />
				</Offcanvas.Body>
			</Offcanvas>

			<ModalWithUpload
				showModal={showModal}
				setShowModal={setShowModal}
				apply={apply}
				setCv={setCv}
			/>
		</>
	);
}

Proposal.propTypes = {
	accessToken: PropTypes.string,
	handleError: PropTypes.func.isRequired,
	handleSuccess: PropTypes.func.isRequired,
	isProfessor: PropTypes.bool.isRequired,
	applications: PropTypes.array.isRequired,
	hasApplied: PropTypes.bool.isRequired,
	setDirty: PropTypes.func.isRequired,
};

export default Proposal;
