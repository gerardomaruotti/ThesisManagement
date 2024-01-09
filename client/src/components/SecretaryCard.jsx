import React, { useState } from 'react'
import { Card, Col, Button, Image } from 'react-bootstrap'
import PropTypes from 'prop-types';
import Avatar from '../assets/avatar.svg';
import API from '../API';
import { useNavigate } from 'react-router-dom';


const SecretaryCard = ({ request, setInternalDirty, accessToken, handleError, handleSuccess, setShowModal, setMsgModal }) => {
    const navigate = useNavigate();
    const styleStatus =
        request.status == 0 ? {
            backgroundColor: 'rgba(164, 161, 141, 0.2)',
            color: 'rgba(164, 161, 141)',
            icon: <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '14px', height: '14px' }}>
                <i className='bi bi-headphones' style={{ fontSize: '18px' }}></i>
                <i className='bi bi-hourglass-split' style={{ fontSize: '10px', alignSelf: 'flex-end' }}></i>
            </div>,
            text: 'In review by secretary',
        } : request.status == 1 ? {
            backgroundColor: 'rgba(164, 161, 141, 0.2)',
            color: 'rgba(164, 161, 141)',
            icon: <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '14px', height: '14px' }}>
                <i className='bi bi-person' style={{ fontSize: '18px' }}></i>
                <i className='bi bi-hourglass-split' style={{ fontSize: '10px', alignSelf: 'flex-end' }}></i>
            </div>,
            text: 'In review by supervisor',
        } : request.status == 3 ? {
            backgroundColor: 'rgba(1, 133, 114, 0.2)',
            color: 'rgba(1, 133, 114)',
            icon: <i className='bi bi-check-circle' style={{ fontSize: '16px' }}></i>,
            text: 'Accepted',
        } : request.status == 2 || request.status == 4 ? {
            backgroundColor: 'rgba(234, 84, 85, 0.2)',
            color: 'rgba(234, 84, 85)',
            icon: <i className='bi bi-x-circle' style={{ fontSize: '16px' }}></i>,
            text: 'Rejected',
        } : null;

    function acceptRequest() {
        setShowModal(false);
        API.approveRequestRecretary(accessToken, request.id)
            .then(() => {
                handleSuccess('Request accepted');
                setInternalDirty(true);
            })
            .catch((err) => {
                handleError(err);
            });
    }

    function rejectRequest() {
        setShowModal(false);
        API.rejectRequestRecretary(accessToken, request.id)
            .then(() => {
                handleSuccess('Request rejected');
                setInternalDirty(true);
            })
            .catch((err) => {
                handleError(err);
            });
    }

    return (
        <Col lg={6} sm={12} style={{ marginTop: 25 }}>
            <Card style={{ padding: 20 }} className='custom-card'>
                <Button
                    className='title'
                    variant='link'
                    onClick={() => navigate('/requests/' + request.id)}
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

                <div className='d-flex justify-content-around' style={{ fontSize: 14, marginTop: 15, height: 30 }}>
                    <div className='d-flex flex-row align-items-center'>
                        <Image style={{ height: 35, width: 35 }} src={Avatar} roundedCircle />
                        <div className='d-flex flex-column'>
                            <span style={{ color: 'rgba(0, 0, 0, 0.8)', paddingLeft: 8, fontWeight: 400 }}>Supervisor:</span>
                            <span style={{ color: 'rgba(0, 0, 0, 0.6)', fontWeight: 'regular', fontSize: 13, paddingLeft: 8, }}>{request.nameT + " " + request.surnameT}</span>
                        </div>
                    </div>
                    <div className='d-flex flex-row align-items-center'>
                        <Image style={{ height: 35, width: 35 }} src={Avatar} roundedCircle />
                        <div className='d-flex flex-column'>
                            <span style={{ color: 'rgba(0, 0, 0, 0.8)', paddingLeft: 8, fontWeight: 400 }}>Student:</span>
                            <span style={{ color: 'rgba(0, 0, 0, 0.6)', fontWeight: 'regular', fontSize: 13, paddingLeft: 8 }}>{request.nameS + " " + request.surnameS}</span>
                        </div>
                    </div>
                </div>
                <div
                    style={{
                        fontWeight: 'regular',
                        fontSize: 14,
                        marginTop: 20,
                        minHeight: 68,
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
                <div className='d-flex justify-content-around align-items-center' style={{ marginTop: 20, textAlign: 'center' }}>
                    <div>
                        <span
                            className='badge'
                            style={{
                                backgroundColor: styleStatus.backgroundColor,
                                color: styleStatus.color,
                                padding: '1em 1em',
                                borderRadius: '0.25rem',
                            }}
                        >
                            {styleStatus.icon}
                        </span>
                        <span style={{ color: 'rgba(0, 0, 0, 0.5)', fontSize: 14, paddingLeft: 10 }}>{styleStatus.text}</span>
                    </div>
                    {!request.status == 0 ? null : (
                        <div className='d-flex flex-row'>
                            <Button
                                variant="link"
                                className='buttonHover'
                                style={{ textDecoration: 'none', color: 'green' }}
                                onClick={() => {
                                    setShowModal(true);
                                    setMsgModal({
                                        header: 'Accept request',
                                        body: `Are you sure you want to Accept the request of student ${request.student}?`,
                                        method: () => acceptRequest(),
                                    });
                                }
                                }>
                                <div className="d-flex align-items-center">
                                    <i className="bi bi-check-circle mobile-view" style={{ fontSize: '16px', paddingRight: 8, color: 'green' }}></i>
                                    <span className='d-none d-md-flex'>Accept</span>
                                </div>
                            </Button>
                            <Button
                                variant="link"
                                className='buttonHover2'
                                style={{ textDecoration: 'none', color: 'rgba(234, 84, 85)' }}
                                onClick={() => {
                                    setShowModal(true);
                                    setMsgModal({
                                        header: 'Reject request',
                                        body: `Are you sure you want to reject the request of student ${request.student}?`,
                                        method: () => rejectRequest(),
                                    });
                                }}>
                                <div className="d-flex align-items-center">
                                    <i className="bi bi-x-circle mobile-view" style={{ fontSize: '16px', paddingRight: 8, color: 'rgba(234, 84, 85)' }}></i>
                                    <span className='d-none d-md-flex'>Reject</span>
                                </div>
                            </Button>
                        </div>
                    )}
                </div>
            </Card>
        </Col>
    )
}

SecretaryCard.propTypes = {
    request: PropTypes.object.isRequired,
    setInternalDirty: PropTypes.func.isRequired,
    accessToken: PropTypes.string.isRequired,
    handleError: PropTypes.func.isRequired,
    handleSuccess: PropTypes.func.isRequired,
    setShowModal: PropTypes.func.isRequired,
    setMsgModal: PropTypes.func.isRequired,
};

export default SecretaryCard;