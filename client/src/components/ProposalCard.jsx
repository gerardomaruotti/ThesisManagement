import { Row, Col, Card, Image, Button } from 'react-bootstrap';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Color } from '../constants/colors.js';
import Avatar from '../assets/avatar.svg';
import { useNavigate } from 'react-router-dom';

function ProposalCard() {
	const navigate = useNavigate();
	return (
		<Col lg={6} sm={12} style={{ marginTop: 25 }}>
			<Card style={{ padding: 20, cursor: 'pointer' }} className='custom-card' onClick={() => navigate('/proposal/1')}>
				<div style={{ fontWeight: 'medium', fontSize: 18 }}>ARMADA: A Framework for Automatic Hardware Design Debugging and Repair</div>

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

				<Row>
					<Col lg={4} sm={6}>
						<div style={{ fontWeight: 'medium', fontSize: 15, marginTop: 15 }}>
							<Image style={{ height: 38, width: 38 }} src={Avatar} roundedCircle />
							<span style={{ paddingLeft: 15, color: 'rgba(0, 0, 0, 0.8)' }}>Stefano Quer</span>
						</div>
					</Col>
					<Col lg={8} sm={6}>
						<div style={{ fontWeight: 'medium', fontSize: 15, marginTop: 15, float: 'right' }}>
							<span
								className='badge'
								style={{ backgroundColor: 'rgba(230, 120, 43, 0.1)', color: Color.secondary, padding: '1em 1em', borderRadius: '0.25rem' }}
							>
								<i className='bi bi-building-check' style={{ fontSize: '16px' }}></i>
							</span>
							<span style={{ paddingLeft: 8, paddingRight: 24, color: 'rgba(0, 0, 0, 0.5)' }}>In Company</span>

							<span
								className='badge'
								style={{ backgroundColor: 'rgba(230, 120, 43, 0.1)', color: Color.secondary, padding: '1em 1em', borderRadius: '0.25rem' }}
							>
								<i className='bi bi-globe-americas' style={{ fontSize: '16px' }}></i>
							</span>
							<span style={{ paddingLeft: 8, color: 'rgba(0, 0, 0, 0.5)' }}>Abroad</span>
						</div>
					</Col>
				</Row>
				<div style={{ fontWeight: 'regular', fontSize: 16, marginTop: 20, color: 'rgba(0, 0, 0, 0.8)' }}>
					Many End-to-End (E2E) testing tools allow developers to create repeatable test scripts that mimic a human user's interaction with the
					application and evaluate its response. Various paradigms of testing tools have been defined that are...
				</div>
				<div style={{ marginTop: 20, textAlign: 'center' }}>
					<Button variant='primary' style={{ width: 130 }}>
						Apply
					</Button>
				</div>
			</Card>
		</Col>
	);
}

export default ProposalCard;
