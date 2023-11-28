/**
 * All the API calls
 */

const URL = 'http://localhost:3001/api';

function getAllKeywords(accessToken) {
	// call  /api/keywords
	return new Promise((resolve, reject) => {
		fetch(URL + '/keywords', {
			headers: {
				Authorization: `Bearer ${accessToken}`,
			},
		})
			.then((response) => {
				if (response.ok) {
					response
						.json()
						.then((keywords) => resolve(keywords))
						.catch(() => {
							reject({ error: 'Cannot parse server response.' });
						});
				} else {
					// analyze the cause of error
					response
						.json()
						.then((message) => {
							reject(message);
						}) // error message in the response body
						.catch(() => {
							reject({ error: 'Cannot parse server response.' });
						});
				}
			})
			.catch(() => {
				reject({ error: 'Cannot communicate with the server.' });
			}); // connection errors
	});
}

function getAllThesis(accessToken, filters) {
	// call  /api/keywords
	return new Promise((resolve, reject) => {
		fetch(URL + '/thesis', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${accessToken}`,
			},
			body: JSON.stringify(filters),
		})
			.then((response) => {
				if (response.ok) {
					response
						.json()
						.then((thesis) => resolve(thesis))
						.catch(() => {
							reject({ error: 'Cannot parse server response.' });
						});
				} else {
					// analyze the cause of error
					response
						.json()
						.then((message) => {
							reject(message);
						}) // error message in the response body
						.catch(() => {
							reject({ error: 'Cannot parse server response.' });
						});
				}
			})
			.catch(() => {
				reject({ error: 'Cannot communicate with the server.' });
			}); // connection errors
	});
}

function getAllTypes(accessToken) {
	// call  /api/types
	return new Promise((resolve, reject) => {
		fetch(URL + '/types', {
			headers: {
				Authorization: `Bearer ${accessToken}`,
			},
		})
			.then((response) => {
				if (response.ok) {
					response
						.json()
						.then((types) => resolve(types))
						.catch(() => {
							reject({ error: 'Cannot parse server response.' });
						});
				} else {
					// analyze the cause of error
					response
						.json()
						.then((message) => {
							reject(message);
						}) // error message in the response body
						.catch(() => {
							reject({ error: 'Cannot parse server response.' });
						});
				}
			})
			.catch(() => {
				reject({ error: 'Cannot communicate with the server.' });
			}); // connection errors
	});
}

function getAllSupervisors(accessToken) {
	// call  /api/teachers
	return new Promise((resolve, reject) => {
		fetch(URL + '/teachers', {
			headers: {
				Authorization: `Bearer ${accessToken}`,
			},
		})
			.then((response) => {
				if (response.ok) {
					response
						.json()
						.then((supervisors) => resolve(supervisors))
						.catch(() => {
							reject({ error: 'Cannot parse server response.' });
						});
				} else {
					// analyze the cause of error
					response
						.json()
						.then((message) => {
							reject(message);
						}) // error message in the response body
						.catch(() => {
							reject({ error: 'Cannot parse server response.' });
						});
				}
			})
			.catch(() => {
				reject({ error: 'Cannot communicate with the server.' });
			}); // connection errors
	});
}

function getAllCds(accessToken) {
	// call  /api/teachers
	return new Promise((resolve, reject) => {
		fetch(URL + '/cds', {
			headers: {
				Authorization: `Bearer ${accessToken}`,
			},
		})
			.then((response) => {
				if (response.ok) {
					response
						.json()
						.then((cds) => resolve(cds))
						.catch(() => {
							reject({ error: 'Cannot parse server response.' });
						});
				} else {
					// analyze the cause of error
					response
						.json()
						.then((message) => {
							reject(message);
						}) // error message in the response body
						.catch(() => {
							reject({ error: 'Cannot parse server response.' });
						});
				}
			})
			.catch(() => {
				reject({ error: 'Cannot communicate with the server.' });
			}); // connection errors
	});
}

function getAllGroups(accessToken) {
	// call  /api/groups
	return new Promise((resolve, reject) => {
		fetch(URL + '/groups', {
			headers: {
				Authorization: `Bearer ${accessToken}`,
			},
		})
			.then((response) => {
				if (response.ok) {
					response
						.json()
						.then((groups) => resolve(groups))
						.catch(() => {
							reject({ error: 'Cannot parse server response.' });
						});
				} else {
					// analyze the cause of error
					response
						.json()
						.then((message) => {
							reject(message);
						}) // error message in the response body
						.catch(() => {
							reject({ error: 'Cannot parse server response.' });
						});
				}
			})
			.catch(() => {
				reject({ error: 'Cannot communicate with the server.' });
			}); // connection errors
	});
}

function getThesisByID(id, accessToken) {
	// call  /api/thesis/<id>
	return new Promise((resolve, reject) => {
		fetch(URL + `/thesis/${id}`, {
			headers: {
				Authorization: `Bearer ${accessToken}`,
			},
		})
			.then((response) => {
				if (response.ok) {
					response
						.json()
						.then((thesis) => resolve(thesis))
						.catch(() => {
							reject({ error: 'Cannot parse server response.' });
						});
				} else {
					// analyze the cause of error
					response
						.json()
						.then((message) => {
							reject(message);
						}) // error message in the response body
						.catch(() => {
							reject({ error: 'Cannot parse server response.' });
						});
				}
			})
			.catch(() => {
				reject({ error: 'Cannot communicate with the server.' });
			}); // connection errors
	});
}

function insertThesis(accessToken, thesis) {
	return new Promise((resolve, reject) => {
		fetch(URL + '/insert/thesis', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${accessToken}`,
			},
			body: JSON.stringify(thesis),
		})
			.then((response) => {
				if (response.ok) {
					response
						.json()
						.then((thesis) => resolve(thesis))
						.catch(() => {
							reject({ error: 'Cannot parse server response.' });
						});
				} else {
					// analyze the cause of error
					response
						.json()
						.then((message) => {
							reject(message);
						}) // error message in the response body
						.catch(() => {
							reject({ error: 'Cannot parse server response.' });
						});
				}
			})
			.catch(() => {
				reject({ error: 'Cannot communicate with the server.' });
			}); // connection errors
	});
}

