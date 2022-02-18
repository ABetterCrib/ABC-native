import React from 'react'
import Home from './screens/home.screen'
import User from './api/user';

export default function App() {
  User.fill();

  return (
    <Home />
  );
}