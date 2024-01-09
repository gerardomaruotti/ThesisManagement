import PropsTypes from 'prop-types';
import Select from 'react-select';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { colorStyles } from '../constants/colors.js';
import { Form, Container, Row, Col, Button } from 'react-bootstrap';
import API from '../API.jsx';

function ThesisRequestForm({ accessToken, handleError }) {
	const navigate = useNavigate();
	const [title, setTitle] = useState('');
	const [description, setDescription] = useState('');
	const [supervisor, setSupervisor] = useState('');
	const [coSupervisors, setCoSupervisors] = useState([]);
	const [selectedCoSupervisors, setSelectedCoSupervisors] = useState([]);
	const [supervisors, setSupervisors] = useState([]);

	useEffect(() => {
		if (accessToken) {
			API.getAllSupervisors(accessToken)
				.then((cosupervisors) => {
					setCoSupervisors(
						cosupervisors.map((cosupervisor) => {
							return {
								value: cosupervisor.email,
								label: cosupervisor.name + ' ' + cosupervisor.surname,
								email: cosupervisor.email,
								name: cosupervisor.name,
								surname: cosupervisor.surname,
							};
						})
					);
				})
				.catch((err) => handleError(err.message));
		}
	}, [accessToken]);

	useEffect(() => {
		setSupervisors(coSupervisors);
	}, [coSupervisors]);

	const handleSubmit = (e) => {
		e.preventDefault();
		const formattedCoSupervisors = selectedCoSupervisors.map((selectedCoSupervisor) => {
			return {
				email: selectedCoSupervisor.email,
				name: selectedCoSupervisor.name,
				surname: selectedCoSupervisor.surname,
			};
		});

		const newRequest = {
			title: title,
			description: description,
			supervisor: supervisor.email.split('@')[0],
			co_supervisors: formattedCoSupervisors,
		};

		API.insertThesisRequest(accessToken, newRequest)
			.then(() => navigate(-1))
			.catch((err) => handleError(err.error));
	};

	function handleSelectSupervisor(selectedOption) {
		setSupervisor(selectedOption);
	}

	function handleSelectedCoSupervisors(selectedOptions) {
		setSelectedCoSupervisors(selectedOptions);
	}

	return (
		<Form onSubmit={handleSubmit}>
			<Row>
				<Col>
					<Form.Group className='mb-3' controlId='formCoSupervisors'>
						<Form.Label>Supervisor*</Form.Label>
						<Select required value={supervisor} isClearable options={supervisors} styles={colorStyles} onChange={handleSelectSupervisor} />
					</Form.Group>
					<Form.Group className='mb-3' controlId='formCoSupervisors'>
						<Form.Label>Co-supervisors</Form.Label>
						<Select value={selectedCoSupervisors} isMulti options={coSupervisors} styles={colorStyles} onChange={handleSelectedCoSupervisors} />
					</Form.Group>
				</Col>
				<Col>
					<Form.Group controlId='title'>
						<Form.Label>Title*</Form.Label>
						<Form.Control
							required
							type='text'
							placeholder='Enter title'
							style={{ fontWeight: 'bold' }}
							value={title}
							onChange={(e) => setTitle(e.target.value)}
						/>
					</Form.Group>
					<Form.Group controlId='description'>
						<Form.Label>Description*</Form.Label>
						<Form.Control
							required
							type='text'
							as='textarea'
							placeholder='Enter description'
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
