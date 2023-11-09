import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Button, Form, InputGroup } from 'react-bootstrap';
import '../constants/custom-styles.scss';


function Home() {

    return (
        <Container>
            <Row>
                <Col>
                    <InputGroup className="mb-3">
                        <Form.Control
                            placeholder="Search"
                        />
                        <Button variant="outline-primary" id="button-addon2">
                            Button
                        </Button>
                    </InputGroup>
                </Col>
            </Row>
        </Container>
    )
}

export default Home
