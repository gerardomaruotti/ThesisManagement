import React from 'react';
import { createRoot } from 'react-dom/client';
import { Auth0Provider } from '@auth0/auth0-react';
import App from './App';

const root = createRoot(document.getElementById('root'));

root.render(
	<Auth0Provider
		domain='dev-1v67v8wnwnvivonl.us.auth0.com'
		clientId='Psju9rPDQ1Ngh4JRo8zFAa4iVVtrV57E'
		authorizationParams={{
			redirect_uri: window.location.origin,
			audience: 'https://dev-1v67v8wnwnvivonl.us.auth0.com/api/v2/',
			scope: 'read:current_user update:current_user_metadata',
		}}
	>
		<App />
	</Auth0Provider>
);

export default Auth0ProviderWithHistory;
