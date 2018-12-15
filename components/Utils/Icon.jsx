import React from "react";

export class BaseIcon extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            display: "inline",
            fontSize: `${this.props.size * 15}px`,
            color: this.props.selected ? "green" : "aliceblue"
        }
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
            color: newProps.selected ? "green" : "aliceblue"
        });
    }

    clickHandler = () => {
        if (typeof this.props.click === "function") {
            this.props.click(this.props.name)
        }
    };

    render() {
        return <i style={this.state} onMouseEnter={this.mouseHandler} onMouseLeave={this.mouseHandler}
                  onClick={this.clickHandler} className={this.props.className} />;
    }
}

export default class Icon extends BaseIcon {
    render() {
        return (<div  className={'text-center'}>
            <div style={{height: `${this.props.size * 4}px`}}/>
            {super.render()}
            <div style={{height: `${this.props.size * 4}px`}}/>
        </div>)
    }
}