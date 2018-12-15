import React from 'react';
import NotYetImplemented from '../NotFound/nyi.jsx';
import moment from "moment";
import * as colorUtils from '../Utils/ColorUtils.jsx';
import HistoryView from "./HistoryView.jsx";
import PiechartView from './PiechartView.jsx';
import BubblechartView from "./BubblechartView.jsx";
import Icon from '../Utils/Icon.jsx';
import {db} from "../Fire/config";
import DateSpan from "../Header/DateSpan.jsx";
// import {Button, ButtonGroup} from "react-bootstrap";

export default class Dashboard extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            mode: 'Management',
            // outflows: [],
            outflows: [
                // {name: "tesco", amount: 310, date: "2018-12-01", label: "Food", color: "#FF320F", id: 0},
                // {name: "buty", amount: 800, date: "2018-12-02", label: "Clothing", color: "#e55120", id: 1},
                // {name: "chata", amount: 2200, date: "2018-12-03", label: "Bills", color: "#00833D", id: 2},
                // {name: "krakow", amount: 220, date: "2018-12-04", label: "Transportation", color: "#52528C", id: 3},
                // {name: "przedszkole", amount: 960, date: "2018-12-05", label: "Toys", color: "#a9347e", id: 4},
                // {name: "wigilia", amount: 500, date: "2018-12-06", label: "Gifts", color: "#bada55", id: 5},
                // {name: "lidl", amount: 220, date: "2018-12-07", label: "Food", color: "#FF320F", id: 6},
                // {name: "metallica", amount: 420, date: "2018-12-07", label: "Tickets", color: "#ff05bf", id: 7}
            ],
            minDate: moment().subtract(3, 'days').format('YYYY-MM-DD'),
            maxDate: '2018-12-31',
            label: 'Choose a label',
            labels: {
                Food: "#FF320F",
                Bills: "#00833D",
                Restaurants: "#004CCA",
                Transportation: "#52528C",
                Tickets: "#ff05bf",
                Clothing: "#e55120",
                Toys: "#a9347e",
                Gifts: "#bada55"
            },
            bubble: 'expand'
        }
    }

    componentWillMount() {
        this.updateOutflows();
        this.updateLabels();
    }

    updateLabels() {
        this.setState({labels: {
                Food: "#FF320F",
                Bills: "#00833D",
                Restaurants: "#004CCA",
                Transportation: "#52528C",
                Tickets: "#ff05bf",
                Clothing: "#e55120",
                Toys: "#a9347e",
                Gifts: "#bada55"
            }});
        db.collection('labels').where('uid','==',this.props.uid).get().then((snap) => {
            snap.docs.forEach((doc) => {
                let post = doc.data();
                let labels = this.state.labels;
                labels[post.label] = post.color;
                this.setState({labels: labels});
            });
        });
    }

    updateOutflows() {
        this.setState({outflows: []});
        db.collection(`outflows-${this.props.uid}`).get().then((snap) => {
            snap.docs.forEach((doc) => {
                let post = doc.data();
                post.id = doc.id;
                this.setState({outflows: [...this.state.outflows, post]});
            });
        });
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


            // off-line version
            // let labels = this.state.labels;
            // labels[newLabel] = colorUtils.colorNumToHash(newRed, newGreen, newBlue);
            // this.setState({
            //     labels: labels,
            //     label: newLabel
            // });

            let post = {label: newLabel,
                color: colorUtils.colorNumToHash(newRed, newGreen, newBlue),
                uid: this.props.uid};
            db.collection('labels').add(post);
            this.setState({label: newLabel});
            this.updateLabels();
        }
    };

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
        // console.log(Array.from(ans));
        return arr.length>0 ? Array.from(ans) : [];
    }

    dateHandler = (name,date) => {
        this.setState({
            [name]: date
        });
    };

    resetLabel = () => {
        this.setState({
            label: 'Choose a label'
        });
    };

    newOutflowHandler = (date, name, amount, label) => {
        let outflow = {
            amount: parseInt(amount,10),
            date: date,
            name: name,
            label: label,
            color: this.state.labels[label]};
        //off-line version
        // this.setState({
        //     outflows: [...this.state.outflows,outflow],
        //     label: 'Choose a label'
        // });
        db.collection(`outflows-${this.props.uid}`).add(outflow).then(()=> {
            this.setState({label: 'Choose a label'});
            this.updateOutflows();
        });
    };

    editHandler = (id, date, name, amount, label) => {
        let color = this.state.labels[label];
        let editedOutflow = {name: name, date: date, amount: amount, label: label, color: color};
        db.collection(`outflows-${this.props.uid}`).doc(id).update(editedOutflow).then(()=>{
            console.log('edited');
            this.updateOutflows();
        }).catch(err=>{
            console.log(err);
        });

        // let oldItem = this.state.outflows.find(elem => elem.id === id);
        // let pos = this.state.outflows.indexOf(oldItem);
        // this.state.outflows[pos] = editedOutflow;
    };

    deleteHandler = (id) => {

        db.collection(`outflows-${this.props.uid}`).doc(id).delete()
            .then(() => {console.log("Deleted");
                this.updateOutflows()})
            .catch(err => {console.log(err)});
    };

    rightView() {
        let tag;
        switch (this.state.mode) {
            // case 'Outflow Management':
            //     tag = <OutflowManagement newOutflowHandler={this.newOutflowHandler}
            //                              newLabelHandler={this.handleNewLabel}
            //                              outflows={this.state.outflows}
            //                              labels={this.state.labels}
            //                              outflowLabel={this.state.label}/>;
            //     break;
            case 'Management':
                tag = <HistoryView minDate={this.state.minDate} maxDate={this.state.maxDate}
                                   outflows={this.state.outflows} resetLabel={this.resetLabel}
                                   outflowLabel={this.state.label} newOutflowHandler={this.newOutflowHandler}
                                   saveHandler={this.editHandler} deleteHandler={this.deleteHandler}
                                   newLabelHandler={this.handleNewLabel} labels={this.state.labels}/>;
                break;
            case 'Piechart':
                tag = <PiechartView outflows={this.state.outflows} colors={this.state.labels}
                                    minDate={this.state.minDate} maxDate={this.state.maxDate}
                                    dataPrep={this.chartDataPreparation}/>;
                break;
            case 'Bubblechart':
                tag = <BubblechartView view={this.state.bubble} outflows={this.state.outflows}
                                       minDate={this.state.minDate} maxDate={this.state.maxDate}/>;
                break;
            default:
                tag = <NotYetImplemented/>;
        }
        return tag;
    }

    expandHandler = name => {
        this.setState({
            bubble: name
        });
    };

    clickHandler = name => {
        if (name==='Sign Off') {
            console.log('Sign off');
            if (typeof this.props.signOff === 'function'){
                this.props.signOff();
            }
        } else {
            this.setState({
                mode: name
            });
        }
    };

    render(){
        let icons = [//["Outflow Management", "glyphicon glyphicon-piggy-bank"],
                     ["Management", "glyphicon glyphicon-piggy-bank"],
                     ["Bubblechart", "fas fa-spinner"],
                     ["Piechart", "fas fa-chart-pie"]].map((pair,i) => <Icon key={`icon-${i}`} name={pair[0]}
                                                                             selected={(pair[0]===this.state.mode)}
                                                                             className={pair[1]} size={4}
                                                                             click={this.clickHandler} />);
        let signOff = <Icon name={"Sign Off"} className={"fas fa-reply"} size={4} click={this.clickHandler}/>;

        return (<div className={"row"}>
            <div className={"col-sm-2"}>
                <div style={{height: "25px"}}/>
                {icons}
                <div style={{height: "35vh"}}/>
                {signOff}
                <div style={{height: "25px"}}/>
            </div>
            <div className={"col-sm-10"}>
                <div className={"row"}>
                    <h1>{this.state.mode}</h1>
                </div>
                <div className={"row"}>
                    <DateSpan minDate={this.state.minDate} maxDate={this.state.maxDate}
                              handler={this.dateHandler} expander={this.state.mode==='Bubblechart'}
                              viewHandler={this.expandHandler} view={this.state.bubble}/>
                    {this.rightView()}
                </div>
            </div>
        </div>);
    }
}



