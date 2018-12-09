import React from "react";
import moment from "moment";
import {FormControl, FormGroup, MenuItem, SplitButton} from "react-bootstrap";
import Icon from './Icon.jsx';

export default class SingleOutflow extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            edit: this.props.edit,
            name: this.props.name,
            amount: this.props.amount,
            label: this.props.label,
            date: this.props.date,
            color: this.props.labels[this.props.label]
        }
    }

    componentWillReceiveProps(newProps) {
        this.setState({
            label: newProps.label
        })
    }

    validation() {
        return (Number(this.state.amount)>0) && (this.state.name.length>0) && (this.state.label!=='Choose a label')
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
                label: label,
                color: this.props.labels[label]
            });
        }
    };

    delete = () => {
        if (typeof this.props.deleteHandler === 'function') {
            this.props.deleteHandler(Number(this.props.id.substring(8)));
        }
    };

    edit = () => {
        this.setState({
            edit: true
        })
    };

    save = () => {
        // console.log(typeof this.props.saveHandler);
        if (this.validation()) {
            if (typeof this.props.saveHandler === 'function' ) {
                // console.log(`${this.props.id} item -- sends data to my saveHandler`);
                this.props.saveHandler(Number(this.props.id.substring(8)),
                    this.state.date,
                    this.state.name,
                    this.state.amount,
                    this.state.label);
            }
            this.setState({edit: false});
        } else {
            alert('Fields are incomplete!');
        }

    };

    render() {

        let options = Object.keys(this.props.labels).map((e,i) =>
            e===this.state.label?
                <MenuItem eventKey={i+1} key={`option-${i+1}`} active onSelect={this.handleSelected}>{e} </MenuItem>
                :
                <MenuItem eventKey={i+1} key={`option-${i+1}`} onSelect={this.handleSelected}>{e}</MenuItem>);

        let width = 10 * Math.max('Choose a label'.length,...Object.keys(this.props.labels).map(elem=> elem.length));

        return (<tr style={{backgroundColor: this.state.color}}>
            <th scope={"row"}>{this.state.edit?
                <FormGroup controlId="formDate"
                           validationState={moment()>=moment(this.state.date,'YYYY-MM-DD')?'success':'warning'}>
                        <FormControl type={"date"} value={this.state.date} onChange={this.handleDateChange}/>
                        <FormControl.Feedback/>
                </FormGroup>
                : this.state.date}</th>

            <td>{this.state.edit?
                <FormGroup controlId="formName" validationState={this.state.name.length>0?'success':'warning'}>
                    <FormControl type={"text"} value={this.state.name} onChange={this.handleNameChange}/>
                    <FormControl.Feedback/>
                </FormGroup>
                : this.state.name}</td>
            <td>{this.state.edit?
                <FormGroup controlId="formAmount" validationState={this.state.amount>0?'success':'warning'}>
                    <FormControl type={"number"} value={this.state.amount} onChange={this.handleChangeAmount}/>
                    <FormControl.Feedback/>
                </FormGroup>
                : this.state.amount}</td>
            <td>{this.state.edit?
                <FormGroup controlId="formLabel" validationState={this.state.label==='Choose a label'?null:'success'}>
                    <SplitButton bsStyle={'default'} title={this.state.label} id={`dropdown-label`}
                                 style={{width: `${width}px`}}>
                        <MenuItem disabled={true} defaultValue={true} key={`option-default`}>
                            Choose a label</MenuItem>
                        {options}
                        <MenuItem divider />
                        <MenuItem eventKey={"0"} key={`option-0`} onSelect={this.handleSelected}>Add new label</MenuItem>
                    </SplitButton>
            </FormGroup>
                : this.state.label}</td>
            <td>
                {this.state.edit? <Icon className={'far fa-save'} size={1} click={this.save} name={"Save"}/>
                                : <Icon className={'far fa-edit'} size={1} click={this.edit} name={"Edit"}/> }
            </td>
            <td>
                <Icon className={'far fa-trash-alt'} size={1} click={this.delete} name={"Delete"}/>
            </td>
        </tr>)
    }
}