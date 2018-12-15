import React from 'react';
import {Table,Button} from 'react-bootstrap';
import DateSpan from '../Header/DateSpan.jsx'
import moment from "moment";
import SingleOutflow from "../Utils/SingleOutflow.jsx";
import Icon, {BaseIcon} from '../Utils/Icon.jsx';

export default class HistoryView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            newOutflow: false,
            sort: "Date sort",
            reverse: false
        }
    }

    belongsToPeriodInQuestion(elem) {
        let outflowAfterMinDate = moment(elem.date,"YYYY-MM-DD") >= moment(this.props.minDate,'YYYY-MM-DD');
        let outflowBeforeMaxDate = moment(elem.date,"YYYY-MM-DD") <= moment(this.props.maxDate,'YYYY-MM-DD');
        return ( outflowAfterMinDate && outflowBeforeMaxDate);
    }

    deleteNewOutflow = () => {
        this.setState({newOutflow: false});
        if (typeof this.props.resetLabel === 'function') {
            this.props.resetLabel();
        }
    };

    clickAdd = () => {
        this.setState({newOutflow: true});
    };

    addHandler = (id, date, name, amount, label) => {
        if (typeof this.props.newOutflowHandler === 'function') {
            this.props.newOutflowHandler(date, name, amount, label);
        }
        this.setState({newOutflow: false});
    };

    mySort = (item1,item2) => {
        let ans;
        switch (this.state.sort) {
            case "Date sort":
                ans = this.state.reverse?
                    (moment(item1.date,'YYYY-MM-DD') <= moment(item2.date,'YYYY-MM-DD')? -1 : 1)
                    :
                    (moment(item1.date,'YYYY-MM-DD') <= moment(item2.date,'YYYY-MM-DD')? 1 : -1);
                break;
            case "Name sort":
                ans = this.state.reverse?
                    (item1.name.localeCompare(item2.name)) : (item2.name.localeCompare(item1.name));
                break;
            case "Amount sort":
                ans = this.state.reverse? (item2.amount - item1.amount) : (item1.amount - item2.amount);
                break;
            case "Label sort":
                ans = this.state.reverse?
                    (item1.label.localeCompare(item2.label)) : (item2.label.localeCompare(item1.label));
                break;
            default:
                ans = 0;
        }
        return ans;
    };

    sortHandler = name => {
        console.log(name);
        if (this.state.sort === name) {
            this.setState({reverse: !this.state.reverse});
        } else {
            this.setState({sort: name,
                           reverse: false});
        }
    };

    render() {
        let filteredOutflows = this.props.outflows.filter(elem => this.belongsToPeriodInQuestion(elem));
        filteredOutflows.sort(this.mySort);

        let outflowItems = filteredOutflows.map(item => <SingleOutflow date={item.date}
                                                                       key={`outflow-${item.id}`}
                                                                       color={item.color}
                                                                       name={item.name} amount={item.amount}
                                                                       label={item.label}
                                                                       id={`outflow-${item.id}`} edit={false}
                                                                       labels={this.props.labels}
                                                                       addLabel={this.props.newLabelHandler}
                                                                       saveHandler={this.props.saveHandler}
                                                                       deleteHandler={this.props.deleteHandler}/>);

        // let newId = Math.max.apply(undefined, this.props.outflows.map(elem=>elem.id)) + 1;
        let offset = {height: `${10+30*Object.keys(this.props.labels).length}px`};
        return (<div>
        <div><Table>
            <thead>
            <tr>
                <th scope={"col"}>
                    <BaseIcon className={"fas fa-sort"} size={1} click={this.sortHandler}
                              name={"Date sort"} selected={"Date sort"===this.state.sort}/> Date</th>
                <th scope={"col"}>
                    <BaseIcon className={"fas fa-sort"} size={1} click={this.sortHandler} name={"Name sort"}
                              selected={"Name sort"===this.state.sort}/> Name</th>
                <th scope={"col"}>
                    <BaseIcon className={"fas fa-sort"} size={1} click={this.sortHandler} name={"Amount sort"}
                              selected={"Amount sort"===this.state.sort}/> Amount</th>
                <th scope={"col"}>
                    <BaseIcon className={"fas fa-sort"} size={1} click={this.sortHandler} name={"Label sort"}
                              active={"Label sort" === this.state.sort}/> Label</th>
                <th scope={"col"}>{!this.state.newOutflow &&
                <Icon className={'fas fa-plus'} size={2} click={this.clickAdd} name={"Add"}/>}</th>
                <th scope={"col"} />
            </tr>
            </thead>
            <tbody>
            {this.state.newOutflow && <SingleOutflow date={moment().format('YYYY-MM-DD')} labels={this.props.labels}
                                                     name={""} amount={0} label={this.props.outflowLabel}
                                                     addLabel={this.props.newLabelHandler}
                                                     id={`outflow-new`}
                                                     saveHandler={this.addHandler} edit={true}
                                                     deleteHandler={this.deleteNewOutflow}/>}
            {outflowItems}
            </tbody>
            </Table>
            <div style={offset}/>
            </div>

            {outflowItems.length===0 && <><br/><span style={{color: "red", fontWeight: "bold"}}>No historical outflows in selected date span!</span></>}
    </div>);}
}