import React from 'react';
import NewOutflow from './NewOutflow.jsx';
import SingleOutflow from './SingleOutflow.jsx';
import {Table} from 'react-bootstrap';


export default class OutflowManagement extends React.Component {
    constructor(props) {
        super(props);

    }

    render() {
        let filteredOutflows = this.props.outflows.slice(0,6);

        let outflowItems = filteredOutflows.map((item,i) => <SingleOutflow date={item.date}
                                                                           name={item.name}
                                                                           amount={item.amount}
                                                                           label={item.label}
                                                                           key={`outflow-${i}`} color={item.color}/>);

        return(<div>
                   <NewOutflow submitHandler={this.props.newOutflowHandler} addLabel={this.props.newLabelHandler}
                        labels={this.props.labels} selected={this.props.outflowLabel}/>
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
