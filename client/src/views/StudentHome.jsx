import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Button, Form, InputGroup, Nav, Toast, ToastContainer } from 'react-bootstrap';
import '../constants/custom-styles.scss';
import { Color } from '../constants/colors.js';
import ProposalCard from '../components/ProposalCard.jsx';
import FiltersModal from '../components/FiltersModal.jsx';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import API from '../API.jsx';

function StudentHome(props) {
	const { loginWithRedirect, isAuthenticated, isLoading } = useAuth0();
	const [filtersShow, setFiltersShow] = useState(false);
	const navigate = useNavigate();
	const [popup, setPopup] = useState(false);
	const [msgAndColor, setMsgAndColor] = useState({ header: '', msg: '', color: '' });
	const [search, setSearch] = useState('');
	const [filteredThesis, setFilteredThesis] = useState(props.thesis);
	const [rapidFilter, setRapidFilter] = useState('all');

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
		if (rapidFilter === 'all') {
			let filtered = props.thesis.filter((thesis) => {
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
			let filtered = props.thesis.filter((thesis) => {
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
			let filtered = props.thesis.filter((thesis) => {
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
	}, [rapidFilter, search]);

	useEffect(() => {
		setFilteredThesis(props.thesis);
	}, [props.thesis]);

	useEffect(() => {
		if (!isAuthenticated && !isLoading) {
			loginWithRedirect();
		}
	}, [isAuthenticated, isLoading]);

	function resetFilters() {
		API.getAllThesis(props.accessToken)
			.then((thesis) => {
				props.setThesis(thesis);
			})
			.catch((err) => {
				console.log(err);
			});
		props.setActivatedFilters(false);
		setRapidFilter('all');
	}

	// useEffect(() => {
	// 	if (props.isProfessor) {
	// 		navigate('/professor');
	// 	}
	// }, [props.isProfessor]);

	return (
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
					<Row style={{ marginTop: 25, paddingBottom: 20 }}>
						<Col sm={8}>
							<Nav variant='pills' activeKey={rapidFilter}>
								<Nav.Item>
									<Nav.Link eventKey='all' className='buttons-rapid-filter' onClick={() => handleRapidFilters('all')}>
										All
									</Nav.Link>
								</Nav.Item>
								<Nav.Item>
									<Nav.Link eventKey='company' className='buttons-rapid-filter' onClick={() => handleRapidFilters('company')}>
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
						<Col sm={2}>
							{props.activatedFilters ? (
								<Button variant="outline-secondary" style={{ borderRadius: 50, float: 'right', width: 150 }} onClick={resetFilters}>Reset filters</Button>
							) : null}
						</Col>
						<Col sm={2}>
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
				thesis={props.thesis}
				setThesis={props.setThesis}
				onHide={() => setFiltersShow(false)}
				accessToken={props.accessToken}
				activatedFilters={props.activatedFilters}
				setActivatedFilters={props.setActivatedFilters}
				selectedSupervisor={props.selectedSupervisor}
				setSelectedSupervisor={props.setSelectedSupervisor}
				selectedCoSupervisors={props.selectedCoSupervisors}
				setSelectedCoSupervisors={props.setSelectedCoSupervisors}
				selectedKeywords={props.selectedKeywords}
				setSelectedKeywords={props.setSelectedKeywords}
				selectedTypes={props.selectedTypes}
				setSelectedTypes={props.setSelectedTypes}
				selectedGroups={props.selectedGroups}
				setSelectedGroups={props.setSelectedGroups}
				expirationDate={props.expirationDate}
				setExpirationDate={props.setExpirationDate}
			/>
			<Container>
				<Row style={{ marginBottom: 25 }}>
					{filteredThesis.length != 0 ? (
						filteredThesis.sort((a, b) => b.count - a.count).map((thesis, index) => (
							<ProposalCard
								key={thesis.ID}
								thesis={thesis}
								accessToken={props.accessToken}
								setPopup={setPopup}
								setMsgAndColor={setMsgAndColor}
								colorsKeywords={props.colorsKeywords} />
						))
					) : (
						<Col style={{ marginTop: 25 }}>
							<p>No thesis to display</p>
						</Col>
					)}
				</Row>
			</Container>

			<ToastContainer style={{ position: 'fixed', top: 20, right: 20, zIndex: 10 }} className='p-3'>
				<Toast bg={msgAndColor.color} onClose={() => setPopup(false)} show={popup} delay={5000} autohide>
					<Toast.Header>
						<strong className='me-auto'>{msgAndColor.header}</strong>
					</Toast.Header>
					<Toast.Body>{msgAndColor.msg}</Toast.Body>
				</Toast>
			</ToastContainer>
		</>
	);
}

export default StudentHome;
