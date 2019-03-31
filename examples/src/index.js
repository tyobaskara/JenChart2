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
              activeColor='green'
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
              labelTopVerticalPosition={20}
              labelBottomVerticalPosition={40}
              singleYearHorizontalPos={35}
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
              activeColor='black'
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
              labelTopVerticalPosition={20}
              labelBottomVerticalPosition={40}
              singleYearHorizontalPos={35}
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
              activeColor='black'
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
              labelTopVerticalPosition={20}
              labelBottomVerticalPosition={40}
              singleYearHorizontalPos={35}
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
              svgStyles={{
                backgroundColor: '#fff',
                width: this.state.jeenchartWidth,
                height: 450
              }}
              activeColor='green'
              activeIndex={0}
              axisColor='lightblue'
              axisLabelColor='brown'
              axisLabelPosX={60}
              axisLabelSize={15}
              axisPaddingLeft={70}
              axisCustom={{
                strokeDasharray: [0, 0],
                strokeWidth: 2
              }}
              barColor={{ barLeft: 'green', barRight: 'blue' }}
              barPadding={2}
              barLeftPos={20}
              borderBottom
              borderBottomProp={{
                stroke: '#dfdfdf',
                strokeWidth: 2
              }}
              circleStyle={{
                r: '5',
                fill: 'red'
              }}
              data={pfmData12.data.pfmOverviews}
              labelTopStyle={{
                fill: 'red',
                fontSize: '13'
              }}
              labelTopVerticalPosition={20}
              labelBottomStyle={{
                fill: 'orange',
                fontSize: '13'
              }}
              labelBottomVerticalPosition={40}
              rectActiveBgPosX={2}
              rectActiveBgPosY={6}
              rectActiveBgRad={5}
              rectActiveSize={{
                height: 20,
                width: 35
              }}
              lineStyle={{
                stroke: 'orange',
                strokeWidth: 3
              }}
              singleYearHorizontalPos={35}
              graphMarginVertical={60}
              onPress={(index, item) => this._onPress(index, item)}
              platform='web'
              separatorStyle={{
                stroke: '#dfdfdf',
                strokeDasharray: [3, 3],
                strokeWidth: '1',
              }}
              separatorYear={this._checkYear(pfmData12.data.pfmOverviews)}
              trianglePositionY={6}
              trianglePositionX={-12}
              triangleSrc={triangle}
              triangleScale={15}
            />
          )}
        </div>
        
      </div>
    );
  }
}

render(<App />, document.getElementById('root'));
