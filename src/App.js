import './App.scss';
import Home from './Components/Home';
import { Routes,Route } from 'react-router-dom';
import Details from './Components/Details';
import Admin from './Components/Admin';
import Navbar from './Components/Navbar';
import UserPage from './Components/User';
import ContactPage from './Components/Contact';
import AboutPage from './Components/About';
import Login from './Components/Login';
import SignUp from './Components/Signup';
import RequestPage from './Components/RequestPage';
import PopUp from './Components/PopUp' 

function App() {
  return (
    <div className="app">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/:id" element={<Details />} />   
        <Route path="/admin" element={<Admin />} />   
        <Route path="/user" element={<UserPage />}  />
        <Route path="/contact" element={<ContactPage />}  />
        {/* <Route path="/about" element={<AboutPage />}  /> */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/requests" element={<RequestPage />} />


      </Routes>
    </div>
  );
}

export default App;
