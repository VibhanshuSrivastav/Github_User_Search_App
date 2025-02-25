import React from 'react';
import { useState } from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom';
import Home from './components/Home/Home'
import UserProfile from './components/Profile/UserProfile';

function App() {
  return (
    <>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/user-profile' element={<UserProfile/>}/>
    </Routes>
    </>
  )
}

export default App
