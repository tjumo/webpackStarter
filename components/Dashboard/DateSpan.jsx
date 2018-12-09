import React from 'react';
import moment from "moment";
import {Col, ControlLabel, FormControl, FormGroup, Form, ButtonGroup, Button} from "react-bootstrap";

export default class DateSpan extends React.Component {
    constructor(props) {
        super(props);

        this.state = {view: this.props.view};
    }


    handleDate = e => {
        if (typeof this.props.handler === 'function') {
            this.props.handler(e.currentTarget.name, e.currentTarget.value)
        }
    };

    btnHandler = (e) => {
        let name = e.currentTarget.name;
        this.setState({view: name});
        if (typeof this.props.viewHandler === 'function') {
                this.props.viewHandler(name);
            }
    }

    render() {
        // console.log(this.props.expander);
        return (<Form horizontal>
            <FormGroup controlId="form-date-span"
                       validationState={moment(this.props.maxDate,'YYYY-MM-DD')>=moment(this.props.minDate,'YYYY-MM-DD')?null:'error'}>
                <Col componentClass={ControlLabel} sm={1}>
                    From:
                </Col>
                <Col sm={3}>
                    <FormControl type={"date"} value={this.props.minDate} name={"minDate"} onChange={this.handleDate}/>

                </Col>
                <Col componentClass={ControlLabel} sm={1}>
                    To:
                </Col>
                <Col sm={3}>
                    <FormControl type={"date"} value={this.props.maxDate} name={"maxDate"} onChange={this.handleDate}/>
                    <FormControl.Feedback/>
                </Col>
                <Col sm={4}>
                    {this.props.expander && <ButtonGroup>
                        <Button name={"expand"} onClick={this.btnHandler}
                                bsStyle={this.state.view==="expand"?"primary":"default"}>Expanded view</Button>
                        <Button name={"compact"} onClick={this.btnHandler}
                                bsStyle={this.state.view==="compact"?"primary":"default"}>Compact view</Button>
                    </ButtonGroup>}
                </Col>
            </FormGroup>
            </Form>);
    }
}