import { useState, useEffect, useContext } from 'react';
import UserContext from '../contexts/UserContext';
import image from '../assets/default_image_profile.jpg';
import { useLoading } from '../contexts/LoadingContext.jsx';
import { handleError, handleSuccess } from '../utils/toastHandlers.js';
import { Container, Card, Row, Col, Image, Button, Table, Offcanvas } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { Color } from '../constants/colors.js';
import API from '../API.jsx';
import PropTypes from 'prop-types';
import Loading from '../components/Loading.jsx';

function StudentApplicationInfo({ setShowModal, setMsgModal, setDirtyParent }) {
	const { accessToken } = useContext(UserContext);
	const [showDetails, setShowDetails] = useState(false);
	const handleClose = () => setShowDetails(false);
	const handleShow = () => setShowDetails(true);
	const navigate = useNavigate();
	const { loading, setLoading } = useLoading();
	const { id, idApplication } = useParams();
	const [studentInfo, setStudentInfo] = useState(null);
	const [dirty, setDirty] = useState(false);

	function acceptApplication(idStudent) {
		setShowModal(false);
		const parameters = { thesisID: id, studentID: idStudent };
		API.acceptApplication(parameters, accessToken)
			.then(() => {
				setDirty(true);
				setDirtyParent(true);
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
				setDirtyParent(true);
				handleError('Application rejected');
			})
			.catch((err) => {
				handleError(err);
			});
	}

	useEffect(() => {
		if (accessToken != null) {
			setLoading(true);
			API.getStudentApplicationInfo(accessToken, idApplication)
				.then((studentInfo) => {
					let cfu = 0;
					let avg = 0;
					studentInfo.exams.forEach((exam) => {
						cfu += Number(exam.cfu);
						avg += Number(exam.grade) * Number(exam.cfu);
					});
					studentInfo.cfu = cfu;
					studentInfo.avg = (avg / cfu).toFixed(2);
					setStudentInfo(studentInfo);
				})
				.catch((err) => {
					handleError(err);
				})
				.finally(() => {
					setLoading(false);
				});
		}
	}, [accessToken, dirty]);

	const LeftBarDetails = () => {
		return studentInfo == null ? null : (
			<>
				<div style={{ textAlign: 'center' }}>
					<Image src={image} rounded style={{ width: 150 }} />
				</div>
				<div style={{ textAlign: 'center', marginTop: 15 }}>
					<div style={{ fontWeight: 'medium', fontSize: 17 }}>{studentInfo.name + ' ' + studentInfo.surname}</div>
				</div>
				<Row style={{ marginTop: 25 }}>
					<Col style={{ textAlign: 'center' }}>
						<div className='d-flex align-items-center justify-content-center'>
							<div className='text-center' style={{ float: 'right' }}>
								<span
									className='badge'
									style={{
										backgroundColor: 'rgba(230, 120, 43, 0.1)',
										color: Color.secondary,
										padding: '1em 1em',
										borderRadius: '0.25rem',
									}}
								>
									<i className='bi bi-building-check' style={{ fontSize: '16px' }}></i>
								</span>
							</div>
							<div style={{ paddingLeft: 8, textAlign: 'left' }}>
								<div style={{ fontSize: 15 }}>CFU</div>
								<div style={{ fontSize: 12 }} className='text-muted'>
									{studentInfo.cfu}
								</div>
							</div>
						</div>
					</Col>
					<Col style={{ textAlign: 'center' }}>
						<div className='d-flex align-items-center justify-content-center'>
							<div className='text-center'>
								<span
									className='badge'
									style={{
										backgroundColor: 'rgba(230, 120, 43, 0.1)',
										color: Color.secondary,
										padding: '1em 1em',
										borderRadius: '0.25rem',
									}}
								>
									<i className='bi bi-building-check' style={{ fontSize: '16px' }}></i>
								</span>
							</div>
							<div style={{ paddingLeft: 8, textAlign: 'left' }}>
								<div style={{ fontSize: 15 }}>AVG</div>
								<div style={{ fontSize: 12 }} className='text-muted'>
									{studentInfo.avg}
								</div>
							</div>
						</div>
					</Col>
				</Row>

				<div style={{ marginTop: 25 }}>
					<div style={{ fontWeight: 'medium', fontSize: 17 }}>Details</div>
					<hr />
				</div>
				<div>
					<span style={{ fontSize: 15, marginRight: 8 }}>Student ID:</span>
					<span style={{ fontSize: 14 }} className='text-muted'>
						{studentInfo.id}
					</span>
				</div>
				<div>
					<span style={{ fontSize: 15, marginRight: 8 }}>Name:</span>
					<span style={{ fontSize: 14 }} className='text-muted'>
						{studentInfo.name}
					</span>
				</div>
				<div>
					<span style={{ fontSize: 15, marginRight: 8 }}>Surname:</span>
					<span style={{ fontSize: 14 }} className='text-muted'>
						{studentInfo.surname}
					</span>
				</div>
				<div>
					<span style={{ fontSize: 15, marginRight: 8 }}>Email:</span>
					<span style={{ fontSize: 14 }} className='text-muted'>
						{studentInfo.email}
					</span>
				</div>
				<div>
					<span style={{ fontSize: 15, marginRight: 8 }}>Application status:</span>
					{studentInfo.state == 0 ? (
						<span className='badge custom-badge-pending'>Pending</span>
					) : studentInfo.state == 1 ? (
						<span className='badge custom-badge-success'>Assigned</span>
					) : studentInfo.state == 2 ? (
						<span className='badge custom-badge-danger'>Rejected</span>
					) : studentInfo.state == 3 ? (
						<span className='badge custom-badge-warning'>Cancelled</span>
					) : null}
				</div>
				{studentInfo.state == 0 ? (
					<Row style={{ marginTop: 25, textAlign: 'center' }}>
						<Col xs={6}>
							<Button
								variant='outline-success'
								style={{ borderRadius: 20 }}
								onClick={() => {
									setShowModal(true);
									setMsgModal({
										header: 'Accept application',
										body: `Are you sure you want to accept the application of student ${studentInfo.id}? The other pending application will be cancelled`,
										method: () => acceptApplication(studentInfo.id),
									});
								}}
							>
								<i className='bi bi-check2' style={{ paddingRight: 5 }}></i>
								Accept
							</Button>
						</Col>
						<Col xs={6}>
							<Button
								variant='outline-danger'
								style={{ borderRadius: 20 }}
								onClick={() => {
									setShowModal(true);
									setMsgModal({
										header: 'Reject Application',
										body: `Are you sure you want to reject the application of student ${studentInfo.id}?`,
										method: () => rejectApplication(studentInfo.id),
									});
								}}
							>
								<i className='bi bi-x-lg' style={{ paddingRight: 5 }}></i>
								Reject
							</Button>
						</Col>
					</Row>
				) : null}
			</>
		);
	};

	return loading ? (
		<Loading />
	) : studentInfo == null ? null : (
		<>
			<Container style={{ marginTop: 25, marginBottom: 25 }}>
				<Row style={{ display: 'flex', alignItems: 'start' }}>
					<Col md={4} style={{ position: 'sticky', top: 25 }}>
						<Card style={{ padding: 20 }} className='custom-card d-none d-md-flex'>
							<LeftBarDetails />
						</Card>
					</Col>
					<Col md={8}>
						<Card style={{ padding: 20 }} className='custom-card'>
							<Row>
								<Col xs={6}>
									<Button variant='outline-primary' style={{ borderRadius: 50, width: 75 }} onClick={() => navigate('/applications/proposal/' + id)}>
										<i className='bi bi-arrow-left'></i>
									</Button>
								</Col>
								<Col xs={6} className='d-md-none'>
									<Button variant='primary' onClick={handleShow} style={{ float: 'right' }}>
										Show more details
									</Button>
								</Col>
							</Row>
							<Row style={{ marginTop: 32 }}>
								<Col>
									<div style={{ fontWeight: 'bold', fontSize: 20 }}> List of exams: </div>
								</Col>
							</Row>
							{studentInfo.exams.length != 0 ? (
								<Table responsive hover>
									<thead>
										<tr>
											<th>Course code</th>
											<th>Course name</th>
											<th>Date</th>
											<th>CFU</th>
											<th>Mark</th>
										</tr>
									</thead>
									<tbody>
										{studentInfo.exams.map((exam) => (
											<tr key={exam.cod_course}>
												<td>{exam.cod_course}</td>
												<td>{exam.title_course}</td>
												<td>{exam.date}</td>
												<td>{exam.cfu}</td>
												<td>{exam.grade}</td>
											</tr>
										))}
									</tbody>
								</Table>
							) : (
								<p>No exams passed</p>
							)}

							<Row style={{ marginTop: 32 }}>
								<Col>
									<div style={{ fontWeight: 'bold', fontSize: 20 }}> Curriculum vitae: </div>
								</Col>
							</Row>
							{studentInfo.cv == null ? (
								<p>No CV uploaded</p>
							) : (
								<embed src={`http://localhost:3001/${studentInfo.cv}?${new Date().getTime()}`} type='application/pdf' height={'500px'} />
							)}
						</Card>
					</Col>
				</Row>
			</Container>

			<Offcanvas show={showDetails} onHide={handleClose}>
				<Offcanvas.Header closeButton>
					<Offcanvas.Title>Details</Offcanvas.Title>
				</Offcanvas.Header>
				<Offcanvas.Body>
					<LeftBarDetails />
				</Offcanvas.Body>
			</Offcanvas>
		</>
	);
}

StudentApplicationInfo.propTypes = {
	setShowModal: PropTypes.func.isRequired,
	setMsgModal: PropTypes.func.isRequired,
	setDirtyParent: PropTypes.func.isRequired,
};

export default StudentApplicationInfo;
