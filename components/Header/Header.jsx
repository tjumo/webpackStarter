import React, { Component } from 'react';

class Header extends Component {
  render() {
    return (
        <header className="App-header">
            <img src={logo} className="logo" alt="logo" />
        </header>
    );
  }
}

document.addEventListener('DOMContentLoaded', function(){
    ReactDOM.render(
        <Header />,
        document.getElementById('app')
    );
});
