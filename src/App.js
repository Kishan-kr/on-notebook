import './App.css';
import Base from './components/Base';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NoteState from './contexts/NoteContext';
import SignUp from './components/SignUp';
import Login from './components/Login';
import AuthState from './contexts/AuthContext';
import Alert from './components/Alert';
import NoteSide from './components/NoteSide';
import Home from './components/Home';
import AddNote from './components/AddNote';
import ViewNote from './components/ViewNote';
import UpdateNote from './components/UpdateNote';
import Trash from './components/Trash';

function App() {

  return (
    <div className="App">
      <AuthState>
        <NoteState>
          <Router>
            <Alert />
            <Routes>
              <Route path="/" element={<Base />} >
                <Route path='/' element={<Home />} />
                <Route path="/notes" element={<NoteSide />} />
                <Route path="/trash" element={<Trash />} />
                <Route path="notes/addnote" element={<AddNote />} />
                <Route path="notes/view" element={<ViewNote />} />
                <Route path="notes/edit" element={<UpdateNote />} />
              </Route>
              <Route path="/signup" element={<SignUp />} />
              <Route path="/login" element={<Login />} />
            </Routes>
          </Router>
        </NoteState>
      </AuthState>
    </div>
  );
}

export default App;
