import React from "react";
import {Form, FormControl, Col, ControlLabel, FormGroup, Button} from 'react-bootstrap';

export default class LoginForm extends React.Component {
    constructor(props) {
        super(props);

        this.state={
            login: '',
            password: ''
        }
    }

    loginHandler = (e) => {
        this.setState({
            login: e.currentTarget.value
        })
    };

    passwordHandler = (e) => {
        this.setState({
            password: e.currentTarget.value
        })
    };

    btnHandler = (event) => {
        event.preventDefault();
        if(typeof this.props.onLog === 'function'){
            let logged = this.props.onLog(this.state.login, this.state.password);
            if (!logged) {
                this.setState({
                    login: '',
                    password: ''
                });
            }
        }
    };

    componentWillUnmount() {
        this.state = {};
    }

    render(){
        let sectionStyle = {
            width: "100%",
            height: "671px"
        };
        return (<section style={sectionStyle}>
            <br />
            <h1 className={"text-center display-1"}>Create your own financial cosmos</h1>
            <br />
            <Form horizontal>
                <div className="text-center">
                    {/*<h2>Log in</h2>*/}
                    {this.props.wrong? <span style={{color: "red",
                        fontSize: "13px", fontWeight: "bold"}}>User/password incorrect!</span>: <br />}
                        <br />

                </div>
                <FormGroup controlId="formHorizontalEmail">
                    <Col componentClass={ControlLabel} sm={4}>
                        User:
                    </Col>
                    <Col sm={4}>
                        <FormControl type={"text"} onChange={this.loginHandler} value={this.state.login}/>
                    </Col>
                </FormGroup>

                <FormGroup controlId="formHorizontalPassword">
                    <Col componentClass={ControlLabel} sm={4}>
                        Password:
                    </Col>
                    <Col sm={4}>
                        <FormControl type={"password"} onChange={this.passwordHandler} value={this.state.password}/>
                    </Col>
                </FormGroup>

                <FormGroup>
                    <Col smOffset={4} sm={4}>
                        <Button type={"submit"} onClick={this.btnHandler} block bsStyle={"primary"}>Sign in</Button>
                    </Col>
                </FormGroup>
            </Form>;
        </section>)
    }
}

