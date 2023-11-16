/**
 * All the API calls
 */

const URL = 'http://localhost:3001/api';

function getAllKeywords() {
	// call  /api/keywords
	return new Promise((resolve, reject) => {
		fetch(URL + '/keywords')
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

function getAllThesis(accessToken) {
	// call  /api/keywords
	return new Promise((resolve, reject) => {
		fetch(URL + '/thesis', {
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

function getAllTypes() {
	// call  /api/types
	return new Promise((resolve, reject) => {
		fetch(URL + '/types')
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

function getAllSupervisors() {
	// call  /api/teachers
	return new Promise((resolve, reject) => {
		fetch(URL + '/teachers')
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

function getAllCds() {
	// call  /api/teachers
	return new Promise((resolve, reject) => {
		fetch(URL + '/cds')
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

function getAllGroups() {
	// call  /api/groups
	return new Promise((resolve, reject) => {
		fetch(URL + '/groups')
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
		fetch(URL + `/thesis/${id}/proposal`, {
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
};
export default API;
