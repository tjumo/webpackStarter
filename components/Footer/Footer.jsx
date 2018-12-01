import React, { Component } from 'react';

class Footer extends Component {
  render() {
    return (
        <h1>This is footer</h1>
    );
  }
}
document.addEventListener('DOMContentLoaded', function(){
    ReactDOM.render(
        <Footer />,
        document.getElementById('app')
    );
});
