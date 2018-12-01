import React, { Component } from 'react';

class NotFound extends Component {
  render() {
    return (
        <h1>Page not found</h1>
    );
  }
}

document.addEventListener('DOMContentLoaded', function(){
    ReactDOM.render(
        <NotFound />,
        document.getElementById('app')
    );
});