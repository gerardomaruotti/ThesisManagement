import { Row, Col, Card, Image, Button } from 'react-bootstrap';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Color } from '../constants/colors.js';
import Avatar from '../assets/avatar.svg';
import { useNavigate } from 'react-router-dom';

function ProposalCard(props) {
	const navigate = useNavigate();
	const colors = [
		{
			backgroundColor: 'rgba(246, 191, 84, 0.1)', color: 'rgb(246, 191, 84)'
		},
		{
			backgroundColor: 'rgba(0, 79, 72, 0.1)', color: 'rgb(0, 79, 72)'
		},
		{
			backgroundColor: 'rgba(147, 115, 159, 0.1)', color: 'rgb(147, 115, 159)'
		},
		{
			backgroundColor: 'rgba(136, 205, 212, 0.1)', color: 'rgb(136, 205, 212)'
		},
		{
			backgroundColor: 'rgba(238, 164, 155, 0.1)', color: 'rgb(238, 164, 155)'
		},
		{
			backgroundColor: 'rgba(89, 56, 80, 0.1)', color: 'rgb(89, 56, 80)'
		}

	];

	return (
		<Col lg={6} sm={12} style={{ marginTop: 25 }}>
			<Card style={{ padding: 20, cursor: 'pointer' }} className='custom-card' onClick={() => navigate('/proposal/' + props.thesis.ID)}>
				<div style={{ fontWeight: 'medium', fontSize: 18 }}>{props.thesis.title}</div>

				<div style={{ fontWeight: 'semi-bold', fontSize: 14, marginTop: 5 }}>
					{props.thesis.keywords.map((keyword, index) => (
						<span
							key={index}
							className='badge'
							style={{
								backgroundColor: colors[index % 3].backgroundColor,
								color: colors[index % 3].color,
								padding: '0.5em 1.2em',
								borderRadius: '0.25rem',
								marginRight: 10,
							}}
						>
							{keyword}
						</span>
					))}
				</div>

				<Row style={{ fontWeight: 'medium', fontSize: 15, marginTop: 15 }}>
					<Col lg={1} xs={1} style={{ display: 'flex', alignItems: 'center' }}>
						<Image style={{ height: 35, width: 35 }} src={Avatar} roundedCircle />
					</Col>
					<Col lg={5} xs={5} style={{ display: 'flex', alignItems: 'center' }}>
						<span style={{ color: 'rgba(0, 0, 0, 0.8)' }}>{props.thesis.sup_name + " " + props.thesis.sup_surname}</span>
					</Col>
					{props.thesis.types.filter((type) => type == 'IN COMPANY').length > 0 ?
						<>
							<Col lg={1} xs={1} style={{ display: 'flex', alignItems: 'center', float: 'right' }}>
								<span
									className='badge'
									style={{ backgroundColor: 'rgba(230, 120, 43, 0.1)', color: Color.secondary, padding: '1em 1em', borderRadius: '0.25rem' }}
								>
									<i className='bi bi-building-check' style={{ fontSize: '16px' }}></i>
								</span>
							</Col>
							<Col lg={2} xs={2} style={{ display: 'flex', alignItems: 'center', float: 'right' }}>
								<span style={{ color: 'rgba(0, 0, 0, 0.5)' }}>Company</span>
							</Col>
						</>
						: null}
					{props.thesis.types.filter((type) => type == 'ABROAD').length > 0 ?
						<>
							<Col lg={1} xs={1} style={{ display: 'flex', alignItems: 'center', float: 'right' }}>
								<span
									className='badge'
									style={{ backgroundColor: 'rgba(230, 120, 43, 0.1)', color: Color.secondary, padding: '1em 1em', borderRadius: '0.25rem' }}
								>
									<i className='bi bi-globe-americas' style={{ fontSize: '16px' }}></i>
								</span>
							</Col>

							<Col lg={2} xs={2} style={{ display: 'flex', alignItems: 'center', float: 'right' }}>
								<span style={{ color: 'rgba(0, 0, 0, 0.5)' }}>Abroad</span>
							</Col>
						</>
						: null}



				</Row >
				<div style={{
					fontWeight: 'regular',
					fontSize: 16,
					marginTop: 20,
					color: 'rgba(0, 0, 0, 0.8)',
					display: '-webkit-box',
					WebkitBoxOrient: 'vertical',
					WebkitLineClamp: '3',
					overflow: 'hidden'
				}}>
					{props.thesis.description}
				</div>
				{props.isProfessor ?
					<div style={{ marginTop: 20, textAlign: 'center' }}>
						<Button variant='primary' style={{ width: 130 }}>
							Apply
						</Button>
					</div> : null}
			</Card >
		</Col >
	);
}

export default ProposalCard;
