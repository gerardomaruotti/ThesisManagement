import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Button, Form, InputGroup, Nav } from 'react-bootstrap';
import '../constants/custom-styles.scss';
import Loading from '../components/Loading.jsx';
import { useLoading } from '../LoadingContext.jsx';
import ProfessorApplicationCard from '../components/ProfessorApplicationCard.jsx';
import { useEffect, useState } from 'react';
import API from '../API.jsx';

function ProfessorApplications(props) {
    const { loading, setLoading } = useLoading();
    const [applicationsThesis, setApplicationsThesis] = useState([]);
    const [filteredApplications, setFilteredApplications] = useState([]);
    const [rapidFilter, setRapidFilter] = useState('all');


    function unionForid(array) {
        return array.reduce(function (acc, object) {
            const key = object.id;
            if (!acc[key]) {
                acc[key] = [];
            }
            acc[key].push(object);
            return acc;
        }, {});
    }

    useEffect(() => {
        setLoading(true);
        API.getApplications(props.accessToken)
            .then((app) => {
                const appthesis = unionForid(app);
                setApplicationsThesis(appthesis);
                setFilteredApplications(appthesis);
                setLoading(false);
            })
            .catch((err) => {
                props.handleError(err);
                setLoading(false);
            });
    }, []);

    useEffect(() => {
        if (rapidFilter === 'all') {
            setFilteredApplications(applicationsThesis);
        } else if (rapidFilter === 'pending') {
            const filter = { ...applicationsThesis };
            for (const id in applicationsThesis) {
                for (const app in applicationsThesis[id]) {
                    if (applicationsThesis[id][app].state == 1) {
                        delete filter[id];
                    }
                }
            }
            setFilteredApplications(filter);
        } else if (rapidFilter === 'assigned') {
            const filter = {};
            for (const id in applicationsThesis) {
                for (const app in applicationsThesis[id]) {
                    if (applicationsThesis[id][app].state == 1) {
                        filter[id] = applicationsThesis[id];
                    }
                }
            }
            setFilteredApplications(filter);
        }
    }, [rapidFilter]);

    return loading ? (
        <Loading />
    ) : (
        <>
            <div style={{ position: 'sticky', top: 0, zIndex: 2, backgroundColor: 'white', boxShadow: '0 4px 2px -2px rgba(0, 0, 0, 0.2)' }}>
                <Container>
                    <Row style={{ paddingTop: 25, paddingBottom: 20 }}>
                        <Col>
                            <Nav variant='pills' activeKey={rapidFilter}>
                                <Nav.Item>
                                    <Nav.Link eventKey='all' className='buttons-rapid-filter' onClick={() => setRapidFilter('all')} >
                                        All
                                    </Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link eventKey='pending' className='buttons-rapid-filter' onClick={() => setRapidFilter('pending')}>
                                        Pending
                                    </Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link eventKey='assigned' className='buttons-rapid-filter' onClick={() => setRapidFilter('assigned')}>
                                        Assigned
                                    </Nav.Link>
                                </Nav.Item>
                            </Nav>
                        </Col>
                    </Row>
                </Container>
            </div >
            <Container>
                <Row style={{ marginBottom: 25 }}>
                    {filteredApplications != [] ? Object.entries(filteredApplications).map(([id, app]) =>
                        <ProfessorApplicationCard key={id} applications={app} />) : null}
                </Row>
            </Container>
        </>
    );
}

export default ProfessorApplications;