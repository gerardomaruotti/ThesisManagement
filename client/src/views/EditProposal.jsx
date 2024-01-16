import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState, useContext } from 'react';
import UserContext from '../contexts/UserContext';
import { useParams, useNavigate } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import API from '../API.jsx';
import ProposalForm from '../components/ProposalForm.jsx';
import Loading from '../components/Loading.jsx';
import { useLoading } from '../contexts/LoadingContext.jsx';
import PropTypes from 'prop-types';
import { handleError } from '../utils/toastHandlers.js';

function EditProposal({ user, setDirty, date }) {
	const { accessToken } = useContext(UserContext);
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
			<ProposalForm thesis={thesis} user={user} editProposal={editProposal} date={date} />
		</Container>
	);
}

EditProposal.propTypes = {
	user: PropTypes.object.isRequired,
	setDirty: PropTypes.func.isRequired,
	date: PropTypes.string,
};

export default EditProposal;
