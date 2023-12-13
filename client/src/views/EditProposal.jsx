import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import API from '../API.jsx';
import ProposalForm from '../components/ProposalForm.jsx';
import Loading from '../components/Loading.jsx';
import { useLoading } from '../LoadingContext.jsx';
import PropTypes from 'prop-types';

function EditProposal({ accessToken, user, handleError, setDirty, date }) {
	const { id } = useParams();
	const navigate = useNavigate();
	const [thesis, setThesis] = useState(null);
	const { loading, setLoading } = useLoading();

	useEffect(() => {
		setLoading(true);
		API.getThesisByID(id, accessToken)
			.then((thesis) => {
				setThesis(thesis);
			})
			.catch((err) => {
				handleError(err);
			})
			.finally(() => {
				setLoading(false);
			});
	}, [id]);

	function editProposal(thesis) {
		API.editProposal(accessToken, thesis, id)
			.then(() => {
				setDirty(true);
				navigate('/proposal/' + id);
			})
			.catch((err) => {
				handleError(err);
			});
	}

	return loading ? (
		<Loading />
	) : (
		<Container>
			<h2 style={{ textAlign: 'center', marginTop: 20 }}>Edit Proposal</h2>
			<ProposalForm thesis={thesis} accessToken={accessToken} user={user} handleError={handleError} editProposal={editProposal} date={date} />
		</Container>
	);
}

EditProposal.propTypes = {
	accessToken: PropTypes.string.isRequired,
	user: PropTypes.object.isRequired,
	handleError: PropTypes.func.isRequired,
	setDirty: PropTypes.func.isRequired,
	date: PropTypes.string,
};

export default EditProposal;
