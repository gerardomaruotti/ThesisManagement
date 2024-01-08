import PropsTypes from 'prop-types';
import { useState } from 'react';
import { Container } from 'react-bootstrap';
import ThesisRequestForm from '../components/ThesisRequestForm';

function InsertThesisRequest({ accessToken }) {
	return (
		<Container>
			<h2 style={{ textAlign: 'center', marginTop: 20 }}>Insert Thesis Request</h2>
			<ThesisRequestForm accessToken={accessToken} />
		</Container>
	);
}

InsertThesisRequest.propTypes = {
	accessToken: PropsTypes.string,
};

export default InsertThesisRequest;
