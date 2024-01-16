function matchesSearch(thesis, search) {
	const lowerSearch = search.toLowerCase();
	return (
		thesis.title.toLowerCase().includes(lowerSearch) ||
		thesis.description.toLowerCase().includes(lowerSearch) ||
		thesis.notes.toLowerCase().includes(lowerSearch) ||
		thesis.req_know.toLowerCase().includes(lowerSearch) ||
		thesis.keywords.some((keyword) => keyword.toLowerCase().includes(lowerSearch))
	);
}

function matchesRapidFilter(thesis, rapidFilter) {
	if (rapidFilter === 'all') {
		return true;
	} else if (rapidFilter === 'company') {
		return thesis.types.includes('IN COMPANY');
	} else if (rapidFilter === 'abroad') {
		return thesis.types.includes('ABROAD');
	}
	return false;
}

export function filterThesis(thesis, rapidFilter, search) {
	return thesis.filter((thesis) => matchesSearch(thesis, search) && matchesRapidFilter(thesis, rapidFilter));
}
