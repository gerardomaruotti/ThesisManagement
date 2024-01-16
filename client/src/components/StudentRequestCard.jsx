import 'bootstrap/dist/css/bootstrap.min.css';
import { statusConfig } from '../constants/statusConfig.js';
import { Col, Card, Image, Button, Popover, OverlayTrigger } from 'react-bootstrap';
import { Color } from '../constants/colors.js';
import { useNavigate } from 'react-router-dom';
import Avatar from '../assets/avatar.svg';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';

function StudentRequestCard({ request }) {
	const navigate = useNavigate();
	const config = statusConfig[request.status];
	const popover = (
		<Popover>
			{!request.notes ? (
				<Popover.Body>No note left by supervisor</Popover.Body>
			) : (
				<>
					<Popover.Header as='h3' style={{ color: Color.primary }}>
						Changes requested by the supervisor
					</Popover.Header>
					<Popover.Body>{request.notes}</Popover.Body>
				</>
			)}
		</Popover>
	);

	return (
		<Col lg={6} sm={12} style={{ marginTop: 25 }}>
			<Card style={{ padding: 20 }} className='custom-card'>
				<Button
					className='title'
					variant='link'
					onClick={() => navigate('/requests/' + request.id)}
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
				>
					{request.title}
				</Button>
				<Col>
					<div style={{ fontWeight: 'medium', fontSize: 15, marginTop: 15, height: 30 }}>
						<Col style={{ display: 'flex', alignItems: 'center' }}>
							<Image style={{ height: 35, width: 35 }} src={Avatar} roundedCircle />
							<span style={{ color: 'rgba(0, 0, 0, 0.8)', paddingLeft: 8 }}>{request.nameT + ' ' + request.surnameT}</span>
						</Col>
					</div>
				</Col>
				<div
					style={{
						fontWeight: 'regular',
						fontSize: 16,
						marginTop: 20,
						minHeight: 72,
						color: 'rgba(0, 0, 0, 0.8)',
						display: '-webkit-box',
						WebkitBoxOrient: 'vertical',
						WebkitLineClamp: '3',
						overflow: 'hidden',
						whiteSpace: 'pre-line',
					}}
				>
					{request.description}
				</div>
				<div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 10 }}>
					<div style={{ display: 'flex', alignItems: 'center' }}>
						<span
							className='badge'
							style={{ backgroundColor: 'rgba(230, 120, 43, 0.1)', color: Color.secondary, padding: '1em 1em', borderRadius: '0.25rem' }}
						>
							<i className='bi bi-calendar3' style={{ fontSize: '16px' }}></i>
						</span>
						<div className='d-flex flex-column'>
							<span style={{ color: 'rgba(0, 0, 0, 0.8)', paddingLeft: 8, fontWeight: 400 }}>
								{request.status === 3 && request.approval_date ? 'Approval Date' : 'Request Date'}
							</span>
							<span style={{ marginLeft: 8, color: 'rgba(0, 0, 0, 0.5)' }}>
								{request.status === 3 && request.approval_date
									? dayjs(request.approval_date).format('DD/MM/YYYY')
									: dayjs(request.request_date).format('DD/MM/YYYY')}
							</span>
						</div>
					</div>
					{config ? (
						<OverlayTrigger placement='bottom' delay={{ show: 100, hide: 200 }} overlay={request.status === 5 ? popover : <></>}>
							<div style={{ display: 'flex', alignItems: 'center' }}>
								<span
									className='badge'
									style={{
										backgroundColor: config.backgroundColor,
										color: config.color,
										padding: '1em 1em',
										borderRadius: '0.25rem',
									}}
								>
									<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '14px', height: '14px' }}>
										<i className={config.icon} style={{ fontSize: '18px' }}></i>
										<i className={config.smallIcon} style={{ fontSize: '10px', alignSelf: 'flex-end' }}></i>
									</div>
								</span>
								<span style={{ color: 'rgba(0, 0, 0, 0.5)', fontSize: 15, paddingLeft: 10 }}>{config.text}</span>
							</div>
						</OverlayTrigger>
					) : null}
				</div>
			</Card>
		</Col>
	);
}

StudentRequestCard.propTypes = {
	request: PropTypes.object.isRequired,
};

export default StudentRequestCard;
