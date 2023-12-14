import { Row, Col, Card, Image, Button } from 'react-bootstrap';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Color } from '../constants/colors.js';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import PropsTypes from 'prop-types';

function ProfessorApplicationCard({ applications, date }) {
	const navigate = useNavigate();

	return (
		<Col lg={6} sm={12} style={{ marginTop: 25 }}>
			<Card style={{ padding: 20 }} className='custom-card'>
				<Button
					variant='link'
					className='title'
					style={{
						fontWeight: 'medium',
						fontSize: 18,
						height: 60,
						display: '-webkit-box',
						WebkitBoxOrient: 'vertical',
						WebkitLineClamp: '2',
						overflow: 'hidden',
						cursor: 'pointer',
					}}
					onClick={() => navigate('/proposal/' + applications[0].id, { state: { fromHome: true } })}
				>
					{applications[0].title}
				</Button>
				<div
					style={{
						fontWeight: 'regular',
						fontSize: 12,
						marginTop: 11,
						color: 'rgba(0, 0, 0, 0.5)',
					}}
				>
					Expiration Date: {dayjs(applications[0].expirationDate).format('DD/MM/YYYY')}
				</div>

				<Row style={{ fontWeight: 'medium', fontSize: 15, marginTop: 15, height: 30, textAlign: 'center' }}>
					{applications.filter((app) => app.state == 1).length > 0 ? (
						<Col>
							<span
								className='badge'
								style={{ backgroundColor: 'rgba(40, 199, 111, 0.2)', color: 'rgba(40, 199, 111, 1)', padding: '1em 1em', borderRadius: '0.25rem' }}
							>
								<i className='bi bi-person-check' style={{ fontSize: '16px' }}></i>
							</span>
							<span style={{ color: 'rgba(0, 0, 0, 0.5)', paddingLeft: 8 }}>Assigned</span>
						</Col>
					) : applications.filter((app) => app.state == 0).length > 0 ? (
						<Col>
							<span
								className='badge'
								style={{ backgroundColor: 'rgba(164, 161, 141, 0.2)', color: 'rgba(164, 161, 141, 1)', padding: '1em 1em', borderRadius: '0.25rem' }}
							>
								<i className='bi bi-hourglass-split' style={{ fontSize: '16px' }}></i>
							</span>
							<span style={{ color: 'rgba(0, 0, 0, 0.5)', paddingLeft: 8 }}>Pending</span>
						</Col>
					) : dayjs(applications[0].expirationDate).isBefore(date ? dayjs(date) : dayjs()) ? (
						<Col>
							<span
								className='badge'
								style={{ backgroundColor: 'rgba(234, 84, 85, 0.2)', color: 'rgba(234, 84, 85)', padding: '1em 1em', borderRadius: '0.25rem' }}
							>
								<i className='bi bi-calendar-x' style={{ fontSize: '16px' }}></i>
							</span>
							<span style={{ color: 'rgba(0, 0, 0, 0.5)', paddingLeft: 8 }}>Expired</span>
						</Col>
					) : applications.filter((app) => app.t_state == 0).length > 0 ? (
						<Col>
							<span
								className='badge'
								style={{ backgroundColor: 'rgba(35, 85, 110, 0.2)', color: 'rgba(35, 85, 110)', padding: '1em 1em', borderRadius: '0.25rem' }}
							>
								<i className='bi bi-archive-fill' style={{ fontSize: '16px' }}></i>
							</span>
							<span style={{ color: 'rgba(0, 0, 0, 0.5)', paddingLeft: 8 }}>Archived</span>
						</Col>
					) : (
						<Col>
							<span
								className='badge'
								style={{ backgroundColor: 'rgba(164, 161, 141, 0.2)', color: 'rgba(164, 161, 141, 1)', padding: '1em 1em', borderRadius: '0.25rem' }}
							>
								<i className='bi bi-hourglass-split' style={{ fontSize: '16px' }}></i>
							</span>
							<span style={{ color: 'rgba(0, 0, 0, 0.5)', paddingLeft: 8 }}>Pending</span>
						</Col>
					)}
					<Col>
						<span
							className='badge'
							style={{ backgroundColor: 'rgba(230, 120, 43, 0.1)', color: Color.secondary, padding: '1em 1em', borderRadius: '0.25rem' }}
						>
							<i className='bi bi-people' style={{ fontSize: '16px' }}></i>
						</span>
						<span style={{ color: 'rgba(0, 0, 0, 0.5)', paddingLeft: 8 }}>{applications.length} applied</span>
					</Col>
				</Row>

				<div style={{ marginTop: 34, textAlign: 'center' }}>
					<Button variant='primary' onClick={() => navigate('/applications/proposal/' + applications[0].id)}>
						Show applications
					</Button>
				</div>
			</Card>
		</Col>
	);
}

ProfessorApplicationCard.propTypes = {
	applications: PropsTypes.array.isRequired,
	date: PropsTypes.string,
};

export default ProfessorApplicationCard;
