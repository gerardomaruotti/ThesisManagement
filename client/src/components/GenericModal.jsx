import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Button, Modal } from 'react-bootstrap';
import PropTypes from 'prop-types';

function GenericModal({ showModal, setShowModal, msgModal }) {
	return (
		<Modal show={showModal} onHide={() => setShowModal(false)} centered>
			<Modal.Header closeButton>
				<Modal.Title>{msgModal.header}</Modal.Title>
			</Modal.Header>
			<Modal.Body>{msgModal.body}</Modal.Body>
			<Modal.Footer>
				<Button
					variant='outline-secondary'
					onClick={() => {
						setShowModal(false);
					}}
				>
					No
				</Button>
				<Button variant='outline-primary' onClick={msgModal.method}>
					Yes
				</Button>
			</Modal.Footer>
		</Modal>
	);
}

GenericModal.propTypes = {
	showModal: PropTypes.bool,
	setShowModal: PropTypes.func,
	msgModal: PropTypes.object,
};

export default GenericModal;
