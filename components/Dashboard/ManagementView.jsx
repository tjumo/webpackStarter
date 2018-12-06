import moment from 'moment';
import React from 'react';
import Piechart from '../Piechart/Piechart.jsx';
import NewOutflow from './NewOutflow.jsx';
import SingleOutflow from './SingleOutflow.jsx';
import {Table} from 'react-bootstrap';


export default class OutflowManagement extends React.Component {
    constructor(props) {
        super(props);

    }


    //
    // handleDate = e => {
    //     this.setState({
    //         [e.currentTarget.name]: e.currentTarget.value
    //     });
    // }

    //
    // belongsToPeriodInQuestion(elem) {
    //     let outflowAfterMinDate = moment(elem.date,"YYYY-MM-DD") >= moment(this.state.minDate,'YYYY-MM-DD');
    //     let outflowBeforeMaxDate = moment(elem.date,"YYYY-MM-DD") <= moment(this.state.maxDate,'YYYY-MM-DD');
    //     return ( outflowAfterMinDate && outflowBeforeMaxDate);
    // }

    render() {
        let filteredOutflows = this.props.outflows.slice(0,6);
        //.filter(elem => this.belongsToPeriodInQuestion(elem));



        let outflowItems = filteredOutflows.map((item,i) => <SingleOutflow date={item.date}
                                                                           name={item.name}
                                                                           amount={item.amount}
                                                                           label={item.label}
                                                                           key={`outflow-${i}`} color={item.color}/>);

        return(<div>
            {/*<form>*/}
                {/*<label htmlFor={"minDate"}> From:</label>*/}
                {/*<input type={'date'} value={this.state.minDate} onChange={this.handleDate} name={'minDate'} />*/}
                {/*<label htmlFor={"maxDate"}> To:</label>*/}
                {/*<input type={'date'} value={this.state.maxDate} onChange={this.handleDate} name={'maxDate'} />*/}
            {/*</form>*/}
            <NewOutflow submitHandler={this.props.newOutflowHandler} addLabel={this.props.newLabelHandler}
                        labels={this.props.labels} selected={this.props.outflowLabel}/>
            {/*<Piechart data={this.dataPrep(filteredOutflows)} colors={this.state.colors}*/}
                      {/*x={100} y={100} outerRadius={100} innerRadius={0} offset={75}/>*/}
            {this.props.outflows.length>0 && <Table>
                <thead>
                    <tr>
                    <th scope={"col"}>Date</th>
                    <th scope={"col"}>Name</th>
                    <th scope={"col"}>Amount</th>
                    <th scope={"col"}>Label</th>
                    </tr>
                </thead>
                <tbody>
                {outflowItems}
                </tbody>
            </Table>}

        </div>)
    }
}
