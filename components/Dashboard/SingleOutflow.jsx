import React from "react";

export default class SingleOutflow extends React.Component {
    constructor(props){
        super(props);
    }
    render() {
        return (<tr style={{backgroundColor: this.props.color}}>
            <th scope={"row"}>{this.props.date}</th>
            <td>{this.props.name}</td>
            <td>{this.props.amount}</td>
            <td>{this.props.label}</td>
        </tr>)
    }
}