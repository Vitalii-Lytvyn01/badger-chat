import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './misc/normalize.css'
import './index.scss'
import { Register } from './components/Register/Register'
import { Login } from './components/Login/Login'
import Home from './components/Home/Home'

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
     {
      path: "register",
      element: <Register />
     },
     {
      path: 'login',
      element: <Login />
     },
     {
      path: 'chats',
      element: <Home />
     },
    ]
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
