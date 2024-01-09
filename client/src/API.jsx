/**
 * All the API calls
 */

const URL = 'http://localhost:3001/api';

function callAPI(endpoint, accessToken, method, body) {
	let options = {
		headers: {
			Authorization: `Bearer ${accessToken}`,
		},
	};

	if (method == 'POST' || method == 'PUT') {
		options.method = method;
		if (body != null) {
			if (body instanceof FormData) {
				options.headers['enctype'] = 'multipart/form-data';
			} else {
				options.headers['Content-Type'] = 'application/json';
			}
			options.body = body;
		}
	}
	return new Promise((resolve, reject) => {
		fetch(URL + endpoint, options)
			.then((response) => {
				if (response.ok) {
					response
						.json()
						.then((res) => resolve(res))
						.catch(() => {
							reject(new Error('Cannot parse server response.'));
						});
				} else {
					response
						.json() // analyze the cause of error
						.then((message) => {
							reject(message);
						}) // error message in the response body
						.catch(() => {
							reject(new Error('Cannot parse server response2.'));
						});
				}
			})
			.catch(() => {
				reject(new Error('Cannot communicate with the server.'));
			}); // connection errors
	});
}

function getAllKeywords(accessToken) {
	return callAPI('/keywords', accessToken, 'GET', null);
}

function getAllThesis(accessToken, filters) {
	return callAPI('/thesis', accessToken, 'POST', JSON.stringify(filters));
}

function getAllTypes(accessToken) {
	return callAPI('/types', accessToken, 'GET', null);
}

function getAllSupervisors(accessToken) {
	return callAPI('/teachers', accessToken, 'GET', null);
}

function getAllCds(accessToken) {
	return callAPI('/cds', accessToken, 'GET', null);
}

function getAllGroups(accessToken) {
	return callAPI('/groups', accessToken, 'GET', null);
}

function getThesisByID(id, accessToken) {
	return callAPI(`/thesis/${id}`, accessToken, 'GET', null);
}

function insertThesis(accessToken, thesis) {
	return callAPI('/insert/thesis', accessToken, 'POST', JSON.stringify(thesis));
}

function ThesisApply(id, accessToken, cv) {
	return callAPI(`/thesis/${id}/apply`, accessToken, 'POST', cv);
}

function getUser(accessToken) {
	return callAPI('/user', accessToken, 'GET', null);
}

function getApplications(accessToken) {
	return callAPI('/thesis/applications/browse', accessToken, 'GET', null);
}

function acceptApplication(parameters, accessToken) {
	return callAPI('/accept/application', accessToken, 'POST', JSON.stringify(parameters));
}

function rejectApplication(parameters, accessToken) {
	return callAPI('/reject/application', accessToken, 'POST', JSON.stringify(parameters));
}

function editProposal(accessToken, thesis, id) {
	return callAPI(`/edit/thesis/${id}`, accessToken, 'PUT', JSON.stringify(thesis));
}

function deleteProposal(accessToken, thesis) {
	return callAPI(`/delete/thesis`, accessToken, 'POST', JSON.stringify(thesis));
}

function archiveProposal(accessToken, thesis) {
	return callAPI(`/archive/thesis`, accessToken, 'POST', JSON.stringify(thesis));
}

function getStatusVirtualClock(accessToken) {
	return callAPI('/virtualClockStatus', accessToken, 'GET', null);
}

function resetVirtualClock(accessToken) {
	return callAPI('/virtualClockOff', accessToken, 'PUT', null);
}

function setVirtualClock(accessToken, date) {
	return callAPI('/virtualClockOn', accessToken, 'PUT', JSON.stringify({ date: date }));
}

function getStudentApplicationInfo(accessToken, idApplication) {
	return callAPI('/applications/details', accessToken, 'POST', JSON.stringify({ idApplication: idApplication }));
}

function getStudentThesisRequest(accessToken) {
	return callAPI('/requests', accessToken, 'GET', null);
}

function insertThesisRequest(accessToken, thesisRequest) {
	return callAPI('/insert/request', accessToken, 'POST', JSON.stringify(thesisRequest));
}

function approveRequestRecretary(accessToken, idRequest) {
	return callAPI('/approve/request/secretary', accessToken, 'POST', JSON.stringify({ requestID: idRequest }));
}

function rejectRequestRecretary(accessToken, idRequest) {
	return callAPI('/reject/request/secretary', accessToken, 'POST', JSON.stringify({ requestID: idRequest }));
}

const API = {
	getAllKeywords,
	getAllTypes,
	getAllSupervisors,
	getAllCds,
	getAllThesis,
	insertThesis,
	getAllGroups,
	getThesisByID,
	getUser,
	ThesisApply,
	getApplications,
	acceptApplication,
	rejectApplication,
	editProposal,
	deleteProposal,
	archiveProposal,
	getStatusVirtualClock,
	resetVirtualClock,
	setVirtualClock,
	getStudentApplicationInfo,
	getStudentThesisRequest,
	insertThesisRequest,
	approveRequestRecretary,
	rejectRequestRecretary
};
export default API;
