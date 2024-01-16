import 'bootstrap/dist/css/bootstrap.min.css';
import { useContext } from 'react';
import UserContext from '../contexts/UserContext';
import { Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import API from '../API.jsx';
import ProposalForm from '../components/ProposalForm.jsx';
import PropsType from 'prop-types';
import { handleError } from '../utils/toastHandlers.js';

function InsertProposal({ user, setDirty, date, copiedProposal }) {
	const { accessToken } = useContext(UserContext);
	const navigate = useNavigate();

	function createProposal(thesis) {
		API.insertThesis(accessToken, thesis)
			.then((thesisID) => {
				setDirty(true);
				navigate('/proposal/' + thesisID);
			})
			.catch((err) => {
				handleError(err);
			});
	}

	return (
		<Container>
			<h2 style={{ textAlign: 'center', marginTop: 20 }}>New Proposal</h2>
			<ProposalForm user={user} createProposal={createProposal} date={date} copiedProposal={copiedProposal} />
		</Container>
	);
}

InsertProposal.propTypes = {
	user: PropsType.object.isRequired,
	setDirty: PropsType.func.isRequired,
	date: PropsType.string,
	copiedProposal: PropsType.object,
};

export default InsertProposal;
