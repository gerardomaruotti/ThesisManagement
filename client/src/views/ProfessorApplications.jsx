import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Button, Form, InputGroup, Nav } from 'react-bootstrap';
import '../constants/custom-styles.scss';
import Loading from '../components/Loading.jsx';
import { useLoading } from '../LoadingContext.jsx';
import ProfessorApplicationCard from '../components/ProfessorApplicationCard.jsx';
import { useEffect } from 'react';
import API from '../API.jsx';

function ProfessorApplications(props) {
    const { loading, setLoading } = useLoading();

    useEffect(() => {
        setLoading(true);
        API.getApplications(props.accessToken)
            .then((applications) => {
                console.log(applications);
                //props.setApplications(applications);
                setLoading(false);
            })
            .catch((err) => {
                console.log(err);
                setLoading(false);
            });
    }, []);

    return loading ? (
        <Loading />
    ) : (
        <>
            <div style={{ position: 'sticky', top: 0, zIndex: 2, backgroundColor: 'white', boxShadow: '0 4px 2px -2px rgba(0, 0, 0, 0.2)' }}>
                <Container>
                    <Row style={{ paddingTop: 25, paddingBottom: 20 }}>
                        <Col>
                            <Nav variant='pills' activeKey='all'>
                                <Nav.Item>
                                    <Nav.Link eventKey='all' className='buttons-rapid-filter'>
                                        All
                                    </Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link eventKey='company' className='buttons-rapid-filter'>
                                        Pending
                                    </Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link eventKey='abroad' className='buttons-rapid-filter'>
                                        Assigned
                                    </Nav.Link>
                                </Nav.Item>
                            </Nav>
                        </Col>
                    </Row>
                </Container>
            </div>
            <Container>
                <Row style={{ marginBottom: 25 }}>
                    <ProfessorApplicationCard />
                    <ProfessorApplicationCard />
                    <ProfessorApplicationCard />
                </Row>
            </Container>
        </>
    );
}

export default ProfessorApplications;
