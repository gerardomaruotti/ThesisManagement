import 'bootstrap-icons/font/bootstrap-icons.css';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import API from '../API';

function EditingButtons(props) {
	const { disabled, isArchived, copyProposal, editProposal, deleteProposal, archiveProposal } = props;

	return (
		<>
			<Button variant='primary' disabled={disabled} onClick={copyProposal} style={{ marginRight: 10 }} size='sm'>
				<i className='bi bi-copy'></i>
			</Button>
			<Button variant='primary' disabled={disabled} onClick={editProposal} style={{ marginRight: 10 }} size='sm'>
				<i className='bi bi-pencil'></i>
			</Button>
			<Button variant='primary' disabled={disabled || isArchived} onClick={archiveProposal} style={{ marginRight: 10 }} size='sm'>
				<i className='bi bi-archive'></i>
			</Button>
			<Button variant='danger' disabled={disabled} onClick={deleteProposal} size='sm'>
				<i className='bi bi-trash3'></i>
			</Button>
		</>
	);
}

export default EditingButtons;
