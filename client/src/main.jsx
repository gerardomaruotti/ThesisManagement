import React from 'react';
import { createRoot } from 'react-dom/client';
import { Auth0Provider } from '@auth0/auth0-react';
import App from './App';
import { LoadingProvider } from './LoadingContext';

const root = createRoot(document.getElementById('root'));

root.render(
	<Auth0Provider
		domain='thesismanagement.eu.auth0.com'
		clientId='IdPkHtJco46KuOAgf1Tp8LjBDRc0b2fg'
		authorizationParams={{
			redirect_uri: window.location.origin,
			audience: 'https://thesismanagement.eu.auth0.com/api/v2/',
			scope: 'read:current_user update:current_user_metadata',
		}}
		cacheLocation='localstorage'
	>
		<LoadingProvider>
			<App />
		</LoadingProvider>
	</Auth0Provider>
);
