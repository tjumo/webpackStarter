import React from 'react';
import OutflowManagement from './ManagementView.jsx';
import NotYetImplemented from '../NotFound/nyi.jsx';
import moment from "moment";
import * as colorUtils from './ColorUtils.jsx';
import {ButtonGroup,Button} from 'react-bootstrap';

export default class Dashboard extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            mode: 'Outflow Management',
            // outflows: [],
            outflows: [{name: "chata", amount: 2200, date: "2018-12-03", label: "Bills", color: "#00833D"}],
            minDate: moment().subtract(3, 'days').format('YYYY-MM-DD'),
            maxDate: '2018-12-31',
            label: 'Choose a label',
            labels: {
                Food: "#FF320F",
                Bills: "#00833D",
                Restaurants: "#004CCA",
                Transportation: "#52528C",
                Tickets: "#fff85b",
                Clothing: "#e55120",
                Toys: "#a9347e",
                Gifts: "#bada55"
            }
        }
    }

    handleNewLabel = newLabel => {
        if (Object.keys(this.state.labels).includes(newLabel)) {
            alert(`The label ${newLabel} already exists`);
            //TODO: przerobić sprawdzenie na case-insensitive.
        } else {
            let distinct = false;
            while (!distinct) {
                var [newRed, newGreen, newBlue] = colorUtils.colorGenerator();
                let oldColorsSimilarity = Object.values(this.state.labels).map(elem => {
                    let [red, green, blue] = colorUtils.colorHashToNum(elem);
                    return colorUtils.colorSimilarity(red, green, blue, newRed, newGreen, newBlue)
                });
                distinct = oldColorsSimilarity.every(elem => !elem);
            }
            // console.log('color chosen');

            let labels = this.state.labels;
            labels[newLabel] = colorUtils.colorNumToHash(newRed, newGreen, newBlue);

            this.setState({
                labels: labels,
                label: newLabel
            });
        }
    }

    chartDataPreparation(arr) {
        let labels = new Set(arr.map(elem => elem.label));
        let data = [];
        for (let label of labels) {
            let filtered = arr.filter(outflow => outflow.label === label);
            let sum = filtered.reduce((prev,curr) => prev+curr.amount,0);
            // console.log(`processed ${label}, extracted ${filtered.length} items which add up to ${sum}`);
            data.push({value: sum, label: label});
        }
        data.sort((a,b) => a.value - b.value);
        let ans = new Set();
        for (let i=0;i<=data.length;i++) {
            let item = i%2? data[(i-1)/2] : data[data.length-i/2-1];
            // console.log(`step ${i}, current item: `);
            // console.log(item);
            ans.add(item);
        }
        console.log(Array.from(ans));
        return arr.length>0 ? Array.from(ans) : [];
    }

    newOutflowHandler = (amount,date,name,label) => {
        let outflow = {amount: parseInt(amount,10),
            date: date,
            name: name,
            label: label,
            color: this.state.labels[label]};
        this.setState({
            outflows: [...this.state.outflows,outflow]
        });
        //TODO: postowanie do JSON-servera przez axios
    };

    rightView() {
        let tag;
        switch (this.state.mode) {
            case 'Outflow Management':
                tag = <OutflowManagement newOutflowHandler={this.newOutflowHandler}
                                         newLabelHandler={this.handleNewLabel}
                                         outflows={this.state.outflows}
                                         labels={this.state.labels}
                                         outflowLabel={this.state.label}/>;
                break;
            case 'History':
                tag = <NotYetImplemented/>;
                break;
            case 'Piechart View':
                tag = <NotYetImplemented/>;
                break;
            case 'Bubblechart View':
                tag = <NotYetImplemented/>
                break;
            default:
                tag = <NotYetImplemented/>;
        }
        return tag;
    }

    clickHandler = name => {
        this.setState({
            mode: name
        });
    }


    render(){
        let icons = [["Outflow Management", "glyphicon glyphicon-piggy-bank"],
                     ["History", "fas fa-book"],
                     ["Bubblechart View", "fas fa-spinner"],
                     ["Piechart View", "fas fa-chart-pie"]].map((pair,i) => <Icon key={`icon-${i}`} name={pair[0]}
                                                                                 selected={(pair[0]===this.state.mode)}
                                                                                 className={pair[1]}
                                                                                 click={this.clickHandler} />);

        return (<div className={"row"}>
            <div className={"col-sm-2"}>
                {/*<div className={'col-12'}>*/}
                {/*<ButtonGroup vertical bsSize={"lg"}>*/}
                    {/*<Button onClick={this.clickHandler} name={"OutflowManagement"}>*/}
                        {/*<i className={"glyphicon glyphicon-piggy-bank"} />*/}
                    {/*</Button>*/}
                    {/*<Button onClick={this.clickHandler} name={"HistoryView"}>*/}
                        {/*<i className={"fas fa-book"} />*/}
                    {/*</Button>*/}
                    {/*<Button onClick={this.clickHandler} name={"BubbleChartView"}>*/}
                        {/*<i className={"fas fa-spinner"}/>*/}
                    {/*</Button>*/}
                    {/*<Button onClick={this.clickHandler} name={"PieChartView"}>*/}
                        {/*<i className={"fas fa-chart-pie"}/>*/}
                    {/*</Button>*/}
                {/*</ButtonGroup>*/}
                {/*</div>*/}

                {icons}

            </div>
            <div className={"col-sm-10"}>
                <div className={"row"}>
                    <h1>{this.state.mode}</h1>
                </div>
                <div className={"row"}>
                    {this.rightView()}
                </div>
            </div>
        </div>);
    }
}

class Icon extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            display: "block",
            fontSize: "60px",
            color: this.props.selected? "green": "aliceblue"}
    }

    mouseHandler = (e) => {
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
    }

    componentWillReceiveProps(newProps) {
        this.setState({
            color: newProps.selected? "green": "aliceblue"});
    }
    clickHandler = (e) => {
        if (typeof this.props.click === "function") {
            this.props.click(this.props.name)
        }
    }

    render() {
        return (<div>
            <div style={{height: "30px"}} />
            <i className={this.props.className} style={this.state}
               onClick={this.clickHandler} name={this.props.name}
               onMouseEnter={this.mouseHandler} onMouseLeave={this.mouseHandler}/>
            </div>)
    }
}



