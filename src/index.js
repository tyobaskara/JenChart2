/* eslint-disable complexity */
/* eslint-disable max-lines-per-function */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Svg, G, Line, Rect, Text as SText, Circle, Image } from 'svgs';
import * as d3 from 'd3';

import { _isEqual, _formatAxisLabel, _getMonthNumber, _getYear, _selectObject } from './util';

const emptyObj = {};
const emptyArr = [];

export default class JenChart extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      data: this.props.data,
      activeIndex: this.props.activeIndex,
      separatorYear: this.props.separatorYear,
      graphHeight: 0,
      graphWidth: 0,
      x: () => emptyObj,
      y: () => emptyObj,
      topValue: 0,
      middleValue: 0,
      isReady: false
    };
  }

  componentDidMount() {
    const { data } = this.state;
    const {
      barPadding,
      graphMarginVertical,
      svgStyles,
      platform
    } = this.props;

    const graphHeight = svgStyles.height - 2 * graphMarginVertical;
    const graphWidth = svgStyles.width;

    // X scale point
    const xDomain = data.map(item => item.lastTransactionDate);
    const xRange = [0, graphWidth];
    const x = d3
      .scalePoint()
      .domain(xDomain)
      .range(xRange)
      .padding(barPadding);

    // Y scale linear
    const topValue = this._getMaxValue(data);
    const yDomain = [-topValue, topValue];
    const yRange = [0, graphHeight];
    const y = d3
      .scaleLinear()
      .domain(yDomain)
      .range(yRange);

    // top axis and middle axis
    const middleValue = topValue / 2;

    this.setState({
      graphHeight,
      graphWidth,
      x,
      y,
      platform,
      topValue,
      middleValue,
      isReady: true
    });
  }

  _axisLabel = (y, value, isInitial) => {
    const {
      labelColor,
      axisLabelSize,
      fontFamily,
      axisLabelPosX,
      axisLabelPosY,
      platform,
      isShowLabel,
      units
    } = this.props;

    const isNotAndroid = platform !== 'android' ? {
      fill: labelColor,
      textAnchor: this.props.axisLabelAlign
    } : emptyObj;

    const fontFml = fontFamily ? {
      fontFamily
    } : emptyObj;

    return isShowLabel && (
      <SText
        x={axisLabelPosX}
        y={y(value) * -1 + axisLabelPosY}
        fontSize={axisLabelSize}
        {...fontFml}
        {...isNotAndroid}
      >
        {isInitial ? 0 : _formatAxisLabel(value, units)}
      </SText>
    );
  };

  _drawAxis = (axisCustomProp, value, graphWidth, y, isInitial) => (
    <G>
      <Line
        x1={this.props.axisPaddingLeft}
        y1={y(value) * -1}
        x2={graphWidth}
        y2={y(value) * -1}
        stroke={axisCustomProp.stroke}
        strokeWidth={axisCustomProp.strokeWidth}
      />

      {this._axisLabel(y, value, isInitial)}
    </G>
  );

  _drawBottomBorder = () => {
    const { svgStyles, borderBottomProp, graphMarginVertical } = this.props;
    const graphWidth = svgStyles.width;

    return (
      <Line x1="0" y1={graphMarginVertical} x2={graphWidth} y2={graphMarginVertical} {...borderBottomProp} />
    );
  };

  _drawBottomLabels = (index, item, x, graphMarginVertical) => {
    const {
      activeColor,
      circleActiveBgPos,
      circleActiveBgRad,
      labelColor,
      rectActiveBgPosX,
      rectActiveBgPosY,
      rectActiveBgRad,
      rectActiveSize,
      fixTriangle,
      labelTopStyle,
      labelTopVerticalPosition,
      marginLeftMonthLabel,
      marginCircleActiveBg,
      months,
      platform,
      trianglePositionX,
      trianglePositionY,
      triangleScale,
      triangleSrc,
      isShowLabel
    } = this.props;
    const { data } = this.state;
    const isAboveSixMonth = data.length > 6;

    // Active Style
    const isNotAndroidActiveColor = platform !== 'android' ? {
      fill: activeColor
    } : emptyObj;
    const labelActiveStyles = this._activeIndex(index)
      ? {
        fontWeight: '600',
        ...isNotAndroidActiveColor
      } : { fontWeight: '600' };

    // Default Style include Active Style
    const isAndroidDefaultColor = platform === 'android' ? emptyObj : {
      fill: labelColor,
      textAnchor: 'middle'
    };
    const labelTopStyles = {
      fontSize: '10',
      fontWeight: '400',
      ...isAndroidDefaultColor,
      ...labelTopStyle,
      ...labelActiveStyles
    };

    // Active Fill Android Style
    const activeFill = platform === 'android' ? activeColor : 'transparent';

    const triangleSize = triangleScale;
    const triangleProps = fixTriangle
      ? {
        x: x(item.lastTransactionDate) - (triangleSize / 2) - trianglePositionX,
        y: ((0 - graphMarginVertical) + triangleSize) - trianglePositionY
      }
      : {
        x: x(item.lastTransactionDate) - trianglePositionX,
        y: (graphMarginVertical - triangleSize) + trianglePositionY
      };
    const month = _getMonthNumber(item.lastTransactionDate);

    return (
      <G key={`label${item.lastTransactionDate}`}>
        {/* Active circle background */}
        {this._activeIndex(index) && isAboveSixMonth && isShowLabel && (
          <Circle
            cx={x(item.lastTransactionDate) + marginCircleActiveBg}
            cy={labelTopVerticalPosition - circleActiveBgPos}
            r={circleActiveBgRad}
            stroke={activeColor}
            strokeWidth={1}
            fill={activeFill}
          />
        )}
        {/* Active rectangle background */}
        {this._activeIndex(index) && !isAboveSixMonth && isShowLabel && (
          <Rect
            x={x(item.lastTransactionDate) + rectActiveBgPosX}
            y={rectActiveBgPosY}
            rx={rectActiveBgRad}
            ry={rectActiveBgRad}
            {...rectActiveSize}
            stroke={activeColor}
            strokeWidth={1}
            fill={activeFill}
          />
        )}

        {/* Months Label */}
        {isShowLabel && (
          <SText
            {...labelTopStyles}
            x={x(item.lastTransactionDate) + marginLeftMonthLabel}
            y={labelTopVerticalPosition}
          >
            {isAboveSixMonth ? month : months[month - 1]}
          </SText>
        )}

        {/* Image triangle active arrow */}
        {this._activeIndex(index) && triangleSrc && (
          <Image
            href={triangleSrc}
            preserveAspectRatio="xMidYMid slice"
            height={triangleSize}
            width={triangleSize}
            opacity="1"
            clipPath="url(#clip)"
            {...triangleProps}
          />
        )}
      </G>
    );
  };

  _drawBars = (item, x, y, topValue) => {
    const { barLeftPos, graphBarWidth } = this.props;
    const barColors = {
      barLeft: '#8fbc5a',
      barRight: '#fc9d13',
      ...this.props.barColor
    };
    const Income = _selectObject(item.pfmTypes, 'name', 'Income');
    const Spending = _selectObject(item.pfmTypes, 'name', 'Spending');
    const isLineCap = (value) => {
      const val = (value / topValue) * 100;

      return val > 5;
    };

    return (
      <G>
        <Line
          x1={x(item.lastTransactionDate) + barLeftPos}
          y1={y(0) * -1}
          x2={x(item.lastTransactionDate) + barLeftPos}
          y2={y(topValue) * -1}
          stroke="#f5f5f5"
          strokeWidth={graphBarWidth}
          strokeLinecap="round"
        />
        <Line
          x1={x(item.lastTransactionDate) + barLeftPos}
          y1={y(0) * -1}
          x2={x(item.lastTransactionDate) + barLeftPos}
          y2={y(-topValue) * -1}
          stroke="#f5f5f5"
          strokeWidth={graphBarWidth}
          strokeLinecap="round"
        />

        <Line
          x1={x(item.lastTransactionDate) + barLeftPos}
          y1={y(0) * -1}
          x2={x(item.lastTransactionDate) + barLeftPos}
          y2={y(-Spending.total) * -1}
          stroke={barColors.barRight}
          strokeWidth={graphBarWidth}
        />
        {isLineCap(Spending.total) && (
          <Line
            x1={x(item.lastTransactionDate) + barLeftPos}
            y1={y(-Spending.total) * -1}
            x2={x(item.lastTransactionDate) + barLeftPos}
            y2={y(-Spending.total) * -1}
            stroke={barColors.barRight}
            strokeWidth={graphBarWidth}
            strokeLinecap="round"
          />
        )}

        <Line
          x1={x(item.lastTransactionDate) + barLeftPos}
          y1={y(0) * -1}
          x2={x(item.lastTransactionDate) + barLeftPos}
          y2={y(Income.total) * -1}
          stroke={barColors.barLeft}
          strokeWidth={graphBarWidth}
        />
        {isLineCap(Income.total) && (
          <Line
            x1={x(item.lastTransactionDate) + barLeftPos}
            y1={y(Income.total) * -1}
            x2={x(item.lastTransactionDate) + barLeftPos}
            y2={y(Income.total) * -1}
            stroke={barColors.barLeft}
            strokeWidth={graphBarWidth}
            strokeLinecap="round"
          />
        )}
      </G>
    );
  };

  _drawCircle = (item, x, y) => {
    const { barLeftPos } = this.props;
    const circleStyles = {
      r: '3.5',
      fill: '#00a4de',
      ...this.props.circleStyle
    };
    const Net = _selectObject(item.pfmTypes, 'name', 'Net');

    return (
      <Circle
        cx={x(item.lastTransactionDate) + barLeftPos}
        cy={y(Net.total) * -1}
        {...circleStyles}
      />
    );
  };

  _drawLine = (x, y, index, array) => {
    if (index < array.length - 1) {
      const { lineStyle, barLeftPos } = this.props;
      const lineStyles = {
        stroke: '#00a4de',
        strokeWidth: 3,
        ...lineStyle
      };
      const y1 = _selectObject(array[index].pfmTypes, 'name', 'Net');
      const y2 = _selectObject(array[index + 1].pfmTypes, 'name', 'Net');

      return (
        <Line
          x1={x(array[index].lastTransactionDate) + barLeftPos}
          y1={y(y1.total) * -1}
          x2={x(array[index + 1].lastTransactionDate) + barLeftPos}
          y2={y(y2.total) * -1}
          {...lineStyles}
        />
      );
    }
  };

  _drawSeparator = (x, y, index, array, topValue) => {
    const {
      barLeftPos,
      graphMarginVertical
    } = this.props;
    const { separatorYear } = this.state;
    const nextIndex = index + 1;

    const pos = x(array[index].lastTransactionDate);

    const style = {
      stroke: '#dfdfdf',
      strokeDasharray: [3, 3],
      strokeWidth: '3',
      ...this.props.separatorStyle
    };

    if (index < array.length - 1) {
      const getYear = _getYear(array[index].lastTransactionDate);
      const nextGetYear = _getYear(array[nextIndex].lastTransactionDate);

      if (separatorYear.length > 1 && getYear !== nextGetYear) {
        const posNext = x(array[nextIndex].lastTransactionDate);
        const midPos = (pos + posNext) / 2;

        return (
          <G>
            <Line
              x1={midPos + barLeftPos}
              y1={y(topValue) * -1}
              x2={midPos + barLeftPos}
              y2={y(-topValue) * -1 + graphMarginVertical}
              {...style}
            />
          </G>
        );
      }
    }
  }
  _drawYear = (x, index, array) => {
    const {
      barLeftPos,
      labelBottomVerticalPosition,
      labelBottomStyle,
      labelColor,
      singleYearHorizontalPos,
      platform,
      isShowLabel
    } = this.props;
    const { separatorYear } = this.state;
    const yearLen = separatorYear.length;
    const arrayLastTransactionDate = array[index].lastTransactionDate;
    const month = _getMonthNumber(arrayLastTransactionDate);
    const pos = x(arrayLastTransactionDate);
    const isLastIndex = this.props.data.length === index + 1;
    const isAndroidDefaultColor = platform === 'android' ? emptyObj : {
      fill: labelColor
    };
    const labelBottomStyles = {
      fontSize: '10',
      fontWeight: '400',
      ...isAndroidDefaultColor,
      ...labelBottomStyle
    };

    if (_isEqual(yearLen, 2)) {
      const isJanuary = _isEqual(parseInt(month, 0), 1);
      const isDecember = _isEqual(parseInt(month, 0), 12);
      return (
        <G>
          {isShowLabel && isDecember && (
            <SText
              {...labelBottomStyles}
              x={pos + barLeftPos - singleYearHorizontalPos}
              y={labelBottomVerticalPosition}
            >
              {_getYear(arrayLastTransactionDate)}
            </SText>
          )}
          {isShowLabel && isLastIndex && !isJanuary && (
            <SText
              {...labelBottomStyles}
              x={pos + barLeftPos - singleYearHorizontalPos}
              y={labelBottomVerticalPosition}
            >
              {_getYear(arrayLastTransactionDate)}
            </SText>
          )}
        </G>
      );
    }

    if (_isEqual(yearLen, 1)) {
      return isShowLabel && isLastIndex && (
        <SText
          {...labelBottomStyles}
          x={pos + barLeftPos - singleYearHorizontalPos}
          y={labelBottomVerticalPosition}
        >
          {_getYear(arrayLastTransactionDate)}
        </SText>
      );
    }
  }

  _getMaxValue = data =>
    d3.max(data, (d) => {
      const Income = _selectObject(d.pfmTypes, 'name', 'Income');
      const Net = _selectObject(d.pfmTypes, 'name', 'Net');
      const Spending = _selectObject(d.pfmTypes, 'name', 'Spending');
      const maxOne =
        Income.total > Spending.total ? Income.total : Spending.total;
      const maxTwo = maxOne > Net.total ? maxOne : Net.total;

      return maxTwo;
    });

  _rectOnPress = (index, item) => {
    this.setState({ activeIndex: index });
    this.props.onPress(index, item);
  };

  _drawRectOnPress = (
    index,
    item,
    x,
    graphHeight,
  ) => {
    const {
      barLeftPos,
      graphBarWidth,
      graphMarginVertical,
      platform
    } = this.props;
    const propsOnpress = emptyObj;
    const halfgraphBarWidth = graphBarWidth / 2;

    if (platform !== 'web') {
      propsOnpress.onPressIn = () => this._rectOnPress(index, item);
    }

    return (
      <Rect
        accessibilityLabel={`jenchart_${index}`}
        x={x(item.lastTransactionDate) + barLeftPos - halfgraphBarWidth - 5}
        y={graphHeight * -1}
        width={graphBarWidth * 2}
        height={graphHeight + graphMarginVertical}
        fill="transparent"
        opacity="0.5"
        {...propsOnpress}
      />
    );
  };

  _activeIndex = index => this.state.activeIndex === index && true;

  render() {
    const {
      axisColor,
      axisCustom,
      borderBottom,
      graphMarginVertical,
      platform,
      svgStyles
    } = this.props;

    const axisCustomProp = {
      stroke: axisColor,
      strokeDasharray: [3, 3],
      strokeWidth: '3',
      ...axisCustom
    };

    const {
      data,
      graphHeight,
      graphWidth,
      x,
      y,
      topValue,
      middleValue,
      isReady
    } = this.state;


    return isReady && (
      <Svg style={svgStyles}>
        <G y={graphHeight + graphMarginVertical}>
          {this._drawAxis(axisCustomProp, topValue, graphWidth, y)}
          {this._drawAxis(axisCustomProp, middleValue, graphWidth, y)}
          {this._drawAxis(axisCustomProp, 0, graphWidth, y, 'initial')}
          {this._drawAxis(axisCustomProp, -middleValue, graphWidth, y)}
          {this._drawAxis(axisCustomProp, -topValue, graphWidth, y)}
          {borderBottom && this._drawBottomBorder()}

          {data.map((item, index, array) =>
            this._drawBottomLabels(index, item, x, graphMarginVertical)
          )}
        </G>

        {data.map(item => (
          <G y={graphHeight + graphMarginVertical} key={`bar${item.lastTransactionDate}`}>
            {this._drawBars(item, x, y, topValue)}
            {this._drawCircle(item, x, y)}
          </G>
        ))}

        {data.map(
          (item, index, array) =>
            <G
              y={graphHeight + graphMarginVertical}
              key={`line${item.lastTransactionDate}`}
            >
              {this._drawLine(x, y, index, array)}
              {this._drawSeparator(x, y, index, array, topValue)}
              {this._drawYear(x, index, array)}
            </G>
        )}

        {data.map((item, index, array) =>
          (platform === 'web' ? (
            <Svg
              accessibilityLabel={`jenchart_${index}`}
              y={graphHeight + graphMarginVertical}
              key={`rectOnPress${item.lastTransactionDate}`}
              onClick={() => this._rectOnPress(index, item)}
              style={{ overflow: 'initial' }}
            >
              {this._drawRectOnPress(
                index,
                item,
                x,
                graphHeight,
              )}
            </Svg>
          ) : (
            <G
              y={graphHeight + graphMarginVertical}
              key={`rectOnPress${item.lastTransactionDate}`}
            >
              {this._drawRectOnPress(
                index,
                item,
                x,
                graphHeight,
              )}
            </G>
          ))
        )}
      </Svg>
    );
  }
}

