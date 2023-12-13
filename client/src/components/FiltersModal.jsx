import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, Button, Container, Form, Row, Col } from 'react-bootstrap';
import Select from 'react-select';
import { colorStyles } from '../constants/colors.js';
import { useEffect, useState } from 'react';
import API from '../API.jsx';
import dayjs from 'dayjs';
import { useLoading } from '../LoadingContext.jsx';
import PropTypes from 'prop-types';

function FiltersModal({
	show,
	onHide,
	accessToken,
	handleError,
	setThesis,
	activatedFilters,
	setActivatedFilters,
	selectedSupervisor,
	setSelectedSupervisor,
	selectedCoSupervisors,
	setSelectedCoSupervisors,
	selectedKeywords,
	setSelectedKeywords,
	selectedTypes,
	setSelectedTypes,
	selectedGroups,
	setSelectedGroups,
	expirationDate,
	setExpirationDate,
	date,
}) {
	const { setLoading } = useLoading();
	const [keywords, setKeywords] = useState([]);
	const [types, setTypes] = useState([]);
	const [supervisors, setSupervisors] = useState([]);
	const [coSupervisors, setCoSupervisors] = useState([]);
	const [groups, setGroups] = useState([]);

	useEffect(() => {
		if (accessToken == null) {
			return;
		}
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
				setTypes(
					types.map((type) => {
						return { value: type, label: type };
					})
				);
			})
			.catch((err) => handleError(err));
		API.getAllSupervisors(accessToken)
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
			.catch((err) => handleError(err));
		API.getAllGroups(accessToken)
			.then((groups) => {
				setGroups(
					groups.map((group) => {
						return { value: group.cod_group, label: group.name };
					})
				);
			})
			.catch((err) => handleError(err));
	}, [accessToken]);

	useEffect(() => {
		if (!activatedFilters) {
			setSelectedSupervisor([]);
			setSelectedCoSupervisors([]);
			setSelectedKeywords([]);
			setSelectedTypes([]);
			setSelectedGroups([]);
			setExpirationDate('all');
		}
	}, [activatedFilters]);

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

		const formattedSupervisor = selectedSupervisor.map((supervisor) => supervisor.value);
		const formattedCoSupervisors = selectedCoSupervisors.map((cosupervisor) => cosupervisor.value);
		const formattedKeywords = selectedKeywords.map((keyword) => keyword.value);
		const formattedTypes = selectedTypes.map((type) => type.value);
		const formattedGroups = selectedGroups.map((group) => group.value);
		let today = date ? dayjs(date) : dayjs();
		if (expirationDate === 'all') {
			today = undefined;
		} else if (expirationDate === 'thisWeek') {
			today = today.add(1, 'week');
		} else if (expirationDate === 'thisMonth') {
			today = today.add(1, 'month');
		} else if (expirationDate === 'thisYear') {
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
		API.getAllThesis(accessToken, body)
			.then((thesis) => {
				setThesis(thesis);
			})
			.catch((err) => {
				handleError(err);
			})
			.finally(() => setLoading(false));
		onHide();
		setActivatedFilters(true);
	}

	return (
		<Modal show={show} onHide={onHide} size='lg' aria-labelledby='contained-modal-title-vcenter' centered>
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
									<Select isMulti options={supervisors} value={selectedSupervisor} styles={colorStyles} onChange={handleSupervisor} />
								</Form.Group>
								<Form.Group className='mb-3' controlId='formCoSupervisors'>
									<Form.Label>Co-supervisors</Form.Label>
									<Select isMulti options={coSupervisors} value={selectedCoSupervisors} styles={colorStyles} onChange={handleCoSupervisors} />
								</Form.Group>
								<Form.Group className='mb-3' controlId='formKeywords'>
									<Form.Label>Keywords</Form.Label>
									<Select isMulti options={keywords} value={selectedKeywords} styles={colorStyles} onChange={handleKeywords} />
								</Form.Group>
								<Form.Group className='mb-3' controlId='formGroups'>
									<Form.Label>Groups</Form.Label>
									<Select isMulti options={groups} value={selectedGroups} styles={colorStyles} onChange={handleGroups} />
								</Form.Group>
							</Col>
							<Col md={6}>
								<Form.Group className='mb-3' controlId='formTypes'>
									<Form.Label>Types</Form.Label>
									<Select isMulti options={types} value={selectedTypes} styles={colorStyles} onChange={handleTypes} />
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
		</Modal>
	);
}

FiltersModal.propTypes = {
	show: PropTypes.bool,
	onHide: PropTypes.func,
	accessToken: PropTypes.string,
	handleError: PropTypes.func,
	setThesis: PropTypes.func,
	activatedFilters: PropTypes.bool,
	setActivatedFilters: PropTypes.func,
	selectedSupervisor: PropTypes.array,
	setSelectedSupervisor: PropTypes.func,
	selectedCoSupervisors: PropTypes.array,
	setSelectedCoSupervisors: PropTypes.func,
	selectedKeywords: PropTypes.array,
	setSelectedKeywords: PropTypes.func,
	selectedTypes: PropTypes.array,
	setSelectedTypes: PropTypes.func,
	selectedGroups: PropTypes.array,
	setSelectedGroups: PropTypes.func,
	expirationDate: PropTypes.string,
	setExpirationDate: PropTypes.func,
	date: PropTypes.string,
};

export default FiltersModal;
