import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Button, Form, InputGroup, Nav } from 'react-bootstrap';
import '../constants/custom-styles.scss';
import Loading from '../components/Loading.jsx';
import { useLoading } from '../LoadingContext.jsx';
import ProfessorApplicationCard from '../components/ProfessorApplicationCard.jsx';
import { useEffect, useState } from 'react';
import API from '../API.jsx';
import dayjs from 'dayjs';
import PropTypes from 'prop-types';

function ProfessorApplications({ accessToken, handleError, date, rapidFilter, setRapidFilter }) {
	const { loading, setLoading } = useLoading();
	const [applicationsThesis, setApplicationsThesis] = useState([]);
	const [filteredApplications, setFilteredApplications] = useState({});

	function unionForid(array) {
		return array.reduce(function (acc, object) {
			const key = object.id;
			if (!acc[key]) {
				acc[key] = [];
			}
			acc[key].push(object);
			return acc;
		}, {});
	}

	useEffect(() => {
		setLoading(true);
		API.getApplications(accessToken)
			.then((app) => {
				const appthesis = unionForid(app);
				let filtered = Object.fromEntries(Object.entries(appthesis).map(([id, apps]) => [id, apps.filter((app) => app.t_state !== 2)]));
				filtered = Object.fromEntries(Object.entries(filtered).filter(([id, apps]) => apps.length > 0));
				setApplicationsThesis(filtered);
				setFilteredApplications(filtered);
				setLoading(false);
			})
			.catch((err) => {
				handleError(err);
				setLoading(false);
			});
	}, []);

	useEffect(() => {
		if (rapidFilter === 'all') {
			setFilteredApplications(applicationsThesis);
		} else if (rapidFilter === 'pending') {
			const filter = { ...applicationsThesis };
			for (const id in applicationsThesis) {
				for (const app in applicationsThesis[id]) {
					if (
						applicationsThesis[id][app].state == 1 ||
						applicationsThesis[id][app].t_state == 0 ||
						dayjs(applicationsThesis[id][app].expirationDate).isBefore(date ? dayjs(date) : dayjs())
					) {
						delete filter[id];
					}
				}
			}
			setFilteredApplications(filter);
		} else if (rapidFilter === 'assigned') {
			const filter = {};
			for (const id in applicationsThesis) {
				for (const app in applicationsThesis[id]) {
					if (applicationsThesis[id][app].state == 1) {
						filter[id] = applicationsThesis[id];
					}
				}
			}
			setFilteredApplications(filter);
		} else if (rapidFilter === 'expired') {
			const filter = { ...applicationsThesis };
			const dateCmp = date ? dayjs(date) : dayjs();
			for (const id in applicationsThesis) {
				for (const app in applicationsThesis[id]) {
					if (applicationsThesis[id][app].state == 1 || dateCmp.isBefore(dayjs(applicationsThesis[id][app].expirationDate))) {
						delete filter[id];
					}
				}
			}
			setFilteredApplications(filter);
		}
	}, [rapidFilter, applicationsThesis]);

	return loading ? (
		<Loading />
	) : (
		<>
			<div style={{ position: 'sticky', top: 0, zIndex: 2, backgroundColor: 'white', boxShadow: '0 4px 2px -2px rgba(0, 0, 0, 0.2)' }}>
				<Container>
					<Row style={{ paddingTop: 25, paddingBottom: 20 }}>
						<Col>
							<div
								className='hide-scrollbar'
								style={{
									display: 'flex',
									overflowX: 'auto',
									whiteSpace: 'nowrap',
									scrollbarWidth: 'none' /* For Firefox */,
									msOverflowStyle: 'none' /* For Internet Explorer and Edge */,
								}}
							>
								<Nav variant='pills' activeKey={rapidFilter} style={{ display: 'flex', flexWrap: 'nowrap' }}>
									<Nav.Item style={{ flexShrink: 0 }}>
										<Nav.Link eventKey='all' className='buttons-rapid-filter' onClick={() => setRapidFilter('all')}>
											All
										</Nav.Link>
									</Nav.Item>
									<Nav.Item style={{ flexShrink: 0 }}>
										<Nav.Link eventKey='pending' className='buttons-rapid-filter' onClick={() => setRapidFilter('pending')}>
											Pending
										</Nav.Link>
									</Nav.Item>
									<Nav.Item style={{ flexShrink: 0 }}>
										<Nav.Link eventKey='assigned' className='buttons-rapid-filter' onClick={() => setRapidFilter('assigned')}>
											Assigned
										</Nav.Link>
									</Nav.Item>
									<Nav.Item style={{ flexShrink: 0 }}>
										<Nav.Link eventKey='expired' className='buttons-rapid-filter' onClick={() => setRapidFilter('expired')}>
											Expired
										</Nav.Link>
									</Nav.Item>
								</Nav>
							</div>
						</Col>
					</Row>
				</Container>
			</div>
			<Container>
				<Row style={{ marginBottom: 25 }}>
					{Object.keys(filteredApplications).length !== 0 ? (
						Object.entries(filteredApplications).map(([id, app]) => <ProfessorApplicationCard key={id} applications={app} date={date} />)
					) : (
						<Col style={{ marginTop: 25 }}>
							<p>No thesis to display</p>
						</Col>
					)}
				</Row>
			</Container>
		</>
	);
}

ProfessorApplications.propTypes = {
	accessToken: PropTypes.string.isRequired,
	handleError: PropTypes.func.isRequired,
	date: PropTypes.string,
	rapidFilter: PropTypes.string.isRequired,
	setRapidFilter: PropTypes.func.isRequired,
};

export default ProfessorApplications;
