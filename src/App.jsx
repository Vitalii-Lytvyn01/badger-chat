import { useContext, useState } from 'react'
import './App.scss'
import { Outlet } from "react-router-dom";
import Home from './components/Home/Home';
import { Login } from './components/Login/Login';
import { Register } from './components/Register/Register';
import { AuthContext } from './context/AuthContext';

import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from "react-router-dom";



function App() {

  const {currentUser} = useContext(AuthContext);

  const ProtectedRoute = ({children}) => {
    if(!currentUser) {
      return <Navigate to="/login"/>
    } else {
      return <>{children}</>
    }
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/'>
          <Route index element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }/>
          <Route path='login' element={<Login />}/>
          <Route path='register' element={<Register />}/>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
