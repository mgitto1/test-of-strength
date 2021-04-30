import React from 'react';
import Navbar from './Components/Navbar';
import Routes from './Routes';

class App extends React.Component {
  render() {
    return (
      <div>
        <Navbar />
        <Routes />
      </div>
    );
  }
}

export default App;
