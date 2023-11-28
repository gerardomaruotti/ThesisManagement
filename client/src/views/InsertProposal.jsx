import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import API from '../API.jsx';
import ProposalForm from '../components/ProposalForm.jsx';

function InsertProposal(props) {
	const navigate = useNavigate();
	const { accessToken, user, handleError } = props;

	function createProposal(thesis) {
		API.insertThesis(accessToken, thesis)
			.then((thesisID) => {
				props.setDirty(true);
				navigate('/proposal/' + thesisID);
			})
			.catch((err) => {
				props.handleError(err);
			});
	}

	return (
		<Container>
			<h2 style={{ textAlign: 'center', marginTop: 20 }}>New Proposal</h2>
			<ProposalForm accessToken={accessToken} user={user} handleError={handleError} createProposal={createProposal} />
		</Container>
	);
}

export default InsertProposal;
