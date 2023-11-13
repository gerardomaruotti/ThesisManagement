import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Select from 'react-select';
import CreatableSelect from 'react-select/creatable';
import { Form, Button, Row, Col, Container } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useNavigate } from 'react-router-dom';
import { colorStyles } from '../constants/colors.js';
import API from '../API.jsx';

function InsertProposal(props) {
	const navigate = useNavigate();
	const { user, isAuthenticated, getAccessTokenSilently, isLoading } = useAuth0();
	const [selectedKeywords, setSelectedKeywords] = useState([]);
	const [selectedCoSupervisors, setSelectedCoSupervisors] = useState([]);
	const [selectedType, setSelectedType] = useState([]);
	const [selectedLevel, setSelectedLevel] = useState('');
	const [selectedCds, setSelectedCds] = useState('');


	const {
		title,
		setTitle,
		requiredKnowledge,
		setRequiredKnowledge,
		description,
		setDescription,
		notes,
		setNotes,
		keywords,
		setKeywords,
		supervisor,
		setSupervisor,
		coSupervisors,
		setCoSupervisors,
		level,
		setLevel,
		cds,
		setCds,
		type,
		setType,
		expirationDate,
		setExpirationDate,
	} = props;

	const levels = [
		{ value: 'BSc', label: 'BSc' },
		{ value: 'MSc', label: 'MSc' },
	];

	useEffect(() => {
		API.getAllKeywords()
			.then((keywords) => {
				setKeywords(keywords.map((keyword) => { return { value: keyword, label: keyword } }));
			})
			.catch((err) => handleError(err));
		API.getAllTypes()
			.then((types) => {
				setType(types.map((type) => { return { value: type, label: type } }));
			})
			.catch((err) => handleError(err));
		API.getAllSupervisors()
			.then((cosupervisors) => {
				setCoSupervisors(cosupervisors.map((cosupervisor) => { return { value: cosupervisor.email, label: cosupervisor.name + " " + cosupervisor.surname } }));
			})
			.catch((err) => handleError(err));
		API.getAllCds()
			.then((cds) => {
				setCds(cds.map((cds) => { return { value: cds.cod_degree, label: cds.cod_degree + " " + cds.title_degree } }));
			})
			.catch((err) => handleError(err));
	}, []);

	function handleSubmit(event) {
		event.preventDefault();
		console.log('Submitted');
	}

	function handleChange(event) {
		console.log(event);
	}

	return (
		<Container>
			<Form style={{ padding: 20, margin: 20 }} onSubmit={handleSubmit}>
				<Row>
					<Col md={4}>
						<Form.Group className='mb-3' controlId='formCoSupervisors'>
							<Form.Label>Co-supervisors</Form.Label>
							<Select isMulti options={coSupervisors} styles={colorStyles} />
						</Form.Group>
						<Form.Group className='mb-3' controlId='formType'>
							<Form.Label>Type</Form.Label>
							<CreatableSelect isClearable isMulti options={type} styles={colorStyles} />
							{/* <Select isMulti options={[]} /> */}
						</Form.Group>
						<Form.Group className='mb-3' controlId='formLevel'>
							<Form.Label>Level</Form.Label>
							<Select options={levels} styles={colorStyles} />
						</Form.Group>
						<Form.Group className='mb-3' controlId='formCds'>
							<Form.Label>Cds</Form.Label>
							<Select options={cds} />
						</Form.Group>
						<Form.Group className='mb-3' controlId='formExpirationDate'>
							<Form.Label>Expiration date</Form.Label>
							<Form.Control type='date' />
						</Form.Group>
						<Form.Group className='mb-3' controlId='formKeywords'>
							<Form.Label>Keywords</Form.Label>
							<CreatableSelect isClearable isMulti options={keywords} styles={colorStyles} />
							{/* <Select isMulti options={[]} /> */}
						</Form.Group>
						{/* <Button variant='secondary' className='form-button' type='reset'>
								Reset
							</Button> */}
					</Col>
					<Col md={8}>
						<Form.Group className='mb-3' controlId='formTitle'>
							<Form.Label>Title</Form.Label>
							<Form.Control type='text' placeholder='Enter title' style={{ fontWeight: 'bold' }} />
						</Form.Group>
						<Form.Group className='mb-3' controlId='formDescription'>
							<Form.Label>Description</Form.Label>
							<Form.Control as='textarea' placeholder='Enter description' />
						</Form.Group>
						<Form.Group className='mb-3' controlId='formRequiredKnowledge'>
							<Form.Label>Required knowledge</Form.Label>
							<Form.Control as='textarea' placeholder='Enter required knowledge' />
						</Form.Group>
						<Form.Group className='mb-3' controlId='formNotes'>
							<Form.Label>Notes</Form.Label>
							<Form.Control as='textarea' placeholder='Enter notes' />
						</Form.Group>
					</Col>
				</Row>
				<Container style={{ textAlign: 'center', marginTop: 10 }}>
					<Button variant='secondary' className='form-button' style={{ color: 'white' }} type='cancel' onClick={() => navigate('/professor')}>
						Cancel
					</Button>
					<Button variant='primary' className='form-button' type='submit'>
						Insert Proposal
					</Button>
				</Container>
			</Form>
		</Container>
	);
}

export default InsertProposal;
