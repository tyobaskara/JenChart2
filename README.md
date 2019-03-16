# JenChart2

Demo Web:
https://tyobaskara.github.io/JenChart2/

## Usage

Web :

- npm i jenchart2 d3 prop-types

React Native without expo:

- react-native init myProject
- cd myProject
- npm i jenchart2 react-native-svg d3 prop-types
- react-native link

React Native with expo:

- expo init myProject
- cd myProject
- npm i jenchart2 d3 prop-types && yarn add expo

## Babel 6 Support

// Triangle Image Position Bottom Fixed in Babel 6

```
<Jenchart
  fixTriangle
 />
```

## Data

```
export default {
  pfmOverviews: [
    {
      cif: '49022A',
      currency: 'idr',
      timeGroup: 'monthly',
      lastTransactionDate: '2019-02-20T04:18:28.908Z',
      pfmTypes: [
        {
          id: '1',
          name: 'Income',
          colorIncrease: '#123456',
          colorDecrease: '#123456',
          total: 200000,
          previousGroupDifferencePercentage: 20,
          pfmCategories: [
            {
              id: '1',
              name: 'Salary',
              color: '#123456',
              transactionCategories: ['201', '205', '212', '213'],
              isSummaryOnly: false,
              total: 100000,
              totalPercentage: 50
            },
            {
              id: '2',
              name: 'Incoming',
              color: '#123456',
              transactionCategories: ['202', '204', '210', '211', '214'],
              isSummaryOnly: false,
              total: 60000,
              totalPercentage: 30
            },
            {
              id: '3',
              name: 'Interest',
              color: '#123456',
              transactionCategories: ['206', '207'],
              isSummaryOnly: false,
              total: 40000,
              totalPercentage: 20
            }
          ]
        },
        {
          id: '2',
          name: 'Spending',
          colorIncrease: '#123456',
          colorDecrease: '#123456',
          total: 100000,
          previousGroupDifferencePercentage: 10,
          pfmCategories: [
            {
              id: '4',
              name: 'Installment',
              color: '#123456',
              transactionCategories: ['103', '105', '109', '112', '142'],
              isSummaryOnly: false,
              total: 30000,
              totalPercentage: 30
            },
            {
              id: '5',
              name: 'Routine',
              color: '#123456',
              transactionCategories: [
                '101',
                '102',
                '106',
                '107',
                '108',
                '110',
                '114',
                '115',
                '118',
                '123',
                '125',
                '129',
                '130',
                '131',
                '132',
                '138',
                '140',
                '141',
                '143',
                '144',
                '215'
              ],
              isSummaryOnly: false,
              total: 10000,
              totalPercentage: 10
            },
            {
              id: '6',
              name: 'Charity',
              color: '#123456',
              transactionCategories: ['133', '135'],
              isSummaryOnly: false,
              total: 20000,
              totalPercentage: 20
            },
            {
              id: '7',
              name: 'Lifestyle',
              color: '#123456',
              transactionCategories: [
                '104',
                '117',
                '119',
                '120',
                '121',
                '122',
                '124',
                '126',
                '127',
                '128',
                '134',
                '137',
                '203'
              ],
              isSummaryOnly: false,
              total: 13000,
              totalPercentage: 13
            },
            {
              id: '8',
              name: 'Uncategorized',
              color: '#123456',
              transactionCategories: ['116', '998'],
              isSummaryOnly: true,
              total: 17000,
              totalPercentage: 17
            }
          ]
        },
        {
          id: '3',
          name: 'Net',
          colorIncrease: '#123456',
          colorDecrease: '#123456',
          total: 100000,
          previousGroupDifferencePercentage: 0,
          pfmCategories: []
        },
        {
          id: '4',
          name: 'Balance',
          colorIncrease: '#123456',
          colorDecrease: '#123456',
          total: 300000,
          previousGroupDifferencePercentage: 0,
          pfmCategories: []
        }
      ],
      __typename: 'PfmOverview'
    },
    {
      ...
    },
    ...
}
```

## Usage

Example:

