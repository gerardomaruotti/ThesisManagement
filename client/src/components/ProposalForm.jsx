import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Select from 'react-select';
import CreatableSelect from 'react-select/creatable';
import { Form, Button, Row, Col, Container, Alert } from 'react-bootstrap';
import { useEffect, useState, useContext } from 'react';
import UserContext from '../contexts/UserContext';
import { useNavigate } from 'react-router-dom';
import { colorStyles } from '../constants/colors.js';
import API from '../API.jsx';
import dayjs from 'dayjs';
import PropTypes from 'prop-types';
import { handleError } from '../utils/toastHandlers.js';

function ProposalForm({ thesis, createProposal, editProposal, user, date, copiedProposal }) {
	const { accessToken } = useContext(UserContext);
	const navigate = useNavigate();
	const [title, setTitle] = useState(thesis ? thesis.title : '');
	const [requiredKnowledge, setRequiredKnowledge] = useState(thesis ? thesis.requiredKnowledge : '');
	const [description, setDescription] = useState(thesis ? thesis.description : '');
	const [notes, setNotes] = useState(thesis ? thesis.notes : '');
	const [keywords, setKeywords] = useState([]);
	const [coSupervisors, setCoSupervisors] = useState([]);
	const [cds, setCds] = useState('');
	const [type, setType] = useState([]);
	const [expirationDate, setExpirationDate] = useState(thesis ? dayjs(thesis.expirationDate).format('YYYY-MM-DD') : '');
	const levels = [
		{ value: 'BSc', label: 'BSc' },
		{ value: 'MSc', label: 'MSc' },
	];
	const [selectedKeywords, setSelectedKeywords] = useState(
		thesis
			? thesis.keywords.map((keyword) => {
					return { value: keyword, label: keyword };
			  })
			: []
	);
	const [selectedCoSupervisors, setSelectedCoSupervisors] = useState(
		thesis
			? thesis.coSupervisors
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
		thesis
			? thesis.types.map((type) => {
					return { value: type, label: type };
			  })
			: []
	);
	const [selectedLevel, setSelectedLevel] = useState(thesis ? { value: thesis.level, label: thesis.level } : '');
	const [selectedCds, setSelectedCds] = useState(thesis ? { value: thesis.codeDegree, label: thesis.cds } : '');

	useEffect(() => {
		if (thesis) {
			setTitle(thesis.title);
			setDescription(thesis.description);
			setRequiredKnowledge(thesis.requiredKnowledge);
			setNotes(thesis.notes);
			setSelectedCoSupervisors(
				thesis.coSupervisors
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
				thesis.types.map((type) => {
					return { value: type, label: type };
				})
			);
			setSelectedLevel({ value: thesis.level, label: thesis.level });
			setSelectedCds({ value: thesis.codeDegree, label: thesis.cds });
			setSelectedKeywords(
				thesis.keywords.map((keyword) => {
					return { value: keyword, label: keyword };
				})
			);
			setExpirationDate(dayjs(thesis.expirationDate).format('YYYY-MM-DD'));
		}
	}, [thesis]);

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
	}, [thesis]);

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

	function handlePaste() {
		setTitle(copiedProposal.title);
		setDescription(copiedProposal.description);
		setRequiredKnowledge(copiedProposal.requiredKnowledge);
		setNotes(copiedProposal.notes);
		setSelectedCoSupervisors(
			copiedProposal.coSupervisors.map((cosupervisor) => {
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
			copiedProposal.types.map((type) => {
				return { value: type, label: type };
			})
		);
		setSelectedLevel({ value: copiedProposal.level, label: copiedProposal.level });
		setSelectedCds({ value: copiedProposal.codeDegree, label: copiedProposal.cds });
		setSelectedKeywords(
			copiedProposal.keywords.map((keyword) => {
				return { value: keyword, label: keyword };
			})
		);
		setExpirationDate(dayjs(copiedProposal.expirationDate).format('YYYY-MM-DD'));
	}

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

		if (!title.trim() || !description.trim()) {
			handleError('Title and description must not be empty');
			!title.trim() && setTitle('');
			!description.trim() && setDescription('');
			return;
		}

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

		if (editProposal) {
			editProposal(thesisObject);
		} else {
			createProposal(thesisObject);
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
							min={date ? dayjs(date).format('YYYY-MM-DD') : dayjs().format('YYYY-MM-DD')}
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
					{editProposal ? 'Edit Proposal' : 'Insert Proposal'}
				</Button>
				{copiedProposal ? (
					<Button variant='primary' className='form-button' onClick={handlePaste}>
						Paste
					</Button>
				) : null}
			</Container>
		</Form>
	);
}

ProposalForm.propTypes = {
	thesis: PropTypes.object,
	createProposal: PropTypes.func,
	editProposal: PropTypes.func,
	user: PropTypes.object,
	date: PropTypes.string,
	copiedProposal: PropTypes.object,
};

export default ProposalForm;
