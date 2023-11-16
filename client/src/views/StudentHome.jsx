import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Button, Form, InputGroup, Nav, Toast, ToastContainer } from 'react-bootstrap';
import '../constants/custom-styles.scss';
import { Color } from '../constants/colors.js';
import ProposalCard from '../components/ProposalCard.jsx';
import FiltersModal from '../components/FiltersModal.jsx';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';

function StudentHome(props) {
	const { loginWithRedirect, isAuthenticated, isLoading } = useAuth0();
	const [filtersShow, setFiltersShow] = useState(false);
	const navigate = useNavigate();
	const [popup, setPopup] = useState(false);
	const [msgAndColor, setMsgAndColor] = useState({ header: "", msg: "", color: "" });
	const [search, setSearch] = useState('');
	const [filteredThesis, setFilteredThesis] = useState(props.thesis);

	function handleSearch(e) {
		setSearch(e.target.value);
		console.log(search);
		let filtered = props.thesis.filter((thesis) => {
			return (thesis.title.toLowerCase().includes(search.toLowerCase()) ||
				thesis.description.toLowerCase().includes(search.toLowerCase()) ||
				thesis.notes.toLowerCase().includes(search.toLowerCase()) ||
				thesis.req_know.toLowerCase().includes(search.toLowerCase()))
		});
		setFilteredThesis(filtered);
	}

	useEffect(() => {
		setFilteredThesis(props.thesis)
	}, [props.thesis]);

	useEffect(() => {
		if (!isAuthenticated && !isLoading) {
			loginWithRedirect();
		}
	}, [isAuthenticated, isLoading]);

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
								<Form.Control placeholder='Search' style={{ borderTopLeftRadius: 50, borderBottomLeftRadius: 50, borderColor: Color.primary }} value={search} onChange={handleSearch} />
								<Button variant='outline-primary' style={{ borderTopRightRadius: 50, borderBottomRightRadius: 50 }}>
									<i className='bi bi-search'></i>
								</Button>
							</InputGroup>
						</Col>
					</Row>
					<Row style={{ marginTop: 25, paddingBottom: 20 }}>
						<Col sm={9}>
							<Nav variant='pills' defaultActiveKey='all'>
								<Nav.Item>
									<Nav.Link eventKey='all' className='buttons-rapid-filter'>
										All
									</Nav.Link>
								</Nav.Item>
								<Nav.Item>
									<Nav.Link eventKey='inCompany' className='buttons-rapid-filter'>
										In company
									</Nav.Link>
								</Nav.Item>
								<Nav.Item>
									<Nav.Link eventKey='abroad' className='buttons-rapid-filter'>
										Abroad
									</Nav.Link>
								</Nav.Item>
							</Nav>
						</Col>
						<Col sm={3}>
							<Button variant='primary' style={{ borderRadius: 50, float: 'right', width: 115 }} onClick={() => setFiltersShow(true)}>
								<span style={{ marginRight: 12 }}>Filters</span>
								<i className='bi bi-filter-circle'></i>
							</Button>
						</Col>
					</Row>
				</Container>
			</div>
			<FiltersModal show={filtersShow} onHide={() => setFiltersShow(false)} />
			<Container>
				<Row style={{ marginBottom: 25 }}>
					{console.log(filteredThesis)}
					{filteredThesis != [] ? filteredThesis.map((thesis, index) => <ProposalCard key={thesis.ID} thesis={thesis} accessToken={props.accessToken} setPopup={setPopup} setMsgAndColor={setMsgAndColor} />) : null}
				</Row>
			</Container>

			<ToastContainer style={{ position: 'fixed', top: 20, right: 20, zIndex: 10 }} className='p-3'>
				<Toast bg={msgAndColor.color} onClose={() => setPopup(false)} show={popup} delay={5000} autohide>
					<Toast.Header>
						<strong className="me-auto">{msgAndColor.header}</strong>
					</Toast.Header>
					<Toast.Body>{msgAndColor.msg}</Toast.Body>
				</Toast>
			</ToastContainer>

		</>
	);
}

export default StudentHome;
