import { useState } from 'react'
import { Container, Card, Row, Col, Image, Button, Table, Offcanvas } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { useLoading } from '../LoadingContext.jsx';
import Loading from '../components/Loading.jsx';
import image from '../assets/default_image_profile.jpg';
import { Color } from '../constants/colors.js';
import pdf from '../assets/cv_format_it_europeo.pdf';

const StudentApplicationInfo = () => {
    const [showDetails, setShowDetails] = useState(false);
    const handleClose = () => setShowDetails(false);
    const handleShow = () => setShowDetails(true);
    const navigate = useNavigate();
    const { loading, setLoading } = useLoading();
    const { id, idStudent } = useParams();


    const LeftBarDetails = () => {
        return (
            <>
                <div style={{ textAlign: 'center' }}>
                    <Image src={image} rounded style={{ width: 150 }} />
                </div>
                <div style={{ textAlign: 'center', marginTop: 15 }}>
                    <div style={{ fontWeight: 'medium', fontSize: 17 }}>Name Surname</div>
                </div>
                <Row style={{ marginTop: 25 }}>
                    <Col>
                        <div className='d-flex align-items-center'>
                            <div className='text-center' style={{ float: 'right' }}>
                                <span
                                    className='badge'
                                    style={{
                                        backgroundColor: 'rgba(230, 120, 43, 0.1)',
                                        color: Color.secondary,
                                        padding: '1em 1em',
                                        borderRadius: '0.25rem',
                                    }}
                                >
                                    <i className='bi bi-building-check' style={{ fontSize: '16px' }}></i>
                                </span>
                            </div>
                            <div style={{ paddingLeft: 8 }}>
                                <div style={{ fontSize: 15 }}>CFU</div>
                                <div style={{ fontSize: 12 }} className='text-muted'>90/120</div>
                            </div>
                        </div>
                    </Col>
                    <Col>
                        <div className='d-flex align-items-center'>
                            <div className='text-center'>
                                <span
                                    className='badge'
                                    style={{
                                        backgroundColor: 'rgba(230, 120, 43, 0.1)',
                                        color: Color.secondary,
                                        padding: '1em 1em',
                                        borderRadius: '0.25rem',
                                    }}
                                >
                                    <i className='bi bi-building-check' style={{ fontSize: '16px' }}></i>
                                </span>
                            </div>
                            <div style={{ paddingLeft: 8 }}>
                                <div style={{ fontSize: 15 }}>AVG</div>
                                <div style={{ fontSize: 12 }} className='text-muted'>29.5</div>
                            </div>

                        </div>
                    </Col>

                </Row>

                <div style={{ marginTop: 25 }}>
                    <div style={{ fontWeight: 'medium', fontSize: 17 }}>Details</div>
                    <hr />
                </div>
                <div >
                    <span style={{ fontSize: 15, marginRight: 8 }}>Student ID:</span>
                    <span style={{ fontSize: 14, }} className='text-muted'>
                        s318927
                    </span>
                </div>
                <div >
                    <span style={{ fontSize: 15, marginRight: 8 }}>Name:</span>
                    <span style={{ fontSize: 14, }} className='text-muted'>
                        Andrea
                    </span>
                </div>
                <div >
                    <span style={{ fontSize: 15, marginRight: 8 }}>Surname:</span>
                    <span style={{ fontSize: 14, }} className='text-muted'>
                        Scamporrino
                    </span>
                </div>
                <div >
                    <span style={{ fontSize: 15, marginRight: 8 }}>Email:</span>
                    <span style={{ fontSize: 14, }} className='text-muted'>
                        s318927@studenti.polito.it
                    </span>
                </div>
                <div >
                    <span style={{ fontSize: 15, marginRight: 8 }}>Application status:</span>
                    <span style={{ fontSize: 14, }} className='text-muted'>
                        <span className='badge custom-badge-warning'>Cancelled</span>
                    </span>
                </div>
                <Row style={{ marginTop: 25, textAlign: 'center' }}>
                    <Col xs={6}>
                        <Button variant="outline-success" style={{ borderRadius: 20 }}>
                            <i className="bi bi-check2" style={{ paddingRight: 5 }}></i>
                            Accept
                        </Button>
                    </Col>
                    <Col xs={6}>
                        <Button variant="outline-danger" style={{ borderRadius: 20 }}>
                            <i className="bi bi-x-lg" style={{ paddingRight: 5 }}></i>
                            Reject
                        </Button>
                    </Col>
                </Row>
            </>
        )
    }

    return loading ? (
        <Loading />
    ) : (
        <>
            <Container style={{ marginTop: 25, marginBottom: 25 }}>
                <Row style={{ display: 'flex', alignItems: 'start' }}>
                    <Col md={4} style={{ position: 'sticky', top: 95 }} >
                        <Card style={{ padding: 20 }} className='custom-card d-none d-md-flex'>
                            <LeftBarDetails />
                        </Card>
                    </Col>
                    <Col md={8}>
                        <Card style={{ padding: 20 }} className='custom-card'>
                            <Row>
                                <Col xs={6}>
                                    <Button variant='outline-primary' style={{ borderRadius: 50, width: 75 }} onClick={() => navigate('/applications/proposal/' + id)}>
                                        <i className='bi bi-arrow-left'></i>
                                    </Button>
                                </Col>
                                <Col xs={6} className='d-md-none' >
                                    <Button variant='primary' onClick={handleShow} style={{ float: 'right' }}>
                                        Show more details
                                    </Button>
                                </Col>
                            </Row>
                            <Row style={{ marginTop: 32 }}>
                                <Col>
                                    <div style={{ fontWeight: 'bold', fontSize: 20 }}> List of exams: </div>
                                </Col>
                            </Row>
                            <Table responsive hover>
                                <thead>
                                    <tr>
                                        <th>Course name</th>
                                        <th>Date</th>
                                        <th>CFU</th>
                                        <th>Mark</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>Programmazione di sistema</td>
                                        <td>24/12/2022</td>
                                        <td>10</td>
                                        <td>27</td>
                                    </tr>
                                </tbody>

                            </Table>

                            <Row style={{ marginTop: 32 }}>
                                <Col>
                                    <div style={{ fontWeight: 'bold', fontSize: 20 }}> Curriculum vitae: </div>
                                </Col>
                            </Row>
                            <embed src={pdf} type="application/pdf" height={'500px'} />
                        </Card>
                    </Col>
                </Row>
            </Container >

            <Offcanvas show={showDetails} onHide={handleClose}>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Details</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <LeftBarDetails />
                </Offcanvas.Body>
            </Offcanvas>
        </>
    );
}

export default StudentApplicationInfo;