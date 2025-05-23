import React, { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';


import Login from './components/Login';
import Header from './components/Header';
import Register from './components/Register';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from './redux/AuthSlice ';
import { Navigate } from 'react-router-dom';



const App = () => {

  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const userFromToken = JSON.parse((atob(token.split(".")[1])));
      dispatch(setUser(userFromToken));
    }
  }, [dispatch])

  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/login" element={<Login />} />

        <Route path="/register" element={user ? <Login /> : <Register />} />




      </Routes>
    </Router>

  )
}

export default App