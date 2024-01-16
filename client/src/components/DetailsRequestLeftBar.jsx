import { useState, useContext } from 'react';
import UserContext from '../contexts/UserContext';
import { Row, Col, Image, Button, OverlayTrigger, Popover } from 'react-bootstrap';
import PropTypes from 'prop-types';
import Avatar from '../assets/avatar.svg';
import { Color } from '../constants/colors.js';
import dayjs from 'dayjs';
import ModalWithTextField from './ModalWithTextField.jsx';
import { statusConfig } from '../constants/statusConfig.js';
import MyPopover from './MyPopover.jsx';
import { acceptRequest, rejectRequest } from '../utils/manageRequests.js';

const DetailsRequestLeftBar = ({ request, setInternalDirty, setShowModal, setMsgModal }) => {
	const { accessToken, isSecretary, isProfessor } = useContext(UserContext);
	const [showModalWithText, setShowModalWithText] = useState(false);
	const config = statusConfig[request.status];

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
					{request.co_supervisors.map((coSupervisor) => (
						<div
							key={coSupervisor.email}
							className='d-flex flex-row align-items-center'
							style={{ fontWeight: 'medium', fontSize: 15, marginTop: 15 }}
						>
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
						<div style={{ fontWeight: 'medium', fontSize: 15, marginTop: 15 }}> Request status </div>
						<div style={{ fontWeight: 'medium', fontSize: 15, marginTop: 15 }}>
							<span
								className='badge'
								style={{
									backgroundColor: config.backgroundColor,
									color: config.color,
									padding: '1em 1em',
									borderRadius: '0.25rem',
									marginRight: 10,
								}}
							>
								<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '14px', height: '14px' }}>
									<i className={config.icon} style={{ fontSize: '18px' }}></i>
									<i className={config.smallIcon} style={{ fontSize: '10px', alignSelf: 'flex-end' }}></i>
								</div>
							</span>
							<span style={{ color: 'rgba(0, 0, 0, 0.5)' }}>{config.text}</span>
						</div>
					</div>
				</OverlayTrigger>
			) : null}
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
								method: () => acceptRequest(accessToken, request, isProfessor, setInternalDirty, setShowModal),
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
								method: () => rejectRequest(accessToken, request, isProfessor, setInternalDirty, setShowModal),
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
				requestID={request.id}
				setInternalDirty={setInternalDirty}
			/>
		</Row>
	);
};

DetailsRequestLeftBar.propTypes = {
	request: PropTypes.object.isRequired,
	setInternalDirty: PropTypes.func.isRequired,
	setShowModal: PropTypes.func.isRequired,
	setMsgModal: PropTypes.func.isRequired,
};

export default DetailsRequestLeftBar;
