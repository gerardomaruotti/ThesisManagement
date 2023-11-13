import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, Button, Container, Form, Row, Col } from 'react-bootstrap';
import Select from 'react-select';
import { colorStyles } from '../constants/colors.js';


function FiltersModal(props) {
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
                                    <Select isMulti options={[]} styles={colorStyles} />
                                </Form.Group>
                                <Form.Group className='mb-3' controlId='formCoSupervisors'>
                                    <Form.Label>Co-supervisors</Form.Label>
                                    <Select isMulti options={[]} styles={colorStyles} />
                                </Form.Group>
                                <Form.Group className='mb-3' controlId='formKeywords'>
                                    <Form.Label>Keywords</Form.Label>
                                    <Select isMulti options={[]} styles={colorStyles} />
                                </Form.Group>
                                <Form.Group className='mb-3' controlId='formGroups'>
                                    <Form.Label>Groups</Form.Label>
                                    <Select isMulti options={[]} styles={colorStyles} />
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group className='mb-3' controlId='formTypes'>
                                    <Form.Label>Types</Form.Label>
                                    <Select isMulti options={[]} styles={colorStyles} />
                                </Form.Group>
                                <Form.Group className='mb-3' controlId='formExpirationDate'>
                                    <Form.Label>Expiration date:</Form.Label>
                                    <Form.Check
                                        label="All"
                                        name="expirationDate"
                                        type="radio"
                                    />
                                    <Form.Check
                                        label="This week"
                                        name="expirationDate"
                                        type="radio"
                                    />
                                    <Form.Check
                                        label="This month"
                                        name="expirationDate"
                                        type="radio"
                                    />
                                    <Form.Check
                                        label="This year"
                                        name="expirationDate"
                                        type="radio"
                                    />
                                </Form.Group>
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