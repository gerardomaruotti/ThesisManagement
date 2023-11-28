import { Row, Col, Card, Image, Button } from 'react-bootstrap';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Color } from '../constants/colors.js';
import Avatar from '../assets/avatar.svg';
import { useNavigate } from 'react-router-dom';
import API from '../API.jsx';
import randomcolor from 'randomcolor';

function ProposalCard(props) {
	const navigate = useNavigate();

	function apply(event) {
		props.setShowModal(false);
		API.ThesisApply(props.thesis.ID, props.accessToken)
			.then(() => {
				props.handleSuccess('Application accepted')
				props.setDirty(true);
			})
			.catch((err) => {
				props.handleError(err)
			});
		event.stopPropagation();
	}


	function editProposal(event) {
		navigate('/proposals/edit/' + props.thesis.ID);
		event.stopPropagation();
	}

	function archiveProposal(event) {
		console.log('archive');
		event.stopPropagation();
	}

	function deleteProposal(event) {
		console.log('delete');
		event.stopPropagation();

	function showModal(event) {
		event.stopPropagation();
		props.setShowModal(true);
		props.setMsgModal({ header: 'Apply', body: 'Are you sure you want to apply to this thesis?', method: apply })
	}

	return (
		<Col lg={6} sm={12} style={{ marginTop: 25 }}>
			<Card style={{ padding: 20 }} className='custom-card' >
				<div className='title' onClick={() => navigate('/proposal/' + props.thesis.ID)} style={{
					fontWeight: 'medium', fontSize: 18, height: 55, display: '-webkit-box',
					WebkitBoxOrient: 'vertical',
					WebkitLineClamp: '2',
					overflow: 'hidden',
					cursor: 'pointer'
				}}>{props.thesis.title}</div>
				<div className="hide-scrollbar" style={{
					fontWeight: 'semi-bold',
					fontSize: 14,
					height: 25,
					marginTop: 5,
					overflowX: 'auto',
					whiteSpace: 'nowrap',
					scrollbarWidth: 'none', /* For Firefox */
					msOverflowStyle: 'none', /* For Internet Explorer and Edge */
				}}>
					{props.thesis.keywords.map((keyword, index) => (
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
					<Col lg={1} xs={1} style={{ display: 'flex', alignItems: 'center' }}>
						<Image style={{ height: 35, width: 35 }} src={Avatar} roundedCircle />
					</Col>
					<Col lg={5} xs={5} style={{ display: 'flex', alignItems: 'center' }}>
						<span style={{ color: 'rgba(0, 0, 0, 0.8)' }}>{props.thesis.sup_name + ' ' + props.thesis.sup_surname}</span>
					</Col>
					{props.thesis.types.filter((type) => type == 'IN COMPANY').length > 0 ? (
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
					) : null}
					{props.thesis.types.filter((type) => type == 'ABROAD').length > 0 ? (
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
					) : null}
				</Row>
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
					}}
				>
					{props.thesis.description}
				</div>
				{props.isProfessor != 1 ?
					(
						props.state == 0 ?
							<div style={{ marginTop: 20, textAlign: 'center' }}>
								<span
									className='badge'
									style={{
										backgroundColor: 'rgba(164, 161, 141, 0.2)',
										color: 'rgba(164, 161, 141)',
										padding: '1em 1em',
										borderRadius: '0.25rem',
										marginRight: 10,
									}}
								>
									<i className='bi bi-hourglass-split' style={{ fontSize: '16px' }}></i>
								</span>

								<span style={{ color: 'rgba(0, 0, 0, 0.5)' }}>Pending</span>
							</div>
							:
							<div style={{ marginTop: 20, textAlign: 'center' }}>
								<Button variant='primary' style={{ width: 130 }} onClick={showModal} >
									Apply
								</Button>
							</div>) :
					<div style={{ marginTop: 20, textAlign: 'right' }}>
						<Button variant='primary' onClick={editProposal} disabled={!props.isEditable} style={{ marginRight: 10 }} size='sm'>
							<i className='bi bi-pencil'></i>
						</Button>
						{/* <Button variant='primary' onClick={archiveProposal} style={{ marginRight: 10 }} size='sm'>
							<i className='bi bi-archive'></i>
						</Button>
						<Button variant='danger' onClick={deleteProposal} size='sm'>
							<i className='bi bi-trash3'></i>
						</Button> */}
					</div>
				)}
			</Card>
		</Col>
	);
}

export default ProposalCard;
