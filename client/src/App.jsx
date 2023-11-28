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
import { useLoading } from './LoadingContext.jsx';
import StudentApplications from './views/StudentApplications.jsx';
import toast, { Toaster } from 'react-hot-toast';
import ProfessorApplications from './views/ProfessorApplications.jsx';
import ProfessorApplicationsThesis from './views/ProfessorApplicationsThesis.jsx';
import GenericModal from './components/GenericModal.jsx';
import EditProposal from './views/EditProposal.jsx';

function App() {
	const { user, isAuthenticated, getAccessTokenSilently, isLoading, loginWithRedirect } = useAuth0();
	const [userData, setUserData] = useState(null);
	const [thesis, setThesis] = useState([]);
	const [accessToken, setAccessToken] = useState(null);
	const [dirty, setDirty] = useState(false);
	const [isProfessor, setIsProfessor] = useState(false);
	const [isStudent, setIsStudent] = useState(false);
	const [applications, setApplications] = useState([]);

	const { setLoading } = useLoading();

	// Filters
	const [activatedFilters, setActivatedFilters] = useState(false);
	const [selectedSupervisor, setSelectedSupervisor] = useState([]);
	const [selectedCoSupervisors, setSelectedCoSupervisors] = useState([]);
	const [selectedKeywords, setSelectedKeywords] = useState([]);
	const [selectedTypes, setSelectedTypes] = useState([]);
	const [selectedGroups, setSelectedGroups] = useState([]);
	const [expirationDate2, setExpirationDate2] = useState('all');

	//GenericModal
	const [showModal, setShowModal] = useState(false);
	const [msgModal, setMsgModal] = useState({}); // {header: "header", body: "body", method: method}

	function handleError(err) {
		toast.error(err.error ? err.error : err, {
			position: 'bottom-center',
			duration: 5000,
			style: {
				borderRadius: '10px',
				background: 'rgba(255, 0, 0, 0.9)',
				color: '#fff',
			},
		});
	}

	function handleSuccess(msg) {
		toast.success(msg, {
			position: 'bottom-center',
			style: {
				borderRadius: '10px',
				background: 'rgba(40, 199, 111, 0.9)',
				color: '#fff',
			},
		});
	}

	useEffect(() => {
		const getUserMetadata = async () => {
			try {
				setLoading(true);
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
							setIsStudent(true);
						} else if (user.role === 'teacher') {
							setIsProfessor(true);
							setIsStudent(false);
						}
						handleSuccess('Logged in successfully!');
					})
					.catch((err) => handleError(err));

			} catch (e) {
				handleError(e.message);
			}
		};
		if (isAuthenticated) {
			getUserMetadata();
			setDirty(false);
		}
	}, [isAuthenticated, getAccessTokenSilently, user?.sub, setLoading]);

	useEffect(() => {
		if (isAuthenticated) {
			API.getAllThesis(accessToken)
				.then((thesis) => {
					setThesis(thesis);
				})
				.catch((err) => handleError(err))
				.finally(() => setLoading(false));

		}
	}, [dirty, accessToken]);

	useEffect(() => {
		if (isAuthenticated && isStudent) {
			API.getApplications(accessToken)
				.then((app) => {
					setApplications(app);
					//console.log(app);
				})
				.catch((err) => {
					handleError(err);
				});
		}
	}, [dirty, accessToken, isStudent]);

	useEffect(() => {
		if (!isAuthenticated && !isLoading) {
			loginWithRedirect();
		}
	}, [isAuthenticated, isLoading]);

	return (
		<BrowserRouter>
			<Header userData={userData} />
			<Toaster />
			<GenericModal showModal={showModal} setShowModal={setShowModal} msgModal={msgModal} />
			<Routes>
				<Route
					path='/'
					element={
						isProfessor ? (
							<ProfessorHome thesis={thesis} />
						) : isStudent ? (
							<StudentHome
								isProfessor={isProfessor}
								thesis={thesis}
								setThesis={setThesis}
								accessToken={accessToken}
								activatedFilters={activatedFilters}
								setActivatedFilters={setActivatedFilters}
								selectedSupervisor={selectedSupervisor}
								setSelectedSupervisor={setSelectedSupervisor}
								selectedCoSupervisors={selectedCoSupervisors}
								setSelectedCoSupervisors={setSelectedCoSupervisors}
								selectedKeywords={selectedKeywords}
								setSelectedKeywords={setSelectedKeywords}
								selectedTypes={selectedTypes}
								setSelectedTypes={setSelectedTypes}
								selectedGroups={selectedGroups}
								setSelectedGroups={setSelectedGroups}
								expirationDate={expirationDate2}
								setExpirationDate={setExpirationDate2}
								handleError={handleError}
								handleSuccess={handleSuccess}
								setMsgModal={setMsgModal}
								setShowModal={setShowModal}
								applications={applications}
								setDirty={setDirty}
							/>
						) : null
					}
				/>
				<Route path='/proposal/:id'
					element={<Proposal
						accessToken={accessToken}
						isProfessor={isProfessor}
						handleError={handleError}
						handleSuccess={handleSuccess}
						setMsgModal={setMsgModal}
						setShowModal={setShowModal}
						setDirty={setDirty}
						applications={applications} />} />
				<Route
					path='/proposals/add'
					element={
						isProfessor ? (
							<InsertProposal accessToken={accessToken} setDirty={setDirty} user={userData} handleError={handleError} />
						) : isStudent ? (
							<NotFound />
						) : null
					}
				/>
				<Route
					path='/proposals/edit/:id'
					element={
						isProfessor ? (
							<EditProposal accessToken={accessToken} setDirty={setDirty} user={userData} handleError={handleError} />
						) : isStudent ? (
							<NotFound />
						) : null
					}
				/>
				<Route
					path='/applications'
					element={
						isProfessor ? (
							<ProfessorApplications accessToken={accessToken} handleError={handleError} isProfessor={isProfessor} />
						) : isStudent ? (
							<StudentApplications accessToken={accessToken} handleError={handleError} />
						) : null
					}
				/>
				<Route
					path='/applications/proposal/:id'
					element={
						<ProfessorApplicationsThesis
							accessToken={accessToken}
							handleError={handleError}
							isProfessor={isProfessor}
							handleSuccess={handleSuccess}
							setMsgModal={setMsgModal}
							setShowModal={setShowModal}
						/>
					}
				/>
			</Routes>
		</BrowserRouter>
	);
}

export default App;
