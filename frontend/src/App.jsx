import React from 'react'
import Header from './components/Header.jsx'
import { Outlet } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
const App = () => {
  return (
    <>
      <div className="app-container">
        <Header />
        <ToastContainer />
        <Outlet/>
      </div>
    </>
  )
}

export default App