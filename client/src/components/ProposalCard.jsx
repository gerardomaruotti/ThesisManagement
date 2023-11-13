import { Row, Col, Card, Image, Button } from 'react-bootstrap';
import { Color } from '../constants/colors.js';
import Avatar from '../assets/avatar.svg';


function ProposalCard() {
    return (
        <Col md={6} style={{ marginTop: 25 }} >
            <Card style={{ padding: 20, cursor: 'pointer' }} className='custom-card'>

                <div style={{ fontWeight: 'medium', fontSize: 18 }}>
                    ARMADA: A Framework for Automatic Hardware Design Debugging and Repair
                </div>

                <div style={{ fontWeight: 'semi-bold', fontSize: 14, marginTop: 15 }}>
                    <span className="badge" style={{ backgroundColor: 'rgba(230, 120, 43, 0.1)', color: Color.secondary, padding: '0.5em 1.2em', borderRadius: '0.25rem', marginRight: 10 }}>
                        RTL DEBUGGING
                    </span>
                    <span className="badge" style={{ backgroundColor: 'rgba(92, 234, 201, 0.1)', color: 'rgb(92, 234, 201)', padding: '0.5em 1.2em', borderRadius: '0.25rem', marginRight: 10 }}>
                        EXPLAINABLE AI
                    </span>
                    <span className="badge" style={{ backgroundColor: 'rgba(115, 103, 240, 0.1)', color: 'rgb(115, 103, 240)', padding: '0.5em 1.2em', borderRadius: '0.25rem', marginRight: 10 }}>
                        PROGRAM REPAIR
                    </span>
                </div>

                <Row>
                    <Col lg={4} md={12}>
                        <div style={{ fontWeight: 'medium', fontSize: 15, marginTop: 15 }}>
                            <Image style={{ height: 38, width: 38 }} src={Avatar} roundedCircle />
                            <span style={{ marginLeft: 15, color: 'rgba(0, 0, 0, 0.8)' }}>Stefano Quer</span>
                        </div>
                    </Col>
                    <Col lg={8} md={12}>
                        <div style={{ fontWeight: 'medium', fontSize: 15, marginTop: 15, float: 'right' }}>
                            <span className="badge" style={{ backgroundColor: 'rgba(230, 120, 43, 0.1)', color: Color.secondary, padding: '1em 1em', borderRadius: '0.25rem' }}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-building-check" viewBox="0 0 16 16">
                                    <path d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Zm1.679-4.493-1.335 2.226a.75.75 0 0 1-1.174.144l-.774-.773a.5.5 0 0 1 .708-.708l.547.548 1.17-1.951a.5.5 0 1 1 .858.514Z" />
                                    <path d="M2 1a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v6.5a.5.5 0 0 1-1 0V1H3v14h3v-2.5a.5.5 0 0 1 .5-.5H8v4H3a1 1 0 0 1-1-1V1Z" />
                                    <path d="M4.5 2a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1Zm3 0a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1Zm3 0a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1Zm-6 3a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1Zm3 0a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1Zm3 0a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1Zm-6 3a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1Zm3 0a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1Z" />
                                </svg>
                            </span>
                            <span style={{ marginLeft: 8, marginRight: 24, color: 'rgba(0, 0, 0, 0.5)' }}>In Company</span>

                            <span className="badge" style={{ backgroundColor: 'rgba(230, 120, 43, 0.1)', color: Color.secondary, padding: '1em 1em', borderRadius: '0.25rem' }}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-globe-americas" viewBox="0 0 16 16">
                                    <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0ZM2.04 4.326c.325 1.329 2.532 2.54 3.717 3.19.48.263.793.434.743.484-.08.08-.162.158-.242.234-.416.396-.787.749-.758 1.266.035.634.618.824 1.214 1.017.577.188 1.168.38 1.286.983.082.417-.075.988-.22 1.52-.215.782-.406 1.48.22 1.48 1.5-.5 3.798-3.186 4-5 .138-1.243-2-2-3.5-2.5-.478-.16-.755.081-.99.284-.172.15-.322.279-.51.216-.445-.148-2.5-2-1.5-2.5.78-.39.952-.171 1.227.182.078.099.163.208.273.318.609.304.662-.132.723-.633.039-.322.081-.671.277-.867.434-.434 1.265-.791 2.028-1.12.712-.306 1.365-.587 1.579-.88A7 7 0 1 1 2.04 4.327Z" />
                                </svg>
                            </span>
                            <span style={{ marginLeft: 8, color: 'rgba(0, 0, 0, 0.5)' }}>Abroad</span>
                        </div>
                    </Col>
                </Row>
                <div style={{ fontWeight: 'regular', fontSize: 16, marginTop: 20, color: 'rgba(0, 0, 0, 0.8)' }}>
                    Many End-to-End (E2E) testing tools allow developers to create repeatable test scripts that mimic a human user's interaction with the application and evaluate its response. Various paradigms of testing tools have been defined that are...
                </div>
                <div style={{ marginTop: 20, textAlign: 'center' }}>
                    <Button variant='primary' style={{ width: 130 }}>Apply</Button>
                </div>
            </Card>
        </Col >
    )
}

export default ProposalCard;