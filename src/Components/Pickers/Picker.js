import React, {useEffect, useState} from "react";
import {DateRangePickerComponent} from "@syncfusion/ej2-react-calendars";
import {BarChart} from "recharts";

export default function Picker( data ) {
    const [date, updateDate] = useState(() => {
    });

    const [startDate, setStartDate] = useState("2020-01-01");
    const [endDate, setEndDate] = useState("2020-01-27");

    useEffect(() => {
        if (date) {
            function newDate() {
                return date.replace(/\s/g, '').split('to')
            }

            let newRange = newDate();
            setStartDate(newRange[0]);
            setEndDate(newRange[1]);
        }
    });


// console.log(startDate);
// console.log(endDate);

    const onChange = (e) => {
        updateDate(e.text);
    };
    let disabledYears = (args) => {
        if (args.date.getYear() < 120 | args.date.getYear() === 122 ) {
            args.isDisabled = true;
        }
    }

    return (
        <>
            <div className="container">
                <DateRangePickerComponent
                    id="daterangepicker"
                    placeholder='Select a range'
                    change={onChange}
                    minDays={3}
                    maxDays={31}
                    format='yyyy-MM-dd'
                    separator='to'
                    renderDayCell={disabledYears}
                />
                <BarChart data={data}/>
            </div>
        </>
    )
}