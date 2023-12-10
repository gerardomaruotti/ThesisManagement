import 'bootstrap-icons/font/bootstrap-icons.css';
import { Row, Col, Card, Image, Button, Form, Modal } from 'react-bootstrap';
import { Color } from '../constants/colors.js';
import Avatar from '../assets/avatar.svg';
import { useNavigate } from 'react-router-dom';
import API from '../API.jsx';
import randomcolor from 'randomcolor';
import EditingButtons from './EditingButtons.jsx';
import { useState } from 'react';
import { useLoading } from '../LoadingContext.jsx';

function ProposalCard(props) {
	const navigate = useNavigate();
	const [cv, setCv] = useState(null);
	const [showModal, setShowModal] = useState(false);
	const { setLoading } = useLoading();

	function apply(event) {
		setShowModal(false);
		console.log(cv);
		setLoading(true);
		API.ThesisApply(props.thesis.ID, props.accessToken)
			.then(() => {
				props.handleSuccess('Application accepted');
				props.setDirty(true);
				setLoading(false);
			})
			.catch((err) => {
				setLoading(false);
				props.handleError(err);
			});
		event.stopPropagation();
	}

	function copyProposal(event) {
		event.stopPropagation();
		API.getThesisByID(props.thesis.ID, props.accessToken)
			.then((thesis) => {
				props.setCopiedProposal(thesis);
				props.handleSuccess('Proposal copied correctly');
			})
			.catch((err) => {
				props.handleError(err);
			});
	}

	function editProposal(event) {
		navigate('/proposals/edit/' + props.thesis.ID, { state: { fromHome: true } });
		event.stopPropagation();
	}

	function archiveProposal(event) {
		event.stopPropagation();
		const thesis = {
			thesisID: props.thesis.ID,
		};
		setLoading(true);
		API.archiveProposal(props.accessToken, thesis)
			.then((res) => {
				setLoading(false);
				props.setDirty(true);
			})
			.catch((err) => {
				setLoading(false);
				props.handleError(err.toString());
			});
	}

	function deleteProposal(event) {
		event.stopPropagation();
		const thesis = {
			thesisID: props.thesis.ID,
		};
		setLoading(true);
		API.deleteProposal(props.accessToken, thesis)
			.then(() => {
				setLoading(false);
				props.setDirty(true);
			})
			.catch((err) => {
				setLoading(false);
				props.handleError(err.toString());
			});
	}

	return (
		<>
			<Col lg={6} sm={12} style={{ marginTop: 25 }}>
				<Card style={{ padding: 20 }} className='custom-card'>
					<div
						className='title'
						onClick={() => navigate('/proposal/' + props.thesis.ID, { state: { fromHome: true } })}
						style={{
							fontWeight: 'medium',
							fontSize: 18,
							height: 55,
							display: '-webkit-box',
							WebkitBoxOrient: 'vertical',
							WebkitLineClamp: '2',
							overflow: 'hidden',
							cursor: 'pointer',
						}}
					>
						{props.thesis.title}
					</div>
					<div
						className='hide-scrollbar'
						style={{
							fontWeight: 'semi-bold',
							fontSize: 14,
							height: 25,
							marginTop: 5,
							overflowX: 'auto',
							whiteSpace: 'nowrap',
							scrollbarWidth: 'none' /* For Firefox */,
							msOverflowStyle: 'none' /* For Internet Explorer and Edge */,
						}}
					>
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
						<Col style={{ display: 'flex', alignItems: 'center' }}>
							<Image style={{ height: 35, width: 35 }} src={Avatar} roundedCircle />
							<span style={{ color: 'rgba(0, 0, 0, 0.8)', paddingLeft: 8 }}>{props.thesis.sup_name + ' ' + props.thesis.sup_surname}</span>
						</Col>
						{props.thesis.types.filter((type) => type == 'IN COMPANY').length > 0 ? (
							<>
								<Col style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
									<span
										className='badge'
										style={{ backgroundColor: 'rgba(230, 120, 43, 0.1)', color: Color.secondary, padding: '1em 1em', borderRadius: '0.25rem' }}
									>
										<i className='bi bi-building-check' style={{ fontSize: '16px' }}></i>
									</span>
									<span className='d-none d-md-flex' style={{ color: 'rgba(0, 0, 0, 0.5)', paddingLeft: 8 }}>
										Company
									</span>
								</Col>
							</>
						) : null}
						{props.thesis.types.filter((type) => type == 'ABROAD').length > 0 ? (
							<>
								<Col style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
									<span
										className='badge'
										style={{ backgroundColor: 'rgba(230, 120, 43, 0.1)', color: Color.secondary, padding: '1em 1em', borderRadius: '0.25rem' }}
									>
										<i className='bi bi-globe-americas' style={{ fontSize: '16px' }}></i>
									</span>
									<span className='d-none d-md-flex' style={{ color: 'rgba(0, 0, 0, 0.5)', paddingLeft: 8 }}>
										Abroad
									</span>
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
							whiteSpace: 'pre-line',
						}}
					>
						{props.thesis.description}
					</div>
					{props.isProfessor != 1 ? (
						props.state == 0 ? (
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
						) : (
							<div style={{ marginTop: 20, textAlign: 'center' }}>
								<Button variant='primary' disabled={props.hasApplied} style={{ width: 130 }} onClick={() => setShowModal(true)}>
									Apply
								</Button>
							</div>
						)
					) : (
						<div style={{ marginTop: 20, textAlign: 'right' }}>
							<EditingButtons
								disabled={!props.isEditable}
								isArchived={props.isArchived}
								copyProposal={copyProposal}
								editProposal={editProposal}
								deleteProposal={deleteProposal}
								archiveProposal={archiveProposal}
							/>
						</div>
					)}
				</Card>
			</Col>
			<Modal show={showModal} onHide={() => setShowModal(false)} centered>
				<Modal.Header closeButton>
					<Modal.Title>Apply</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<div>Are you sure you want to apply to this proposal?</div>
					<div>
						<br />
						<Form.Group controlId='formFile' className='mb-3'>
							<Form.Label>Upload your cv (optional)</Form.Label>
							<Form.Control type='file' accept='application/pdf' onChange={(e) => setCv(e.target.files[0])} />
						</Form.Group>
					</div>
				</Modal.Body>
				<Modal.Footer>
					<Button
						variant='outline-secondary'
						onClick={() => {
							setShowModal(false);
						}}
					>
						No
					</Button>
					<Button variant='outline-primary' onClick={apply}>
						Yes
					</Button>
				</Modal.Footer>
			</Modal>
		</>
	);
}

export default ProposalCard;
