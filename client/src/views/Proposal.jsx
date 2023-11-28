import 'bootstrap/dist/css/bootstrap.min.css';
import { Row, Col, Card, Image, Button, Container, Toast, ToastContainer, Offcanvas } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import API from '../API.jsx';
import { useLoading } from '../LoadingContext.jsx';
import Loading from '../components/Loading.jsx';
import DetailsProposalLeftBar from '../components/DetailsProposalLeftBar.jsx';

function Proposal(props) {
	const { loading, setLoading } = useLoading();
	const navigate = useNavigate();
	const [thesis, setThesis] = useState(null);
	const [popup, setPopup] = useState(false);
	const [msgAndColor, setMsgAndColor] = useState({ header: '', msg: '', color: '' });
	const [showDetails, setShowDetails] = useState(false);
	const { id } = useParams();
	const { fromHome, setFromHome } = props;

	const handleClose = () => setShowDetails(false);
	const handleShow = () => setShowDetails(true);

	useEffect(() => {
		if (props.accessToken != null) {
			setLoading(true);
			API.getThesisByID(id, props.accessToken)
				.then((thesis) => {
					setThesis(thesis);
				})
				.catch((err) => {
					props.handleError(err);
				})
				.finally(() => {
					setLoading(false);
				});
		}
	}, [props.accessToken]);

	function apply() {
		API.ThesisApply(id, props.accessToken)
			.then(() => {
				setMsgAndColor({ header: 'Application successful', msg: 'Successful application to the thesis ' + thesis.title, color: 'success' });
				setPopup(true);
			})
			.catch(() => {
				setMsgAndColor({
					header: 'Application failed',
					msg: 'You have already sent an application for this thesis or you do not have authorization',
					color: 'danger',
				});
				setPopup(true);
			});
	}

	function handleRedirect() {
		navigate('/');
		// if (fromHome) {
		// 	navigate(-1);
		// } else {
		// 	setFromHome(true);
		// 	navigate('/');
		// }
	}

	return loading ? (
		<Loading />
	) : (
		<>
			<Container style={{ marginTop: 25, marginBottom: 25 }}>
				{thesis == null ? null : (
					<Row>
						<Col md={4} className='d-none d-md-flex'>
							<Card style={{ padding: 20, paddingBottom: 30, position: 'sticky', top: 25 }} className='custom-card'>
								<DetailsProposalLeftBar thesis={thesis} apply={apply} isProfessor={props.isProfessor} />
							</Card>
						</Col>
						<Col>
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
										<div style={{ fontWeight: 'medium', fontSize: 15, marginTop: 15 }}>{thesis.description}</div>
									</Col>
								</Row>
								{thesis.requiredKnowledge == '' ? null : (
									<Row>
										<Col md={12}>
											<div style={{ fontWeight: 'bold', fontSize: 15, marginTop: 15, color: '#E6782B' }}> Required Knowledge </div>
											{thesis.requiredKnowledge}
										</Col>
									</Row>
								)}
								{thesis.notes == '' ? null : (
									<Row>
										<Col md={12}>
											<div style={{ fontWeight: 'bold', fontSize: 15, marginTop: 15, color: '#E6782B' }}> Notes </div>
											<div style={{ fontWeight: 'medium', fontSize: 15, marginTop: 15 }}>{thesis.notes}</div>
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
					<DetailsProposalLeftBar thesis={thesis} apply={apply} isProfessor={props.isProfessor} />
				</Offcanvas.Body>
			</Offcanvas>

			<ToastContainer style={{ position: 'fixed', top: 20, right: 20, zIndex: 10 }} className='p-3'>
				<Toast bg={msgAndColor.color} onClose={() => setPopup(false)} show={popup} delay={5000} autohide>
					<Toast.Header>
						<strong className='me-auto'>{msgAndColor.header}</strong>
					</Toast.Header>
					<Toast.Body>{msgAndColor.msg}</Toast.Body>
				</Toast>
			</ToastContainer>
		</>
	);
}

export default Proposal;
