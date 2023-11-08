import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './views/Home';


function App() {

  return (
    <BrowserRouter>
      {/* <MyNavbar loggedIn={loggedIn} logout={handleLogout} /> */}
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/*' element={<Home />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
