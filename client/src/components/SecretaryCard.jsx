import React from 'react'
import { Card, Col, Row, Button, Image } from 'react-bootstrap'
import PropTypes from 'prop-types';
import Avatar from '../assets/avatar.svg';



const SecretaryCard = ({ request }) => {
    return (
        <Col lg={6} sm={12} style={{ marginTop: 25 }}>
            <Card style={{ padding: 20 }} className='custom-card'>
                <Button
                    className='title'
                    variant='link'
                    //onClick={() => navigate('/proposal/' + thesis.ID, { state: { fromHome: true } })}
                    style={{
                        fontWeight: 'medium',
                        fontSize: 18,
                        height: 60,
                        display: '-webkit-box',
                        WebkitBoxOrient: 'vertical',
                        WebkitLineClamp: '2',
                        overflow: 'hidden',
                        cursor: 'pointer',
                    }}
                >
                    {request.title}
                </Button>

                <Row style={{ fontWeight: 'medium', fontSize: 15, marginTop: 15, height: 30 }}>
                    <Col style={{ display: 'flex', alignItems: 'center' }}>
                        <Image style={{ height: 35, width: 35 }} src={Avatar} roundedCircle />
                        <span style={{ color: 'rgba(0, 0, 0, 0.8)', paddingLeft: 8 }}>{request.supervisor}</span>
                    </Col>
                    <Col style={{ display: 'flex', alignItems: 'center' }}>
                        <Image style={{ height: 35, width: 35 }} src={Avatar} roundedCircle />
                        <span style={{ color: 'rgba(0, 0, 0, 0.8)', paddingLeft: 8 }}>{request.student}</span>
                    </Col>
                </Row>
                <div
                    style={{
                        fontWeight: 'regular',
                        fontSize: 16,
                        marginTop: 20,
                        minHeight: 72,
                        color: 'rgba(0, 0, 0, 0.8)',
                        display: '-webkit-box',
                        WebkitBoxOrient: 'vertical',
                        WebkitLineClamp: '3',
                        overflow: 'hidden',
                        whiteSpace: 'pre-line',
                    }}
                >
                    {request.description}
                </div>
                {request.status == 0 ? (
                    <div style={{ marginTop: 20, textAlign: 'center' }}>
                        <span
                            className='badge'
                            style={{
                                backgroundColor: 'rgba(164, 161, 141, 0.2)',
                                color: 'rgba(164, 161, 141)',
                                padding: '1em 1em',
                                borderRadius: '0.25rem',
                                marginRight: 10,
                            }}
                        >
                            <i className='bi bi-hourglass-split' style={{ fontSize: '16px' }}></i>
                        </span>

                        <span style={{ color: 'rgba(0, 0, 0, 0.5)' }}>In review by secretary</span>
                    </div>
                ) : request.status == 1 ? (
                    <div style={{ marginTop: 20, textAlign: 'center' }}>
                        <span
                            className='badge'
                            style={{
                                backgroundColor: 'rgba(164, 161, 141, 0.2)',
                                color: 'rgba(164, 161, 141)',
                                padding: '1em 1em',
                                borderRadius: '0.25rem',
                                marginRight: 10,
                            }}
                        >
                            <i className='bi bi-hourglass-split' style={{ fontSize: '16px' }}></i>
                        </span>

                        <span style={{ color: 'rgba(0, 0, 0, 0.5)' }}>In review by supervisor</span>
                    </div>
                ) : request.status == 3 ? (
                    <div style={{ marginTop: 20, textAlign: 'center' }}>
                        <span
                            className='badge'
                            style={{
                                backgroundColor: 'rgba(164, 161, 141, 0.2)',
                                color: 'rgba(164, 161, 141)',
                                padding: '1em 1em',
                                borderRadius: '0.25rem',
                                marginRight: 10,
                            }}
                        >
                            <i className='bi bi-hourglass-split' style={{ fontSize: '16px' }}></i>
                        </span>

                        <span style={{ color: 'rgba(0, 0, 0, 0.5)' }}>Accepted</span>
                    </div>
                ) : request.status == 2 || request.status == 4 ? (
                    <div style={{ marginTop: 20, textAlign: 'center' }}>
                        <span
                            className='badge'
                            style={{
                                backgroundColor: 'rgba(234, 84, 85, 0.2)',
                                color: 'rgba(234, 84, 85)',
                                padding: '1em 1em',
                                borderRadius: '0.25rem',
                            }}
                        >
                            <i className='bi bi-x-circle' style={{ fontSize: '16px' }}></i>
                        </span>

                        <span style={{ color: 'rgba(0, 0, 0, 0.5)' }}>Rejected</span>
                    </div>
                ) : null}
            </Card>
        </Col>
    )
}

SecretaryCard.propTypes = {
    request: PropTypes.object.isRequired,
};

export default SecretaryCard