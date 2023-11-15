import 'bootstrap/dist/css/bootstrap.min.css';
import { Row, Col, Card, Image, Button, Container } from 'react-bootstrap';
import { Color } from '../constants/colors.js';
import Avatar from '../assets/avatar.svg';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import API from '../API.jsx';

function Proposal(props) {
	const navigate = useNavigate();
	const [thesis, setThesis] = useState({});
	const { id } = useParams();

	useEffect(() => {
		API.getThesisByID(id, props.accessToken)
			.then((thesis) => {
				setThesis(thesis);
				console.log(thesis);
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);
	return (
		<Container style={{ marginTop: 25 }}>
			<Row>
				<Col md={4}>
					<Card style={{ padding: 20, paddingBottom: 30, position: 'sticky', top: 25 }} className='custom-card'>
						<Row>
							<Col md={12}>
								<div style={{ fontWeight: 'medium', fontSize: 15, marginTop: 15 }}> Supervisor </div>
								<div style={{ fontWeight: 'medium', fontSize: 15, marginTop: 15 }}>
									<Image style={{ height: 38, width: 38 }} src={Avatar} roundedCircle />
									<span style={{ marginLeft: 15, color: 'rgba(0, 0, 0, 0.8)' }}>{thesis.supervisor.name + " " + thesis.supervisor.surname}</span>
								</div>
							</Col>
							<Col md={12}>
								<div style={{ fontWeight: 'medium', fontSize: 15, marginTop: 15 }}> Co-Supervisors </div>
								<div style={{ fontWeight: 'medium', fontSize: 15, marginTop: 15 }} >
									{thesis.coSupervisors.map((coSupervisor) => (
										<>
											<Image style={{ height: 38, width: 38 }} src={Avatar} roundedCircle />
											<span style={{ marginLeft: 15, color: 'rgba(0, 0, 0, 0.8)' }}>{coSupervisor.name + " " + coSupervisor.surname}</span>
										</>
									))}

								</div>
							</Col>
							<Col md={12}>
								<div style={{ fontWeight: 'medium', fontSize: 15, marginTop: 15 }}> Types </div>
								<div style={{ fontWeight: 'medium', fontSize: 15, marginTop: 15 }}>
									<span
										className='badge'
										style={{ backgroundColor: 'rgba(230, 120, 43, 0.1)', color: Color.secondary, padding: '1em 1em', borderRadius: '0.25rem' }}
									>
										<i className="bi bi-building-check" style={{ fontSize: '16px' }}></i>
									</span>
									<span style={{ marginLeft: 8, marginRight: 24, color: 'rgba(0, 0, 0, 0.5)' }}>In Company</span>

									<span
										className='badge'
										style={{ backgroundColor: 'rgba(230, 120, 43, 0.1)', color: Color.secondary, padding: '1em 1em', borderRadius: '0.25rem' }}
									>
										<i className="bi bi-globe-americas" style={{ fontSize: '16px' }}></i>
									</span>
									<span style={{ marginLeft: 8, color: 'rgba(0, 0, 0, 0.5)' }}>Abroad</span>
								</div>
							</Col>
							<Col md={12}>
								<div style={{ fontWeight: 'medium', fontSize: 15, marginTop: 15 }}> Level & CdS/Programmes </div>
								<div style={{ fontWeight: 'medium', fontSize: 15, marginTop: 15 }}>
									<span
										className='badge'
										style={{ backgroundColor: 'rgba(230, 120, 43, 0.1)', color: Color.secondary, padding: '1em 1em', borderRadius: '0.25rem' }}
									>
										<i className="bi bi-mortarboard-fill" style={{ fontSize: '16px' }}></i>
									</span>
									<span style={{ marginLeft: 8, color: 'rgba(0, 0, 0, 0.5)' }}>MSc in Computer Engineering</span>
								</div>
							</Col>
							<Col md={12}>
								<div style={{ fontWeight: 'medium', fontSize: 15, marginTop: 15 }}> Groups </div>
								<div style={{ fontWeight: 'medium', fontSize: 15, marginTop: 15 }}>
									<span
										className='badge'
										style={{ backgroundColor: 'rgba(230, 120, 43, 0.1)', color: Color.secondary, padding: '1em 1em', borderRadius: '0.25rem' }}
									>
										<i className="bi bi-people" style={{ fontSize: '16px' }}></i>
									</span>
									<span style={{ marginLeft: 8, color: 'rgba(0, 0, 0, 0.5)' }}>DAUIN - GR-13 - METODI FORMALI - FM</span>
								</div>
							</Col>
							<Col md={12}>
								<div style={{ fontWeight: 'medium', fontSize: 15, marginTop: 15 }}> Expiration Date </div>
								<div style={{ fontWeight: 'medium', fontSize: 15, marginTop: 15 }}>
									<span
										className='badge'
										style={{ backgroundColor: 'rgba(230, 120, 43, 0.1)', color: Color.secondary, padding: '1em 1em', borderRadius: '0.25rem' }}
									>
										<i className="bi bi-calendar3" style={{ fontSize: '16px' }}></i>
									</span>
									<span style={{ marginLeft: 8, color: 'rgba(0, 0, 0, 0.5)' }}>{thesis.expirationDate}</span>
								</div>
							</Col>
							<Col md={12}>
								<div style={{ fontWeight: 'medium', fontSize: 15, marginTop: 15 }}> Keywords </div>
								<div style={{ fontWeight: 'semi-bold', fontSize: 14, marginTop: 15 }}>
									<span
										className='badge'
										style={{
											backgroundColor: 'rgba(230, 120, 43, 0.1)',
											color: Color.secondary,
											padding: '0.5em 1.2em',
											borderRadius: '0.25rem',
											marginRight: 10,
										}}
									>
										RTL DEBUGGING
									</span>
									<span
										className='badge'
										style={{
											backgroundColor: 'rgba(92, 234, 201, 0.1)',
											color: 'rgb(92, 234, 201)',
											padding: '0.5em 1.2em',
											borderRadius: '0.25rem',
											marginRight: 10,
										}}
									>
										EXPLAINABLE AI
									</span>
									<span
										className='badge'
										style={{
											backgroundColor: 'rgba(115, 103, 240, 0.1)',
											color: 'rgb(115, 103, 240)',
											padding: '0.5em 1.2em',
											borderRadius: '0.25rem',
											marginRight: 10,
										}}
									>
										PROGRAM REPAIR
									</span>
								</div>
							</Col>
							<Col md={12} className='d-flex justify-content-center'>
								<div style={{ marginTop: 20, textAlign: 'center' }}>
									<Button variant='primary' style={{ width: 130 }}>
										Apply
									</Button>
								</div>
							</Col>
						</Row>
					</Card>
				</Col>
				<Col>
					<Card style={{ padding: 20, cursor: 'pointer' }} className='custom-card'>
						<Row>
							<Col className='d-flex align-items-center'>
								<Button variant='outline-primary' style={{ borderRadius: 50, width: 75 }} onClick={() => navigate('/professor')}>
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
								<div style={{ fontWeight: 'medium', fontSize: 15, marginTop: 15 }}>
									{thesis.description}
								</div>
							</Col>
						</Row>
						{thesis.requiredKnowledge == '' ? null :
							<Row>
								<Col md={12}>
									<div style={{ fontWeight: 'bold', fontSize: 15, marginTop: 15, color: '#E6782B' }}> Required Knowledge </div>
									{thesis.requiredKnowledge}
								</Col>
							</Row>
						}
						{thesis.notes == '' ? null :
							<Row>
								<Col md={12}>
									<div style={{ fontWeight: 'bold', fontSize: 15, marginTop: 15, color: '#E6782B' }}> Notes </div>
									<div style={{ fontWeight: 'medium', fontSize: 15, marginTop: 15 }}>
										{thesis.notes}
									</div>
								</Col>
							</Row>}
					</Card>
				</Col>
			</Row>
		</Container>
	);
}

export default Proposal;
