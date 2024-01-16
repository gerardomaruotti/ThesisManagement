import 'bootstrap/dist/css/bootstrap.min.css';
import { Row, Col, Card, Image, Button, OverlayTrigger, Popover } from 'react-bootstrap';
import { Color } from '../constants/colors.js';
import { useNavigate } from 'react-router-dom';
import Avatar from '../assets/avatar.svg';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';

function StudentRequestCard({ request }) {
	const navigate = useNavigate();
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

	const statusConfig = {
		0: {
			backgroundColor: 'rgba(164, 161, 141, 0.2)',
			color: 'rgba(164, 161, 141)',
			icon: 'bi bi-headphones',
			smallIcon: 'bi bi-hourglass-split',
			text: 'In review by secretary',
		},
		1: {
			backgroundColor: 'rgba(164, 161, 141, 0.2)',
			color: 'rgba(164, 161, 141)',
			icon: 'bi bi-person',
			smallIcon: 'bi bi-hourglass-split',
			text: 'In review by supervisor',
		},
		2: {
			backgroundColor: 'rgba(234, 84, 85, 0.2)',
			color: 'rgba(234, 84, 85)',
			icon: 'bi bi-x-circle',
			text: 'Rejected by secretary',
		},
		3: {
			backgroundColor: 'rgba(1, 133, 114, 0.2)',
			color: 'rgba(1, 133, 114)',
			icon: 'bi bi-check-circle',
			text: 'Accepted',
		},
		4: {
			backgroundColor: 'rgba(234, 84, 85, 0.2)',
			color: 'rgba(234, 84, 85)',
			icon: 'bi bi-x-circle',
			text: 'Rejected',
		},
		5: {
			backgroundColor: 'rgba(230, 120, 43, 0.2)',
			color: 'rgba(230, 120, 43)',
			icon: 'bi bi-pencil',
			text: 'Requested change',
		},
	};

	const config = statusConfig[request.status];

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
				<div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
					<div>
						<div style={{ fontWeight: 'medium', fontSize: 15, marginTop: 15, display: 'flex', alignItems: 'center' }}>
							<span
								className='badge'
								style={{ backgroundColor: 'rgba(230, 120, 43, 0.1)', color: Color.secondary, padding: '1em 1em', borderRadius: '0.25rem' }}
							>
								<i className='bi bi-calendar3' style={{ fontSize: '16px' }}></i>
							</span>
							{request.status === 3 && request.approval_date ? (
								<div className='d-flex flex-column'>
									<span style={{ color: 'rgba(0, 0, 0, 0.8)', paddingLeft: 8, fontWeight: 400 }}>Approval Date</span>
									<span style={{ marginLeft: 8, color: 'rgba(0, 0, 0, 0.5)' }}>{dayjs(request.approval_date).format('DD/MM/YYYY')}</span>
								</div>
							) : (
								<div className='d-flex flex-column'>
									<span style={{ color: 'rgba(0, 0, 0, 0.8)', paddingLeft: 8, fontWeight: 400 }}>Request Date</span>
									<span style={{ marginLeft: 8, color: 'rgba(0, 0, 0, 0.5)' }}>{dayjs(request.request_date).format('DD/MM/YYYY')}</span>
								</div>
							)}
						</div>
					</div>
					{config ? (
						<div style={{ display: 'flex', alignItems: 'center', marginTop: 20 }}>
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
							</div>
							<div style={{ display: 'flex', alignItems: 'center', marginLeft: 5, whiteSpace: 'nowrap' }}>
								<span style={{ color: 'rgba(0, 0, 0, 0.5)' }}>{config.text}</span>
							</div>
						</div>
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
