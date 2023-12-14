import 'bootstrap-icons/font/bootstrap-icons.css';
import { Button } from 'react-bootstrap';
import PropsTypes from 'prop-types';

function EditingButtons({ disabled, isArchived, copyProposal, editProposal, deleteProposal, archiveProposal }) {
	return (
		<>
			<Button variant='primary' onClick={copyProposal} style={{ marginRight: 10 }} size='sm'>
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

EditingButtons.propTypes = {
	disabled: PropsTypes.bool,
	isArchived: PropsTypes.bool,
	copyProposal: PropsTypes.func,
	editProposal: PropsTypes.func,
	deleteProposal: PropsTypes.func,
	archiveProposal: PropsTypes.func,
};

export default EditingButtons;
