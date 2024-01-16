import PropTypes from 'prop-types';
import { createContext, useContext, useState, useMemo } from 'react';

const LoadingContext = createContext();

export const LoadingProvider = ({ children }) => {
	const [loading, setLoading] = useState(false);
	const value = useMemo(() => ({ loading, setLoading }), [loading, setLoading]);

	return <LoadingContext.Provider value={value}>{children}</LoadingContext.Provider>;
};

LoadingProvider.propTypes = {
	children: PropTypes.node.isRequired,
};

export const useLoading = () => {
	const context = useContext(LoadingContext);

	if (!context) {
		throw new Error('useLoading must be used within a LoadingProvider');
	}

	return context;
};
