import PropTypes from 'prop-types';
import { Modal, Button, Form } from 'react-bootstrap';

const ModalWithUpload = ({ showModal, setShowModal, apply, setCv }) => {
	return (
		<Modal show={showModal} onHide={() => setShowModal(false)} centered>
			<Modal.Header closeButton>
				<Modal.Title>Apply</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<div>Are you sure you want to apply to this proposal?</div>
				<div>
					<br />
					<Form.Group controlId='formFile' className='mb-3'>
						<Form.Label>Upload your cv (optional)</Form.Label>
						<Form.Control type='file' accept='application/pdf' onChange={(e) => setCv(e.target.files[0])} />
					</Form.Group>
				</div>
			</Modal.Body>
			<Modal.Footer>
				<Button
					variant='outline-secondary'
					onClick={() => {
						setShowModal(false);
					}}
				>
					No
				</Button>
				<Button variant='outline-primary' onClick={apply}>
					Yes
				</Button>
			</Modal.Footer>
		</Modal>
	);
};

ModalWithUpload.propTypes = {
	showModal: PropTypes.bool,
	setShowModal: PropTypes.func,
	apply: PropTypes.func,
	setCv: PropTypes.func,
};

export default ModalWithUpload;
