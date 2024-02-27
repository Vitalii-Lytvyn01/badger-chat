import React from 'react';
import './Home.scss';
import { Chat } from '../Chat/Chat'
import { Sidebar } from '../Sidebar/Sidebar'

const Home = () => {
  return (
    <div className="home">
      <div className="container">
        <Sidebar/>
        <Chat />
      </div>
    </div>
  )
}

export default Home