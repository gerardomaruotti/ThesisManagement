import React from 'react'
import { Container, Row, Col, Nav } from 'react-bootstrap'
import PropTypes from 'prop-types'


const RapidFilterRequest = ({ rapidFilter, setRapidFilter, isProfessor }) => {
    return (
        <div style={{ position: 'sticky', top: 0, zIndex: 2, backgroundColor: 'white', boxShadow: '0 4px 2px -2px rgba(0, 0, 0, 0.2)' }}>
            <Container>
                <Row style={{ paddingTop: 25, paddingBottom: 10 }}>
                    <Col md='auto' style={{ paddingBottom: 10, overflowX: 'auto' }}>
                        <Nav variant='pills' activeKey={rapidFilter} style={{ display: 'flex', flexWrap: 'nowrap' }}>
                            {!isProfessor && (
                                <Nav.Item>
                                    <Nav.Link eventKey='secretary-review' style={{ width: 193 }} className='buttons-rapid-filter' onClick={() => setRapidFilter('secretary-review')}>
                                        In review by secretary
                                    </Nav.Link>
                                </Nav.Item>
                            )}
                            <Nav.Item>
                                <Nav.Link eventKey='supervisor-review' style={{ width: 201 }} className='buttons-rapid-filter' onClick={() => setRapidFilter('supervisor-review')}>
                                    In review by supervisor
                                </Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey='requested-change' style={{ width: 170 }} className='buttons-rapid-filter' onClick={() => setRapidFilter('requested-change')}>
                                    Requested change
                                </Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey='accepted' className='buttons-rapid-filter' onClick={() => setRapidFilter('accepted')}>
                                    Approved
                                </Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey='rejected' className='buttons-rapid-filter' onClick={() => setRapidFilter('rejected')}>
                                    Rejected
                                </Nav.Link>
                            </Nav.Item>
                        </Nav>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

RapidFilterRequest.propTypes = {
    rapidFilter: PropTypes.string.isRequired,
    setRapidFilter: PropTypes.func.isRequired,
    isProfessor: PropTypes.bool.isRequired
}

export default RapidFilterRequest