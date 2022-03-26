import React, {useEffect,  useState} from "react";
import {
    BarChart,
    Bar,
    Tooltip,
    Legend
} from "recharts";
import '../../App.css';
import { DateRangePickerComponent } from "@syncfusion/ej2-react-calendars";
import {Grid} from "@mui/material";
import PickerCompare from "../Pickers/PickerCompare";



export default function Graphics ( props ) {

    // console.log(Object.getOwnPropertyNames(purchases.purchases));

    if (!Object.keys(props.purchases).length){
        return null
    }
    // console.log(Object.keys(props.purchases).length);

    const [date, updateDate] = useState(() => {
    });

    const [startDate, setStartDate] = useState("2020-01-01");
    const [endDate, setEndDate] = useState("2020-01-27");

    useEffect(() => {
        if (date) {
            function newDate()
            {
                return date.replace(/\s/g, '').split('to')
            }
            let newRange = newDate();
            setStartDate(newRange[0]);
            setEndDate(newRange[1]);
        }
    });


    // // console.log(startDate);
    // // console.log(endDate);
    //
    const onChange = (e) => {
        updateDate(e.text);
    };


    // расчет индексов для графика продаж согласно пикеру дат
        let start = 0;
        let end = 26;

        for (let startIndex = 0; startIndex < Object.keys(props.purchases).length; startIndex++) {
            if (props.purchases[startIndex].date === startDate) {
                start = startIndex;
            }
        }
        for (let endIndex = 0; endIndex < Object.keys(props.purchases).length; endIndex++) {
            if (props.purchases[endIndex].date === endDate) {
                end = endIndex;
            }
        }
        // console.log('startIndex ' + start);
        // console.log("endIndex " + end);
        let resultArrayPurchase = props.purchases.slice(start, end+1);

        // console.log(resultArrayPurchase.value);


    // сумма за выбранный период

        let resultValuesArray = resultArrayPurchase.map(element => element.value);
        let resultValuesSum = resultValuesArray.reduce(function(previousValue, currentValue, index, array) {
            return previousValue + currentValue;
        });
        // console.log(resultValuesSum);

    // // расчет индексов для графика просмотры/клики
    //
    // let resultArrayCV = views_to_clicks.slice(start, end+1);
    // // console.log(resultArrayCV);
    //
    // // просмотры/клики расчет процентов
    //
    // let resultViewArray = resultArrayCV.map(element => element.view);
    // let resultClickArray = resultArrayCV.map(element => element.click);
    // let sumViewArray = resultViewArray.reduce(function(previousValue, currentValue, index, array) {
    //     return previousValue + currentValue;
    // });
    // let sumClickArray = resultClickArray.reduce(function(previousValue, currentValue, index, array) {
    //     return previousValue + currentValue;
    // });
    //
    // let converseCV = `${Number(sumViewArray)/Number(sumClickArray)*100}%`
    //
//     let disabledYears = (args) => {
//         if (args.date.getYear() < 120 | args.date.getYear() === 122 ) {
//         args.isDisabled = true;
//     }
// }

    return (
        <>
            <div className="container" style={{display: 'grid', justifyContent:'flex-end'}}>
                <DateRangePickerComponent
                        id="daterangepicker"
                        placeholder='Select a range'
                        change={onChange}
                        minDays={3}
                        maxDays={31}
                        format='yyyy-MM-dd'
                        separator='to'
                        // renderDayCell={disabledYears}
                    />
                {/*<PickerCompare />*/}

                </div>
            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                    <Grid item xs={6}>
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


                    </Grid>
                    {/*<Grid item xs={6}>*/}
                    {/*    <div>ПРОСМОТРЫ-КЛИКИ</div>*/}
                    {/*    <div>{converseCV}</div>*/}
                    {/*    <BarChart*/}
                    {/*        width={500}*/}
                    {/*        height={300}*/}
                    {/*        data={resultArrayCV}*/}
                    {/*        margin={{*/}
                    {/*            top: 20,*/}
                    {/*            right: 30,*/}
                    {/*            left: 20,*/}
                    {/*            bottom: 5*/}
                    {/*        }}*/}
                    {/*    >*/}
                    {/*        <Legend />*/}
                    {/*        <Tooltip />*/}

                    {/*        <Bar dataKey="click" stackId="b" fill="#2196f3" />*/}

                    {/*        <Bar dataKey="view" stackId="b" fill="#646bf7" />*/}
                    {/*    </BarChart>*/}
                    {/*    <div className="dateDisplay">*/}
                    {/*        <div>{startDate}</div>*/}
                    {/*        <div>{endDate}</div>*/}
                    {/*    </div>*/}
                    {/*</Grid>*/}
                </Grid>
        </>
    );

};
//
