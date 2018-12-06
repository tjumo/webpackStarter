import React from "react";
import moment from "moment";
import {SplitButton, MenuItem, FormGroup, Col, ControlLabel, FormControl, Form, Button} from 'react-bootstrap';
export default class NewOutflow extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            wrong: false,
            amount: 0,
            date: moment().format('YYYY-MM-DD'),
            name: '',
            label: this.props.selected
        }
    }

    componentWillReceiveProps(newProps) {
        this.setState({label: newProps.selected});
    }
    handleNameChange = (e) => {
        this.setState({
            name: e.target.value
        });
    };

    handleChangeAmount = (e) => {
        this.setState({
            amount: e.target.value
        });
    };

    handleDateChange = (e) => {
        this.setState({
            date: e.target.value
        });
    };

    handleSelected = (eventKey,event) => {
        // console.log(event.currentTarget.text);
        let label = event.currentTarget.text;
        if (label === "Add new label") {
            let newLabel = prompt('Name it');
            if (typeof this.props.addLabel === 'function') {
                this.props.addLabel(newLabel);
            }
        } else {
                this.setState({
                    label: label
                });
            }
    };

    validation() {
        return Number(this.state.amount) && this.state.name.length && (this.state.label !== 'Choose a label')
    }
    handleSubmit = (e) => {
        e.preventDefault();
        if (this.validation()) {
            if (typeof this.props.submitHandler === 'function') {
                this.props.submitHandler(this.state.amount,this.state.date,this.state.name,this.state.label);
            }
            this.setState({
                amount: 0,
                name: '',
                date: moment().format('YYYY-MM-DD'),
                label: 'Choose a label'
            });
        } else {
            this.setState({
                wrong: true
            });
        }
    };

    render() {
        let options = Object.keys(this.props.labels).map((e,i) =>
            e===this.state.label?
                <MenuItem eventKey={i+1} key={`option-${i+1}`} active onSelect={this.handleSelected}>{e} </MenuItem>
                :
                <MenuItem eventKey={i+1} key={`option-${i+1}`} onSelect={this.handleSelected}>{e}</MenuItem>);

        let width = 10 * Math.max('Choose a label'.length,...Object.keys(this.props.labels).map(elem=> elem.length));

        {/*// return (<div>{this.props.wrong? <span style={{color: "red"}}>Fields are not filled properly!</span> : <br />}*/}
        {/*//     <form action="" onSubmit={this.handleSubmit} className={"form-horizontal"}>*/}
        {/*//         <div className="form-group">*/}
        {/*//             <label htmlFor="amount" className="control-label col-sm-4">Amount: </label>*/}
        {/*//             <div className="col-sm-4">*/}
        {/*//             <input onChange={this.handleChangeAmount} value={this.state.amount} type="number" name={"amount"}/>*/}
        {/*//             </div>*/}
        {/*//         </div>*/}
        {/*//         <div className="form-group">*/}
        {/*//             <label htmlFor="name" className="control-label col-sm-4">Name: </label>*/}
        {/*//             <div className="col-sm-4">*/}
        {/*//                 <input type="text" value={this.state.name} onChange={this.handleNameChange} name={"name"}/>*/}
        {/*//             </div>*/}
        {/*//         </div>*/}
        {/*//         <div className="form-group">*/}
        {/*//             <label htmlFor="date" className="control-label col-sm-4">Date: </label>*/}
        {/*//             <div className="col-sm-4">*/}
        {/*//                 <input type="date" value={this.state.date} onChange={this.handleDateChange} name={"date"}/>*/}
        {/*//             </div>*/}
        {/*//         </div>*/}
        {/*//         <div className="form-group">*/}
        {/*//             <label htmlFor="label" className="control-label col-sm-4">Category: </label>*/}
        {/*//             <div className="col-sm-4">*/}
        {/*//                 <select onChange={this.handleSelected} value={this.state.label} name={"label"}>*/}
        {/*//                     <option disabled={true} defaultValue={true}>Choose a label</option>*/}
        {/*//                     {Labels}*/}
        {/*//                     <option>Add new label</option>*/}
        {/*//                 </select>*/}
        {/*//             </div>*/}
        {/*//         </div>*/}
        {/*//         <div className="form-group">*/}
        {/*//             <div className="col-sm-offset-4 col-sm-4">*/}
        {/*//                 <button className="btn btn-primary btn-block">Submit outflow</button>*/}
        {/*//             </div>*/}
        {/*//         </div>*/}
        {/*//     </form>*/}
        {/*//     </div>);*/}

        return (<Form horizontal>
                {/*{this.props.wrong? <span style={{color: "red"}}>Fields are not filled properly!</span> : <br />}*/}
                <FormGroup controlId="formHorizontalDate"
                           validationState={moment()>=moment(this.state.date,'YYYY-MM-DD')?'success':null}>
                    <Col componentClass={ControlLabel} sm={3}>
                        Date:
                    </Col>
                    <Col sm={9}>
                    <FormControl type={"date"} value={this.state.date} name={"date"} onChange={this.handleDateChange}/>
                    <FormControl.Feedback/>
                    </Col>
                </FormGroup>
                <FormGroup controlId="formHorizontalName"
                           validationState={this.state.name.length>0?'success':null}>
                    <Col componentClass={ControlLabel} sm={3}>
                        Name:
                    </Col>
                    <Col sm={9}>
                    <FormControl type={"text"} value={this.state.name} name={"name"} onChange={this.handleNameChange}/>
                    <FormControl.Feedback />
                    </Col>
                </FormGroup>
            <FormGroup controlId="formHorizontalLabel"
                    validationState={this.state.label==='Choose a label'?null:'success'}>
                <Col componentClass={ControlLabel} sm={3}>
                    Label:
                </Col>
                <Col sm={9}>
                    <SplitButton bsStyle={'default'} title={this.state.label} id={`dropdown-label`}
                                 style={{width: `${width}px`}}>
                        <MenuItem disabled={true} defaultValue={true} key={`option-default`} onSelect={this.handleSelected}>
                            Choose a label</MenuItem>
                        {options}
                        <MenuItem divider />
                        <MenuItem eventKey={"0"} key={`option-0`} onSelect={this.handleSelected}>Add new label</MenuItem>
                    </SplitButton>
                </Col>
            </FormGroup>
                <FormGroup controlId="formHorizontalAmount"
                           validationState={this.state.amount>0?'success':null}>
                    <Col componentClass={ControlLabel} sm={3}>
                        Amount:
                    </Col>
                    <Col sm={9}>
                        <FormControl type={"number"} value={this.state.amount} name={"amount"}
                                     onChange={this.handleChangeAmount}/>
                        <FormControl.Feedback />
                    </Col>
                </FormGroup>
                <FormGroup>
                    <Col smOffset={3} sm={9}>
                        <Button type={'submit'} onClick={this.handleSubmit}>Submit outflow</Button>
                    </Col>
                </FormGroup>

            </Form>


            );


    }
}