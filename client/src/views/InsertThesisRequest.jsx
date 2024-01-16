import React from 'react';
import { Container } from 'react-bootstrap';
import ThesisRequestForm from '../components/ThesisRequestForm';
import PropTypes from 'prop-types';

function InsertThesisRequest({ setDirty }) {
	return (
		<Container>
			<h2 style={{ textAlign: 'center', marginTop: 20 }}>Insert Thesis Request</h2>
			<ThesisRequestForm setDirty={setDirty} />
		</Container>
	);
}

InsertThesisRequest.propTypes = {
	setDirty: PropTypes.func.isRequired,
};

export default InsertThesisRequest;
