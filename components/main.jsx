import ReactDOM from 'react-dom';
import React from 'react';
import WelcomePage from './WelcomePage/WelcomePage.jsx';
import Dashboard from './Dashboard/Dashboard.jsx'
import * as firebase from "firebase";
import {provider} from './Fire/config';

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            logged: false,
            uid: ''
        };
    }
    signOffHandler = () => {
        firebase.auth().signOut().then(() => {
            this.setState({uid: '', logged: false});
        }).catch(err => {console.log(err);});
    };

    loginHandler = () => {
        firebase.auth().signInWithPopup(provider).then(result=>{
            this.setState({uid: result.user.uid, logged: true});
            console.log(result.user.uid);
        }).catch(error=> {
            console.log(error.code);
            console.log(error.message);
        });
    };

    render(){
        return (this.state.logged?
            <Dashboard uid={this.state.uid} signOff={this.signOffHandler}/>
            :
            <WelcomePage loginHandler={this.loginHandler}/>);
    }
}

document.addEventListener('DOMContentLoaded', function() {
   ReactDOM.render(<App/>, document.getElementById('app'))
});