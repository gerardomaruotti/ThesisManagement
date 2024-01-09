import 'bootstrap/dist/css/bootstrap.min.css';
import { Row, Col, Card, Image } from 'react-bootstrap';
import { Color } from '../constants/colors.js';
import Avatar from '../assets/avatar.svg';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';

function StudentRequestCard({ request }) {
	return (
		<Col lg={6} sm={12} style={{ marginTop: 25 }}>
			<Card style={{ padding: 20 }} className='custom-card'>
				<div
					style={{
						fontWeight: 'medium',
						fontSize: 18,
						height: 55,
						display: '-webkit-box',
						WebkitBoxOrient: 'vertical',
						WebkitLineClamp: '2',
						overflow: 'hidden',
					}}
				>
					{request.title}
				</div>
				<Col>
					<div style={{ fontWeight: 'medium', fontSize: 15, marginTop: 15, height: 30 }}>
						<Col style={{ display: 'flex', alignItems: 'center' }}>
							<Image style={{ height: 35, width: 35 }} src={Avatar} roundedCircle />
							<span style={{ color: 'rgba(0, 0, 0, 0.8)', paddingLeft: 8 }}>{request.supervisor}</span>
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
				<Row style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
					<Col>
						<div style={{ fontWeight: 'medium', fontSize: 15, marginTop: 15, display: 'flex', alignItems: 'center' }}>
							<span
								className='badge'
								style={{ backgroundColor: 'rgba(230, 120, 43, 0.1)', color: Color.secondary, padding: '1em 1em', borderRadius: '0.25rem' }}
							>
								<i className='bi bi-calendar3' style={{ fontSize: '16px' }}></i>
							</span>
							{request.status === 3 ? (
								<span style={{ marginLeft: 8, color: 'rgba(0, 0, 0, 0.5)' }}>{dayjs(request.request_date).format('DD/MM/YYYY')}</span>
							) : (
								<span style={{ marginLeft: 8, color: 'rgba(0, 0, 0, 0.5)' }}>{dayjs(request.request_date).format('DD/MM/YYYY')}</span>
							)}
						</div>
					</Col>
					<Col md={6} style={{ display: 'flex', justifyContent: 'end' }}>
						{request.status === 0 ? (
							<div style={{ display: 'flex', alignItems: 'center', float: 'left', marginTop: 20 }}>
								<Col style={{ display: 'flex', alignItems: 'center', float: 'left' }}>
									<span
										className='badge'
										style={{
											backgroundColor: 'rgba(164, 161, 141, 0.2)',
											color: 'rgba(164, 161, 141)',
											padding: '1em 1em',
											borderRadius: '0.25rem',
										}}
									>
										<i className='bi bi-hourglass-split' style={{ fontSize: '16px' }}></i>
									</span>
								</Col>
								<Col style={{ display: 'flex', alignItems: 'left', float: 'left', marginLeft: 5, whiteSpace: 'nowrap' }}>
									<span style={{ color: 'rgba(0, 0, 0, 0.5)' }}>In review by secretary</span>
								</Col>
							</div>
						) : null}
						{request.status === 1 ? (
							<div style={{ display: 'flex', alignItems: 'center', float: 'left', marginTop: 20 }}>
								<Col style={{ display: 'flex', alignItems: 'center', float: 'left' }}>
									<span
										className='badge'
										style={{
											backgroundColor: 'rgba(164, 161, 141, 0.2)',
											color: 'rgba(164, 161, 141)',
											padding: '1em 1em',
											borderRadius: '0.25rem',
										}}
									>
										<i className='bi bi-hourglass-split' style={{ fontSize: '16px' }}></i>
									</span>
								</Col>
								<Col style={{ display: 'flex', alignItems: 'left', float: 'left', marginLeft: 5, whiteSpace: 'nowrap' }}>
									<span style={{ color: 'rgba(0, 0, 0, 0.5)' }}>In review by supervisor</span>
								</Col>
							</div>
						) : null}
						{request.status === 2 ? (
							<div style={{ display: 'flex', alignItems: 'center', float: 'left', marginTop: 20 }}>
								<Col style={{ display: 'flex', alignItems: 'center', float: 'left' }}>
									<span
										className='badge'
										style={{
											backgroundColor: 'rgba(234, 84, 85, 0.2)',
											color: 'rgba(234, 84, 85)',
											padding: '1em 1em',
											borderRadius: '0.25rem',
										}}
									>
										<i className='bi bi-x-circle' style={{ fontSize: '16px' }}></i>
									</span>
								</Col>
								<Col style={{ display: 'flex', alignItems: 'left', float: 'left', marginLeft: 5, whiteSpace: 'nowrap' }}>
									<span style={{ color: 'rgba(0, 0, 0, 0.5)' }}>Rejected by secretary</span>
								</Col>
							</div>
						) : null}
						{request.status === 3 ? (
							<div style={{ display: 'flex', alignItems: 'center', float: 'left', marginTop: 20 }}>
								<Col style={{ display: 'flex', alignItems: 'center', float: 'left' }}>
									<span
										className='badge'
										style={{
											backgroundColor: 'rgba(1, 133, 114, 0.2)',
											color: 'rgba(1, 133, 114)',
											padding: '1em 1em',
											borderRadius: '0.25rem',
										}}
									>
										<i className='bi bi-check-circle' style={{ fontSize: '16px' }}></i>
									</span>
								</Col>
								<Col style={{ display: 'flex', alignItems: 'left', float: 'left', marginLeft: 5, whiteSpace: 'nowrap' }}>
									<span style={{ color: 'rgba(0, 0, 0, 0.5)' }}>Accepted</span>
								</Col>
							</div>
						) : null}
						{request.status === 4 ? (
							<div style={{ display: 'flex', alignItems: 'center', float: 'left', marginTop: 20 }}>
								<Col style={{ display: 'flex', alignItems: 'center', float: 'left' }}>
									<span
										className='badge'
										style={{
											backgroundColor: 'rgba(234, 84, 85, 0.2)',
											color: 'rgba(234, 84, 85)',
											padding: '1em 1em',
											borderRadius: '0.25rem',
										}}
									>
										<i className='bi bi-x-circle' style={{ fontSize: '16px' }}></i>
									</span>
								</Col>
								<Col style={{ display: 'flex', alignItems: 'left', float: 'left', marginLeft: 5, whiteSpace: 'nowrap' }}>
									<span style={{ color: 'rgba(0, 0, 0, 0.5)' }}>Rejected</span>
								</Col>
							</div>
						) : null}
						{request.status === 5 ? (
							<div style={{ display: 'flex', alignItems: 'center', float: 'left', marginTop: 20 }}>
								<Col style={{ display: 'flex', alignItems: 'center', float: 'left' }}>
									<span
										className='badge'
										style={{
											backgroundColor: 'rgba(230, 120, 43, 0.2)',
											color: 'rgba(230, 120, 43)',
											padding: '1em 1em',
											borderRadius: '0.25rem',
										}}
									>
										<i className='bi bi-pencil' style={{ fontSize: '16px' }}></i>
									</span>
								</Col>
								<Col style={{ display: 'flex', alignItems: 'left', float: 'left', marginLeft: 5, whiteSpace: 'nowrap' }}>
									<span style={{ color: 'rgba(0, 0, 0, 0.5)' }}>Request change</span>
								</Col>
							</div>
						) : null}
					</Col>
				</Row>
			</Card>
		</Col>
	);
}

StudentRequestCard.propTypes = {
	request: PropTypes.object.isRequired,
};

export default StudentRequestCard;