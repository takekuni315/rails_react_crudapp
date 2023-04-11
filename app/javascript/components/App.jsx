import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Routes, Route } from 'react-router-dom';
import Editor from './Editor';
import '../../assets/stylesheets/App.css';
// eslint-disable-next-line import/order
import { ToastContainer } from 'react-toastify';

const App = () => (
  <>
    <Routes>
      <Route path="events/*" element={<Editor />} />
    </Routes>
    <ToastContainer />
  </>
);

export default App;
