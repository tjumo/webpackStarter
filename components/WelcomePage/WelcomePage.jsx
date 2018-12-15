import React from "react";
import {Form, Col, FormGroup} from 'react-bootstrap';
import GoogleButton from 'react-google-button';

export default class WelcomePage extends React.Component {
    constructor(props) {
        super(props);
    }

    btnHandler = (e) => {
        e.preventDefault();
        if (typeof this.props.loginHandler === 'function') {
            this.props.loginHandler();
        }
    };
    render(){
        let sectionStyle = {
            width: "100%",
            height: "671px"
        };
        return (<section style={sectionStyle}>
            <div style={{height: `${window.innerHeight/20}px`}}/>
            <h1 className={"text-center display-1"}>Create your own financial cosmos</h1>
            <div style={{height: `${0.5*window.innerHeight}px`}}/>
            <Form horizontal>
                <FormGroup>
                    <Col smOffset={4} sm={4}>
                        <GoogleButton onClick={this.btnHandler} />
                    </Col>
                </FormGroup>
            </Form>;
        </section>)
    }
}

