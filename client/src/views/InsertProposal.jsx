import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Select from 'react-select';
import { Form, Button } from 'react-bootstrap';
import { useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useNavigate } from 'react-router-dom';

function InsertProposal(props) {
	const navigate = useNavigate();
	const { user, isAuthenticated, getAccessTokenSilently, isLoading } = useAuth0();
	const [selectedKeywords, setSelectedKeywords] = useState([]);
	const [selectedCoSupervisors, setSelectedCoSupervisors] = useState([]);
	const [selectedType, setSelectedType] = useState([]);

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
		groups,
		setGroups,
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

	function handleSubmit(event) {
		event.preventDefault();
		console.log('Submitted');
	}

	function handleChange(event) {
		console.log(event);
	}

	return (
		<Form onSubmit={handleSubmit}>
			<Form.Group className='mb-3' controlId='formTitle'>
				<Form.Label>Title</Form.Label>
				<Form.Control type='text' placeholder='Enter title' />
			</Form.Group>
			<Form.Group className='mb-3' controlId='formRequiredKnowledge'>
				<Form.Label>Required knowledge</Form.Label>
				<Form.Control type='text' placeholder='Enter required knowledge' />
			</Form.Group>
			<Form.Group className='mb-3' controlId='formDescription'>
				<Form.Label>Description</Form.Label>
				<Form.Control type='text' placeholder='Enter description' />
			</Form.Group>
			<Form.Group className='mb-3' controlId='formNotes'>
				<Form.Label>Notes</Form.Label>
				<Form.Control type='text' placeholder='Enter notes' />
			</Form.Group>
			<Form.Group className='mb-3' controlId='formKeywords'>
				<Form.Label>Keywords</Form.Label>
				<Select isMulti options={[]} />
			</Form.Group>
			<Form.Group className='mb-3' controlId='formCoSupervisors'>
				<Form.Label>Co-supervisors</Form.Label>
				<Select isMulti options={[]} />
			</Form.Group>
			<Form.Group className='mb-3' controlId='formLevel'>
				<Form.Label>Level</Form.Label>
				<Select options={[]} />
			</Form.Group>
			<Form.Group className='mb-3' controlId='formCds'>
				<Form.Label>Cds</Form.Label>
				<Select options={[]} />
			</Form.Group>
			<Form.Group className='mb-3' controlId='formType'>
				<Form.Label>Type</Form.Label>
				<Select isMulti options={[]} />
			</Form.Group>
			<Form.Group className='mb-3' controlId='formExpirationDate'>
				<Form.Label>Expiration date</Form.Label>
				<Form.Control type='date' />
			</Form.Group>
			<Button variant='primary' type='submit'>
				Insert Proposal
			</Button>
			<Button variant='secondary' type='reset'>
				Reset
			</Button>
			<Button variant='danger' type='cancel' onClick={() => navigate('/professor')}>
				Cancel
			</Button>
		</Form>
	);
}

export default InsertProposal;
