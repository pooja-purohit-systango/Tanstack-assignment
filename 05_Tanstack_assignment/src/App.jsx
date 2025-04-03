import { useState } from 'react'
import './App.css'
import Login_page from './components/Login_page.' 
import { QueryClient, QueryClientProvider} from '@tanstack/react-query'
import Dashboard from './components/Dashboard'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';


function App() {

  const queryclient = new QueryClient();

  return (
    <>
    <QueryClientProvider client={queryclient}>

    <Router>
          <div><Link to="/"> </Link></div>
          {/* <div><Link to="/dashboard">  Dashboard</Link></div> */}


      <Routes>
        <Route path="/" element={<Login_page />} />
        <Route path="/dashboard" element={<Dashboard/>} />
      </Routes>
    </Router>
    </QueryClientProvider>
    </>
  )
}

export default App;
