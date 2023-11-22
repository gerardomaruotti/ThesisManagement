import 'bootstrap/dist/css/bootstrap.min.css';
import App from '../App';
import StudentApplicationCard from '../components/StudentApplicationCard';
import { thesis } from '../models/thesis';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row } from 'react-bootstrap';

function StudentApplications(props) {
	const navigate = useNavigate();
	return (
		<Container>
			{/* <Row style={{ marginBottom: 25 }}>{props.thesis != [] ? props.thesis.map((thesis, index) => <StudentApplicationCard thesis={thesis} />) : null}</Row> */}
			<Row style={{ marginBottom: 25 }}>
				<StudentApplicationCard thesis={thesis} />
				<StudentApplicationCard thesis={thesis} />
				<StudentApplicationCard thesis={thesis} />
				<StudentApplicationCard thesis={thesis} />
			</Row>
		</Container>
	);
}

export default StudentApplications;
