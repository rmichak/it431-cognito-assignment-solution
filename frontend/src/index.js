import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Home from './components/Home';
import 'bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import CourseList from './components/CourseList';
import CourseDetails from './components/CourseDetails';
import CourseAdd from './components/CourseAdd';
import CourseUpdate from './components/CourseUpdate';
import { LogInPage } from './components/LogInPage';
import { SignUpPage } from './components/SignUpPage';
import { PrivateRoute } from './auth/PrivateRoute';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LogInPage />} />
        <Route path="/sign-up" element={<SignUpPage />} />
        <Route path="/courses" element={<CourseList />} />
        <Route path="/courses/:id" element={<CourseDetails />} />
        <Route path="/courses/add" element={<PrivateRoute><CourseAdd /> </PrivateRoute>} />
        <Route path="/courses/update/:id" element={<PrivateRoute><CourseUpdate /></PrivateRoute>} />
      </Routes>
    </Router>

  </React.StrictMode>
);