JenChart.defaultProps = {
  activeColor: '#fff',
  activeIndex: 0,
  axisColor: '#f5f5f5',
  axisCustom: emptyObj,
  axisLabelAlign: 'end',
  labelColor: 'black',
  axisLabelPosX: 5,
  axisLabelPosY: 3.5,
  axisLabelSize: 10,
  axisPaddingLeft: 50,
  barColor: emptyObj,
  barLeftPos: 10,
  marginLeftMonthLabel: 20,
  marginCircleActiveBg: 20,
  barPadding: 1,
  borderBottom: false,
  borderBottomProp: emptyObj,
  rectActiveBgPosX: 2,
  rectActiveBgPosY: 6,
  rectActiveBgRad: 5,
  rectActiveSize: {
    height: 20,
    width: 35
  },
  circleActiveBgPos: 4,
  circleActiveBgRad: 11,
  circleStyle: emptyObj,
  data: emptyArr,
  fixTriangle: false,
  fontFamily: '',
  graphBarWidth: 10,
  graphMarginVertical: 40,
  isShowLabel: true,
  labelTopStyle: emptyObj,
  labelTopVerticalPosition: 15,
  labelBottomStyle: emptyObj,
  labelBottomVerticalPosition: 25,
  lineStyle: emptyObj,
  months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  onPress: () => emptyObj,
  singleYearHorizontalPos: 5,
  separatorStyle: emptyObj,
  separatorYear: emptyArr,
  svgStyles: emptyObj,
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
  labelColor: PropTypes.string,
  axisLabelPosX: PropTypes.number,
  axisLabelPosY: PropTypes.number,
  axisLabelSize: PropTypes.number,
  axisPaddingLeft: PropTypes.number,
  barColor: PropTypes.object,
  barLeftPos: PropTypes.number,
  marginLeftMonthLabel: PropTypes.number,
  marginCircleActiveBg: PropTypes.number,
  barPadding: PropTypes.number,
  borderBottom: PropTypes.bool,
  borderBottomProp: PropTypes.object,
  rectActiveBgPosX: PropTypes.number,
  rectActiveBgPosY: PropTypes.number,
  rectActiveBgRad: PropTypes.number,
  rectActiveSize: PropTypes.object,
  circleActiveBgPos: PropTypes.number,
  circleActiveBgRad: PropTypes.number,
  circleStyle: PropTypes.object,
  fixTriangle: PropTypes.bool,
  fontFamily: PropTypes.string,
  graphBarWidth: PropTypes.number,
  graphMarginVertical: PropTypes.number,
  isShowLabel: PropTypes.bool,
  labelTopStyle: PropTypes.object,
  labelTopVerticalPosition: PropTypes.number,
  labelBottomStyle: PropTypes.object,
  labelBottomVerticalPosition: PropTypes.number,
  lineStyle: PropTypes.object,
  months: PropTypes.array,
  onPress: PropTypes.func,
  separatorStyle: PropTypes.object,
  separatorYear: PropTypes.array,
  singleYearHorizontalPos: PropTypes.number,
  svgStyles: PropTypes.object,
  trianglePositionX: PropTypes.number,
  trianglePositionY: PropTypes.number,
  triangleScale: PropTypes.number
};
