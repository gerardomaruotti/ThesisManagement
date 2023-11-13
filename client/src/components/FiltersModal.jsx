import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, Button, Container, Form, Row, Col } from 'react-bootstrap';
import Select from 'react-select';
import { colorStyles } from '../constants/colors.js';
import { useEffect, useState } from 'react';
import API from '../API.jsx';


function FiltersModal(props) {
    const [keywords, setKeywords] = useState([]);
    const [types, setTypes] = useState([]);
    const [supervisors, setSupervisors] = useState([]);
    const [expirationDate, setExpirationDate] = useState('all');

    useEffect(() => {
        API.getAllKeywords()
            .then((keywords) => {
                setKeywords(keywords.map((keyword) => { return { value: keyword, label: keyword } }));
            })
            .catch((err) => handleError(err));
        API.getAllTypes()
            .then((types) => {
                setTypes(types.map((type) => { return { value: type, label: type } }));
            })
            .catch((err) => handleError(err));
        API.getAllSupervisors()
            .then((supervisors) => {
                setSupervisors(supervisors.map((supervisor) => { return { value: supervisor.email, label: supervisor.name + " " + supervisor.surname } }));
            })
            .catch((err) => handleError(err));
    }, []);

    function handleExpirationDate(event) {
        setExpirationDate(event.target.value);
    };

    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Filters of search
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Container>
                    <Form>
                        <Row>
                            <Col md={6}>
                                <Form.Group className='mb-3' controlId='formCoSupervisors'>
                                    <Form.Label>Supervisors</Form.Label>
                                    <Select isMulti options={supervisors} styles={colorStyles} />
                                </Form.Group>
                                <Form.Group className='mb-3' controlId='formCoSupervisors'>
                                    <Form.Label>Co-supervisors</Form.Label>
                                    <Select isMulti options={supervisors} styles={colorStyles} />
                                </Form.Group>
                                <Form.Group className='mb-3' controlId='formKeywords'>
                                    <Form.Label>Keywords</Form.Label>
                                    <Select isMulti options={keywords} styles={colorStyles} />
                                </Form.Group>
                                <Form.Group className='mb-3' controlId='formGroups'>
                                    <Form.Label>Groups</Form.Label>
                                    <Select isMulti options={[]} styles={colorStyles} />
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group className='mb-3' controlId='formTypes'>
                                    <Form.Label>Types</Form.Label>
                                    <Select isMulti options={types} styles={colorStyles} />
                                </Form.Group>
                                <Form.Label>Expiration date:</Form.Label>
                                <div className='mb-3'>
                                    <Form.Check
                                        label="All"
                                        name="expirationDate"
                                        type="radio"
                                        value='all'
                                        checked={expirationDate === 'all'}
                                        onChange={handleExpirationDate}
                                        id='all'
                                    />
                                    <Form.Check
                                        label="This week"
                                        name="expirationDate"
                                        type="radio"
                                        value='thisWeek'
                                        checked={expirationDate === 'thisWeek'}
                                        onChange={handleExpirationDate}
                                        id='thisWeek'
                                    />
                                    <Form.Check
                                        label="This month"
                                        name="expirationDate"
                                        type="radio"
                                        value='thisMonth'
                                        checked={expirationDate === 'thisMonth'}
                                        onChange={handleExpirationDate}
                                        id='thisMonth'
                                    />
                                    <Form.Check
                                        label="This year"
                                        name="expirationDate"
                                        type="radio"
                                        value='thisYear'
                                        checked={expirationDate === 'thisYear'}
                                        onChange={handleExpirationDate}
                                        id='thisYear'
                                    />
                                </div>
                            </Col>
                        </Row>
                    </Form>
                </Container>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onHide}>Apply filters</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default FiltersModal;