```
// examples/src/index.js

import React, { PureComponent } from 'react';
import { render } from 'react-dom';
import JenChart from '../../src';
import pfmData3 from './data3';
import pfmData from './data';
import pfmData12 from './data12';

import './styles.css';
import triangle from '../../src/triangle.png';
import { jenChartWrapper, jeenChartWrapper, titleStyle } from './styles';

export default class App extends PureComponent {
  state = {
    jenchartWidth: null,
    jeenchartWidth: null
  };

  measure() {
    this.setState({
      jenchartWidth: this.jenchart.clientWidth,
      jeenchartWidth: this.jeenchart.clientWidth
    });
  }

  componentDidMount() {
    this.measure();
  }

  componentDidUpdate() {
    this.measure();
  }

  _onPress = (index, item) => {
    console.log(index, item);
  };

  _detectmob = () =>
    window.innerWidth <= 800 && window.innerHeight <= 600 ? true : false;

  _checkYear = (data) => {
    const separatorYear = [];
    const _getYear = str => {
      return str.split('T')[0].split('-')[0];
    };

    data.map((item) => {
      const year = _getYear(item.lastTransactionDate);

      if (separatorYear.indexOf(year) === -1) {
        separatorYear.push(year);
      }
    });
        
    return separatorYear;
  }

  render() {
    return (
      <div>
        <div ref={ref => (this.jenchart = ref)} style={jenChartWrapper}>
          <h1 style={titleStyle}>JenChart Default</h1>
          {this.state.jenchartWidth && (
            <JenChart
              svgStyles={{
                backgroundColor: '#fff',
                width: this.state.jenchartWidth,
                height: 250
              }}
              activeIndex={1}
              axisLabelSize={this._detectmob() ? 11 : 11}
              axisLabelPosX={45}
              axisCustom={{
                strokeDasharray: [0, 0],
                strokeWidth: 2
              }}
              axisPaddingLeft={50}
              barPadding={2}
              barLeftPos={20}
              borderBottom
              borderBottomProp={{
                stroke: '#dfdfdf',
                strokeWidth: 2
              }}
              data={pfmData3.data.pfmOverviews}
              labelTopStyle={{
                fontSize: '13',
                fontWeight: '500'
              }}
              labelBottomStyle={{
                fontSize: '13',
                fontWeight: '600'
              }}
              labelTopPosition={20}
              labelBottomPosition={40}
              singleYearPos={6}
              graphMarginVertical={60}
              onPress={(index, item) => this._onPress(index, item)}
              platform='web'
              separatorStyle={{
                stroke: '#dfdfdf',
                strokeDasharray: [3, 3],
                strokeWidth: '1',
              }}
              separatorYear={this._checkYear(pfmData3.data.pfmOverviews)}
            />
          )}
        </div>

        <div ref={ref => (this.jenchart = ref)} style={jenChartWrapper}>
          <h1 style={titleStyle}>JenChart Default</h1>
          {this.state.jenchartWidth && (
            <JenChart
              svgStyles={{
                backgroundColor: '#fff',
                width: this.state.jenchartWidth,
                height: 250
              }}
              activeIndex={1}
              axisLabelSize={this._detectmob() ? 11 : 11}
              axisLabelPosX={45}
              axisCustom={{
                strokeDasharray: [0, 0],
                strokeWidth: 2
              }}
              axisPaddingLeft={50}
              barPadding={2}
              barLeftPos={20}
              borderBottom
              borderBottomProp={{
                stroke: '#dfdfdf',
                strokeWidth: 2
              }}
              data={pfmData.data.pfmOverviews}
              labelTopStyle={{
                fontSize: '13',
                fontWeight: '500'
              }}
              labelBottomStyle={{
                fontSize: '13',
                fontWeight: '600'
              }}
              labelTopPosition={20}
              labelBottomPosition={40}
              singleYearPos={6}
              graphMarginVertical={60}
              onPress={(index, item) => this._onPress(index, item)}
              platform='web'
              separatorStyle={{
                stroke: '#dfdfdf',
                strokeDasharray: [3, 3],
                strokeWidth: '1',
              }}
              separatorYear={this._checkYear(pfmData.data.pfmOverviews)}
            />
          )}
        </div>

        <div ref={ref => (this.jenchart = ref)} style={jenChartWrapper}>
          <h1 style={titleStyle}>JenChart Default</h1>
          {this.state.jenchartWidth && (
            <JenChart
              svgStyles={{
                backgroundColor: '#fff',
                width: this.state.jenchartWidth,
                height: 250
              }}
              activeIndex={1}
              axisLabelSize={this._detectmob() ? 11 : 11}
              axisLabelPosX={45}
              axisCustom={{
                strokeDasharray: [0, 0],
                strokeWidth: 2
              }}
              axisPaddingLeft={50}
              barPadding={2}
              barLeftPos={20}
              borderBottom
              borderBottomProp={{
                stroke: '#dfdfdf',
                strokeWidth: 2
              }}
              data={pfmData12.data.pfmOverviews}
              labelTopStyle={{
                fontSize: '13',
                fontWeight: '500'
              }}
              labelBottomStyle={{
                fontSize: '13',
                fontWeight: '600'
              }}
              labelTopPosition={20}
              labelBottomPosition={40}
              singleYearPos={6}
              graphMarginVertical={60}
              onPress={(index, item) => this._onPress(index, item)}
              platform='web'
              separatorStyle={{
                stroke: '#dfdfdf',
                strokeDasharray: [3, 3],
                strokeWidth: '1',
              }}
              separatorYear={this._checkYear(pfmData12.data.pfmOverviews)}
            />
          )}
        </div>

        <div ref={ref => (this.jeenchart = ref)} style={jeenChartWrapper}>
          <h1 style={titleStyle}>JenChart With Props</h1>
          {this.state.jeenchartWidth && (
            <JenChart
              activeColor='green'
              activeIndex={0}
              axisColor='lightblue'
              axisLabelColor='brown'
              axisLabelPosX={60}
              axisLabelSize={15}
              axisPaddingLeft={70}
              barColor={{ barLeft: 'green', barRight: 'blue' }}
              circleStyle={{
                r: '5',
                fill: 'red'
              }}
              borderBottom
              borderBottomProp={{
                stroke: '#dfdfdf',
                strokeWidth: 2
              }}
              data={pfmData.data.pfmOverviews}
              labelTopStyle={{
                fill: 'red',
                fontSize: '13',
                fontWeight: '600'
              }}
              labelTopPosition={20}
              rectActiveBgPosX={-10}
              rectActiveBgPosY={6}
              rectActiveBgRad={5}
              rectActiveSize={{
                width: 40,
                height: 20
              }}
              labelBottomStyle={{
                fill: 'orange',
                fontSize: '13',
                fontWeight: '400'
              }}
              labelBottomPosition={30}
              lineStyle={{
                stroke: 'magenta',
                strokeWidth: 3
              }}
              graphMarginVertical={50}
              onPress={(index, item) => this._onPress(index, item)}
              platform='web'
              svgStyles={{
                backgroundColor: '#fff',
                width: this.state.jeenchartWidth,
                height: 450
              }}
              trianglePositionY={6}
              trianglePositionX={-2}
              triangleSrc={triangle}
              triangleScale={15}
              separatorYear={this._checkYear(pfmData.data.pfmOverviews)}
            />
          )}
        </div>
        
      </div>
    );
  }
}

render(<App />, document.getElementById('root'));
```

