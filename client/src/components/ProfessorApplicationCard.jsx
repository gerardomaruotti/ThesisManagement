import { Row, Col, Card, Image, Button } from 'react-bootstrap';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Color } from '../constants/colors.js';
import Avatar from '../assets/avatar.svg';
import randomcolor from 'randomcolor';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';

function ProfessorApplicationCard(props) {
    const navigate = useNavigate();

    return (
        <Col lg={6} sm={12} style={{ marginTop: 25 }}>
            <Card style={{ padding: 20 }} className='custom-card' >
                <div style={{
                    fontWeight: 'medium', fontSize: 18, height: 55, display: '-webkit-box',
                    WebkitBoxOrient: 'vertical',
                    WebkitLineClamp: '2',
                    overflow: 'hidden'
                }}>{props.applications[0].title}</div>
                <div style={{
                    fontWeight: 'regular',
                    fontSize: 12,
                    marginTop: 11,
                    color: 'rgba(0, 0, 0, 0.5)',
                }}>
                    Expiration Date: {props.applications[0].expirationDate}
                </div>

                <Row style={{ fontWeight: 'medium', fontSize: 15, marginTop: 15, height: 30, textAlign: 'center' }}>
                    {
                        props.applications.filter((app) => app.state == 1).length > 0 ?
                            (<Col>
                                <span
                                    className='badge'
                                    style={{ backgroundColor: 'rgba(40, 199, 111, 0.2)', color: 'rgba(40, 199, 111, 1)', padding: '1em 1em', borderRadius: '0.25rem' }}
                                >
                                    <i className='bi bi-person-check' style={{ fontSize: '16px' }}></i>
                                </span>
                                <span style={{ color: 'rgba(0, 0, 0, 0.5)', paddingLeft: 8 }}>Assigned</span>
                            </Col>)
                            :
                            props.applications.filter((app) => app.state == 0).length > 0 ?
                                (<Col>
                                    <span
                                        className='badge'
                                        style={{ backgroundColor: 'rgba(164, 161, 141, 0.2)', color: 'rgba(164, 161, 141, 1)', padding: '1em 1em', borderRadius: '0.25rem' }}
                                    >
                                        <i className='bi bi-hourglass-split' style={{ fontSize: '16px' }}></i>
                                    </span>
                                    <span style={{ color: 'rgba(0, 0, 0, 0.5)', paddingLeft: 8 }}>Pending</span>
                                </Col>)
                                :
                                dayjs(props.applications[0].expirationDate).isBefore(dayjs(props.date)) ?
                                    (<Col>
                                        <span
                                            className='badge'
                                            style={{ backgroundColor: 'rgba(234, 84, 85, 0.2)', color: 'rgba(234, 84, 85)', padding: '1em 1em', borderRadius: '0.25rem' }}
                                        >
                                            <i className='bi bi-calendar-x' style={{ fontSize: '16px' }}></i>
                                        </span>
                                        <span style={{ color: 'rgba(0, 0, 0, 0.5)', paddingLeft: 8 }}>Expired</span>
                                    </Col>)
                                    :
                                    (<Col>
                                        <span
                                            className='badge'
                                            style={{ backgroundColor: 'rgba(164, 161, 141, 0.2)', color: 'rgba(164, 161, 141, 1)', padding: '1em 1em', borderRadius: '0.25rem' }}
                                        >
                                            <i className='bi bi-hourglass-split' style={{ fontSize: '16px' }}></i>
                                        </span>
                                        <span style={{ color: 'rgba(0, 0, 0, 0.5)', paddingLeft: 8 }}>Pending</span>
                                    </Col>)
                    }
                    <Col>
                        <span
                            className='badge'
                            style={{ backgroundColor: 'rgba(230, 120, 43, 0.1)', color: Color.secondary, padding: '1em 1em', borderRadius: '0.25rem' }}
                        >
                            <i className='bi bi-people' style={{ fontSize: '16px' }}></i>
                        </span>
                        <span style={{ color: 'rgba(0, 0, 0, 0.5)', paddingLeft: 8 }}>{props.applications.length} people applied</span>
                    </Col>
                </Row >

                <div style={{ marginTop: 34, textAlign: 'center' }}>
                    <Button variant='primary' onClick={() => navigate('/applications/proposal/' + props.applications[0].id)}>
                        Show applications
                    </Button>
                </div>
            </Card >
        </Col >
    );
}

export default ProfessorApplicationCard;
