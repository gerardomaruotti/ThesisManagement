import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Button, Form, InputGroup, Nav } from 'react-bootstrap';
import '../constants/custom-styles.scss';
import { Color } from '../constants/colors.js';
import ProposalCard from '../components/ProposalCard.jsx';
import FiltersModal from '../components/FiltersModal.jsx';
import { useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useLoading } from '../LoadingContext.jsx';
import API from '../API.jsx';
import Loading from '../components/Loading.jsx';
import PropTypes from 'prop-types';

function StudentHome({
	thesis,
	setThesis,
	applications,
	handleError,
	handleSuccess,
	accessToken,
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
	date,
	rapidFilter,
	setRapidFilter,
}) {
	const { loginWithRedirect, isAuthenticated, isLoading } = useAuth0();
	const { loading, setLoading } = useLoading();
	const [filtersShow, setFiltersShow] = useState(false);
	const [search, setSearch] = useState('');
	const [filteredThesis, setFilteredThesis] = useState(thesis);

	function handleRapidFilters(filter) {
		if (filter === 'all') {
			setRapidFilter('all');
		} else if (filter === 'company') {
			setRapidFilter('company');
		} else if (filter === 'abroad') {
			setRapidFilter('abroad');
		}
	}

	function handleSearch(e) {
		setSearch(e.target.value);
	}

	useEffect(() => {
		setFilteredThesis(thesis);
		if (rapidFilter === 'all') {
			let filtered = thesis.filter((thesis) => {
				return (
					thesis.title.toLowerCase().includes(search.toLowerCase()) ||
					thesis.description.toLowerCase().includes(search.toLowerCase()) ||
					thesis.notes.toLowerCase().includes(search.toLowerCase()) ||
					thesis.req_know.toLowerCase().includes(search.toLowerCase()) ||
					thesis.keywords.filter((keyword) => keyword.toLowerCase().includes(search.toLowerCase())).length > 0
				);
			});
			setFilteredThesis(filtered);
		} else if (rapidFilter === 'company') {
			let filtered = thesis.filter((thesis) => {
				return (
					(thesis.title.toLowerCase().includes(search.toLowerCase()) ||
						thesis.description.toLowerCase().includes(search.toLowerCase()) ||
						thesis.notes.toLowerCase().includes(search.toLowerCase()) ||
						thesis.req_know.toLowerCase().includes(search.toLowerCase()) ||
						thesis.keywords.filter((keyword) => keyword.toLowerCase().includes(search.toLowerCase())).length > 0) &&
					thesis.types.filter((type) => type === 'IN COMPANY').length > 0
				);
			});
			setFilteredThesis(filtered);
		} else if (rapidFilter === 'abroad') {
			let filtered = thesis.filter((thesis) => {
				return (
					(thesis.title.toLowerCase().includes(search.toLowerCase()) ||
						thesis.description.toLowerCase().includes(search.toLowerCase()) ||
						thesis.notes.toLowerCase().includes(search.toLowerCase()) ||
						thesis.req_know.toLowerCase().includes(search.toLowerCase()) ||
						thesis.keywords.filter((keyword) => keyword.toLowerCase().includes(search.toLowerCase())).length > 0) &&
					thesis.types.filter((type) => type === 'ABROAD').length > 0
				);
			});
			setFilteredThesis(filtered);
		}
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
				accessToken={accessToken}
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
				handleError={handleError}
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
									accessToken={accessToken}
									setMsgModal={setMsgModal}
									setShowModal={setShowModal}
									handleError={handleError}
									handleSuccess={handleSuccess}
									setDirty={setDirty}
									state={
										applications.find((app) => app.id === thesis.ID && app.state != 2)
											? applications.find((app) => app.id === thesis.ID && app.state != 2).state
											: null
									}
									hasApplied={hasApplied}
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
	handleError: PropTypes.func.isRequired,
	handleSuccess: PropTypes.func.isRequired,
	accessToken: PropTypes.string.isRequired,
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
	date: PropTypes.string,
	rapidFilter: PropTypes.string.isRequired,
	setRapidFilter: PropTypes.func.isRequired,
};

export default StudentHome;
