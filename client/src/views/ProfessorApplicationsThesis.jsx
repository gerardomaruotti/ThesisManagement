import 'bootstrap/dist/css/bootstrap.min.css';
import { Row, Col, Card, Table, Button, Container, Toast, ToastContainer, Offcanvas, Badge } from 'react-bootstrap';


import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import API from '../API.jsx';
import { useLoading } from '../LoadingContext.jsx';
import Loading from '../components/Loading.jsx';
import DetailsProposalLeftBar from '../components/DetailsProposalLeftBar.jsx';

function ProfessorApplicationsThesis(props) {
    const { loading, setLoading } = useLoading();
    const navigate = useNavigate();
    const [thesis, setThesis] = useState(null);
    const [popup, setPopup] = useState(false);
    const [msgAndColor, setMsgAndColor] = useState({ header: '', msg: '', color: '' });
    const [showDetails, setShowDetails] = useState(false);
    const [applicationsThesis, setApplicationsThesis] = useState([]);

    const { id } = useParams();

    const handleClose = () => setShowDetails(false);
    const handleShow = () => setShowDetails(true);

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
                setApplicationsThesis(appthesis[id]);
                setLoading(false);
            })
            .catch((err) => {
                props.handleError(err);
                setLoading(false);
            });
    }, []);

    useEffect(() => {
        if (props.accessToken != null) {
            setLoading(true);
            API.getThesisByID(id, props.accessToken)
                .then((thesis) => {
                    setThesis(thesis);
                })
                .catch((err) => {
                    props.handleError(err);
                })
                .finally(() => {
                    setLoading(false);
                });
        }
    }, [props.accessToken]);

    function apply() {
        API.ThesisApply(id, props.accessToken)
            .then(() => {
                setMsgAndColor({ header: 'Application successful', msg: 'Successful application to the thesis ' + thesis.title, color: 'success' });
                setPopup(true);
            })
            .catch(() => {
                setMsgAndColor({
                    header: 'Application failed',
                    msg: 'You have already sent an application for this thesis or you do not have authorization',
                    color: 'danger',
                });
                setPopup(true);
            });
    }


    return loading ? (
        <Loading />
    ) : (
        <>
            <Container style={{ marginTop: 25, marginBottom: 25 }}>
                {thesis == null ? null : (
                    <Row>
                        <Col md={4} className='d-none d-md-flex'>
                            <Card style={{ padding: 20, paddingBottom: 30, position: 'sticky', top: 25 }} className='custom-card'>
                                <DetailsProposalLeftBar thesis={thesis} apply={apply} isProfessor={props.isProfessor} />
                            </Card>
                        </Col>
                        <Col md={8} sm={12}>
                            <Card style={{ padding: 20 }} className='custom-card'>
                                <Row>
                                    <Col className='d-flex align-items-center d-none d-md-flex'>
                                        <Button variant='outline-primary' style={{ borderRadius: 50, width: 75 }} onClick={() => navigate('/applications')}>
                                            <i className='bi bi-arrow-left'></i>
                                        </Button>
                                    </Col>
                                    <Col md={10}>
                                        <div style={{ fontWeight: 'bold', fontSize: 30 }}>{thesis.title}</div>
                                    </Col>
                                </Row>
                                <Row style={{ marginTop: 45 }}>
                                    <Col lg={2} md={3}>
                                        <div style={{ fontWeight: 'bold', fontSize: 20 }}> Status: </div>
                                    </Col>
                                    <Col lg={3} md={4}>
                                        {applicationsThesis.filter((app) => app.state == 1).length > 0 ?
                                            (<div style={{ fontWeight: 'medium', fontSize: 15 }}>
                                                <span
                                                    className='badge'
                                                    style={{ backgroundColor: 'rgba(40, 199, 111, 0.2)', color: 'rgba(40, 199, 111, 1)', padding: '1em 1em', borderRadius: '0.25rem' }}
                                                >
                                                    <i className='bi bi-person-check' style={{ fontSize: '16px' }}></i>
                                                </span>
                                                <span style={{ paddingLeft: 8, color: 'rgba(0, 0, 0, 0.5)' }}>Assigned</span>
                                            </div>) :
                                            (<div style={{ fontWeight: 'medium', fontSize: 15 }}>
                                                <span
                                                    className='badge'
                                                    style={{ backgroundColor: 'rgba(164, 161, 141, 0.2)', color: 'rgba(164, 161, 141, 1)', padding: '1em 1em', borderRadius: '0.25rem' }}
                                                >
                                                    <i className='bi bi-hourglass-split' style={{ fontSize: '16px' }}></i>
                                                </span>
                                                <span style={{ paddingLeft: 8, color: 'rgba(0, 0, 0, 0.5)' }}>Pending</span>
                                            </div>)}
                                    </Col>
                                </Row>
                                <Row style={{ marginTop: 32 }}>
                                    <Col>
                                        <div style={{ fontWeight: 'bold', fontSize: 20 }}> List of applications: </div>
                                    </Col>
                                </Row>
                                <Row style={{ marginTop: 18 }}>
                                    <Col>
                                        <Table responsive hover style={{ textAlign: 'center' }}>
                                            <thead>
                                                <tr>
                                                    <th>Student ID</th>
                                                    <th>Name</th>
                                                    <th>Surname</th>
                                                    <th>Email</th>
                                                    <th>Curriculum</th>
                                                    <th>Status</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {applicationsThesis != [] ? applicationsThesis.map((app) => (
                                                    <tr key={app.student}>
                                                        <td>{app.student}</td>
                                                        <td>{app.name}</td>
                                                        <td>{app.surname}</td>
                                                        <td>{app.email}</td>
                                                        <td><Button variant='light'><i className="bi bi-file-earmark-text"></i></Button></td>
                                                        <td>
                                                            {app.state == 1 ? <span className='badge custom-badge-success'>Assigned</span> :
                                                                app.state == 2 ? <span className='badge custom-badge-danger'>Rejected</span> :
                                                                    app.state == 3 ? <span className='badge custom-badge-warning'>Cancelled</span> :
                                                                        <div>
                                                                            <Button variant='outline-success' style={{ borderRadius: 100 }} size='sm'>
                                                                                <i className="bi bi-check2"></i>
                                                                            </Button>
                                                                            <Button variant='outline-danger' style={{ borderRadius: 100, marginLeft: 8 }} size='sm'>
                                                                                <i className="bi bi-x-lg"></i>
                                                                            </Button>
                                                                        </div>
                                                            }
                                                        </td>
                                                    </tr>
                                                )) : null}
                                            </tbody>
                                        </Table>
                                    </Col>
                                </Row>
                                <Col className='d-md-none' style={{ textAlign: 'center', marginTop: 20 }}>
                                    <Button variant='primary' onClick={handleShow}>
                                        Show more details
                                    </Button>
                                </Col>
                            </Card>
                        </Col>
                    </Row>
                )}
            </Container>

            <Offcanvas show={showDetails} onHide={handleClose}>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Details</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <DetailsProposalLeftBar thesis={thesis} apply={apply} isProfessor={props.isProfessor} />
                </Offcanvas.Body>
            </Offcanvas>

            <ToastContainer style={{ position: 'fixed', top: 20, right: 20, zIndex: 10 }} className='p-3'>
                <Toast bg={msgAndColor.color} onClose={() => setPopup(false)} show={popup} delay={5000} autohide>
                    <Toast.Header>
                        <strong className='me-auto'>{msgAndColor.header}</strong>
                    </Toast.Header>
                    <Toast.Body>{msgAndColor.msg}</Toast.Body>
                </Toast>
            </ToastContainer>
        </>
    );
}

export default ProfessorApplicationsThesis;
