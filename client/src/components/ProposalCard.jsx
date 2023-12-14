import 'bootstrap-icons/font/bootstrap-icons.css';
import { Row, Col, Card, Image, Button } from 'react-bootstrap';
import { Color } from '../constants/colors.js';
import Avatar from '../assets/avatar.svg';
import { useNavigate } from 'react-router-dom';
import API from '../API.jsx';
import randomcolor from 'randomcolor';
import EditingButtons from './EditingButtons.jsx';
import { useState } from 'react';
import { useLoading } from '../LoadingContext.jsx';
import PropsTypes from 'prop-types';
import ModalWithUpload from './ModalWithUpload.jsx';

function ProposalCard({
	accessToken,
	handleError,
	handleSuccess,
	thesis,
	isProfessor,
	isEditable,
	isArchived,
	setGenericModal,
	setMsgModal,
	setCopiedProposal,
	setDirty,
	state,
	hasApplied,
}) {
	const navigate = useNavigate();
	const [cv, setCv] = useState(null);
	const [showModal, setShowModal] = useState(false);
	const { setLoading } = useLoading();

	function apply(event) {
		setShowModal(false);
		setLoading(true);
		const formData = new FormData();
		formData.append('file', cv);
		API.ThesisApply(thesis.ID, accessToken, cv ? formData : null)
			.then(() => {
				setCv(null);
				handleSuccess('Application accepted');
				setDirty(true);
				setLoading(false);
			})
			.catch((err) => {
				setCv(null);
				setLoading(false);
				handleError(err);
			});
		event.stopPropagation();
	}

	function copyProposal(event) {
		event.stopPropagation();
		API.getThesisByID(thesis.ID, accessToken)
			.then((thesis) => {
				setCopiedProposal(thesis);
				handleSuccess('Proposal copied correctly');
			})
			.catch((err) => {
				handleError(err);
			});
	}

	function editProposal(event) {
		navigate('/proposals/edit/' + thesis.ID, { state: { fromHome: true } });
		event.stopPropagation();
	}

	function archiveProposal(event) {
		event.stopPropagation();
		setGenericModal(true);
		setMsgModal({
			header: 'Archive proposal',
			body: `Are you sure you want to archive this proposal?`,
			method: () => archiveProposalMethod(),
		});
	}

	function archiveProposalMethod() {
		setGenericModal(false);
		const thesisObj = {
			thesisID: thesis.ID,
		};
		setLoading(true);
		API.archiveProposal(accessToken, thesisObj)
			.then(() => {
				setLoading(false);
				handleSuccess('Proposal archived correctly');
				setDirty(true);
			})
			.catch((err) => {
				setLoading(false);
				handleError(err.toString());
			});
	}

	function deleteProposal(event) {
		event.stopPropagation();
		setGenericModal(true);
		setMsgModal({
			header: 'Delete proposal',
			body: `Are you sure you want to delete this proposal?`,
			method: () => deleteProposalMethod(),
		});
	}

	function deleteProposalMethod() {
		setGenericModal(false);
		const thesisObj = {
			thesisID: thesis.ID,
		};
		setLoading(true);
		API.deleteProposal(accessToken, thesisObj)
			.then(() => {
				setLoading(false);
				handleSuccess('Proposal deleted correctly');
				setDirty(true);
			})
			.catch((err) => {
				setLoading(false);
				handleError(err.toString());
			});
	}

	return (
		<>
			<Col lg={6} sm={12} style={{ marginTop: 25 }}>
				<Card style={{ padding: 20 }} className='custom-card'>
					<Button
						className='title'
						variant='link'
						onClick={() => navigate('/proposal/' + thesis.ID, { state: { fromHome: true } })}
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
						{thesis.title}
					</Button>
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
						{thesis.keywords.map((keyword, index) => (
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
							<span style={{ color: 'rgba(0, 0, 0, 0.8)', paddingLeft: 8 }}>{thesis.sup_name + ' ' + thesis.sup_surname}</span>
						</Col>
						{thesis.types.filter((type) => type == 'IN COMPANY').length > 0 ? (
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
						{thesis.types.filter((type) => type == 'ABROAD').length > 0 ? (
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
						{thesis.description}
					</div>
					{isProfessor != 1 ? (
						state == 0 ? (
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
								<Button variant='primary' disabled={hasApplied} style={{ width: 130 }} onClick={() => setShowModal(true)}>
									Apply
								</Button>
							</div>
						)
					) : (
						<div style={{ marginTop: 20, textAlign: 'right' }}>
							<EditingButtons
								disabled={!isEditable}
								isArchived={isArchived}
								copyProposal={copyProposal}
								editProposal={editProposal}
								deleteProposal={deleteProposal}
								archiveProposal={archiveProposal}
							/>
						</div>
					)}
				</Card>
			</Col>
			<ModalWithUpload showModal={showModal} setShowModal={setShowModal} apply={apply} setCv={setCv} />
		</>
	);
}

ProposalCard.propTypes = {
	accessToken: PropsTypes.string,
	handleError: PropsTypes.func,
	handleSuccess: PropsTypes.func,
	thesis: PropsTypes.object,
	isProfessor: PropsTypes.number,
	isEditable: PropsTypes.bool,
	isArchived: PropsTypes.bool,
	setGenericModal: PropsTypes.func,
	setMsgModal: PropsTypes.func,
	setCopiedProposal: PropsTypes.func,
	setDirty: PropsTypes.func,
	state: PropsTypes.number,
	hasApplied: PropsTypes.bool,
};

export default ProposalCard;
