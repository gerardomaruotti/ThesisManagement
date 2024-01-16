import 'bootstrap/dist/css/bootstrap.min.css';
import '../constants/custom-styles.scss';
import { useEffect, useState, useContext } from 'react';
import UserContext from '../contexts/UserContext';
import { Container, Row, Col, Button, Form, InputGroup, Nav } from 'react-bootstrap';
import { Color } from '../constants/colors.js';
import { filterThesis } from '../utils/filterThesis';
import { handleError } from '../utils/toastHandlers.js';
import { useAuth0 } from '@auth0/auth0-react';
import { useLoading } from '../contexts/LoadingContext.jsx';
import API from '../API.jsx';
import PropTypes from 'prop-types';
import FiltersModal from '../components/FiltersModal.jsx';
import ProposalCard from '../components/ProposalCard.jsx';
import Loading from '../components/Loading.jsx';

function StudentHome({
	thesis,
	setThesis,
	applications,
	setDirty,
	setShowModal,
	setMsgModal,
	activatedFilters,
	setActivatedFilters,
	selectedSupervisor,
	setSelectedSupervisor,
	selectedCoSupervisors,
	setSelectedCoSupervisors,
	selectedKeywords,
	setSelectedKeywords,
	selectedTypes,
	setSelectedTypes,
	selectedGroups,
	setSelectedGroups,
	expirationDate,
	setExpirationDate,
	hasApplied,
	hasRequested,
	date,
	rapidFilter,
	setRapidFilter,
}) {
	const { accessToken } = useContext(UserContext);
	const { loginWithRedirect, isAuthenticated, isLoading } = useAuth0();
	const { loading, setLoading } = useLoading();
	const [filtersShow, setFiltersShow] = useState(false);
	const [search, setSearch] = useState('');
	const [filteredThesis, setFilteredThesis] = useState(thesis);

	function handleRapidFilters(filter) {
		setRapidFilter(filter);
	}

	function handleSearch(e) {
		setSearch(e.target.value);
	}

	useEffect(() => {
		const filteredThesis = filterThesis(thesis, rapidFilter, search);
		setFilteredThesis(filteredThesis);
	}, [rapidFilter, search, thesis]);

	useEffect(() => {
		if (!isAuthenticated && !isLoading) {
			loginWithRedirect();
		}
	}, [isAuthenticated, isLoading]);

	function resetFilters() {
		setLoading(true);
		API.getAllThesis(accessToken)
			.then((thesis) => {
				setThesis(thesis);
			})
			.catch((err) => {
				handleError(err);
			})
			.finally(() => {
				setLoading(false);
			});
		setActivatedFilters(false);
		setRapidFilter('all');
	}

	return loading ? (
		<Loading />
	) : (
		<>
			<div style={{ position: 'sticky', top: 0, zIndex: 2, backgroundColor: 'white', boxShadow: '0 4px 2px -2px rgba(0, 0, 0, 0.2)' }}>
				<Container>
					<Row style={{ paddingTop: 25 }}>
						<Col lg={{ span: 4, offset: 4 }} md={12}>
							<InputGroup>
								<Form.Control
									placeholder='Search'
									style={{ borderTopLeftRadius: 50, borderBottomLeftRadius: 50, borderColor: Color.primary }}
									value={search}
									onChange={handleSearch}
								/>
								<Button variant='outline-primary' style={{ borderTopRightRadius: 50, borderBottomRightRadius: 50 }}>
									<i className='bi bi-search'></i>
								</Button>
							</InputGroup>
						</Col>
					</Row>
					<Row style={{ marginTop: 25, paddingBottom: 10 }}>
						<Col md='auto' style={{ paddingBottom: 10, overflowX: 'auto' }}>
							<Nav variant='pills' activeKey={rapidFilter} style={{ display: 'flex', flexWrap: 'nowrap' }}>
								<Nav.Item>
									<Nav.Link eventKey='all' className='buttons-rapid-filter' onClick={() => handleRapidFilters('all')}>
										All
									</Nav.Link>
								</Nav.Item>
								<Nav.Item>
									<Nav.Link eventKey='company' style={{ width: 120 }} className='buttons-rapid-filter' onClick={() => handleRapidFilters('company')}>
										In company
									</Nav.Link>
								</Nav.Item>
								<Nav.Item>
									<Nav.Link eventKey='abroad' className='buttons-rapid-filter' onClick={() => handleRapidFilters('abroad')}>
										Abroad
									</Nav.Link>
								</Nav.Item>
							</Nav>
						</Col>
						<Col style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', paddingBottom: 10 }}>
							{activatedFilters ? (
								<Button variant='outline-secondary' style={{ borderRadius: 50, float: 'right', width: 150, marginRight: 8 }} onClick={resetFilters}>
									Reset filters
								</Button>
							) : null}
							<Button variant='primary' style={{ borderRadius: 50, float: 'right', width: 115 }} onClick={() => setFiltersShow(true)}>
								<span style={{ marginRight: 12 }}>Filters</span>
								<i className='bi bi-filter-circle'></i>
							</Button>
						</Col>
					</Row>
				</Container>
			</div>
			<FiltersModal
				show={filtersShow}
				thesis={thesis}
				setThesis={setThesis}
				onHide={() => setFiltersShow(false)}
				activatedFilters={activatedFilters}
				setActivatedFilters={setActivatedFilters}
				selectedSupervisor={selectedSupervisor}
				setSelectedSupervisor={setSelectedSupervisor}
				selectedCoSupervisors={selectedCoSupervisors}
				setSelectedCoSupervisors={setSelectedCoSupervisors}
				selectedKeywords={selectedKeywords}
				setSelectedKeywords={setSelectedKeywords}
				selectedTypes={selectedTypes}
				setSelectedTypes={setSelectedTypes}
				selectedGroups={selectedGroups}
				setSelectedGroups={setSelectedGroups}
				expirationDate={expirationDate}
				setExpirationDate={setExpirationDate}
				setFilterThesis={setFilteredThesis}
				date={date}
			/>
			<Container>
				<Row style={{ marginBottom: 25 }}>
					{filteredThesis.length != 0 ? (
						filteredThesis
							.sort((a, b) => b.count - a.count)
							.map((thesis, index) => (
								<ProposalCard
									key={thesis.ID}
									thesis={thesis}
									setMsgModal={setMsgModal}
									setShowModal={setShowModal}
									setDirty={setDirty}
									state={
										applications.find((app) => app.id === thesis.ID && app.state != 2)
											? applications.find((app) => app.id === thesis.ID && app.state != 2).state
											: null
									}
									hasApplied={hasApplied}
									hasRequested={hasRequested}
								/>
							))
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

StudentHome.propTypes = {
	thesis: PropTypes.array.isRequired,
	setThesis: PropTypes.func.isRequired,
	applications: PropTypes.array.isRequired,
	setDirty: PropTypes.func.isRequired,
	setShowModal: PropTypes.func.isRequired,
	setMsgModal: PropTypes.func.isRequired,
	activatedFilters: PropTypes.bool.isRequired,
	setActivatedFilters: PropTypes.func.isRequired,
	selectedSupervisor: PropTypes.array.isRequired,
	setSelectedSupervisor: PropTypes.func.isRequired,
	selectedCoSupervisors: PropTypes.array.isRequired,
	setSelectedCoSupervisors: PropTypes.func.isRequired,
	selectedKeywords: PropTypes.array.isRequired,
	setSelectedKeywords: PropTypes.func.isRequired,
	selectedTypes: PropTypes.array.isRequired,
	setSelectedTypes: PropTypes.func.isRequired,
	selectedGroups: PropTypes.array.isRequired,
	setSelectedGroups: PropTypes.func.isRequired,
	expirationDate: PropTypes.string.isRequired,
	setExpirationDate: PropTypes.func.isRequired,
	hasApplied: PropTypes.bool.isRequired,
	hasRequested: PropTypes.bool.isRequired,
	date: PropTypes.string,
	rapidFilter: PropTypes.string.isRequired,
	setRapidFilter: PropTypes.func.isRequired,
};

export default StudentHome;
