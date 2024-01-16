import { useState, useContext } from 'react';
import UserContext from '../contexts/UserContext';
import { Card, Col, Button, Image, OverlayTrigger, Popover } from 'react-bootstrap';
import PropTypes from 'prop-types';
import Avatar from '../assets/avatar.svg';
import Pencil from '../assets/pencil-circle.svg';
import { useNavigate } from 'react-router-dom';
import { Color } from '../constants/colors.js';
import dayjs from 'dayjs';
import ModalWithTextField from './ModalWithTextField.jsx';
import { statusConfig } from '../constants/statusConfig.js';
import MyPopover from './MyPopover.jsx';
import { acceptRequest, rejectRequest } from '../utils/manageRequests.js';

const RequestCard = ({ request, setInternalDirty, setShowModal, setMsgModal }) => {
	const { accessToken, isProfessor, isStudent } = useContext(UserContext);
	const navigate = useNavigate();
	const [showModalWithText, setShowModalWithText] = useState(false);
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
				{isStudent ? (
					<div style={{ fontWeight: 'medium', fontSize: 15, marginTop: 15, height: 30 }}>
						<Col style={{ display: 'flex', alignItems: 'center' }}>
							<Image style={{ height: 35, width: 35 }} src={Avatar} roundedCircle />
							<span style={{ color: 'rgba(0, 0, 0, 0.8)', paddingLeft: 8 }}>{request.nameT + ' ' + request.surnameT}</span>
						</Col>
					</div>
				) : (
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
				)}
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
						<OverlayTrigger
							placement='bottom'
							delay={{ show: 100, hide: 200 }}
							overlay={
								request.status === 5 ? (
									<Popover>
										<MyPopover request={request} />
									</Popover>
								) : (
									<></>
								)
							}
						>
							<div>
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
				{isStudent ? null : (
					<>
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
												header: 'Approve request',
												body: `Are you sure you want to approve the request of student ${request.student}?`,
												method: () => acceptRequest(accessToken, request, isProfessor, setInternalDirty, setShowModal),
											});
										}}
									>
										<div className='d-flex align-items-center'>
											<i className='bi bi-check-circle mobile-view' style={{ fontSize: '16px', paddingRight: 8, color: 'green' }}></i>
											<span className='d-none d-md-flex'>Approve</span>
										</div>
									</Button>
								</div>
								{isProfessor ? (
									<div style={{ marginRight: 10 }}>
										<Button
											variant='link'
											className='buttonHover3'
											style={{ textDecoration: 'none', color: 'rgba(252,193,8)' }}
											onClick={() => {
												setShowModalWithText(true);
											}}
										>
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
											method: () => rejectRequest(accessToken, request, isProfessor, setInternalDirty, setShowModal),
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
					</>
				)}
			</Card>
			{isStudent ? null : (
				<ModalWithTextField
					showModal={showModalWithText}
					setShowModal={setShowModalWithText}
					requestID={request.id}
					setInternalDirty={setInternalDirty}
				/>
			)}
		</Col>
	);
};

RequestCard.propTypes = {
	request: PropTypes.object.isRequired,
	setInternalDirty: PropTypes.func,
	setShowModal: PropTypes.func,
	setMsgModal: PropTypes.func,
};

export default RequestCard;
