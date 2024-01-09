import PropsTypes from 'prop-types';
import { useState } from 'react';
import { Form, Container, Row, Col, Button } from 'react-bootstrap';

function ThesisRequestForm({ accessToken, handleError }) {
	const [title, setTitle] = useState('');
	const [description, setDescription] = useState('');
	const [supervisor, setSupervisor] = useState('');
	const [cosupervisors, setCosupervisors] = useState([]);

	const handleSubmit = (e) => {
		e.preventDefault();
		const newRequest = {
			title: title,
			description: description,
			supervisor: supervisor,
			cosupervisors: cosupervisors,
		};
	};

	return (
		<Form>
			<Row>
				<Col>
					<Form.Group controlId='supervisor'>
						<Form.Label>Supervisor</Form.Label>
						<Form.Control type='text' placeholder='Enter supervisor' value={supervisor} onChange={(e) => setTitle(e.target.value)} />
					</Form.Group>
					<Form.Group controlId='cosupervisors'>
						<Form.Label>Co-supervisors</Form.Label>
						<Form.Control type='text' placeholder='Enter supervisor' value={cosupervisors} onChange={(e) => setTitle(e.target.value)} />
					</Form.Group>
				</Col>
				<Col>
					<Form.Group controlId='title'>
						<Form.Label>Title</Form.Label>
						<Form.Control type='text' placeholder='Enter supervisor' value={title} onChange={(e) => setTitle(e.target.value)} />
					</Form.Group>
					<Form.Group controlId='description'>
						<Form.Label>Description</Form.Label>
						<Form.Control
							type='text'
							as='textarea'
							placeholder='Enter supervisor'
							rows={3}
							value={description}
							onChange={(e) => setDescription(e.target.value)}
						/>
					</Form.Group>
				</Col>
			</Row>
			<Container style={{ textAlign: 'center', marginTop: 20 }}>
				<Button variant='outline-secondary' className='form-button' type='cancel' onClick={() => navigate(-1)}>
					Cancel
				</Button>
				<Button variant='primary' className='form-button' type='submit'>
					Submit
				</Button>
			</Container>
		</Form>
	);
}

ThesisRequestForm.propTypes = {
	accessToken: PropsTypes.string,
	handleError: PropsTypes.func,
};

export default ThesisRequestForm;
