import { useState, useEffect } from 'react';
import './App.css';
import Login from './components/Login';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import { auth } from './firebaseconfigurations/config';
import { onAuthStateChanged } from 'firebase/auth';
import 'boxicons/css/boxicons.min.css';
function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, []);

  return (
    <Router>
      <Routes>
        <Route path='/' element={user ? <Home /> : <Login />} />
        <Route path='/home' element={user ? <Home /> : <Login />} />
      </Routes>
    </Router>
  );
}

export default App;
