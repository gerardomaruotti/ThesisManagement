import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import API from '../API.jsx';
import ProposalForm from '../components/ProposalForm.jsx';
import Loading from '../components/Loading.jsx';
import { useLoading } from '../LoadingContext.jsx';

function EditProposal(props) {
	const { id } = useParams();
	const navigate = useNavigate();
	const [thesis, setThesis] = useState(null);
	const { loading, setLoading } = useLoading();

	useEffect(() => {
		setLoading(true);
		API.getThesisByID(id, props.accessToken)
			.then((thesis) => {
				// console.log('Thesis: ', thesis);
				setThesis(thesis);
			})
			.catch((err) => {
				props.handleError(err);
			})
			.finally(() => {
				setLoading(false);
			});
	}, [id]);

	function editProposal(thesis) {
		API.editProposal(props.accessToken, thesis, id).then(() => {
			props.setDirty(true);
			props.setFromHome(false);
			navigate('/proposal/' + id);
		});
	}

	return loading ? (
		<Loading />
	) : (
		<Container>
			<h2 style={{ textAlign: 'center', marginTop: 20 }}>Edit Proposal</h2>
			<ProposalForm thesis={thesis} accessToken={props.accessToken} user={props.user} handleError={props.handleError} editProposal={editProposal} />
		</Container>
	);
}

export default EditProposal;
