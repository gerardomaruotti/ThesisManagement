import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Select from 'react-select';
import CreatableSelect from 'react-select/creatable';
import { Form, Button, Row, Col, Container, Alert } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useNavigate } from 'react-router-dom';
import { colorStyles } from '../constants/colors.js';
import API from '../API.jsx';
import dayjs from 'dayjs';

function InsertProposal(props) {
	const navigate = useNavigate();
	const { user, isAuthenticated, getAccessTokenSilently, isLoading } = useAuth0();
	const [selectedKeywords, setSelectedKeywords] = useState([]);
	const [selectedCoSupervisors, setSelectedCoSupervisors] = useState([]);
	const [selectedTypes, setselectedTypes] = useState([]);
	const [selectedLevel, setSelectedLevel] = useState('');
	const [selectedCds, setSelectedCds] = useState('');
	const [error, setError] = useState(false);
	let staticCosupervisors = [];

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
		accessToken,
	} = props;

	const levels = [
		{ value: 'BSc', label: 'BSc' },
		{ value: 'MSc', label: 'MSc' },
	];

	useEffect(() => {
		API.getAllKeywords(accessToken)
			.then((keywords) => {
				setKeywords(
					keywords.map((keyword) => {
						return { value: keyword, label: keyword };
					})
				);
			})
			.catch((err) => handleError(err));
		API.getAllTypes(accessToken)
			.then((types) => {
				setType(
					types.map((type) => {
						return { value: type, label: type };
					})
				);
			})
			.catch((err) => handleError(err));
		API.getAllSupervisors(accessToken)
			.then((cosupervisors) => {
				staticCosupervisors = cosupervisors;
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
			.catch((err) => handleError(err));
		API.getAllCds(accessToken)
			.then((cds) => {
				setCds(
					cds.map((cds) => {
						return { value: cds.cod_degree, label: cds.cod_degree + ' ' + cds.title_degree };
					})
				);
			})
			.catch((err) => handleError(err));
	}, []);

	function handleSelectedKeywords(selectedOptions) {
		setSelectedKeywords(selectedOptions);
	}

	function handleselectedTypess(selectedOptions) {
		setselectedTypes(selectedOptions);
	}

	function handleSelectedCoSupervisors(selectedOptions) {
		setSelectedCoSupervisors(selectedOptions);
	}

	function handleSelectedLevel(selectedOption) {
		setSelectedLevel(selectedOption);
	}

	function handleSelectedCds(selectedOption) {
		setSelectedCds(selectedOption);
	}

	function handleSubmit(event) {
		event.preventDefault();
		const typesValues = selectedTypes.map((type) => type.value);
		const keywordsValues = selectedKeywords.map((keyword) => keyword.value);
		const formattedDate = dayjs(expirationDate).format('DD/MM/YYYY');
		const formattedCoSupervisors = selectedCoSupervisors.map((selectedCoSupervisor) => {
			return {
				email: selectedCoSupervisor.email,
				name: selectedCoSupervisor.name,
				surname: selectedCoSupervisor.surname,
			};
		});

		const thesis = {
			title: title,
			description: description,
			required_knowledge: requiredKnowledge,
			notes: notes,
			expiration_date: formattedDate,
			level: selectedLevel.value,
			degree: selectedCds.value,
			types: typesValues,
			co_supervisors: formattedCoSupervisors,
			keywords: keywordsValues,
		};

		API.insertThesis(accessToken, thesis).then((thesisID) => {
			navigate('/proposal/' + thesisID);
		});
		props.setDirty(true);
	}

	return (
		<Container>
			<Form style={{ padding: 20, margin: 20 }} onSubmit={handleSubmit}>
				<Row>
					<Col md={4}>
						<Form.Group className='mb-3' controlId='formCoSupervisors'>
							<Form.Label>Co-supervisors</Form.Label>
							<Select isMulti options={coSupervisors} styles={colorStyles} onChange={handleSelectedCoSupervisors} />
						</Form.Group>
						<Form.Group className='mb-3' controlId='formType'>
							<Form.Label>Type</Form.Label>
							<CreatableSelect isClearable isMulti options={type} styles={colorStyles} onChange={handleselectedTypess} />
						</Form.Group>
						<Form.Group className='mb-3' controlId='formLevel'>
							<Form.Label>Level</Form.Label>
							<Select options={levels} styles={colorStyles} required onChange={handleSelectedLevel} />
						</Form.Group>
						<Form.Group className='mb-3' controlId='formCds'>
							<Form.Label>Cds</Form.Label>
							<Select options={cds} styles={colorStyles} required onChange={handleSelectedCds} />
						</Form.Group>
						<Form.Group className='mb-3' controlId='formExpirationDate'>
							<Form.Label>Expiration date</Form.Label>
							<Form.Control type='date' required onChange={(event) => setExpirationDate(event.target.value)} />
						</Form.Group>
						<Form.Group className='mb-3' controlId='formKeywords'>
							<Form.Label>Keywords</Form.Label>
							<CreatableSelect isClearable isMulti options={keywords} styles={colorStyles} onChange={handleSelectedKeywords} />
						</Form.Group>
					</Col>
					<Col md={8}>
						<Form.Group className='mb-3' controlId='formTitle'>
							<Form.Label>Title</Form.Label>
							<Form.Control
								type='text'
								required
								placeholder='Enter title'
								style={{ fontWeight: 'bold' }}
								onChange={(event) => setTitle(event.target.value)}
							/>
						</Form.Group>
						<Form.Group className='mb-3' controlId='formDescription'>
							<Form.Label>Description</Form.Label>
							<Form.Control as='textarea' required placeholder='Enter description' onChange={(event) => setDescription(event.target.value)} />
						</Form.Group>
						<Form.Group className='mb-3' controlId='formRequiredKnowledge'>
							<Form.Label>Required knowledge</Form.Label>
							<Form.Control as='textarea' placeholder='Enter required knowledge' onChange={(event) => setRequiredKnowledge(event.target.value)} />
						</Form.Group>
						<Form.Group className='mb-3' controlId='formNotes'>
							<Form.Label>Notes</Form.Label>
							<Form.Control as='textarea' placeholder='Enter notes' onChange={(event) => setNotes(event.target.value)} />
						</Form.Group>
					</Col>
				</Row>
				<Container style={{ textAlign: 'center', marginTop: 10 }}>
					<Button variant='secondary' className='form-button' style={{ color: 'white' }} type='cancel' onClick={() => navigate('/')}>
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
