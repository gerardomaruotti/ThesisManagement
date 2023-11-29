import 'bootstrap/dist/css/bootstrap.min.css';
import { Row, Col, Card, Image, Button, Container } from 'react-bootstrap';
import { Color } from '../constants/colors.js';
import Avatar from '../assets/avatar.svg';
import randomcolor from 'randomcolor';
import { useNavigate } from 'react-router-dom';

function StudentApplicationCard(props) {
	const navigate = useNavigate();
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
					{props.application.title}
				</div>
				<div
					className='hide-scrollbar'
					style={{
						fontWeight: 'semi-bold',
						fontSize: 14,
						marginTop: 5,
						overflowX: 'auto',
						whiteSpace: 'nowrap',
						scrollbarWidth: 'none' /* For Firefox */,
						msOverflowStyle: 'none' /* For Internet Explorer and Edge */,
					}}
				>
					{props.application.keywords.map((keyword, index) => (
						<span
							key={index}
							className='badge'
							style={{
								backgroundColor: randomcolor({ seed: keyword, luminosity: 'bright', format: 'rgba', alpha: 1 }).replace(/1(?=\))/, '0.1'),
								color: randomcolor({ seed: keyword, luminosity: 'bright', format: 'rgba', alpha: 1 }),
								padding: '0.5em 1.2em',
								borderRadius: '0.25rem',
								marginRight: 10,
							}}
						>
							{keyword}
						</span>
					))}
				</div>
				<Row style={{ fontWeight: 'medium', fontSize: 15, marginTop: 15, height: 30 }}>
					<Col style={{ display: 'flex', alignItems: 'center' }}>
						<Image style={{ height: 35, width: 35 }} src={Avatar} roundedCircle />
						<span style={{ color: 'rgba(0, 0, 0, 0.8)', paddingLeft: 8 }}>{props.application.name + ' ' + props.application.surname}</span>
					</Col>
					{props.application.types.filter((type) => type == 'IN COMPANY').length > 0 ? (
						<>
							<Col style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
								<span
									className='badge'
									style={{ backgroundColor: 'rgba(230, 120, 43, 0.1)', color: Color.secondary, padding: '1em 1em', borderRadius: '0.25rem' }}
								>
									<i className='bi bi-building-check' style={{ fontSize: '16px' }}></i>
								</span>
								<span className='d-none d-md-flex' style={{ color: 'rgba(0, 0, 0, 0.5)', paddingLeft: 8 }}>Company</span>
							</Col>
						</>
					) : null}
					{props.application.types.filter((type) => type == 'ABROAD').length > 0 ? (
						<>
							<Col style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
								<span
									className='badge'
									style={{ backgroundColor: 'rgba(230, 120, 43, 0.1)', color: Color.secondary, padding: '1em 1em', borderRadius: '0.25rem' }}
								>
									<i className='bi bi-globe-americas' style={{ fontSize: '16px' }}></i>
								</span>
								<span className='d-none d-md-flex' style={{ color: 'rgba(0, 0, 0, 0.5)', paddingLeft: 8 }}>Abroad</span>
							</Col>
						</>
					) : null}
				</Row>
				<Row>
					<Col>
						{props.application.state === 1 ? (
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
								<Col style={{ display: 'flex', alignItems: 'left', float: 'left', marginLeft: 5 }}>
									<span style={{ color: 'rgba(0, 0, 0, 0.5)' }}>Accepted</span>
								</Col>
							</div>
						) : null}
						{props.application.state === 2 ? (
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
								<Col style={{ display: 'flex', alignItems: 'left', float: 'left', marginLeft: 5 }}>
									<span style={{ color: 'rgba(0, 0, 0, 0.5)' }}>Rejected</span>
								</Col>
							</div>
						) : null}
						{props.application.state === 0 ? (
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
								<Col style={{ display: 'flex', alignItems: 'left', float: 'left', marginLeft: 5 }}>
									<span style={{ color: 'rgba(0, 0, 0, 0.5)' }}>Pending</span>
								</Col>
							</div>
						) : null}
						{props.application.state === 3 ? (
							<div style={{ display: 'flex', alignItems: 'center', float: 'left', marginTop: 20 }}>
								<Col style={{ display: 'flex', alignItems: 'center', float: 'left' }}>
									<span
										className='badge'
										style={{
											backgroundColor: 'rgba(89, 56, 80, 0.1)',
											color: 'rgba(89, 56, 80)',
											padding: '1em 1em',
											borderRadius: '0.25rem',
										}}
									>
										<i className='bi bi-dash-circle' style={{ fontSize: '16px' }}></i>
									</span>
								</Col>
								<Col style={{ display: 'flex', alignItems: 'left', float: 'left', marginLeft: 5 }}>
									<span style={{ color: 'rgba(0, 0, 0, 0.5)' }}>Canceled</span>
								</Col>
							</div>
						) : null}
					</Col>
					<Col>
						<div style={{ marginTop: 20, marginRight: 10, textAlign: 'right' }}>
							<Button variant='primary' onClick={() => navigate('/proposal/' + props.application.id, { state: { fromHome: true } })}>
								<i className='bi bi-arrow-right' style={{ fontSize: '16px' }}></i>
							</Button>
						</div>
					</Col>
				</Row>
			</Card>
		</Col>
	);
}

export default StudentApplicationCard;
