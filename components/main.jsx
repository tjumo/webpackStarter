import ReactDOM from 'react-dom';
import React from 'react';
import LoginForm from './WelcomePage/login.jsx';
import Dashboard from './Dashboard/Dashboard.jsx'

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loggedIn: false,
            wrong: false
        };
    }
    loginHandler = (login, password) => {
        if (login === 'admin' && password === 'demo') {
            this.setState({loggedIn: true});
            return true;
        } else {
            this.setState({
                wrong: true
            });
            return false;
        }
    };
    render(){
        return this.state.loggedIn?<Dashboard/>:<LoginForm onLog={this.loginHandler} wrong={this.state.wrong}/>;
    }
}

// const LoggedIn = () => <h1 className={"text-center"}>Zalogowany</h1>;



document.addEventListener('DOMContentLoaded', function() {
   ReactDOM.render(<App/>, document.getElementById('app'))
});