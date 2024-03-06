import { useState } from 'react'
import './App.scss'
import { Outlet } from "react-router-dom";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";


function App() {

  return (
    <>
    <Outlet />
    </>
  )
}

export default App