function ThesisApply(id, accessToken) {
	return new Promise((resolve, reject) => {
		fetch(URL + `/thesis/${id}/apply`, {
			method: 'POST',
			headers: {
				Authorization: `Bearer ${accessToken}`,
			},
		})
			.then((response) => {
				if (response.ok) {
					response
						.json()
						.then((message) => resolve(message))
						.catch(() => {
							reject({ error: 'Cannot parse server response.' });
						});
				} else {
					// analyze the cause of error
					response
						.json()
						.then((message) => {
							reject(message);
						}) // error message in the response body
						.catch(() => {
							reject({ error: 'Cannot parse server response.' });
						});
				}
			})
			.catch(() => {
				reject({ error: 'Cannot communicate with the server.' });
			}); // connection errors
	});
}

function getUser(accessToken) {
	return new Promise((resolve, reject) => {
		fetch(URL + '/user', {
			headers: {
				Authorization: `Bearer ${accessToken}`,
			},
		})
			.then((response) => {
				if (response.ok) {
					response
						.json()
						.then((user) => resolve(user))
						.catch(() => {
							reject({ error: 'Cannot parse server response.' });
						});
				} else {
					response
						.json()
						.then((message) => {
							reject(message);
						})
						.catch(() => {
							reject({ error: 'Cannot parse server response.' });
						});
				}
			})
			.catch(() => reject({ error: 'Cannot communicate with the server.' }));
	});
}

function getApplications(accessToken) {
	return new Promise((resolve, reject) => {
		fetch(URL + '/thesis/applications/browse', {
			headers: {
				Authorization: `Bearer ${accessToken}`,
			},
		})
			.then((response) => {
				if (response.ok) {
					response
						.json()
						.then((applications) => resolve(applications))
						.catch(() => {
							reject({ error: 'Cannot parse server response.' });
						});
				} else {
					response
						.json()
						.then((message) => {
							reject(message);
						})
						.catch(() => {
							reject({ error: 'Cannot parse server response.' });
						});
				}
			})
			.catch(() => reject({ error: 'Cannot communicate with the server.' }));
	});
}

