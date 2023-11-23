import { Row, Col, Card, Image, Button } from 'react-bootstrap';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Color } from '../constants/colors.js';
import Avatar from '../assets/avatar.svg';
import randomcolor from 'randomcolor';
import { useNavigate } from 'react-router-dom';

function ProfessorApplicationCard(props) {
    const navigate = useNavigate();

    return (
        <Col lg={6} sm={12} style={{ marginTop: 25 }}>
            <Card style={{ padding: 20, cursor: 'pointer' }} className='custom-card' onClick={() => navigate('/applications/proposal/' + 5)}>
                <div style={{
                    fontWeight: 'medium', fontSize: 18, height: 55, display: '-webkit-box',
                    WebkitBoxOrient: 'vertical',
                    WebkitLineClamp: '2',
                    overflow: 'hidden'
                }}>ARMADA: A Framework for Automatic Hardware Design Debugging and Repair</div>
                <div style={{
                    fontWeight: 'regular',
                    fontSize: 12,
                    marginTop: 11,
                    color: 'rgba(0, 0, 0, 0.5)',
                }}>
                    Expiration Date: 21/12/2024
                </div>

                <Row style={{ fontWeight: 'medium', fontSize: 15, marginTop: 15, height: 30, textAlign: 'center' }}>
                    <Col>
                        <span
                            className='badge'
                            style={{ backgroundColor: 'rgba(40, 199, 111, 0.2)', color: 'rgba(40, 199, 111, 1)', padding: '1em 1em', borderRadius: '0.25rem' }}
                        >
                            <i className='bi bi-person-check' style={{ fontSize: '16px' }}></i>
                        </span>
                        <span style={{ color: 'rgba(0, 0, 0, 0.5)', paddingLeft: 8 }}>Assigned</span>
                    </Col>
                    <Col>
                        <span
                            className='badge'
                            style={{ backgroundColor: 'rgba(230, 120, 43, 0.1)', color: Color.secondary, padding: '1em 1em', borderRadius: '0.25rem' }}
                        >
                            <i className='bi bi-people' style={{ fontSize: '16px' }}></i>
                        </span>
                        <span style={{ color: 'rgba(0, 0, 0, 0.5)', paddingLeft: 8 }}>18 people applied</span>
                    </Col>
                </Row >

                <div style={{ marginTop: 34, textAlign: 'center' }}>
                    <Button variant='primary' >
                        Show applications
                    </Button>
                </div>
            </Card >
        </Col >
    );
}

export default ProfessorApplicationCard;
