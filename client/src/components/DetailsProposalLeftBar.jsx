import 'bootstrap/dist/css/bootstrap.min.css';
import { useContext } from 'react';
import UserContext from '../contexts/UserContext';
import Avatar from '../assets/avatar.svg';
import { Color } from '../constants/colors.js';
import randomcolor from 'randomcolor';
import { Row, Col, Image, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import PropsTypes from 'prop-types';

function DetailsProposalLeftBar({ thesis, apply, id, applications, hasApplied, fromApplication }) {
	const { isProfessor } = useContext(UserContext);
	const navigate = useNavigate();

	return (
		<Row>
			<Col md={12}>
				<div style={{ fontWeight: 'medium', fontSize: 15, marginTop: 15 }}> Supervisor </div>
				<div style={{ fontWeight: 'medium', fontSize: 15, marginTop: 15 }}>
					<Image style={{ height: 38, width: 38 }} src={Avatar} roundedCircle />
					<span style={{ marginLeft: 15, color: 'rgba(0, 0, 0, 0.8)' }}>{thesis.supervisor.name + ' ' + thesis.supervisor.surname}</span>
				</div>
			</Col>
			{thesis.coSupervisors.length > 0 ? (
				<Col md={12}>
					<div style={{ fontWeight: 'medium', fontSize: 15, marginTop: 15 }}> Co-Supervisors </div>
					<div style={{ fontWeight: 'medium', fontSize: 15, marginTop: 15 }}>
						{thesis.coSupervisors.map((coSupervisor) => (
							<div key={coSupervisor.email} style={{ display: 'flex', alignItems: 'center', marginBottom: 10 }}>
								<Image style={{ height: 38, width: 38 }} src={Avatar} roundedCircle />
								<span style={{ marginLeft: 15, color: 'rgba(0, 0, 0, 0.8)', marginRight: 15 }}>{coSupervisor.name + ' ' + coSupervisor.surname}</span>
							</div>
						))}
					</div>
				</Col>
			) : null}
			{thesis.keywords.length > 0 ? (
				<Col md={12}>
					<div style={{ fontWeight: 'medium', fontSize: 15, marginTop: 15 }}> Keywords </div>
					<div style={{ fontWeight: 'semi-bold', fontSize: 14, marginTop: 15 }}>
						{thesis.keywords.map((keyword) => (
							<span
								key={keyword}
								className='badge'
								style={{
									backgroundColor: randomcolor({ seed: keyword, luminosity: 'bright', format: 'rgba', alpha: 1 }).replace(/1(?=\))/, '0.1'),
									color: randomcolor({ seed: keyword, luminosity: 'bright', format: 'rgba', alpha: 1 }),
									padding: '0.5em 1.2em',
									borderRadius: '0.25rem',
									marginRight: 10,
									marginBottom: 10,
								}}
							>
								{keyword}
							</span>
						))}
					</div>
				</Col>
			) : null}
			{thesis.types.length > 0 ? (
				<Col md={12}>
					<div style={{ fontWeight: 'medium', fontSize: 15, marginTop: 15 }}> Types </div>
					<div style={{ fontWeight: 'medium', fontSize: 15, marginTop: 15 }}>
						{thesis.types.map((type) => (
							<div key={type} style={{ fontWeight: 'medium', fontSize: 15, marginTop: 15 }}>
								<span
									className='badge'
									style={{
										backgroundColor: 'rgba(230, 120, 43, 0.1)',
										color: Color.secondary,
										padding: '1em 1em',
										borderRadius: '0.25rem',
									}}
								>
									{type == 'IN COMPANY' ? (
										<i className='bi bi-building-check' style={{ fontSize: '16px' }}></i>
									) : type == 'ABROAD' ? (
										<i className='bi bi-globe-americas' style={{ fontSize: '16px' }}></i>
									) : (
										<i className='bi bi-tag' style={{ fontSize: '16px' }}></i>
									)}
								</span>
								<span style={{ marginLeft: 8, color: 'rgba(0, 0, 0, 0.5)' }}>{type}</span>
							</div>
						))}
					</div>
				</Col>
			) : null}
			<Col md={12}>
				<div style={{ fontWeight: 'medium', fontSize: 15, marginTop: 15 }}> Level & CdS/Programmes </div>
				<div style={{ fontWeight: 'medium', fontSize: 15, marginTop: 15 }}>
					<span
						className='badge'
						style={{ backgroundColor: 'rgba(230, 120, 43, 0.1)', color: Color.secondary, padding: '1em 1em', borderRadius: '0.25rem' }}
					>
						<i className='bi bi-mortarboard-fill' style={{ fontSize: '16px' }}></i>
					</span>
					<span style={{ marginLeft: 8, color: 'rgba(0, 0, 0, 0.5)' }}>{thesis.level + ' ' + thesis.cds}</span>
				</div>
			</Col>
			{thesis.groups.length > 0 ? (
				<Col md={12}>
					<div style={{ fontWeight: 'medium', fontSize: 15, marginTop: 15 }}> Groups </div>
					{thesis.groups.map((group) => (
						<div key={group.cod_group} style={{ fontWeight: 'medium', fontSize: 15, marginTop: 15 }}>
							<span
								className='badge'
								style={{
									backgroundColor: 'rgba(230, 120, 43, 0.1)',
									color: Color.secondary,
									padding: '1em 1em',
									borderRadius: '0.25rem',
								}}
							>
								<i className='bi bi-people' style={{ fontSize: '16px' }}></i>
							</span>
							<span style={{ marginLeft: 8, color: 'rgba(0, 0, 0, 0.5)' }}>{group.cod_group + ' ' + group.group_name}</span>
						</div>
					))}
				</Col>
			) : null}
			<Col md={12}>
				<div style={{ fontWeight: 'medium', fontSize: 15, marginTop: 15 }}> Expiration Date </div>
				<div style={{ fontWeight: 'medium', fontSize: 15, marginTop: 15 }}>
					<span
						className='badge'
						style={{ backgroundColor: 'rgba(230, 120, 43, 0.1)', color: Color.secondary, padding: '1em 1em', borderRadius: '0.25rem' }}
					>
						<i className='bi bi-calendar3' style={{ fontSize: '16px' }}></i>
					</span>
					<span style={{ marginLeft: 8, color: 'rgba(0, 0, 0, 0.5)' }}>{dayjs(thesis.expirationDate).format('DD/MM/YYYY')}</span>
				</div>
			</Col>
			{isProfessor && fromApplication ? (
				<Col md={12} className='d-flex justify-content-center'>
					<div style={{ marginTop: 20, textAlign: 'center' }}>
						<Button variant='primary' onClick={() => navigate('/proposal/' + id, { state: { fromHome: true } })}>
							Show thesis details
						</Button>
					</div>
				</Col>
			) : null}
			{isProfessor ? null : (
				<Col md={12} className='d-flex justify-content-center'>
					<div style={{ marginTop: 20, textAlign: 'center' }}>
						{applications.find((app) => app.id == id && app.state != 2) ? (
							applications.find((app) => app.id == id && app.state != 2).state == 0 ? (
								<>
									<span
										className='badge'
										style={{
											backgroundColor: 'rgba(164, 161, 141, 0.2)',
											color: 'rgba(164, 161, 141)',
											padding: '1em 1em',
											borderRadius: '0.25rem',
											marginRight: 8,
										}}
									>
										<i className='bi bi-hourglass-split' style={{ fontSize: '16px' }}></i>
									</span>
									<span style={{ color: 'rgba(0, 0, 0, 0.5)' }}>Pending</span>
								</>
							) : applications.find((app) => app.id == id && app.state != 2).state == 1 ? (
								<>
									<span
										className='badge'
										style={{
											backgroundColor: 'rgba(1, 133, 114, 0.2)',
											color: 'rgba(1, 133, 114)',
											padding: '1em 1em',
											borderRadius: '0.25rem',
											marginRight: 8,
										}}
									>
										<i className='bi bi-check-circle' style={{ fontSize: '16px' }}></i>
									</span>
									<span style={{ color: 'rgba(0, 0, 0, 0.5)' }}>Accepted</span>
								</>
							) : applications.find((app) => app.id == id && app.state != 2).state == 3 ? (
								<>
									<span
										className='badge'
										style={{
											backgroundColor: 'rgba(89, 56, 80, 0.1)',
											color: 'rgba(89, 56, 80)',
											padding: '1em 1em',
											borderRadius: '0.25rem',
											marginRight: 8,
										}}
									>
										<i className='bi bi-dash-circle' style={{ fontSize: '16px' }}></i>
									</span>
									<span style={{ color: 'rgba(0, 0, 0, 0.5)' }}>Canceled</span>
								</>
							) : (
								<Button variant='primary' disabled={hasApplied} style={{ width: 130 }} onClick={apply}>
									Apply
								</Button>
							)
						) : (
							<Button variant='primary' disabled={hasApplied} style={{ width: 130 }} onClick={apply}>
								Apply
							</Button>
						)}
					</div>
				</Col>
			)}
		</Row>
	);
}

DetailsProposalLeftBar.propTypes = {
	thesis: PropsTypes.object,
	apply: PropsTypes.func,
	id: PropsTypes.string,
	applications: PropsTypes.array,
	hasApplied: PropsTypes.bool,
	fromApplication: PropsTypes.bool,
};

export default DetailsProposalLeftBar;
