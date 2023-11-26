import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Button, Modal } from 'react-bootstrap';


function GenericModal(props) {

    return (
        <Modal show={props.showModal} onHide={() => props.setShowModal(false)} centered>
            <Modal.Header closeButton>
                <Modal.Title>{props.msgModal.header}</Modal.Title>
            </Modal.Header>
            <Modal.Body>{props.msgModal.body}</Modal.Body>
            <Modal.Footer>
                <Button variant="outline-secondary" onClick={() => { props.setShowModal(false); }}>
                    No
                </Button>
                <Button variant="outline-primary" onClick={props.msgModal.method}>
                    Yes
                </Button>
            </Modal.Footer>
        </Modal >
    )
}

export default GenericModal;
