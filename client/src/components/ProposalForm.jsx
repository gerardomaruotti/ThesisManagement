import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Select from 'react-select';
import CreatableSelect from 'react-select/creatable';
import { Form, Button, Row, Col, Container, Alert } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { colorStyles } from '../constants/colors.js';
import API from '../API.jsx';
import dayjs from 'dayjs';

function ProposalForm(props) {
	const navigate = useNavigate();
	const { accessToken, user, handleError } = props;

	const [title, setTitle] = useState(props.thesis ? props.thesis.title : '');
	const [requiredKnowledge, setRequiredKnowledge] = useState(props.thesis ? props.thesis.requiredKnowledge : '');
	const [description, setDescription] = useState(props.thesis ? props.thesis.description : '');
	const [notes, setNotes] = useState(props.thesis ? props.thesis.notes : '');
	const [keywords, setKeywords] = useState([]);
	const [coSupervisors, setCoSupervisors] = useState([]);
	const [cds, setCds] = useState('');
	const [type, setType] = useState([]);
	const [expirationDate, setExpirationDate] = useState(props.thesis ? dayjs(props.thesis.expirationDate).format('YYYY-MM-DD') : '');
	const levels = [
		{ value: 'BSc', label: 'BSc' },
		{ value: 'MSc', label: 'MSc' },
	];
	const [selectedKeywords, setSelectedKeywords] = useState(
		props.thesis
			? props.thesis.keywords.map((keyword) => {
				return { value: keyword, label: keyword };
			})
			: []
	);
	const [selectedCoSupervisors, setSelectedCoSupervisors] = useState(
		props.thesis
			? props.thesis.coSupervisors
				.filter((cosupervisor) => cosupervisor.ID !== user.id)
				.map((cosupervisor) => {
					return {
						value: cosupervisor.email,
						label: cosupervisor.name + ' ' + cosupervisor.surname,
						email: cosupervisor.email,
						name: cosupervisor.name,
						surname: cosupervisor.surname,
					};
				})
			: []
	);
	const [selectedTypes, setselectedTypes] = useState(
		props.thesis
			? props.thesis.types.map((type) => {
				return { value: type, label: type };
			})
			: []
	);
	const [selectedLevel, setSelectedLevel] = useState(props.thesis ? { value: props.thesis.level, label: props.thesis.level } : '');
	const [selectedCds, setSelectedCds] = useState(props.thesis ? { value: props.thesis.codeDegree, label: props.thesis.cds } : '');

	useEffect(() => {
		if (props.thesis) {
			setTitle(props.thesis.title);
			setDescription(props.thesis.description);
			setRequiredKnowledge(props.thesis.requiredKnowledge);
			setNotes(props.thesis.notes);
			setSelectedCoSupervisors(
				props.thesis.coSupervisors
					.filter((cosupervisor) => cosupervisor.ID !== user.id)
					.map((cosupervisor) => {
						return {
							value: cosupervisor.email,
							label: cosupervisor.name + ' ' + cosupervisor.surname,
							email: cosupervisor.email,
							name: cosupervisor.name,
							surname: cosupervisor.surname,
						};
					})
			);
			setselectedTypes(
				props.thesis.types.map((type) => {
					return { value: type, label: type };
				})
			);
			setSelectedLevel({ value: props.thesis.level, label: props.thesis.level });
			setSelectedCds({ value: props.thesis.codeDegree, label: props.thesis.cds });
			setSelectedKeywords(
				props.thesis.keywords.map((keyword) => {
					return { value: keyword, label: keyword };
				})
			);
			setExpirationDate(dayjs(props.thesis.expirationDate).format('YYYY-MM-DD'));
		}
	}, [props.thesis]);

	useEffect(() => {
		setCds([
			{
				value: '',
				label: '',
			},
		]);
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
				setCoSupervisors(
					cosupervisors
						.filter((cosupervisor) => cosupervisor.ID !== user.id)
						.map((cosupervisor) => {
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
	}, [props.thesis]);

	useEffect(() => {
		if (selectedLevel === null) {
			setSelectedCds('');
		}
		API.getAllCds(accessToken)
			.then((cds) => {
				if (selectedLevel && typeof selectedLevel === 'object') {
					if (selectedLevel.value === 'BSc') {
						cds = cds.filter((cds) => cds.cod_degree.startsWith('L-'));
					} else if (selectedLevel.value === 'MSc') {
						cds = cds.filter((cds) => cds.cod_degree.startsWith('LM-'));
					}
				}
				setCds(
					cds.map((cds) => {
						return { value: cds.cod_degree, label: cds.cod_degree + ' ' + cds.title_degree };
					})
				);
			})
			.catch((err) => handleError(err));
	}, [selectedLevel]);

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
		const formattedDate = dayjs(expirationDate).format('YYYY-MM-DD');
		const formattedCoSupervisors = selectedCoSupervisors.map((selectedCoSupervisor) => {
			return {
				email: selectedCoSupervisor.email,
				name: selectedCoSupervisor.name,
				surname: selectedCoSupervisor.surname,
			};
		});

		const thesisObject = {
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

		if (props.thesis) {
			props.editProposal(thesisObject);
		} else {
			props.createProposal(thesisObject);
		}
	}

	return (
		<Form style={{ padding: 20, marginRight: 20, marginLeft: 20 }} onSubmit={handleSubmit}>
			<Row>
				<Col md={4}>
					<Form.Group className='mb-3' controlId='formCoSupervisors'>
						<Form.Label>Co-supervisors</Form.Label>
						<Select value={selectedCoSupervisors} isMulti options={coSupervisors} styles={colorStyles} onChange={handleSelectedCoSupervisors} />
					</Form.Group>
					<Form.Group className='mb-3' controlId='formType'>
						<Form.Label>Type</Form.Label>
						<CreatableSelect value={selectedTypes} isClearable isMulti options={type} styles={colorStyles} onChange={handleselectedTypess} />
					</Form.Group>
					<Form.Group className='mb-3' controlId='formLevel'>
						<Form.Label>Level*</Form.Label>
						<Select value={selectedLevel} isClearable options={levels} styles={colorStyles} required onChange={handleSelectedLevel} />
					</Form.Group>
					{selectedLevel ? (
						<Form.Group className='mb-3' controlId='formCds'>
							<Form.Label>Cds*</Form.Label>
							<Select
								value={selectedCds}
								options={cds}
								styles={colorStyles}
								required
								onChange={handleSelectedCds}
								isDisabled={selectedLevel === ''}
								isClearable
								placeholder={selectedLevel === '' ? 'Select a level first' : 'Select...'}
							/>
						</Form.Group>
					) : null}
					<Form.Group className='mb-3'>
						<Form.Label>Expiration date*</Form.Label>
						<Form.Control
							type='date'
							value={expirationDate}
							min={dayjs(props.date).format('YYYY-MM-DD')}
							required
							onChange={(event) => setExpirationDate(event.target.value)}
						/>
					</Form.Group>
					<Form.Group className='mb-3' controlId='formKeywords'>
						<Form.Label>Keywords</Form.Label>
						<CreatableSelect value={selectedKeywords} isClearable isMulti options={keywords} styles={colorStyles} onChange={handleSelectedKeywords} />
					</Form.Group>
				</Col>
				<Col md={8}>
					<Form.Group className='mb-3' controlId='formTitle'>
						<Form.Label>Title*</Form.Label>
						<Form.Control
							type='text'
							required
							placeholder='Enter title'
							value={title}
							style={{ fontWeight: 'bold' }}
							onChange={(event) => setTitle(event.target.value)}
						/>
					</Form.Group>
					<Form.Group className='mb-3' controlId='formDescription'>
						<Form.Label>Description*</Form.Label>
						<Form.Control
							value={description}
							as='textarea'
							rows={5}
							required
							placeholder='Enter description'
							onChange={(event) => setDescription(event.target.value)}
						/>
					</Form.Group>
					<Form.Group className='mb-3' controlId='formRequiredKnowledge'>
						<Form.Label>Required knowledge</Form.Label>
						<Form.Control
							value={requiredKnowledge}
							as='textarea'
							placeholder='Enter required knowledge'
							onChange={(event) => setRequiredKnowledge(event.target.value)}
						/>
					</Form.Group>
					<Form.Group className='mb-3' controlId='formNotes'>
						<Form.Label>Notes</Form.Label>
						<Form.Control value={notes} as='textarea' placeholder='Enter notes' onChange={(event) => setNotes(event.target.value)} />
					</Form.Group>
				</Col>
			</Row>
			<Container style={{ textAlign: 'center', marginTop: 10 }}>
				<Button variant='outline-secondary' className='form-button' type='cancel' onClick={() => navigate('/')}>
					Cancel
				</Button>
				<Button variant='primary' className='form-button' type='submit'>
					{props.editProposal ? 'Edit Proposal' : 'Insert Proposal'}
				</Button>
			</Container>
		</Form>
	);
}

export default ProposalForm;
