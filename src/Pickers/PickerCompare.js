import React, {Component, useEffect, useState} from "react";
import {UserData} from "./../data";
import './../App.css';
import { DateRangePickerComponent } from "@syncfusion/ej2-react-calendars";



export default function PickerCompare () {


    const [date2, updateDate2] = useState(() => {
    });

    const [startDate2, setStartDate2] = useState("2020-01-01");
    const [endDate2, setEndDate2] = useState("2020-01-27");

    useEffect(() => {
        if (date2) {
            function newDate()
            {
                return date2.replace(/\s/g, '').split('to')
            }
            let newRange = newDate();
            setStartDate2(newRange[0]);
            setEndDate2(newRange[1]);
        }
    });

    const onChange2 = (e) => {
        updateDate2(e.text);
    };


    // расчет индексов для графика продаж согласно пикеру дат
    let start2 = 0;
    let end2 = 26;


    for (let startIndex = 0; startIndex < UserData.purchases.length; startIndex++) {
        if (UserData.purchases[startIndex].date === startDate2) {
            start2 = startIndex;
        }
    }
    for (let endIndex = 0; endIndex < UserData.purchases.length; endIndex++) {
        if (UserData.purchases[endIndex].date === endDate2) {
            end2 = endIndex;
        }
    }

    // console.log('startIndex ' + start2);
    // console.log("endIndex " + end2);

    // let resultArrayPurchase = UserData.purchases.slice(start, end+1);
    //
    // console.log(resultArrayPurchase.value);


    let disabledYears = (args) => {
        // if (args.date2.getDay() === 122) {
        //     args.isDisabled = true;
        // }
    }
    return (
        <>
            <div className="container" style={{display: 'grid', justifyContent:'flex-end'}}>
                <DateRangePickerComponent
                    id="daterangepicker2"
                    placeholder='Select a range'
                    change={onChange2}
                    minDays={3}
                    maxDays={31}
                    format='yyyy-MM-dd'
                    separator='to'
                    renderDayCell={disabledYears}
                />
            <Calculator/>
            </div>
        </>
    );

};


class Calculator extends Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.state = {targetDate: ''};
    }

    handleChange(e) {
        this.setState({targetDate: e.target.value});
    }

    render() {
        const targetDate = this.state.targetDate;
        return (
            <fieldset>
                <legend>Enter number:</legend>
                <input
                    value={targetDate}
                    onChange={this.handleChange} />
                <div>{targetDate}</div>
            </fieldset>
        );
    }

}