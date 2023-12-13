import 'bootstrap/dist/css/bootstrap.min.css';
import { Row, Col, Card, Table, Button, Container, Offcanvas } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import API from '../API.jsx';
import { useLoading } from '../LoadingContext.jsx';
import Loading from '../components/Loading.jsx';
import DetailsProposalLeftBar from '../components/DetailsProposalLeftBar.jsx';
import dayjs from 'dayjs';
import PropTypes from 'prop-types';

function ProfessorApplicationsThesis({ accessToken, handleError, handleSuccess, isProfessor, date, dirty, setDirty, setShowModal, setMsgModal }) {
	const { loading, setLoading } = useLoading();
	const navigate = useNavigate();
	const [thesis, setThesis] = useState(null);
	const [showDetails, setShowDetails] = useState(false);
	// const [dirty, setDirty] = useState(false);
	const [applicationsThesis, setApplicationsThesis] = useState([]);

	const { id } = useParams();

	const handleClose = () => setShowDetails(false);
	const handleShow = () => setShowDetails(true);

	function unionForid(array) {
		return array.reduce(function (acc, object) {
			const key = object.id;
			if (!acc[key]) {
				acc[key] = [];
			}
			acc[key].push(object);
			return acc;
		}, {});
	}

	useEffect(() => {
		if (accessToken != null) {
			setLoading(true);
			API.getApplications(accessToken)
				.then((app) => {
					const appthesis = unionForid(app);
					setApplicationsThesis(appthesis[id]);
					setLoading(false);
					setDirty(false);
				})
				.catch((err) => {
					handleError(err);
					setLoading(false);
				});
		}
	}, [dirty, accessToken]);

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

	function acceptApplication(idStudent) {
		setShowModal(false);
		const parameters = { thesisID: id, studentID: idStudent };
		API.acceptApplication(parameters, accessToken)
			.then(() => {
				setDirty(true);
				setDirty(true);
				handleSuccess('Application accepted');
			})
			.catch((err) => {
				handleError(err);
			});
	}

	function rejectApplication(idStudent) {
		setShowModal(false);
		const parameters = { thesisID: id, studentID: idStudent };
		API.rejectApplication(parameters, accessToken)
			.then(() => {
				setDirty(true);
				setDirty(true);
				handleError('Application rejected');
			})
			.catch((err) => {
				handleError(err);
			});
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
								<DetailsProposalLeftBar thesis={thesis} isProfessor={isProfessor} fromApplication={true} id={id} />
							</Card>
						</Col>
						<Col md={8} sm={12}>
							<Card style={{ padding: 20 }} className='custom-card'>
								<Row>
									<Col className='d-flex align-items-center d-none d-md-flex'>
										<Button variant='outline-primary' style={{ borderRadius: 50, width: 75 }} onClick={() => navigate('/applications')}>
											<i className='bi bi-arrow-left'></i>
										</Button>
									</Col>
									<Col md={10}>
										<div style={{ fontWeight: 'bold', fontSize: 30 }}>{thesis.title}</div>
									</Col>
								</Row>
								<Row style={{ marginTop: 45 }}>
									<Col lg={2} md={3}>
										<div style={{ fontWeight: 'bold', fontSize: 20 }}> Status: </div>
									</Col>
									<Col lg={3} md={4}>
										{applicationsThesis.filter((app) => app.state == 1).length > 0 ? (
											<Col>
												<span
													className='badge'
													style={{
														backgroundColor: 'rgba(40, 199, 111, 0.2)',
														color: 'rgba(40, 199, 111, 1)',
														padding: '1em 1em',
														borderRadius: '0.25rem',
													}}
												>
													<i className='bi bi-person-check' style={{ fontSize: '16px' }}></i>
												</span>
												<span style={{ color: 'rgba(0, 0, 0, 0.5)', paddingLeft: 8 }}>Assigned</span>
											</Col>
										) : applicationsThesis.filter((app) => app.state == 0).length > 0 ? (
											<Col>
												<span
													className='badge'
													style={{
														backgroundColor: 'rgba(164, 161, 141, 0.2)',
														color: 'rgba(164, 161, 141, 1)',
														padding: '1em 1em',
														borderRadius: '0.25rem',
													}}
												>
													<i className='bi bi-hourglass-split' style={{ fontSize: '16px' }}></i>
												</span>
												<span style={{ color: 'rgba(0, 0, 0, 0.5)', paddingLeft: 8 }}>Pending</span>
											</Col>
										) : dayjs(thesis.expirationDate).isBefore(date ? dayjs(date) : dayjs()) ? (
											<Col>
												<span
													className='badge'
													style={{
														backgroundColor: 'rgba(234, 84, 85, 0.2)',
														color: 'rgba(234, 84, 85)',
														padding: '1em 1em',
														borderRadius: '0.25rem',
													}}
												>
													<i className='bi bi-calendar-x' style={{ fontSize: '16px' }}></i>
												</span>
												<span style={{ color: 'rgba(0, 0, 0, 0.5)', paddingLeft: 8 }}>Expired</span>
											</Col>
										) : applicationsThesis.filter((app) => app.t_state == 0).length > 0 ? (
											<Col>
												<span
													className='badge'
													style={{
														backgroundColor: 'rgba(234, 84, 85, 0.2)',
														color: 'rgba(234, 84, 85)',
														padding: '1em 1em',
														borderRadius: '0.25rem',
													}}
												>
													<i className='bi bi-calendar-x' style={{ fontSize: '16px' }}></i>
												</span>
												<span style={{ color: 'rgba(0, 0, 0, 0.5)', paddingLeft: 8 }}>Archived</span>
											</Col>
										) : (
											<Col>
												<span
													className='badge'
													style={{
														backgroundColor: 'rgba(164, 161, 141, 0.2)',
														color: 'rgba(164, 161, 141, 1)',
														padding: '1em 1em',
														borderRadius: '0.25rem',
													}}
												>
													<i className='bi bi-hourglass-split' style={{ fontSize: '16px' }}></i>
												</span>
												<span style={{ color: 'rgba(0, 0, 0, 0.5)', paddingLeft: 8 }}>Pending</span>
											</Col>
										)}
									</Col>
								</Row>
								<Row style={{ marginTop: 32 }}>
									<Col>
										<div style={{ fontWeight: 'bold', fontSize: 20 }}> List of applications: </div>
									</Col>
								</Row>
								<Row style={{ marginTop: 18 }}>
									<Col>
										<Table responsive hover style={{ textAlign: 'center' }}>
											<thead>
												<tr>
													<th>Student ID</th>
													<th>Name</th>
													<th>Surname</th>
													<th>Email</th>
													<th>Student details</th>
													<th>Status</th>
												</tr>
											</thead>
											<tbody>
												{applicationsThesis != []
													? applicationsThesis.map((app, index) => (
														<tr key={app.id_application}>
															<td>{app.student}</td>
															<td>{app.name}</td>
															<td>{app.surname}</td>
															<td>{app.email}</td>
															<td>
																<Button
																	variant='light'
																	onClick={() => navigate('/applications/proposal/' + id + '/applications/' + app.id_application)}
																>
																	<i className='bi bi-file-earmark-text'></i>
																</Button>
															</td>
															<td>
																{app.state == 1 ? (
																	<span className='badge custom-badge-success'>Assigned</span>
																) : app.state == 2 ? (
																	<span className='badge custom-badge-danger'>Rejected</span>
																) : app.state == 3 ? (
																	<span className='badge custom-badge-warning'>Cancelled</span>
																) : (
																	<div>
																		<Button
																			variant='outline-success'
																			style={{ borderRadius: 100 }}
																			size='sm'
																			onClick={() => {
																				setShowModal(true);
																				setMsgModal({
																					header: 'Accept application',
																					body: `Are you sure you want to accept the application of student ${app.student}? The other pending application will be cancelled`,
																					method: () => acceptApplication(app.student),
																				});
																			}}
																		>
																			<i className='bi bi-check2'></i>
																		</Button>
																		<Button
																			variant='outline-danger'
																			style={{ borderRadius: 100, marginLeft: 8 }}
																			size='sm'
																			onClick={() => {
																				setShowModal(true);
																				setMsgModal({
																					header: 'Reject Application',
																					body: `Are you sure you want to reject the application of student ${app.student}?`,
																					method: () => rejectApplication(app.student),
																				});
																			}}
																		>
																			<i className='bi bi-x-lg'></i>
																		</Button>
																	</div>
																)}
															</td>
														</tr>
													))
													: null}
											</tbody>
										</Table>
									</Col>
								</Row>
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
					<DetailsProposalLeftBar thesis={thesis} isProfessor={isProfessor} />
				</Offcanvas.Body>
			</Offcanvas>
		</>
	);
}

ProfessorApplicationsThesis.propTypes = {
	accessToken: PropTypes.string,
	handleError: PropTypes.func.isRequired,
	handleSuccess: PropTypes.func.isRequired,
	isProfessor: PropTypes.bool.isRequired,
	date: PropTypes.string,
	dirty: PropTypes.bool.isRequired,
	setDirty: PropTypes.func.isRequired,
	setShowModal: PropTypes.func.isRequired,
	setMsgModal: PropTypes.func.isRequired,
};

export default ProfessorApplicationsThesis;
