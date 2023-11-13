import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Button, Form, InputGroup, Nav } from 'react-bootstrap';
import '../constants/custom-styles.scss';
import { Color } from '../constants/colors.js';
import ProposalCard from '../components/ProposalCard.jsx';
import FiltersModal from '../components/FiltersModal.jsx';
import { useState } from 'react';

function Home() {
    const [filtersShow, setFiltersShow] = useState(false);

    return (
        <>
            <div style={{ position: 'sticky', top: 0, zIndex: 2, backgroundColor: 'white', boxShadow: '0 4px 2px -2px rgba(0, 0, 0, 0.2)' }}>
                <Container>
                    <Row style={{ paddingTop: 25 }}>
                        <Col lg={{ span: 4, offset: 4 }} md={12}>
                            <InputGroup>
                                <Form.Control
                                    placeholder="Search"
                                    style={{ borderTopLeftRadius: 50, borderBottomLeftRadius: 50, borderColor: Color.primary }}
                                />
                                <Button variant="outline-primary" style={{ borderTopRightRadius: 50, borderBottomRightRadius: 50 }}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
                                        <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                                    </svg>
                                </Button>
                            </InputGroup>
                        </Col>
                    </Row>
                    <Row style={{ marginTop: 25, paddingBottom: 20 }}>
                        <Col md={9}>
                            <Nav variant="pills" defaultActiveKey="all">
                                <Nav.Item>
                                    <Nav.Link eventKey="all" className="buttons-rapid-filter">Active</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link eventKey="rapid1" className='buttons-rapid-filter'>Rapid link 1</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link eventKey="rapid2" className='buttons-rapid-filter'>Rapid link 2</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link eventKey="rapid3" className='buttons-rapid-filter'>Rapid link 3</Nav.Link>
                                </Nav.Item>
                            </Nav>
                        </Col>
                        <Col md={3}>
                            <Button variant='primary' style={{ borderRadius: 50, float: 'right', width: 115 }} onClick={() => setFiltersShow(true)}>
                                <span style={{ marginRight: 12 }}>Filters</span>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-filter-circle" viewBox="0 0 16 16">
                                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                                    <path d="M7 11.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 0 1h-1a.5.5 0 0 1-.5-.5zm-2-3a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5zm-2-3a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5z" />
                                </svg>
                            </Button>
                        </Col>
                    </Row>
                </Container>
            </div>
            <FiltersModal
                show={filtersShow}
                onHide={() => setFiltersShow(false)}
            />
            <Container>
                <Row style={{ marginBottom: 25 }}>
                    <ProposalCard />
                    <ProposalCard />
                    <ProposalCard />
                    <ProposalCard />
                </Row>
            </Container>
        </ >
    )
}

export default Home
