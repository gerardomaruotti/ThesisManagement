import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './views/Home';
import './App.css';
import Header from './components/Header';

function App() {
	return (
		<BrowserRouter>
			<Header />
			<Routes>
				<Route path='/' element={<Home />} />
				<Route path='/*' element={<Home />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
