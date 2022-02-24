// Run android with "npx react-native run-android"

import React, { useState } from 'react'
import Home from './screens/home.screen'
import Welcome from './screens/welcome.screen'

export default function App() {

  const [screen, setScreen] = useState('Welcome');

  const getScreen = () => {
    if (screen === 'Welcome') {
      return (
        <Welcome setScreen={setScreen}/>
      )
    }
    if (screen === 'Home') {
      return  (
        <Home />
      )
    }
  }

  return (
    <>
      {getScreen()}
    </>
  );
}