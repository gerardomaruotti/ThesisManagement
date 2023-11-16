import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Button, Form, InputGroup, Nav } from 'react-bootstrap';
import '../constants/custom-styles.scss';
import { Color } from '../constants/colors.js';
import ProposalCard from '../components/ProposalCard.jsx';
import FiltersModal from '../components/FiltersModal.jsx';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function StudentHome(props) {
	const [filtersShow, setFiltersShow] = useState(false);
	const navigate = useNavigate();

	useEffect(() => {
		if (props.isProfessor) {
			navigate('/professor');
		}
	});

	return (
		<>
			<div style={{ position: 'sticky', top: 0, zIndex: 2, backgroundColor: 'white', boxShadow: '0 4px 2px -2px rgba(0, 0, 0, 0.2)' }}>
				<Container>
					<Row style={{ paddingTop: 25 }}>
						<Col lg={{ span: 4, offset: 4 }} md={12}>
							<InputGroup>
								<Form.Control placeholder='Search' style={{ borderTopLeftRadius: 50, borderBottomLeftRadius: 50, borderColor: Color.primary }} />
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
					{props.thesis != [] ? props.thesis.map((thesis, index) => <ProposalCard key={thesis.ID} thesis={thesis} />) : null}
				</Row>
			</Container>
		</>
	);
}

export default StudentHome;
