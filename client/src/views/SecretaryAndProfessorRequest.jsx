import React, { useEffect, useState } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import API from '../API'
import PropTypes from 'prop-types'
import { useLoading } from '../LoadingContext';
import Loading from '../components/Loading.jsx';
import SecretaryCard from '../components/SecretaryCard.jsx';
import RapidFilterRequest from '../components/RapidFilterRequest.jsx';

const SecretaryAndProfessorRequest = ({
    handleError,
    handleSuccess,
    accessToken,
    setShowModal,
    setMsgModal,
    rapidFilter,
    setRapidFilter,
    isProfessor
}) => {

    const { loading, setLoading } = useLoading();
    const [filteredRequests, setFilteredRequests] = useState([]);
    const [requests, setRequests] = useState([]); // 0 pending, 1 accepted by secretary, 2 rejected by secretary, 3 accepted by professor, 4 rejected by professor, 5 request change
    const [internalDirty, setInternalDirty] = useState(false);
    useEffect(() => {
        if (accessToken != null) {
            setLoading(true);
            API.getStudentThesisRequest(accessToken)
                .then((requests) => {
                    setRequests(requests);
                    setFilteredRequests(requests);
                    setLoading(false);
                    setInternalDirty(false);
                })
                .catch((err) => {
                    handleError(err.message);
                    setLoading(false);
                    setInternalDirty(false);
                });
        }
    }, [accessToken, internalDirty])

    useEffect(() => {
        if (requests.length != 0) {
            if (rapidFilter === 'secretary-review') {
                setFilteredRequests(requests.filter((request) => request.status == 0));
            } else if (rapidFilter === 'supervisor-review') {
                setFilteredRequests(requests.filter((request) => request.status == 1));
            } else if (rapidFilter === 'accepted') {
                setFilteredRequests(requests.filter((request) => request.status == 3));
            } else if (rapidFilter === 'rejected') {
                setFilteredRequests(requests.filter((request) => request.status == 2 || request.status == 4));
            } else if (rapidFilter === 'requested-change') {
                setFilteredRequests(requests.filter((request) => request.status == 5));
            }
        }
    }, [rapidFilter, requests])
    return loading ? (
        <Loading />
    ) : (
        <>
            <RapidFilterRequest rapidFilter={rapidFilter} setRapidFilter={setRapidFilter} isProfessor={isProfessor} />
            <Container>
                <Row style={{ marginBottom: 25 }}>
                    {filteredRequests.length != 0 ? (
                        filteredRequests.map((request) => (
                            <SecretaryCard
                                key={request.id}
                                accessToken={accessToken}
                                request={request}
                                setInternalDirty={setInternalDirty}
                                handleError={handleError}
                                handleSuccess={handleSuccess}
                                setShowModal={setShowModal}
                                setMsgModal={setMsgModal}
                                isProfessor={isProfessor}
                            />
                        ))) : (
                        <Col style={{ marginTop: 25 }}>
                            <p>No request to display</p>
                        </Col>
                    )}
                </Row>
            </Container>
        </>
    )
}
SecretaryAndProfessorRequest.propTypes = {
    handleError: PropTypes.func.isRequired,
    handleSuccess: PropTypes.func.isRequired,
    accessToken: PropTypes.string.isRequired,
    setShowModal: PropTypes.func.isRequired,
    setMsgModal: PropTypes.func.isRequired,
    rapidFilter: PropTypes.string.isRequired,
    setRapidFilter: PropTypes.func.isRequired,
    isProfessor: PropTypes.bool.isRequired
};

export default SecretaryAndProfessorRequest