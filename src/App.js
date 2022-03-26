import './App.css';
import React, {Component, useEffect, useState} from "react";
import { DateRangePickerComponent } from "@syncfusion/ej2-react-calendars";
import axios from 'axios'
import Container from "./Components/Container";
import { Provider } from 'react-redux';

import { connect } from 'react-redux';
import { basedataFetchData } from "./Store/actions/basedata"
import { baseData } from "./Store/reducers/basedata";
import { useDispatch, useSelector } from 'react-redux';


class App extends Component {

    async componentDidMount() {
        this.props.fetchData( "https://wegotrip.com/api/v2/stats/plot");
    }


    render() {
        const data  = this.props.baseData;
        console.log(data)
        return (
            <>
                <Container { ...data } />
            </>
        );
    }

}


const mapStateToProps = state => {
  return {
      baseData: state.baseData
    }
}

const mapDispatchToProps = dispatch => {
  return {
      fetchData: url => {dispatch(basedataFetchData(url))}
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(App);

