import 'bootstrap/dist/css/bootstrap.min.css';
import { Row, Col, Card, Image, Button, Container } from 'react-bootstrap';
import { Color } from '../constants/colors.js';
import Avatar from '../assets/avatar.svg';
import { useNavigate } from 'react-router-dom';

function Proposal(props) {
	const navigate = useNavigate();
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
									<span style={{ marginLeft: 15, color: 'rgba(0, 0, 0, 0.8)' }}>Stefano Quer</span>
								</div>
							</Col>
							<Col md={12}>
								<div style={{ fontWeight: 'medium', fontSize: 15, marginTop: 15 }}> Co-Supervisors </div>
								<div style={{ fontWeight: 'medium', fontSize: 15, marginTop: 15 }}>
									<Image style={{ height: 38, width: 38 }} src={Avatar} roundedCircle />
									<span style={{ marginLeft: 15, color: 'rgba(0, 0, 0, 0.8)' }}>Debjit Pal</span>
									<Image style={{ height: 38, width: 38, marginLeft: 15 }} src={Avatar} roundedCircle />
									<span style={{ marginLeft: 15, color: 'rgba(0, 0, 0, 0.8)' }}>Marco Rossi</span>
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
									<span style={{ marginLeft: 8, color: 'rgba(0, 0, 0, 0.5)' }}>31/03/2024</span>
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
								<div style={{ fontWeight: 'bold', fontSize: 30 }}>ARMADA: A Framework for Automatic Hardware Design Debugging and Repair</div>
							</Col>
						</Row>
						<Row>
							<Col md={12}>
								<div style={{ fontWeight: 'bold', fontSize: 15, marginTop: 15, color: '#E6782B' }}> Description </div>
								<div style={{ fontWeight: 'medium', fontSize: 15, marginTop: 15 }}>
									<p>
										In recent years, there has been an exponential growth in the size and complexity of System-on-Chip (SoC) designs targeting different specialized applications. The cost of an undetected bug in these systems is much higher than in traditional processor systems, as it may imply the loss of property or life. The problem is further exacerbated by the ever-shrinking time-to-market and ever-increasing design complexity and demand to churn out billions of hardware devices. Despite decades of research in simulation and formal methods for debugging and verifying pre-silicon register transfer level (RTL) design, RTL debugging is still one of the most time-consuming and resource-intensive processes in the contemporary hardware design cycle. Current industrial practice primarily uses regression techniques and what-if analysis for debugging. However, such methods are extremely time-consuming and often rely on deep insights from human experts. On the other hand, academic researchers have proposed automated debugging techniques using data-driven statistical analysis, SAT, and BDD. However, such methods often suffer from scalability issues, do not provide human-comprehensible explanations of failure root causes, and do not automatically create code patches to fix buggy designs. This project will address this critical problem by creating ARMADA, a new foundational infrastructure, and a comprehensive tool suite for pre-silicon RTL debugging. A critical insight is that recent advances in state-of-the-art deep learning models, such as Transformer, Large Language Models (LLMs), have enormous potential to root cause and localize, explain root causes that are human understandable, and generate code patches to debug the RTL designs. We propose integrating this insight in ARMADA to create a novel, scalable, and effective pre-silicon debugging and repairing framework.
									</p>
									<p>Intellectual Merit</p>
									<p>The project will develop a unified foundational infrastructure and comprehensive suite of tools to enable streamlined pre-silicon RTL debugging and repairing of realistic SoCs.</p>
									<p>(1) It will develop novel technologies for characterizing and classifying design failure traces for effective debugging and root cause analysis.</p>
									<p>(2) It will create a framework for automatically localizing suspicious design components and design source codes.</p>
									<p>(3) It will develop a framework to generate human-understandable explanations of design failures at different abstractions in natural language.</p>
									<p>(4) It will develop novel technologies to automatically generate fixes, i.e., code patches to repair suspicious design components. The proposed approaches will be demonstrated on complex, realistic, industry-scale SoC designs.</p>
								</div>
							</Col>
						</Row>
						<Row>
							<Col md={12}>
								<div style={{ fontWeight: 'bold', fontSize: 15, marginTop: 15, color: '#E6782B' }}> Required Knowledge </div>
								<div style={{ fontWeight: 'medium', fontSize: 15, marginTop: 15 }}>• Advanced programming skills</div>
								<div style={{ fontWeight: 'medium', fontSize: 15, marginTop: 15 }}>• basics of data analytics</div>
								<div style={{ fontWeight: 'medium', fontSize: 15, marginTop: 15 }}>• computer architectures</div>
								<div style={{ fontWeight: 'medium', fontSize: 15, marginTop: 15 }}>• testing and verification of hardware devices</div>
							</Col>
						</Row>
						<Row>
							<Col md={12}>
								<div style={{ fontWeight: 'bold', fontSize: 15, marginTop: 15, color: '#E6782B' }}> Notes </div>
								<div style={{ fontWeight: 'medium', fontSize: 15, marginTop: 15 }}>
									The thesis is expected to be carried out under the tutelage of Prof. Debjit Pal at the University of Illinois at Chicago. Visa
									paperwork will be handled by the University of Chicago offices. All other expenses will be borne by the student. In case of
									particular impediments, the thesis can be developed at Politecnico.
								</div>
							</Col>
						</Row>
					</Card>
				</Col>
			</Row>
		</Container>
	);
}

export default Proposal;
