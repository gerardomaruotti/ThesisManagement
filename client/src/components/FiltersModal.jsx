import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, Button, Container, Form, Row, Col } from 'react-bootstrap';
import Select from 'react-select';
import { colorStyles } from '../constants/colors.js';
import { useEffect, useState } from 'react';
import API from '../API.jsx';
import dayjs from 'dayjs';

function FiltersModal(props) {
	const [keywords, setKeywords] = useState([]);
	const [types, setTypes] = useState([]);
	const [supervisors, setSupervisors] = useState([]);
	const [expirationDate, setExpirationDate] = useState('all');
	const [groups, setGroups] = useState([]);
	const [selectedSupervisor, setSelectedSupervisor] = useState('');
	const [selectedCoSupervisors, setSelectedCoSupervisors] = useState([]);
	const [selectedKeywords, setSelectedKeywords] = useState([]);
	const [selectedTypes, setSelectedTypes] = useState([]);
	const [selectedGroups, setSelectedGroups] = useState([]);
	const [selectedExpirationDate, setSelectedExpirationDate] = useState('all');

	useEffect(() => {
		API.getAllKeywords()
			.then((keywords) => {
				setKeywords(
					keywords.map((keyword) => {
						return { value: keyword, label: keyword };
					})
				);
			})
			.catch((err) => handleError(err));
		API.getAllTypes()
			.then((types) => {
				setTypes(
					types.map((type) => {
						return { value: type, label: type };
					})
				);
			})
			.catch((err) => handleError(err));
		API.getAllSupervisors()
			.then((supervisors) => {
				setSupervisors(
					supervisors.map((supervisor) => {
						return { value: supervisor.ID, label: supervisor.name + ' ' + supervisor.surname };
					})
				);
			})
			.catch((err) => handleError(err));
		API.getAllGroups()
			.then((groups) => {
				setGroups(
					groups.map((group) => {
						return { value: group.cod_group, label: group.name };
					})
				);
			})
			.catch((err) => handleError(err));
	}, []);

	function handleExpirationDate(event) {
		setExpirationDate(event.target.value);
	}

	function handleSupervisor(event) {
		setSelectedSupervisor(event);
	}

	function handleCoSupervisors(event) {
		setSelectedCoSupervisors(event);
	}

	function handleKeywords(event) {
		setSelectedKeywords(event);
	}

	function handleTypes(event) {
		setSelectedTypes(event);
	}

	function handleGroups(event) {
		setSelectedGroups(event);
	}

	function handleFilters(event) {
		event.preventDefault();
		console.log(selectedSupervisor);
		const formattedSupervisor = selectedSupervisor ? selectedSupervisor.value.split('@')[0] : '';
		const formattedCoSupervisors = selectedCoSupervisors.map((cosupervisor) => cosupervisor.value);
		const formattedKeywords = selectedKeywords.map((keyword) => keyword.value);
		const formattedTypes = selectedTypes.map((type) => type.value);
		const formattedGroups = selectedGroups.map((group) => group.value);

		let body = {
			filters: {
				supervisor: formattedSupervisor,
				cosupervisor: formattedCoSupervisors,
				keyword: formattedKeywords,
				type: formattedTypes,
				group: formattedGroups,
				exp_date: selectedExpirationDate,
			},
		};
		console.log(body);

		API.getAllThesis(props.accessToken, body)
			.then((thesis) => {
				props.setThesis(thesis);
				console.log(thesis);
			})
			.catch((err) => {
				console.log(err);
			});
		props.onHide();
		props.setActivatedFilters(true);
	}

	return (
		<Modal show={props.show} onHide={props.onHide} size='lg' aria-labelledby='contained-modal-title-vcenter' centered>
			<Modal.Header closeButton>
				<Modal.Title id='contained-modal-title-vcenter'>Filters of search</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Container>
					<Form>
						<Row>
							<Col md={6}>
								<Form.Group className='mb-3' controlId='formCoSupervisors'>
									<Form.Label>Supervisors</Form.Label>
									<Select options={supervisors} styles={colorStyles} onChange={handleSupervisor} />
								</Form.Group>
								<Form.Group className='mb-3' controlId='formCoSupervisors'>
									<Form.Label>Co-supervisors</Form.Label>
									<Select isMulti options={supervisors} styles={colorStyles} onChange={handleCoSupervisors} />
								</Form.Group>
								<Form.Group className='mb-3' controlId='formKeywords'>
									<Form.Label>Keywords</Form.Label>
									<Select isMulti options={keywords} styles={colorStyles} onChange={handleKeywords} />
								</Form.Group>
								<Form.Group className='mb-3' controlId='formGroups'>
									<Form.Label>Groups</Form.Label>
									<Select isMulti options={groups} styles={colorStyles} onChange={handleGroups} />
								</Form.Group>
							</Col>
							<Col md={6}>
								<Form.Group className='mb-3' controlId='formTypes'>
									<Form.Label>Types</Form.Label>
									<Select isMulti options={types} styles={colorStyles} onChange={handleTypes} />
								</Form.Group>
								<Form.Label>Expiration date:</Form.Label>
								<div className='mb-3'>
									<Form.Check
										label='All'
										name='expirationDate'
										type='radio'
										value='all'
										checked={expirationDate === 'all'}
										onChange={handleExpirationDate}
										id='all'
									/>
									<Form.Check
										label='This week'
										name='expirationDate'
										type='radio'
										value='thisWeek'
										checked={expirationDate === 'thisWeek'}
										onChange={handleExpirationDate}
										id='thisWeek'
									/>
									<Form.Check
										label='This month'
										name='expirationDate'
										type='radio'
										value='thisMonth'
										checked={expirationDate === 'thisMonth'}
										onChange={handleExpirationDate}
										id='thisMonth'
									/>
									<Form.Check
										label='This year'
										name='expirationDate'
										type='radio'
										value='thisYear'
										checked={expirationDate === 'thisYear'}
										onChange={handleExpirationDate}
										id='thisYear'
									/>
								</div>
							</Col>
						</Row>
						<Button variant='primary' type='submit' onClick={handleFilters}>
							Apply filters
						</Button>
					</Form>
				</Container>
			</Modal.Body>
			{/* <Modal.Footer>
				<Button onClick={props.onHide}>Apply filters</Button>
			</Modal.Footer> */}
		</Modal>
	);
}

export default FiltersModal;
