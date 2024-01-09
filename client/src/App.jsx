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
import Settings from './views/Settings.jsx';
import StudentApplicationInfo from './views/StudentApplicationInfo.jsx';
import StudentRequests from './views/StudentRequests.jsx';
import SecretaryHome from './views/SecretaryHome.jsx';
import InsertThesisRequest from './views/InsertThesisRequest.jsx';
import RequestThesisDetails from './views/RequestThesisDetails.jsx';

function App() {
	const { user, isAuthenticated, getAccessTokenSilently, isLoading, loginWithRedirect } = useAuth0();
	const [userData, setUserData] = useState(null);
	const [thesis, setThesis] = useState([]);
	const [accessToken, setAccessToken] = useState(null);
	const [dirty, setDirty] = useState(false);
	const [isProfessor, setIsProfessor] = useState(false);
	const [isStudent, setIsStudent] = useState(false);
	const [hasApplied, setHasApplied] = useState(false);
	const [applications, setApplications] = useState([]);
	const [applicationsThesis, setApplicationsThesis] = useState([]);
	const [copiedProposal, setCopiedProposal] = useState(null);
	const [isSecretary, setIsSecretary] = useState(false);

	const { setLoading } = useLoading();

	// Filters
	const [activatedFilters, setActivatedFilters] = useState(false);
	const [selectedSupervisor, setSelectedSupervisor] = useState([]);
	const [selectedCoSupervisors, setSelectedCoSupervisors] = useState([]);
	const [selectedKeywords, setSelectedKeywords] = useState([]);
	const [selectedTypes, setSelectedTypes] = useState([]);
	const [selectedGroups, setSelectedGroups] = useState([]);
	const [expirationDate, setExpirationDate] = useState('all');

	//GenericModal
	const [showModal, setShowModal] = useState(false);
	const [msgModal, setMsgModal] = useState({}); // {header: "header", body: "body", method: method}

	//virtual clock
	const [virtualClock, setVirtualClock] = useState(false);
	const [dateVirtualClock, setDateVirtualClock] = useState(null);

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
							setIsSecretary(false);
						} else if (user.role === 'teacher') {
							setIsProfessor(true);
							setIsStudent(false);
							setIsSecretary(false);
						} else if (user.role === 'secretary') {
							setIsSecretary(true);
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
		if (!isSecretary && isAuthenticated && (isStudent || isProfessor)) {
			setLoading(true);
			API.getAllThesis(accessToken)
				.then((thesis) => {
					setThesis(thesis);
					setDirty(false);
				})
				.catch((err) => handleError(err))
				.finally(() => setLoading(false));
		}
	}, [dirty, accessToken, isSecretary, isStudent, isProfessor]);

	useEffect(() => {
		if (isAuthenticated && isStudent) {
			setLoading(true);
			API.getApplications(accessToken)
				.then((app) => {
					setApplications(app);
					let applied = app.some((application) => application.state == 0 || application.state == 1);
					setHasApplied(applied);
					setDirty(false);
				})
				.catch((err) => {
					handleError(err);
				})
				.finally(() => setLoading(false));
		}
	}, [dirty, accessToken, isStudent]);

	useEffect(() => {
		if (isAuthenticated && isProfessor) {
			setLoading(true);
			API.getApplications(accessToken)
				.then((app) => {
					setApplicationsThesis(app);
					setLoading(false);
					setDirty(false);
				})
				.catch((err) => {
					handleError(err);
					setLoading(false);
				});
		}
	}, [dirty, accessToken, isProfessor]);

	useEffect(() => {
		if (isAuthenticated) {
			API.getStatusVirtualClock(accessToken)
				.then((res) => {
					if (res == 0) {
						setVirtualClock(false);
						setDateVirtualClock(null);
					} else {
						setVirtualClock(true);
						setDateVirtualClock(res);
					}
				})
				.catch((err) => {
					handleError(err);
				});
		}
	}, [accessToken]);

	useEffect(() => {
		if (!isAuthenticated && !isLoading) {
			loginWithRedirect();
		}
	}, [isAuthenticated, isLoading]);

	return (
		<BrowserRouter>
			<Header userData={userData} date={dateVirtualClock} isStudent={isStudent} isProfessor={isProfessor} />
			<Toaster />
			<GenericModal showModal={showModal} setShowModal={setShowModal} msgModal={msgModal} />
			<Routes>
				<Route
					path='/'
					element={
						isProfessor ? (
							<ProfessorHome
								thesis={thesis}
								applications={applicationsThesis}
								handleError={handleError}
								handleSuccess={handleSuccess}
								accessToken={accessToken}
								dirty={dirty}
								setDirty={setDirty}
								setCopiedProposal={setCopiedProposal}
								setShowModal={setShowModal}
								setMsgModal={setMsgModal}
							/>
						) : isStudent ? (
							<StudentHome
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
								expirationDate={expirationDate}
								setExpirationDate={setExpirationDate}
								handleError={handleError}
								handleSuccess={handleSuccess}
								setMsgModal={setMsgModal}
								setShowModal={setShowModal}
								applications={applications}
								setDirty={setDirty}
								hasApplied={hasApplied}
								date={dateVirtualClock}
							/>
						) : isSecretary ? (
							<SecretaryHome
								handleError={handleError}
								handleSuccess={handleSuccess}
								accessToken={accessToken}
								setMsgModal={setMsgModal}
								setShowModal={setShowModal} />
						) : null
					}
				/>
				<Route
					path='/proposal/:id'
					element={
						<Proposal
							accessToken={accessToken}
							isProfessor={isProfessor}
							handleError={handleError}
							handleSuccess={handleSuccess}
							setMsgModal={setMsgModal}
							setShowModal={setShowModal}
							setDirty={setDirty}
							hasApplied={hasApplied}
							applications={applications}
						/>
					}
				/>
				<Route
					path='/proposals/add'
					element={
						isProfessor ? (
							<InsertProposal
								accessToken={accessToken}
								setDirty={setDirty}
								user={userData}
								handleError={handleError}
								date={dateVirtualClock}
								copiedProposal={copiedProposal}
								setThesis={setThesis}
							/>
						) : isStudent ? (
							<NotFound />
						) : null
					}
				/>
				<Route
					path='/proposals/edit/:id'
					element={
						isProfessor ? (
							<EditProposal accessToken={accessToken} setDirty={setDirty} user={userData} handleError={handleError} date={dateVirtualClock} />
						) : isStudent ? (
							<NotFound />
						) : null
					}
				/>
				<Route
					path='/applications'
					element={
						isProfessor ? (
							<ProfessorApplications accessToken={accessToken} handleError={handleError} isProfessor={isProfessor} date={dateVirtualClock} />
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
							date={dateVirtualClock}
							dirty={dirty}
							setDirty={setDirty}
						/>
					}
				/>
				<Route
					path='/applications/proposal/:id/applications/:idApplication'
					element={
						<StudentApplicationInfo
							accessToken={accessToken}
							handleError={handleError}
							handleSuccess={handleSuccess}
							setDirtyParent={setDirty}
							setShowModal={setShowModal}
							setMsgModal={setMsgModal}
						/>
					}
				/>
				<Route path='/requests' element={<StudentRequests accessToken={accessToken} handleError={handleError} />} />
				<Route path='/requests/add' element={<InsertThesisRequest accessToken={accessToken} handleError={handleError} />} />
				<Route path='/requests/add' element={<NotFound />} />
				<Route path='requests/:id' element={<RequestThesisDetails
					accessToken={accessToken}
					handleError={handleError}
					handleSuccess={handleSuccess}
					setMsgModal={setMsgModal}
					setShowModal={setShowModal} />} />
				<Route
					path='/settings'
					element={
						<Settings
							virtualClock={virtualClock}
							setVirtualClock={setVirtualClock}
							dateVirtualClock={dateVirtualClock}
							setDateVirtualClock={setDateVirtualClock}
							accessToken={accessToken}
							handleError={handleError}
							handleSuccess={handleSuccess}
							setDirty={setDirty}
						/>
					}
				/>
			</Routes>
		</BrowserRouter>
	);
}

export default App;
