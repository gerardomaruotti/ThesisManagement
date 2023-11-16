import 'bootstrap/dist/css/bootstrap.min.css';
import { Row, Col, Card, Image, Button, Container, Toast, ToastContainer } from 'react-bootstrap';
import { Color } from '../constants/colors.js';
import Avatar from '../assets/avatar.svg';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import API from '../API.jsx';

function Proposal(props) {
	const navigate = useNavigate();
	const [thesis, setThesis] = useState(null);
	const [popup, setPopup] = useState(false);
	const [msgAndColor, setMsgAndColor] = useState({ header: '', msg: '', color: '' });
	const { id } = useParams();
	const colors = [
		{
			backgroundColor: 'rgba(246, 191, 84, 0.1)',
			color: 'rgb(246, 191, 84)',
		},
		{
			backgroundColor: 'rgba(0, 79, 72, 0.1)',
			color: 'rgb(0, 79, 72)',
		},
		{
			backgroundColor: 'rgba(147, 115, 159, 0.1)',
			color: 'rgb(147, 115, 159)',
		},
		{
			backgroundColor: 'rgba(136, 205, 212, 0.1)',
			color: 'rgb(136, 205, 212)',
		},
		{
			backgroundColor: 'rgba(238, 164, 155, 0.1)',
			color: 'rgb(238, 164, 155)',
		},
		{
			backgroundColor: 'rgba(89, 56, 80, 0.1)',
			color: 'rgb(89, 56, 80)',
		},
	];

	useEffect(() => {
		API.getThesisByID(id, props.accessToken)
			.then((thesis) => {
				setThesis(thesis);
				// console.log(thesis);
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);

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

	return (
		<>
			<Container style={{ marginTop: 25 }}>
				{thesis == null ? null : (
					<Row>
						<Col md={4}>
							<Card style={{ padding: 20, paddingBottom: 30, position: 'sticky', top: 25 }} className='custom-card'>
								<Row>
									<Col md={12}>
										<div style={{ fontWeight: 'medium', fontSize: 15, marginTop: 15 }}> Supervisor </div>
										<div style={{ fontWeight: 'medium', fontSize: 15, marginTop: 15 }}>
											<Image style={{ height: 38, width: 38 }} src={Avatar} roundedCircle />
											<span style={{ marginLeft: 15, color: 'rgba(0, 0, 0, 0.8)' }}>{thesis.supervisor.name + ' ' + thesis.supervisor.surname}</span>
										</div>
									</Col>
									{thesis.coSupervisors.length > 1 ? (
										<Col md={12}>
											<div style={{ fontWeight: 'medium', fontSize: 15, marginTop: 15 }}> Co-Supervisors </div>
											<div style={{ fontWeight: 'medium', fontSize: 15, marginTop: 15 }}>
												{thesis.coSupervisors.map((coSupervisor, index) => (
													<div key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: 15 }}>
														<Image style={{ height: 38, width: 38 }} src={Avatar} roundedCircle />
														<span style={{ marginLeft: 15, color: 'rgba(0, 0, 0, 0.8)', marginRight: 15 }}>
															{coSupervisor.name + ' ' + coSupervisor.surname}
														</span>
													</div>
												))}
											</div>
										</Col>
									) : null}
									{thesis.types.length > 1 ? (
										<Col md={12}>
											<div style={{ fontWeight: 'medium', fontSize: 15, marginTop: 15 }}> Types </div>
											<div style={{ fontWeight: 'medium', fontSize: 15, marginTop: 15 }}>
												{thesis.types.map((type, index) => (
													<div key={index} style={{ fontWeight: 'medium', fontSize: 15, marginTop: 15 }}>
														<span
															className='badge'
															style={{
																backgroundColor: 'rgba(230, 120, 43, 0.1)',
																color: Color.secondary,
																padding: '1em 1em',
																borderRadius: '0.25rem',
															}}
														>
															{type == 'IN COMPANY' ? (
																<i className='bi bi-building-check' style={{ fontSize: '16px' }}></i>
															) : type == 'ABROAD' ? (
																<i className='bi bi-globe-americas' style={{ fontSize: '16px' }}></i>
															) : (
																<i className='bi bi-tag' style={{ fontSize: '16px' }}></i>
															)}
														</span>
														<span style={{ marginLeft: 8, color: 'rgba(0, 0, 0, 0.5)' }}>{type}</span>
													</div>
												))}
											</div>
										</Col>
									) : null}
									<Col md={12}>
										<div style={{ fontWeight: 'medium', fontSize: 15, marginTop: 15 }}> Level & CdS/Programmes </div>
										<div style={{ fontWeight: 'medium', fontSize: 15, marginTop: 15 }}>
											<span
												className='badge'
												style={{ backgroundColor: 'rgba(230, 120, 43, 0.1)', color: Color.secondary, padding: '1em 1em', borderRadius: '0.25rem' }}
											>
												<i className='bi bi-mortarboard-fill' style={{ fontSize: '16px' }}></i>
											</span>
											<span style={{ marginLeft: 8, color: 'rgba(0, 0, 0, 0.5)' }}>{thesis.level + ' ' + thesis.cds}</span>
										</div>
									</Col>
									{thesis.groups.length > 0 ? (
										<Col md={12}>
											<div style={{ fontWeight: 'medium', fontSize: 15, marginTop: 15 }}> Groups </div>
											{thesis.groups.map((group, index) => (
												<div key={index} style={{ fontWeight: 'medium', fontSize: 15, marginTop: 15 }}>
													<span
														className='badge'
														style={{
															backgroundColor: 'rgba(230, 120, 43, 0.1)',
															color: Color.secondary,
															padding: '1em 1em',
															borderRadius: '0.25rem',
														}}
													>
														<i className='bi bi-people' style={{ fontSize: '16px' }}></i>
													</span>
													<span style={{ marginLeft: 8, color: 'rgba(0, 0, 0, 0.5)' }}>{group.cod_group + ' ' + group.group_name}</span>
												</div>
											))}
										</Col>
									) : null}
									<Col md={12}>
										<div style={{ fontWeight: 'medium', fontSize: 15, marginTop: 15 }}> Expiration Date </div>
										<div style={{ fontWeight: 'medium', fontSize: 15, marginTop: 15 }}>
											<span
												className='badge'
												style={{ backgroundColor: 'rgba(230, 120, 43, 0.1)', color: Color.secondary, padding: '1em 1em', borderRadius: '0.25rem' }}
											>
												<i className='bi bi-calendar3' style={{ fontSize: '16px' }}></i>
											</span>
											<span style={{ marginLeft: 8, color: 'rgba(0, 0, 0, 0.5)' }}>{thesis.expirationDate}</span>
										</div>
									</Col>
									{thesis.keywords.length > 0 ? (
										<Col md={12}>
											<div style={{ fontWeight: 'medium', fontSize: 15, marginTop: 15 }}> Keywords </div>
											<div style={{ fontWeight: 'semi-bold', fontSize: 14, marginTop: 15 }}>
												{thesis.keywords.map((keyword, index) => (
													<span
														key={index}
														className='badge'
														style={{
															backgroundColor: colors[index % 6].backgroundColor,
															color: colors[index % 6].color,
															padding: '0.5em 1.2em',
															borderRadius: '0.25rem',
															marginRight: 10,
														}}
													>
														{keyword}
													</span>
												))}
											</div>
										</Col>
									) : null}
									{props.isProfessor ? null : (
										<Col md={12} className='d-flex justify-content-center'>
											<div style={{ marginTop: 20, textAlign: 'center' }}>
												<Button variant='primary' style={{ width: 130 }} onClick={apply}>
													Apply
												</Button>
											</div>
										</Col>
									)}
								</Row>
							</Card>
						</Col>
						<Col>
							<Card style={{ padding: 20, cursor: 'pointer' }} className='custom-card'>
								<Row>
									<Col className='d-flex align-items-center'>
										<Button
											variant='outline-primary'
											style={{ borderRadius: 50, width: 75 }}
											onClick={() => navigate('/')
											}
										>
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
							</Card>
						</Col>
					</Row>
				)}
			</Container >

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