function acceptApplication(parameters, accessToken) {
	return new Promise((resolve, reject) => {
		fetch(URL + '/accept/application', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${accessToken}`,
			},
			body: JSON.stringify(parameters),
		})
			.then((response) => {
				if (response.ok) {
					response
						.json()
						.then((message) => resolve(message))
						.catch(() => {
							reject({ error: 'Cannot parse server response.' });
						});
				} else {
					// analyze the cause of error
					response
						.json()
						.then((message) => {
							reject(message);
						}) // error message in the response body
						.catch(() => {
							reject({ error: 'Cannot parse server response.' });
						});
				}
			})
			.catch(() => {
				reject({ error: 'Cannot communicate with the server.' });
			}); // connection errors
	});
}

function rejectApplication(parameters, accessToken) {
	return new Promise((resolve, reject) => {
		fetch(URL + '/reject/application', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${accessToken}`,
			},
			body: JSON.stringify(parameters),
		})
			.then((response) => {
				if (response.ok) {
					response
						.json()
						.then((message) => resolve(message))
						.catch(() => {
							reject({ error: 'Cannot parse server response.' });
						});
				} else {
					// analyze the cause of error
					response
						.json()
						.then((message) => {
							reject(message);
						}) // error message in the response body
						.catch(() => {
							reject({ error: 'Cannot parse server response.' });
						});
				}
			})
			.catch(() => {
				reject({ error: 'Cannot communicate with the server.' });
			}); // connection errors
	});
}

function editProposal(accessToken, thesis, id) {
	return new Promise((resolve, reject) => {
		fetch(URL + '/edit/thesis/' + id, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${accessToken}`,
			},
			body: JSON.stringify(thesis),
		})
			.then((response) => {
				if (response.ok) {
					response
						.json()
						.then((thesis) => resolve(thesis))
						.catch((e) => {
							reject({ error: e.error ? e.error : e });
						});
				} else {
					response
						.json()
						.then((message) => {
							reject(message);
						})
						.catch(() => {
							reject({ error: 'Cannot parse server response.' });
						});
				}
			})
			.catch(() => reject({ error: 'Cannot communicate with the server.' }));
	});
}

function getStatusVirtualClock(accessToken) {
	// call  /api/virtualClockStatus
	return new Promise((resolve, reject) => {
		fetch(URL + '/virtualClockStatus', {
			headers: {
				Authorization: `Bearer ${accessToken}`,
			},
		})
			.then((response) => {
				if (response.ok) {
					response
						.json()
						.then((status) => resolve(status))
						.catch(() => {
							reject({ error: 'Cannot parse server response.' });
						});
				} else {
					// analyze the cause of error
					response
						.json()
						.then((message) => {
							reject(message);
						}) // error message in the response body
						.catch(() => {
							reject({ error: 'Cannot parse server response.' });
						});
				}
			})
			.catch(() => {
				reject({ error: 'Cannot communicate with the server.' });
			}); // connection errors
	});
}

function resetVirtualClock(accessToken) {
	// call  /api/virtualClockOff
	return new Promise((resolve, reject) => {
		fetch(URL + '/virtualClockOff', {
			method: 'PUT',
			headers: {
				Authorization: `Bearer ${accessToken}`,
			},
		})
			.then((response) => {
				if (response.ok) {
					response
						.json()
						.then((msg) => resolve(msg))
						.catch(() => {
							reject({ error: 'Cannot parse server response.' });
						});
				} else {
					response
						.json()
						.then((message) => {
							reject(message);
						})
						.catch(() => {
							reject({ error: 'Cannot parse server response.' });
						});
				}
			})
			.catch(() => reject({ error: 'Cannot communicate with the server.' }));
	});
}

function setVirtualClock(accessToken, date) {
	// call  /api/virtualClockOn
	return new Promise((resolve, reject) => {
		fetch(URL + '/virtualClockOn', {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${accessToken}`,
			},
			body: JSON.stringify({ date: date }),
		})
			.then((response) => {
				if (response.ok) {
					response
						.json()
						.then((msg) => resolve(msg))
						.catch(() => {
							reject({ error: 'Cannot parse server response.' });
						});
				} else {
					response
						.json()
						.then((message) => {
							reject(message);
						})
						.catch(() => {
							reject({ error: 'Cannot parse server response.' });
						});
				}
			})
			.catch(() => reject({ error: 'Cannot communicate with the server.' }));
	});
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
	getStatusVirtualClock,
	resetVirtualClock,
	setVirtualClock
};
export default API;
