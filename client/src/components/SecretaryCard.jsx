import React, { useState } from 'react';
import { Card, Col, Button, Image } from 'react-bootstrap';
import PropTypes from 'prop-types';
import Avatar from '../assets/avatar.svg';
import API from '../API';
import Pencil from '../assets/pencil-circle.svg';
import { useNavigate } from 'react-router-dom';
import { Color } from '../constants/colors.js';
import dayjs from 'dayjs';

const SecretaryCard = ({ request, setInternalDirty, accessToken, handleError, handleSuccess, setShowModal, setMsgModal, isProfessor }) => {
	const navigate = useNavigate();
	const styleStatus =
		request.status == 0
			? {
					backgroundColor: 'rgba(164, 161, 141, 0.2)',
					color: 'rgba(164, 161, 141)',
					icon: (
						<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '14px', height: '14px' }}>
							<i className='bi bi-headphones' style={{ fontSize: '18px' }}></i>
							<i className='bi bi-hourglass-split' style={{ fontSize: '10px', alignSelf: 'flex-end' }}></i>
						</div>
					),
					text: 'Secretary review',
			  }
			: request.status == 1
			? {
					backgroundColor: 'rgba(164, 161, 141, 0.2)',
					color: 'rgba(164, 161, 141)',
					icon: (
						<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '14px', height: '14px' }}>
							<i className='bi bi-person' style={{ fontSize: '18px' }}></i>
							<i className='bi bi-hourglass-split' style={{ fontSize: '10px', alignSelf: 'flex-end' }}></i>
						</div>
					),
					text: 'Supervisor review',
			  }
			: request.status == 3
			? {
					backgroundColor: 'rgba(1, 133, 114, 0.2)',
					color: 'rgba(1, 133, 114)',
					icon: <i className='bi bi-check-circle' style={{ fontSize: '16px' }}></i>,
					text: 'Accepted',
			  }
			: request.status == 2 || request.status == 4
			? {
					backgroundColor: 'rgba(234, 84, 85, 0.2)',
					color: 'rgba(234, 84, 85)',
					icon: <i className='bi bi-x-circle' style={{ fontSize: '16px' }}></i>,
					text: 'Rejected',
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

				<div className='d-flex justify-content-around' style={{ fontSize: 14, marginTop: 15, height: 30 }}>
					<div className='d-flex flex-row align-items-center'>
						<Image style={{ height: 35, width: 35 }} src={Avatar} roundedCircle />
						<div className='d-flex flex-column'>
							<span style={{ color: 'rgba(0, 0, 0, 0.8)', paddingLeft: 8, fontWeight: 400 }}>Supervisor:</span>
							<span style={{ color: 'rgba(0, 0, 0, 0.6)', fontWeight: 'regular', fontSize: 13, paddingLeft: 8 }}>
								{request.nameT + ' ' + request.surnameT}
							</span>
						</div>
					</div>
					<div className='d-flex flex-row align-items-center'>
						<Image style={{ height: 35, width: 35 }} src={Avatar} roundedCircle />
						<div className='d-flex flex-column'>
							<span style={{ color: 'rgba(0, 0, 0, 0.8)', paddingLeft: 8, fontWeight: 400 }}>Student:</span>
							<span style={{ color: 'rgba(0, 0, 0, 0.6)', fontWeight: 'regular', fontSize: 13, paddingLeft: 8 }}>
								{request.nameS + ' ' + request.surnameS}
							</span>
						</div>
					</div>
				</div>
				<div
					style={{
						fontWeight: 'regular',
						fontSize: 14,
						marginTop: 20,
						minHeight: 68,
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
				<div className='d-flex justify-content-around align-items-center' style={{ marginTop: 15, textAlign: 'center' }}>
					<div style={{ fontWeight: 'medium', fontSize: 15, display: 'flex', alignItems: 'center' }}>
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
					<div>
						<span
							className='badge'
							style={{
								backgroundColor: styleStatus.backgroundColor,
								color: styleStatus.color,
								padding: '1em 1em',
								borderRadius: '0.25rem',
							}}
						>
							{styleStatus.icon}
						</span>
						<span style={{ color: 'rgba(0, 0, 0, 0.5)', fontSize: 15, paddingLeft: 10 }}>{styleStatus.text}</span>
					</div>
				</div>
				{(request.status == 0 && isProfessor == false) || (request.status == 1 && isProfessor == true) ? (
					<div className='d-flex justify-content-center align-items-center' style={{ marginTop: 20, textAlign: 'center' }}>
						<div style={{ marginRight: 10 }}>
							<Button
								variant='link'
								className='buttonHover'
								style={{ textDecoration: 'none', color: 'green' }}
								onClick={() => {
									setShowModal(true);
									setMsgModal({
										header: 'Accept request',
										body: `Are you sure you want to Accept the request of student ${request.student}?`,
										method: () => acceptRequest(),
									});
								}}
							>
								<div className='d-flex align-items-center'>
									<i className='bi bi-check-circle mobile-view' style={{ fontSize: '16px', paddingRight: 8, color: 'green' }}></i>
									<span className='d-none d-md-flex'>Accept</span>
								</div>
							</Button>
						</div>
						{isProfessor ? (
							<div style={{ marginRight: 10 }}>
								<Button variant='link' className='buttonHover3' style={{ textDecoration: 'none', color: 'rgba(252,193,8)' }} onClick={() => {}}>
									<div className='d-flex align-items-center'>
										<Image className='mobile-icon' style={{ height: 25, width: 25, paddingRight: 8 }} src={Pencil} roundedCircle />
										<span className='d-none d-md-flex'>Request change</span>
									</div>
								</Button>
							</div>
						) : null}
						<Button
							variant='link'
							className='buttonHover2'
							style={{ textDecoration: 'none', color: 'rgba(234, 84, 85)' }}
							onClick={() => {
								setShowModal(true);
								setMsgModal({
									header: 'Reject request',
									body: `Are you sure you want to reject the request of student ${request.student}?`,
									method: () => rejectRequest(),
								});
							}}
						>
							<div className='d-flex align-items-center'>
								<i className='bi bi-x-circle mobile-view' style={{ fontSize: '16px', paddingRight: 8, color: 'rgba(234, 84, 85)' }}></i>
								<span className='d-none d-md-flex'>Reject</span>
							</div>
						</Button>
					</div>
				) : null}
			</Card>
		</Col>
	);
};

SecretaryCard.propTypes = {
	request: PropTypes.object.isRequired,
	setInternalDirty: PropTypes.func.isRequired,
	accessToken: PropTypes.string.isRequired,
	handleError: PropTypes.func.isRequired,
	handleSuccess: PropTypes.func.isRequired,
	setShowModal: PropTypes.func,
	setMsgModal: PropTypes.func,
	isProfessor: PropTypes.bool.isRequired,
};

export default SecretaryCard;
