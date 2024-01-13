import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Card, Container, Row, Col, Form, Button } from 'react-bootstrap';
import { useLoading } from '../LoadingContext.jsx';
import Loading from '../components/Loading.jsx';
import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import API from '../API.jsx';
import PropTypes from 'prop-types';

function Settings({ accessToken, handleError, handleSuccess, setDirty, virtualClock, setVirtualClock, dateVirtualClock, setDateVirtualClock }) {
	const { loading } = useLoading();
	const [date, setDate] = useState(dateVirtualClock ? dateVirtualClock : null);

	useEffect(() => {
		if (dateVirtualClock == null) {
			setVirtualClock(false);
		} else {
			setDate(dateVirtualClock);
		}
	}, [dateVirtualClock]);

	const handleSwitchChange = (event) => {
		if (!event.target.checked) {
			API.resetVirtualClock(accessToken)
				.then(() => {
					setDirty(true);
					setDateVirtualClock(null);
					setDate(null);
				})
				.catch((err) => {
					handleError(err);
				});
		}
		setVirtualClock(event.target.checked);
	};

	const handleDateVirtualClockDate = (event) => {
		setDate(event.target.value);
	};

	const handleDateVirtualClock = () => {
		if (!date) {
			handleError('Please select a date');
			return;
		}
		setDateVirtualClock(date);
		API.setVirtualClock(accessToken, date)
			.then((res) => {
				handleSuccess(`Date set to ${dayjs(date).format('DD/MM/YYYY')}`);
				setDirty(true);
			})
			.catch((err) => {
				handleError(err);
			});
	};

	return loading ? (
		<Loading />
	) : (
		<Container>
			<Form>
				<Row style={{ marginTop: 25 }}>
					<Col>
						<div style={{ fontSize: 30, fontWeight: 'bold' }}>Settings</div>
					</Col>
				</Row>
				<Card style={{ padding: 20, marginTop: 25 }} className='custom-card'>
					<Row>
						<Col>
							<div style={{ fontSize: 20, fontWeight: 'bold' }}>
								Virtual Clock
								<Form.Check type='switch' id='true' style={{ float: 'right' }} checked={virtualClock} onChange={handleSwitchChange} />
							</div>
						</Col>
					</Row>
					{virtualClock && (
						<div>
							<hr />
							<Row>
								<Col md={4} xs={7}>
									<Form.Control
										type='date'
										value={date ? date : ''}
										min={dayjs().add(1, 'day').format('YYYY-MM-DD')}
										onChange={handleDateVirtualClockDate}
										inline='true'
									/>
								</Col>
								<Col>
									<Button style={{ marginLeft: 10, width: 100 }} variant='primary' onClick={handleDateVirtualClock}>
										Set Date
									</Button>
								</Col>
							</Row>
						</div>
					)}
				</Card>
			</Form>
		</Container>
	);
}

Settings.propTypes = {
	accessToken: PropTypes.string,
	handleError: PropTypes.func.isRequired,
	handleSuccess: PropTypes.func.isRequired,
	setDirty: PropTypes.func.isRequired,
	virtualClock: PropTypes.bool.isRequired,
	setVirtualClock: PropTypes.func.isRequired,
	dateVirtualClock: PropTypes.string,
	setDateVirtualClock: PropTypes.func.isRequired,
};

export default Settings;
