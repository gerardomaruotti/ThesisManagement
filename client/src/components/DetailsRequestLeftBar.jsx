import React, { useState } from 'react';
import { Row, Col, Image, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import Avatar from '../assets/avatar.svg';
import { Color } from '../constants/colors.js';
import API from '../API';
import dayjs from 'dayjs';
import ModalWithTextField from './ModalWithTextField.jsx';

const DetailsRequestLeftBar = ({
	request,
	handleSuccess,
	handleError,
	accessToken,
	setInternalDirty,
	setShowModal,
	setMsgModal,
	isProfessor,
	isSecretary,
}) => {
	const [showModalWithText, setShowModalWithText] = useState(false);
	const styleStatus =
		request.status == 0
			? {
				backgroundColor: 'rgba(164, 161, 141, 0.2)',
				color: 'rgba(164, 161, 141)',
				icon: 'bi bi-hourglass-split',
				text: 'In review by secretary',
			}
			: request.status == 1
				? {
					backgroundColor: 'rgba(164, 161, 141, 0.2)',
					color: 'rgba(164, 161, 141)',
					icon: 'bi bi-hourglass-split',
					text: 'In review by supervisor',
				}
				: request.status == 3
					? {
						backgroundColor: 'rgba(1, 133, 114, 0.2)',
						color: 'rgba(1, 133, 114)',
						icon: 'bi bi-check-circle',
						text: 'Accepted',
					}
					: request.status == 2 || request.status == 4
						? {
							backgroundColor: 'rgba(234, 84, 85, 0.2)',
							color: 'rgba(234, 84, 85)',
							icon: 'bi bi-x-circle',
							text: 'Rejected',
						}
						: request.status == 5
							? {
								backgroundColor: 'rgba(230,120,43, 0.2)',
								color: 'rgba(230,120,43)',
								icon: 'bi bi-pencil',
								text: 'Requested change',
							}
							: null;

	function acceptRequest() {
		setShowModal(false);
		if (isProfessor) {
			API.approveRequestProfessor(accessToken, request.id)
				.then(() => {
					handleSuccess('Request accepted');
					setInternalDirty(true);
				})
				.catch((err) => {
					handleError(err);
				});
		} else {
			API.approveRequestSecretary(accessToken, request.id)
				.then(() => {
					handleSuccess('Request accepted');
					setInternalDirty(true);
				})
				.catch((err) => {
					handleError(err);
				});
		}
	}

	function rejectRequest() {
		setShowModal(false);
		if (isProfessor) {
			API.rejectRequestProfessor(accessToken, request.id)
				.then(() => {
					handleSuccess('Request rejected');
					setInternalDirty(true);
				})
				.catch((err) => {
					handleError(err);
				});
		} else {
			API.rejectRequestSecretary(accessToken, request.id)
				.then(() => {
					handleSuccess('Request rejected');
					setInternalDirty(true);
				})
				.catch((err) => {
					handleError(err);
				});
		}
	}

	return (
		<Row>
			<Col md={12}>
				<div style={{ fontWeight: 'medium', fontSize: 15, marginTop: 15 }}> Student </div>
				<div className='d-flex flex-row align-items-center' style={{ fontWeight: 'medium', fontSize: 15, marginTop: 15 }}>
					<Image style={{ height: 38, width: 38 }} src={Avatar} roundedCircle />
					<div className='d-flex flex-column'>
						<span style={{ marginLeft: 15, color: 'rgba(0, 0, 0, 0.8)' }}>{request.nameS + ' ' + request.surnameS}</span>
						<span style={{ marginLeft: 15, color: 'rgba(0, 0, 0, 0.5)', fontWeight: 'regular', fontSize: 13 }}>{request.student}</span>
					</div>
				</div>
			</Col>
			<Col md={12}>
				<div style={{ fontWeight: 'medium', fontSize: 15, marginTop: 15 }}> Supervisor </div>
				<div className='d-flex flex-row align-items-center' style={{ fontWeight: 'medium', fontSize: 15, marginTop: 15 }}>
					<Image style={{ height: 38, width: 38 }} src={Avatar} roundedCircle />
					<div className='d-flex flex-column'>
						<span style={{ marginLeft: 15, color: 'rgba(0, 0, 0, 0.8)' }}>{request.nameT + ' ' + request.surnameT}</span>
						<span style={{ marginLeft: 15, color: 'rgba(0, 0, 0, 0.5)', fontWeight: 'regular', fontSize: 13 }}>{request.supervisor}</span>
					</div>
				</div>
			</Col>
			{!request.co_supervisors ? null : request.co_supervisors.length > 0 ? (
				<Col md={12}>
					<div style={{ fontWeight: 'medium', fontSize: 15, marginTop: 15 }}> Co-Supervisors </div>
					{request.co_supervisors.map((coSupervisor, index) => (
						<div key={index} className='d-flex flex-row align-items-center' style={{ fontWeight: 'medium', fontSize: 15, marginTop: 15 }}>
							<Image style={{ height: 38, width: 38 }} src={Avatar} roundedCircle />
							<div className='d-flex flex-column'>
								<span style={{ marginLeft: 15, color: 'rgba(0, 0, 0, 0.8)' }}>{coSupervisor.name + ' ' + coSupervisor.surname}</span>
								<span style={{ marginLeft: 15, color: 'rgba(0, 0, 0, 0.5)', fontWeight: 'regular', fontSize: 13 }}>{coSupervisor.email}</span>
							</div>
						</div>
					))}
				</Col>
			) : null}
			<Col md={12}>
				<div style={{ fontWeight: 'medium', fontSize: 15, marginTop: 15 }}> Request Date </div>
				<div style={{ fontWeight: 'medium', fontSize: 15, marginTop: 15 }}>
					<span
						className='badge'
						style={{ backgroundColor: 'rgba(230, 120, 43, 0.1)', color: Color.secondary, padding: '1em 1em', borderRadius: '0.25rem' }}
					>
						<i className='bi bi-calendar3' style={{ fontSize: '16px' }}></i>
					</span>
					<span style={{ marginLeft: 8, color: 'rgba(0, 0, 0, 0.5)' }}>{dayjs(request.request_date).format('DD/MM/YYYY')}</span>
				</div>
			</Col>
			{!request.approval_date ? null : (
				<Col md={12}>
					<div style={{ fontWeight: 'medium', fontSize: 15, marginTop: 15 }}> Approval Date </div>
					<div style={{ fontWeight: 'medium', fontSize: 15, marginTop: 15 }}>
						<span
							className='badge'
							style={{ backgroundColor: 'rgba(230, 120, 43, 0.1)', color: Color.secondary, padding: '1em 1em', borderRadius: '0.25rem' }}
						>
							<i className='bi bi-calendar3' style={{ fontSize: '16px' }}></i>
						</span>
						<span style={{ marginLeft: 8, color: 'rgba(0, 0, 0, 0.5)' }}>{dayjs(request.approval_date).format('DD/MM/YYYY')}</span>
					</div>
				</Col>
			)}
			{!styleStatus ? null : (
				<div>
					<div style={{ fontWeight: 'medium', fontSize: 15, marginTop: 15 }}> Request status </div>
					<div style={{ fontWeight: 'medium', fontSize: 15, marginTop: 15 }}>
						<span
							className='badge'
							style={{
								backgroundColor: styleStatus.backgroundColor,
								color: styleStatus.color,
								padding: '1em 1em',
								borderRadius: '0.25rem',
								marginRight: 10,
							}}
						>
							<i className={styleStatus.icon} style={{ fontSize: '16px' }}></i>
						</span>
						<span style={{ color: 'rgba(0, 0, 0, 0.5)' }}>{styleStatus.text}</span>
					</div>
				</div>
			)}
			{(request.status == 0 && isSecretary == true) || (request.status == 1 && isProfessor == true) ? (
				<div className='d-flex justify-content-around' style={{ marginTop: 30 }}>
					<Button
						variant='outline-success'
						style={{ borderRadius: 20 }}
						onClick={() => {
							setShowModal(true);
							setMsgModal({
								header: 'Approve request',
								body: `Are you sure you want to approve the request of student ${request.student}?`,
								method: () => acceptRequest(),
							});
						}}
					>
						<i className='bi bi-check2' style={{ paddingRight: 5 }}></i>
						Approve
					</Button>
					{isProfessor ? (
						<Button
							variant='outline-warning'
							style={{ borderRadius: 20 }}
							onClick={() => {
								setShowModalWithText(true);
							}}
						>
							<i className='bi bi-pen' style={{ paddingRight: 5 }}></i>
							Request change
						</Button>
					) : null}
					<Button
						variant='outline-danger'
						style={{ borderRadius: 20 }}
						onClick={() => {
							setShowModal(true);
							setMsgModal({
								header: 'Reject request',
								body: `Are you sure you want to reject the request of student ${request.student}?`,
								method: () => rejectRequest(),
							});
						}}
					>
						<i className='bi bi-x-lg' style={{ paddingRight: 5 }}></i>
						Reject
					</Button>
				</div>
			) : null}
			<ModalWithTextField
				showModal={showModalWithText}
				setShowModal={setShowModalWithText}
				handleError={handleError}
				handleSuccess={handleSuccess}
				requestID={request.id}
				accessToken={accessToken}
				setInternalDirty={setInternalDirty}
			/>
		</Row>
	);
};

DetailsRequestLeftBar.propTypes = {
	request: PropTypes.object.isRequired,
	accessToken: PropTypes.string,
	handleError: PropTypes.func.isRequired,
	handleSuccess: PropTypes.func.isRequired,
	setInternalDirty: PropTypes.func.isRequired,
	setShowModal: PropTypes.func.isRequired,
	setMsgModal: PropTypes.func.isRequired,
	isSecretary: PropTypes.bool.isRequired,
	isProfessor: PropTypes.bool.isRequired,
};

export default DetailsRequestLeftBar;
