import './App.css';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Notes from './components/Notes';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NoteState from './contexts/NoteContext';
import SignUp from './components/SignUp';
import Login from './components/Login';
import AuthState from './contexts/AuthContext';
import Alert from './components/Alert';

function App() {

  return (
    <div className="App">
      <AuthState>
        <NoteState>
          <Router>
            <Navbar />
            <Alert />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/login" element={<Login />} />
              <Route path="/notes" element={<Notes />} />
              <Route path="/notes/addnote" element={<Notes />} />
              <Route path="/notes/view" element={<Notes />} />
            </Routes>
          </Router>
        </NoteState>
      </AuthState>
    </div>
  );
}

export default App;