## Props

```
JenChart.defaultProps = {
  activeColor: '#fff',
  activeIndex: 0,
  axisColor: '#f5f5f5',
  axisCustom: {},
  axisLabelAlign: 'end',
  axisLabelColor: 'black',
  axisLabelPosX: 5,
  axisLabelPosY: 3.5,
  axisLabelSize: 10,
  axisPaddingLeft: 50,
  barColor: {},
  barLeftPos: 10,
  barPadding: 1,
  borderBottom: false,
  borderBottomProp: {},
  bgActiveColor: '#a5a5a5',
  rectActiveBgPosX: 2,
  rectActiveBgPosY: 6,
  rectActiveBgRad: 5,
  rectActiveSize: {
    height: 20,
    width: 35
  },
  circleActiveBgPos: 4,
  circleActiveBgRad: 11,
  circleStyle: {},
  data: [],
  fixTriangle: false,
  graphBarWidth: 10,
  labelTopStyle: {},
  labelTopPosition: 15,
  labelBottomStyle: {},
  labelBottomPosition: 25,
  lineStyle: {},
  graphMarginVertical: 40,
  months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  onPress: () => {},
  singleYearPos: 5,
  separatorStyle: {},
  separatorYear: [],
  svgStyles: {},
  trianglePositionX: 10,
  trianglePositionY: 0,
  triangleScale: 10
};

JenChart.propTypes = {
  data: PropTypes.array.isRequired,
  platform: PropTypes.string.isRequired,
  activeColor: PropTypes.string,
  activeIndex: PropTypes.number,
  axisColor: PropTypes.string,
  axisCustom: PropTypes.object,
  axisLabelAlign: PropTypes.string,
  axisLabelColor: PropTypes.string,
  axisLabelPosX: PropTypes.number,
  axisLabelPosY: PropTypes.number,
  axisLabelSize: PropTypes.number,
  axisPaddingLeft: PropTypes.number,
  barColor: PropTypes.object,
  barLeftPos: PropTypes.number,
  barPadding: PropTypes.number,
  borderBottom: PropTypes.bool,
  borderBottomProp: PropTypes.object,
  bgActiveColor: PropTypes.string,
  rectActiveBgPosX: PropTypes.number,
  rectActiveBgPosY: PropTypes.number,
  rectActiveBgRad: PropTypes.number,
  rectActiveSize: PropTypes.object,
  circleActiveBgPos: PropTypes.number,
  circleActiveBgRad: PropTypes.number,
  circleStyle: PropTypes.object,
  fixTriangle: PropTypes.bool,
  graphBarWidth: PropTypes.number,
  graphMarginVertical: PropTypes.number,
  labelTopStyle: PropTypes.object,
  labelTopPosition: PropTypes.number,
  labelBottomStyle: PropTypes.object,
  labelBottomPosition: PropTypes.number,
  lineStyle: PropTypes.object,
  months: PropTypes.array,
  onPress: PropTypes.func,
  separatorStyle: PropTypes.object,
  separatorYear: PropTypes.array,
  singleYearPos: PropTypes.number,
  svgStyles: PropTypes.object,
  trianglePositionX: PropTypes.number,
  trianglePositionY: PropTypes.number,
  triangleScale: PropTypes.number
};
```
