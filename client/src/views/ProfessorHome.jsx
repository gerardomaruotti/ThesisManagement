import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { useEffect, useState, useContext } from 'react';
import UserContext from '../contexts/UserContext';
import { Button, Container, Row, Col, Nav } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import ProposalCard from '../components/ProposalCard';
import { useAuth0 } from '@auth0/auth0-react';
import { useLoading } from '../contexts/LoadingContext.jsx';
import Loading from '../components/Loading.jsx';
import PropTypes from 'prop-types';
import FiltersModal from '../components/FiltersModal.jsx';
import API from '../API.jsx';
import { handleError } from '../utils/toastHandlers.js';
import SearchBar from '../components/SearchBar.jsx';

function ProfessorHome({
	thesis,
	applications,
	dirty,
	setDirty,
	setCopiedProposal,
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
	setThesis,
	expirationDate,
	setExpirationDate,
	date,
	rapidFilter,
	setRapidFilter,
	filterThesis,
	setFilterThesis,
}) {
	const { accessToken } = useContext(UserContext);
	const navigate = useNavigate();
	const { loginWithRedirect, isAuthenticated, isLoading } = useAuth0();
	const { loading, setLoading } = useLoading();
	const [filteredThesis, setFilteredThesis] = useState([]);
	const [search, setSearch] = useState('');
	const [filtersShow, setFiltersShow] = useState(false);

	useEffect(() => {
		if (rapidFilter === 'active') {
			setFilteredThesis(thesis.filter((thesis) => thesis.status == 1));
		} else {
			let filtered = filterThesis
				.filter((thesis) => thesis.status == 0)
				.filter((thesis) => {
					return (
						thesis.title.toLowerCase().includes(search.toLowerCase()) ||
						thesis.description.toLowerCase().includes(search.toLowerCase()) ||
						thesis.notes.toLowerCase().includes(search.toLowerCase()) ||
						thesis.req_know.toLowerCase().includes(search.toLowerCase()) ||
						thesis.keywords.filter((keyword) => keyword.toLowerCase().includes(search.toLowerCase())).length > 0
					);
				});
			setFilteredThesis(filtered);
		}
	}, [rapidFilter, thesis, applications, dirty, search, filterThesis]);

	function handleSearch(e) {
		setSearch(e.target.value);
	}

	function resetFilters() {
		setLoading(true);
		API.getAllThesis(accessToken)
			.then((thesis) => {
				setThesis(thesis);
				setFilterThesis(thesis);
			})
			.catch((err) => {
				handleError(err);
			})
			.finally(() => {
				setLoading(false);
			});
		setActivatedFilters(false);
		setRapidFilter('archived');
	}

	function handleActive() {
		setRapidFilter('active');
		API.getAllThesis(accessToken)
			.then((thesis) => {
				setThesis(thesis);
			})
			.catch((err) => {
				handleError(err);
			});
	}

	useEffect(() => {
		if (!isAuthenticated && !isLoading) {
			loginWithRedirect();
		}
	}, [isAuthenticated, isLoading]);

	return loading ? (
		<Loading />
	) : (
		<>
			<div style={{ position: 'sticky', top: 0, zIndex: 2, backgroundColor: 'white', boxShadow: '0 4px 2px -2px rgba(0, 0, 0, 0.2)' }}>
				<Container>
					{rapidFilter === 'active' ? null : <SearchBar search={search} handleSearch={handleSearch} />}
					<Row style={{ paddingTop: 25, paddingBottom: 20 }}>
						<Col xs={12} md={'auto'} style={{ paddingBottom: 10 }}>
							<Nav variant='pills' activeKey={rapidFilter}>
								<Nav.Item>
									<Nav.Link eventKey='active' className='buttons-rapid-filter' onClick={handleActive}>
										Active
									</Nav.Link>
								</Nav.Item>
								<Nav.Item>
									<Nav.Link eventKey='archived' className='buttons-rapid-filter' onClick={() => setRapidFilter('archived')}>
										Archived
									</Nav.Link>
								</Nav.Item>
							</Nav>
						</Col>
						{rapidFilter === 'active' ? null : (
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
						)}
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
				date={date}
				isProfessor={true}
				setFilterThesis={setFilterThesis}
			/>
			<Container>
				<Row style={{ marginBottom: 25 }}>
					{filteredThesis.length !== 0 ? (
						filteredThesis
							.sort((a, b) => b.count - a.count)
							.map((thesis) => (
								<ProposalCard
									key={thesis.ID}
									isProfessor={1}
									thesis={thesis}
									setDirty={setDirty}
									isEditable={!applications.some((app) => app.id == thesis.ID && app.state == 1)}
									isArchived={thesis.status == 0}
									setCopiedProposal={setCopiedProposal}
									setGenericModal={setShowModal}
									setMsgModal={setMsgModal}
								/>
							))
					) : (
						<Col style={{ marginTop: 25 }}>
							<p>No thesis to display</p>
						</Col>
					)}
				</Row>
				<Button
					variant='primary'
					className='insert-proposal'
					style={{ borderRadius: 50 }}
					onClick={() => {
						navigate('/proposals/add');
					}}
				>
					<i className='bi bi-plus' style={{ fontSize: '1.5rem' }}></i>
				</Button>
			</Container>
		</>
	);
}
ProfessorHome.propTypes = {
	thesis: PropTypes.array.isRequired,
	applications: PropTypes.array.isRequired,
	dirty: PropTypes.bool.isRequired,
	setDirty: PropTypes.func.isRequired,
	setCopiedProposal: PropTypes.func.isRequired,
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
	setThesis: PropTypes.func.isRequired,
	expirationDate: PropTypes.string.isRequired,
	setExpirationDate: PropTypes.func.isRequired,
	date: PropTypes.string,
	rapidFilter: PropTypes.string.isRequired,
	setRapidFilter: PropTypes.func.isRequired,
	filterThesis: PropTypes.array.isRequired,
	setFilterThesis: PropTypes.func.isRequired,
};

export default ProfessorHome;
