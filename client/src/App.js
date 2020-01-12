import React from 'react';
import NavBar from './components/NavBar';
import UserInputForm from './components/UserInputForm';
import About from './components/About';
import EsriMap from './components/EsriMap';
import { Provider } from 'mobx-react'
import DataStore from './store/DataStore'
import Hero from './components/Hero';

const App = () => {
  return (
    <Provider DataStore={DataStore}>
      <NavBar />
      <EsriMap />
      <UserInputForm />
      <About />
      <Hero />
    </Provider>
  );
}

export default App;
