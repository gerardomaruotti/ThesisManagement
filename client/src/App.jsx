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
import NotFound from './views/NotFound.jsx';
import API from './API.jsx';

function App() {
	const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();
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
	const [userData, setUserData] = useState(null);
	const [thesis, setThesis] = useState([]);
	const [accessToken, setAccessToken] = useState(null);
	const [dirty, setDirty] = useState(false);
	const [isProfessor, setIsProfessor] = useState(false);

	function handleError(err) {
		console.log(err);
	}

	useEffect(() => {
		const getUserMetadata = async () => {
			try {
				const accessToken = await getAccessTokenSilently({
					authorizationParams: {
						audience: `https://thesismanagement.eu.auth0.com/api/v2/`,
						scope: 'read:current_user',
					},
				});
				setAccessToken(accessToken);
				API.getUser(accessToken)
					.then((user) => {
						setUserData(user);
						if (user.role === 'student') {
							setIsProfessor(false);
						} else if (user.role === 'teacher') {
							setIsProfessor(true);
						}
					})
					.catch((err) => handleError(err));


				API.getAllThesis(accessToken)
					.then((thesis) => {
						setThesis(thesis);
					})
					.catch((err) => handleError(err));
			} catch (e) {
				console.log(e.message);
			}
		};
		if (isAuthenticated) {
			getUserMetadata();
			setDirty(false);
		}
	}, [isAuthenticated, getAccessTokenSilently, user?.sub, dirty]);

	return (
		<BrowserRouter>
			<Header />
			<Routes>
				<Route
					path='/'
					element={
						isProfessor ? (
							<ProfessorHome thesis={thesis} />
						) : (
							<StudentHome isProfessor={isProfessor} thesis={thesis} setThesis={setThesis} accessToken={accessToken} />
						)
					}
				/>
				<Route path='/proposal/:id' element={<Proposal accessToken={accessToken} isProfessor={isProfessor} />} />
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
							accessToken={accessToken}
							setDirty={setDirty}
						/>
					}
				/>
				<Route path='/*' element={<NotFound />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
