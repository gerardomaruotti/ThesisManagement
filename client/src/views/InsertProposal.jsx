import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import API from '../API.jsx';
import ProposalForm from '../components/ProposalForm.jsx';
import PropsType from 'prop-types';

function InsertProposal({ accessToken, user, handleError, setDirty, date, copiedProposal }) {
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
			<ProposalForm
				accessToken={accessToken}
				user={user}
				handleError={handleError}
				createProposal={createProposal}
				date={date}
				copiedProposal={copiedProposal}
			/>
		</Container>
	);
}

InsertProposal.propTypes = {
	accessToken: PropsType.string.isRequired,
	user: PropsType.object.isRequired,
	handleError: PropsType.func.isRequired,
	setDirty: PropsType.func.isRequired,
	date: PropsType.string,
	copiedProposal: PropsType.object,
};

export default InsertProposal;
