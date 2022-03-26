import {Bar, Legend, Tooltip} from "recharts";
import React, {useEffect,  useState} from "react";
import {Grid} from "@mui/material";
import PickerCompare from "../Pickers/PickerCompare";

function BarChart(data) {


    // расчет индексов для графика продаж согласно пикеру дат
    let start = 0;
    let end = 26;


    for (let startIndex = 0; startIndex < data.purchases.length; startIndex++) {
        if (data.purchases[startIndex].date === startDate) {
            start = startIndex;
        }
    }
    for (let endIndex = 0; endIndex < data.purchases.length; endIndex++) {
        if (data.purchases[endIndex].date === endDate) {
            end = endIndex;
        }
    }
    // console.log('startIndex ' + start);
    // console.log("endIndex " + end);
    let resultArrayPurchase = data.purchases.slice(start, end+1);

    // console.log(resultArrayPurchase.value);


    // сумма за выбранный период

    let resultValuesArray = resultArrayPurchase.map(element => element.value);
    let resultValuesSum = resultValuesArray.reduce(function(previousValue, currentValue, index, array) {
        return previousValue + currentValue;
    });
    // console.log(resultValuesSum);

    return(
        <div>ПРОДАЖИ</div>
    <div>{resultValuesSum}</div>
    <BarChart
        width={500}
        height={300}
        data={resultArrayPurchase}
        margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5
        }}
    >
        <Legend />
        <Tooltip />

        <Bar dataKey="value" stackId="a"  fill="#2196f3" />
        <Bar dataKey="сравнение отрезков в работе" stackId="a" fill="#646bf7" />
    </BarChart>
    <div className="dateDisplay">
        <div>{startDate}</div>
        <div>{endDate}</div>
    </div>
    )
}

export default BarChart;