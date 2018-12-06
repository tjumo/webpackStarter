import React from 'react';
import moment from "moment";
import {Col, ControlLabel, FormControl, FormGroup, Form} from "react-bootstrap";

export default class DateSpan extends React.Component {
    constructor(props) {
        super(props)
    }


    handleDate = e => {
        if (typeof this.props.handler === 'function') {
            this.props.handler(e.currentTarget.name, e.currentTarget.value)
        }
    };

    render() {
        return (<Form horizontal>
            <FormGroup controlId="form-date-span"
                       validationState={moment(this.props.maxDate,'YYYY-MM-DD')>=moment(this.props.minDate,'YYYY-MM-DD')?null:'error'}>
                <Col componentClass={ControlLabel} sm={2}>
                    From:
                </Col>
                <Col sm={4}>
                    <FormControl type={"date"} value={this.props.minDate} name={"minDate"} onChange={this.handleDate}/>

                </Col>
                <Col componentClass={ControlLabel} sm={2}>
                    To:
                </Col>
                <Col sm={4}>
                    <FormControl type={"date"} value={this.props.maxDate} name={"maxDate"} onChange={this.handleDate}/>
                    <FormControl.Feedback/>
                </Col>
            </FormGroup>
            </Form>);
    }
}