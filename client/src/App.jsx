import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import StudentHome from './views/StudentHome';
import Header from './components/Header';
import ProfessorHome from './views/ProfessorHome';
import InsertProposal from './views/InsertProposal';
import Proposal from './views/Proposal';
import API from './API.jsx';

function App() {
	const { user, isAuthenticated, getAccessTokenSilently, isLoading, loginWithRedirect } = useAuth0();
	const [title, setTitle] = useState('');
	const [requiredKnowledge, setRequiredKnowledge] = useState('');
	const [description, setDescription] = useState('');
	const [notes, setNotes] = useState('');
	const [keywords, setKeywords] = useState([]);
	const [supervisor, setSupervisor] = useState('');
	const [coSupervisors, setCoSupervisors] = useState([]);
	const [level, setLevel] = useState('');
	const [cds, setCds] = useState('');
	const [type, setType] = useState([]);
	const [expirationDate, setExpirationDate] = useState('');
	// const [userMetadata, setUserMetadata] = useState(null);

	function handleError(err) {
		console.log(err);
	}

	// useEffect(() => {
	// 	if (!isLoading && !isAuthenticated) {
	// 		loginWithRedirect();
	// 	}
	// }, [isLoading, isAuthenticated, loginWithRedirect]);

	useEffect(() => {
		console.log('User is authenticated: ' + isAuthenticated);
		console.log(user);
		const getUserMetadata = async () => {
			try {
				console.log("Getting user's access token");
				const accessToken = await getAccessTokenSilently({
					authorizationParams: {
						audience: `https://thesismanagement.eu.auth0.com/api/v2/`,
						scope: 'read:current_user',
					},
				});
				console.log('User access token: ' + accessToken);

				//test per get thesis autenticata
				API.getAllThesis(accessToken);
			} catch (e) {
				console.log(e.message);
			}
		};
		if (isAuthenticated) {
			getUserMetadata();
		}
	}, [isAuthenticated, getAccessTokenSilently, user?.sub]);

	return (
		<BrowserRouter>
			<Header />
			<Routes>
				<Route path='/' element={<StudentHome />} />
				<Route path='/proposal/:id' element={<Proposal />} />
				<Route path='/professor' element={<ProfessorHome />} />
				<Route
					path='/proposals/add'
					element={
						<InsertProposal
							title={title}
							setTitle={setTitle}
							requiredKnowledge={requiredKnowledge}
							setRequiredKnowledge={setRequiredKnowledge}
							description={description}
							setDescription={setDescription}
							notes={notes}
							setNotes={setNotes}
							keywords={keywords}
							setKeywords={setKeywords}
							supervisor={supervisor}
							setSupervisor={setSupervisor}
							coSupervisors={coSupervisors}
							setCoSupervisors={setCoSupervisors}
							level={level}
							setLevel={setLevel}
							cds={cds}
							setCds={setCds}
							type={type}
							setType={setType}
							expirationDate={expirationDate}
							setExpirationDate={setExpirationDate}
						/>
					}
				/>
				<Route path='/*' element={<StudentHome />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
