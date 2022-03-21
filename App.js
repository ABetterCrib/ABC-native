import React, {Component} from 'react'
import Home from './screens/home.screen'
import User from './api/user';
import { View } from 'react-native';

//export default function App() {
export default class App extends Component{
  //User.fill();
  render () {
    return (
        <Home />
    );
    
  }  
}