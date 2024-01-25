import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { useEffect, useState, useMemo } from 'react';
import UserContext from './contexts/UserContext';
import { useLoading } from './contexts/LoadingContext.jsx';
import { handleError, handleSuccess } from './utils/toastHandlers.js';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import { Toaster } from 'react-hot-toast';
import API from './API.jsx';
import NotFound from './views/NotFound.jsx';
import Header from './components/Header';
import StudentHome from './views/StudentHome';
import ProfessorHome from './views/ProfessorHome';
import InsertProposal from './views/InsertProposal';
import Proposal from './views/Proposal';
import StudentApplications from './views/StudentApplications.jsx';
import ProfessorApplications from './views/ProfessorApplications.jsx';
import ProfessorApplicationsThesis from './views/ProfessorApplicationsThesis.jsx';
import GenericModal from './components/GenericModal.jsx';
import EditProposal from './views/EditProposal.jsx';
import Settings from './views/Settings.jsx';
import StudentApplicationInfo from './views/StudentApplicationInfo.jsx';
import StudentRequests from './views/StudentRequests.jsx';
import InsertThesisRequest from './views/InsertThesisRequest.jsx';
import RequestThesisDetails from './views/RequestThesisDetails.jsx';
import SecretaryAndProfessorRequest from './views/SecretaryAndProfessorRequest.jsx';

function App() {
	const { user, isAuthenticated, getAccessTokenSilently, isLoading, loginWithRedirect } = useAuth0();
	const { setLoading } = useLoading();
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
	const [filterThesisArchive, setFilterThesisArchive] = useState([]);
	const [isPending, setIsPending] = useState(false);

	// Requests
	const [requests, setRequests] = useState([]);
	const [hasRequested, setHasRequested] = useState(false);

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

	//rapid filters
	const [rapidFilterStudent, setRapidFilterStudent] = useState('all');
	const [rapidFilterSecretary, setRapidFilterSecretary] = useState('secretary-review');
	const [rapidFilterProfessorHome, setRapidFilterProfessorHome] = useState('active');
	const [rapidFilterProfessorApplication, setRapidFilterProfessorApplication] = useState('all');
	const [rapidFilterProfessorRequest, setRapidFilterProfessorRequest] = useState('supervisor-review');

	const userCredentials = useMemo(
		() => ({ user, isAuthenticated, isLoading, accessToken, userData, isProfessor, isStudent, isSecretary }),
		[user, isAuthenticated, isLoading, accessToken, userData, isProfessor, isStudent, isSecretary]
	);

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
					setFilterThesisArchive(thesis);
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
					let pending = app.some((application) => application.state == 0);
					setHasApplied(applied);
					setIsPending(pending);
					setDirty(false);
				})
				.catch((err) => {
					handleError(err);
				})
				.finally(() => setLoading(false));
		}
	}, [dirty, accessToken, isStudent]);

	useEffect(() => {
		if (isAuthenticated && isStudent) {
			setLoading(true);
			API.getStudentThesisRequest(accessToken)
				.then((app) => {
					setRequests(app);
					let requested = app.some((request) => !(request.status === 2 || request.status === 4));
					setHasRequested(requested);
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
		<UserContext.Provider value={userCredentials}>
			<BrowserRouter>
				<Header date={dateVirtualClock} />
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
									dirty={dirty}
									setDirty={setDirty}
									setCopiedProposal={setCopiedProposal}
									setShowModal={setShowModal}
									setMsgModal={setMsgModal}
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
									setThesis={setThesis}
									date={dateVirtualClock}
									rapidFilter={rapidFilterProfessorHome}
									setRapidFilter={setRapidFilterProfessorHome}
									filterThesis={filterThesisArchive}
									setFilterThesis={setFilterThesisArchive}
								/>
							) : isStudent ? (
								<StudentHome
									thesis={thesis}
									setThesis={setThesis}
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
									setMsgModal={setMsgModal}
									setShowModal={setShowModal}
									applications={applications}
									setDirty={setDirty}
									hasApplied={hasApplied}
									hasRequested={hasRequested}
									date={dateVirtualClock}
									rapidFilter={rapidFilterStudent}
									setRapidFilter={setRapidFilterStudent}
								/>
							) : isSecretary ? (
								<SecretaryAndProfessorRequest
									setMsgModal={setMsgModal}
									setShowModal={setShowModal}
									rapidFilter={rapidFilterSecretary}
									setRapidFilter={setRapidFilterSecretary}
									isProfessor={false}
								/>
							) : null
						}
					/>
					<Route
						path='/proposal/:id'
						element={
							<Proposal
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
								<InsertProposal setDirty={setDirty} user={userData} date={dateVirtualClock} copiedProposal={copiedProposal} setThesis={setThesis} />
							) : isStudent ? (
								<NotFound />
							) : null
						}
					/>
					<Route
						path='/proposals/edit/:id'
						element={isProfessor ? <EditProposal setDirty={setDirty} user={userData} date={dateVirtualClock} /> : isStudent ? <NotFound /> : null}
					/>
					<Route
						path='/applications'
						element={
							isProfessor ? (
								<ProfessorApplications
									date={dateVirtualClock}
									rapidFilter={rapidFilterProfessorApplication}
									setRapidFilter={setRapidFilterProfessorApplication}
								/>
							) : isStudent ? (
								<StudentApplications />
							) : null
						}
					/>
					<Route
						path='/applications/proposal/:id'
						element={
							<ProfessorApplicationsThesis
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
						element={<StudentApplicationInfo setDirtyParent={setDirty} setShowModal={setShowModal} setMsgModal={setMsgModal} />}
					/>
					<Route
						path='/requests'
						element={
							isStudent ? (
								<StudentRequests requests={requests} hasApplied={isPending} hasRequested={hasRequested} />
							) : isProfessor ? (
								<SecretaryAndProfessorRequest
									setShowModal={setShowModal}
									setMsgModal={setMsgModal}
									rapidFilter={rapidFilterProfessorRequest}
									setRapidFilter={setRapidFilterProfessorRequest}
								/>
							) : null
						}
					/>
					<Route path='/requests/add' element={<InsertThesisRequest setDirty={setDirty} />} />
					<Route path='/requests/add' element={<NotFound />} />
					<Route path='requests/:id' element={<RequestThesisDetails setMsgModal={setMsgModal} setShowModal={setShowModal} />} />
					<Route
						path='/settings'
						element={
							<Settings
								virtualClock={virtualClock}
								setVirtualClock={setVirtualClock}
								dateVirtualClock={dateVirtualClock}
								setDateVirtualClock={setDateVirtualClock}
								setDirty={setDirty}
							/>
						}
					/>
				</Routes>
			</BrowserRouter>
		</UserContext.Provider>
	);
}

export default App;
