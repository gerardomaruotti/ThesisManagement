import { useState, useContext } from 'react';
import UserContext from '../contexts/UserContext';
import PropTypes from 'prop-types';
import { Modal, Button, Form } from 'react-bootstrap';
import API from '../API';
import { handleError, handleSuccess } from '../utils/toastHandlers';

const ModalWithTextField = ({ showModal, setShowModal, requestID, setInternalDirty }) => {
	const { accessToken } = useContext(UserContext);
	const [notes, setNotes] = useState('');

	function requestChange() {
		API.changeRequestProfessor(accessToken, requestID, notes)
			.then(() => {
				setNotes('');
				handleSuccess('Request change sent correctly');
				setShowModal(false);
				setInternalDirty(true);
			})
			.catch((err) => {
				handleError(err);
			});
	}
	return (
		<Modal show={showModal} onHide={() => setShowModal(false)} centered>
			<Modal.Header closeButton>
				<Modal.Title>Request change</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Form.Group className='mb-3' controlId='exampleForm.ControlTextarea1'>
					<Form.Label>What changes should the student make?</Form.Label>
					<Form.Control as='textarea' rows={3} value={notes} onChange={(e) => setNotes(e.target.value)} />
				</Form.Group>
			</Modal.Body>
			<Modal.Footer>
				<Button
					variant='outline-secondary'
					onClick={() => {
						setShowModal(false);
					}}
				>
					Cancel
				</Button>
				<Button variant='outline-primary' onClick={requestChange}>
					Request change
				</Button>
			</Modal.Footer>
		</Modal>
	);
};

ModalWithTextField.propTypes = {
	showModal: PropTypes.bool.isRequired,
	setShowModal: PropTypes.func.isRequired,
	requestID: PropTypes.number,
	setInternalDirty: PropTypes.func.isRequired,
};

export default ModalWithTextField;
