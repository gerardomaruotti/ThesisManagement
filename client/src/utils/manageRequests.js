import API from '../API';
import { handleError, handleSuccess } from '../utils/toastHandlers.js';

export function acceptRequest(accessToken, request, isProfessor, setInternalDirty, setShowModal) {
	setShowModal(false);
	if (isProfessor) {
		API.approveRequestProfessor(accessToken, request.id)
			.then(() => {
				handleSuccess('Request accepted');
				setInternalDirty(true);
			})
			.catch((err) => {
				handleError(err);
			});
	} else {
		API.approveRequestSecretary(accessToken, request.id)
			.then(() => {
				handleSuccess('Request accepted');
				setInternalDirty(true);
			})
			.catch((err) => {
				handleError(err);
			});
	}
}

export function rejectRequest(accessToken, request, isProfessor, setInternalDirty, setShowModal) {
	setShowModal(false);
	if (isProfessor) {
		API.rejectRequestProfessor(accessToken, request.id)
			.then(() => {
				handleSuccess('Request rejected');
				setInternalDirty(true);
			})
			.catch((err) => {
				handleError(err);
			});
	} else {
		API.rejectRequestSecretary(accessToken, request.id)
			.then(() => {
				handleSuccess('Request rejected');
				setInternalDirty(true);
			})
			.catch((err) => {
				handleError(err);
			});
	}
}
