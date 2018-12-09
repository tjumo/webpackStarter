import React from "react";

export default class Icon extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            display: "block",
            fontSize: `${this.props.size * 15}px`,
            color: this.props.selected? "green": "aliceblue"}
    }

    mouseHandler = () => {
        if (!this.props.selected) {
            if (this.state.color === 'aliceblue') {
                this.setState({
                    color: "yellow" //TODO: kolor do dogrania
                })
            } else {
                this.setState({
                    color: "aliceblue"
                });
            }
        }
    };

    componentWillReceiveProps(newProps) {
        this.setState({
            color: newProps.selected? "green": "aliceblue"});
    }
    clickHandler = () => {
        if (typeof this.props.click === "function") {
            this.props.click(this.props.name)
        }
    };

    render() {
        return (<div  className={'text-center'}>
            <div style={{height: `${this.props.size * 4}px`}}/>
            <i className={this.props.className} style={this.state}
               onClick={this.clickHandler} onMouseEnter={this.mouseHandler} onMouseLeave={this.mouseHandler}/>
            <div style={{height: `${this.props.size * 4}px`}}/>
        </div>)
    }
}