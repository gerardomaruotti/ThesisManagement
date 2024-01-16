export function filterThesis(thesis, rapidFilter, search) {
	let filtered = thesis.filter((thesis) => {
		const matchesSearch =
			thesis.title.toLowerCase().includes(search.toLowerCase()) ||
			thesis.description.toLowerCase().includes(search.toLowerCase()) ||
			thesis.notes.toLowerCase().includes(search.toLowerCase()) ||
			thesis.req_know.toLowerCase().includes(search.toLowerCase()) ||
			thesis.keywords.filter((keyword) => keyword.toLowerCase().includes(search.toLowerCase())).length > 0;

		if (rapidFilter === 'all') {
			return matchesSearch;
		} else if (rapidFilter === 'company') {
			return matchesSearch && thesis.types.includes('IN COMPANY');
		} else if (rapidFilter === 'abroad') {
			return matchesSearch && thesis.types.includes('ABROAD');
		}
	});

	return filtered;
}
