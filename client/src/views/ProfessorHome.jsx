import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Button, Container, Row, Col, Nav, InputGroup, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import ProposalCard from '../components/ProposalCard';
import { useAuth0 } from '@auth0/auth0-react';
import { useEffect, useState } from 'react';
import { useLoading } from '../LoadingContext.jsx';
import Loading from '../components/Loading.jsx';
import PropTypes from 'prop-types';
import { Color } from '../constants/colors.js';
import FiltersModal from '../components/FiltersModal.jsx';
import API from '../API.jsx';

function ProfessorHome({
	thesis,
	applications,
	handleError,
	handleSuccess,
	accessToken,
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
	date
}) {
	const navigate = useNavigate();
	const { loginWithRedirect, isAuthenticated, isLoading } = useAuth0();
	const { loading, setLoading } = useLoading();
	const [rapidFilter, setRapidFilter] = useState('active');
	const [filteredThesis, setFilteredThesis] = useState([]);
	const [search, setSearch] = useState('');
	const [filtersShow, setFiltersShow] = useState(false);

	useEffect(() => {
		if (rapidFilter === 'active') {
			setFilteredThesis(thesis.filter((thesis) => thesis.status == 1));
		} else {
			let filtered = thesis.filter((thesis) => thesis.status == 0).filter((thesis) => {
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
	}, [rapidFilter, thesis, applications, dirty, search]);

	function handleSearch(e) {
		setSearch(e.target.value);
	}


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
		setRapidFilter('archived');
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
					{rapidFilter === 'active' ? null :
						(< Row style={{ paddingTop: 25 }}>
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
						</Row>)}
					<Row style={{ paddingTop: 25, paddingBottom: 20 }}>
						<Col>
							<Nav variant='pills' activeKey={rapidFilter}>
								<Nav.Item>
									<Nav.Link eventKey='active' className='buttons-rapid-filter' onClick={() => setRapidFilter('active')}>
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
						{rapidFilter === 'active' ? null :
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
							</Col>}
					</Row>
				</Container>
			</div >
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
				isProfessor={true}
			/>
			<Container>
				<Row style={{ marginBottom: 25 }}>
					{filteredThesis.length !== 0 ? (
						filteredThesis.sort((a, b) => b.count - a.count).map((thesis, index) => (
							<ProposalCard
								key={thesis.ID}
								isProfessor={1}
								thesis={thesis}
								setDirty={setDirty}
								handleError={handleError}
								handleSuccess={handleSuccess}
								accessToken={accessToken}
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
	handleError: PropTypes.func.isRequired,
	handleSuccess: PropTypes.func.isRequired,
	accessToken: PropTypes.string.isRequired,
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
	date: PropTypes.string
};

export default ProfessorHome;
