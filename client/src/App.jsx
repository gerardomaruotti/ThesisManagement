import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './views/Home';
import Header from './components/Header';
import ProfessorHome from './views/ProfessorHome';
import InsertProposal from './views/InsertProposal';
import { useState } from 'react';

function App() {
	const [title, setTitle] = useState('');
	const [requiredKnowledge, setRequiredKnowledge] = useState('');
	const [description, setDescription] = useState('');
	const [notes, setNotes] = useState('');
	const [keywords, setKeywords] = useState([]);
	const [groups, setGroups] = useState([]);
	const [supervisor, setSupervisor] = useState('');
	const [coSupervisors, setCoSupervisors] = useState([]);
	const [level, setLevel] = useState('');
	const [cds, setCds] = useState('');
	const [type, setType] = useState([]);
	const [expirationDate, setExpirationDate] = useState('');

	return (
		<BrowserRouter>
			<Header />
			<Routes>
				<Route path='/' element={<Home />} />
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
							groups={groups}
							setGroups={setGroups}
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
				<Route path='/*' element={<Home />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
