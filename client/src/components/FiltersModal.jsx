import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, Button, Container, Form, Row, Col } from 'react-bootstrap';
import Select from 'react-select';
import { colorStyles } from '../constants/colors.js';
import { useEffect, useState } from 'react';
import API from '../API.jsx';
import dayjs from 'dayjs';
import { useLoading } from '../LoadingContext.jsx';

function FiltersModal(props) {
	const { loading, setLoading } = useLoading();
	const [keywords, setKeywords] = useState([]);
	const [types, setTypes] = useState([]);
	const [supervisors, setSupervisors] = useState([]);
	const [coSupervisors, setCoSupervisors] = useState([]);
	const [groups, setGroups] = useState([]);

	useEffect(() => {
		if (props.accessToken == null) {
			return;
		}
		API.getAllKeywords(props.accessToken)
			.then((keywords) => {
				setKeywords(
					keywords.map((keyword) => {
						return { value: keyword, label: keyword };
					})
				);
			})
			.catch((err) => props.handleError(err));
		API.getAllTypes(props.accessToken)
			.then((types) => {
				setTypes(
					types.map((type) => {
						return { value: type, label: type };
					})
				);
			})
			.catch((err) => props.handleError(err));
		API.getAllSupervisors(props.accessToken)
			.then((supervisors) => {
				setSupervisors(
					supervisors.map((supervisor) => {
						return { value: supervisor.ID, label: supervisor.name + ' ' + supervisor.surname };
					})
				);
				setCoSupervisors(
					supervisors.map((supervisor) => {
						return { value: supervisor.email, label: supervisor.name + ' ' + supervisor.surname };
					})
				);
			})
			.catch((err) => props.handleError(err));
		API.getAllGroups(props.accessToken)
			.then((groups) => {
				setGroups(
					groups.map((group) => {
						return { value: group.cod_group, label: group.name };
					})
				);
			})
			.catch((err) => props.handleError(err));
	}, [props.accessToken]);

	useEffect(() => {
		if (props.activatedFilters == false) {
			props.setSelectedSupervisor([]);
			props.setSelectedCoSupervisors([]);
			props.setSelectedKeywords([]);
			props.setSelectedTypes([]);
			props.setSelectedGroups([]);
			props.setExpirationDate('all');
		}
	}, [props.activatedFilters]);

	function handleExpirationDate(event) {
		props.setExpirationDate(event.target.value);
	}

	function handleSupervisor(event) {
		props.setSelectedSupervisor(event);
	}

	function handleCoSupervisors(event) {
		props.setSelectedCoSupervisors(event);
	}

	function handleKeywords(event) {
		props.setSelectedKeywords(event);
	}

	function handleTypes(event) {
		props.setSelectedTypes(event);
	}

	function handleGroups(event) {
		props.setSelectedGroups(event);
	}

	function handleFilters(event) {
		event.preventDefault();

		const formattedSupervisor = props.selectedSupervisor.map((supervisor) => supervisor.value);
		const formattedCoSupervisors = props.selectedCoSupervisors.map((cosupervisor) => cosupervisor.value);
		const formattedKeywords = props.selectedKeywords.map((keyword) => keyword.value);
		const formattedTypes = props.selectedTypes.map((type) => type.value);
		const formattedGroups = props.selectedGroups.map((group) => group.value);
		let today = dayjs();
		if (props.expirationDate === 'all') {
			today = undefined;
		} else if (props.expirationDate === 'thisWeek') {
			today = today.add(1, 'week');
		} else if (props.expirationDate === 'thisMonth') {
			today = today.add(1, 'month');
		} else if (props.expirationDate === 'thisYear') {
			today = today.add(1, 'year');
		}
		let body = {
			filters: {
				supervisor: formattedSupervisor,
				cosupervisor: formattedCoSupervisors,
				keyword: formattedKeywords,
				type: formattedTypes,
				group: formattedGroups,
				exp_date: today ? today.format('YYYY-MM-DD') : undefined,
			},
		};

		setLoading(true);
		API.getAllThesis(props.accessToken, body)
			.then((thesis) => {
				props.setThesis(thesis);
			})
			.catch((err) => {
				props.handleError(err);
			})
			.finally(() => setLoading(false));
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
									<Select isMulti options={supervisors} value={props.selectedSupervisor} styles={colorStyles} onChange={handleSupervisor} />
								</Form.Group>
								<Form.Group className='mb-3' controlId='formCoSupervisors'>
									<Form.Label>Co-supervisors</Form.Label>
									<Select isMulti options={coSupervisors} value={props.selectedCoSupervisors} styles={colorStyles} onChange={handleCoSupervisors} />
								</Form.Group>
								<Form.Group className='mb-3' controlId='formKeywords'>
									<Form.Label>Keywords</Form.Label>
									<Select isMulti options={keywords} value={props.selectedKeywords} styles={colorStyles} onChange={handleKeywords} />
								</Form.Group>
								<Form.Group className='mb-3' controlId='formGroups'>
									<Form.Label>Groups</Form.Label>
									<Select isMulti options={groups} value={props.selectedGroups} styles={colorStyles} onChange={handleGroups} />
								</Form.Group>
							</Col>
							<Col md={6}>
								<Form.Group className='mb-3' controlId='formTypes'>
									<Form.Label>Types</Form.Label>
									<Select isMulti options={types} value={props.selectedTypes} styles={colorStyles} onChange={handleTypes} />
								</Form.Group>
								<Form.Label>Expiration date:</Form.Label>
								<div className='mb-3'>
									<Form.Check
										label='All'
										name='expirationDate'
										type='radio'
										value='all'
										checked={props.expirationDate === 'all'}
										onChange={handleExpirationDate}
										id='all'
									/>
									<Form.Check
										label='This week'
										name='expirationDate'
										type='radio'
										value='thisWeek'
										checked={props.expirationDate === 'thisWeek'}
										onChange={handleExpirationDate}
										id='thisWeek'
									/>
									<Form.Check
										label='This month'
										name='expirationDate'
										type='radio'
										value='thisMonth'
										checked={props.expirationDate === 'thisMonth'}
										onChange={handleExpirationDate}
										id='thisMonth'
									/>
									<Form.Check
										label='This year'
										name='expirationDate'
										type='radio'
										value='thisYear'
										checked={props.expirationDate === 'thisYear'}
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
