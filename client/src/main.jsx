import React from 'react';
import { createRoot } from 'react-dom/client';
import { Auth0Provider } from '@auth0/auth0-react';
import App from './App';

const root = createRoot(document.getElementById('root'));

root.render(
	<Auth0Provider
		domain='thesismanagement.eu.auth0.com'
		clientId='IdPkHtJco46KuOAgf1Tp8LjBDRc0b2fg'
		authorizationParams={{
			redirect_uri: window.location.origin,
		}}
	>
		<App />
	</Auth0Provider>
);
