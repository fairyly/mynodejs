import React from 'react';
//import logo from './logo.svg';
import './App.css';

//class App extends Component {
//  render() {
//    return (
//      <div className="App">
//        <header className="App-header">
//          <img src={logo} className="App-logo" alt="logo" />
//          <h1 className="App-title">Welcome to React</h1>
//        </header>
//        <p className="App-intro">
//          To get started, edit <code>src/App.js</code> and save to reload.
//        </p>
//      </div>
//    );
//  }
//}
// 基金数据可视化（前端代码）
//const React = require("react");
const Echarts = require("echarts");
const EcStat = require("echarts-stat");
const fetch = require("isomorphic-unfetch");
class FundChart extends React.Component{
  constructor(props) {
    console.log(props)
    super(props);
    // 按钮切换标志
    this.state = {
      switchIndex: 1
    }
  }
  // 获取基金档案
  fetchFundInfo(code, callback) {
    return fetch(`http://localhost:1234/fetchFundInfo/${code}`).then((res) => {
          res.json().then((data) => {
          callback(data);
  })
  }).catch((err) => {
      console.log(err);
  });
  }
  // 获取基金净值变动数据
  fetchFundData(code, per, callback) {
    return fetch(`http://localhost:1234/fetchFundData/${code}/${per.toString()}`).then((res) => {
          res.text().then((data) => {
          callback(JSON.parse(data));
  })
  }).catch((err) => {
      console.log(err);
  });
  }
  // 获取ECharts绘制的数据
  getChart(fundData) {
    // 起始点净值
    let startUnitNet = parseFloat(fundData[0].unitNet);
    // 计算其他时间点净值与起始点净值的相对百分比
    // 日期为横坐标，净值为纵坐标
    let data = fundData.map(function(item) {
      return [item.date, parseFloat((100.0 * ((parseFloat(item.unitNet) - startUnitNet) / startUnitNet)).toFixed(2))]
    });
    // 取数组下标为横坐标，净值为纵坐标，用于散点图与回归分析
    let dataRegression = data.map(function(item, i) {
      return [i, item[1]];
    });
    // 折线图横坐标数组
    let dateList = data.map(function(item) {
      return item[0];
    });
    // 折线图纵坐标数组
    let valueList = data.map(function(item) {
      return item[1];
    });
    // 计算线性回归
    let myRegression = EcStat.regression('linear', dataRegression);
    // 线性回归的的散点排序
    myRegression.points.sort(function(a, b) {
      return a[0] - b[0];
    });
    // 线性回归后的拟合方程y=Kx+B
    let K = myRegression.parameter.gradient;
    let B = myRegression.parameter.intercept;
    let optionFold = {
      title: [{
        left: 'center',
      }],
      tooltip: {
        trigger: 'axis'
      },
      xAxis: [{
        data: dateList
      }],
      yAxis: [{
        splitLine: {
          show: false
        }
      }],
      series: [{
        type: 'line',
        showSymbol: false,
        data: valueList,
        itemStyle: {
          color: '#3385ff'
        }
      }]
    };
    let optionRegression = {
      title: {
        subtext: 'linear regression',
        left: 'center'
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross'
        }
      },
      xAxis: {
        type: 'value',
        splitLine: {
          lineStyle: {
            type: 'dashed'
          }
        },
      },
      yAxis: {
        type: 'value',
        splitLine: {
          lineStyle: {
            type: 'dashed'
          }
        },
      },
      series: [{
        name: 'scatter',
        type: 'scatter',
        itemStyle: {
          color: '#3385ff'
        },
        label: {
          emphasis: {
            show: true,
            position: 'left'
          }
        },
        data: dataRegression
      }, {
        name: 'line',
        type: 'line',
        showSymbol: false,
        data: myRegression.points,
        markPoint: {
          itemStyle: {
            normal: {
              color: 'transparent'
            }
          },
          label: {
            normal: {
              show: true,
              position: 'left',
              formatter: myRegression.expression,
              textStyle: {
                color: '#333',
                fontSize: 14
              }
            }
          },
          data: [{
            coord: myRegression.points[myRegression.points.length - 1]
          }]
        }
      }]
    };
    return {
      optionFold: optionFold,
      optionRegression: optionRegression,
      regression: myRegression,
      K: K,
      B: B
    }
  }
  // 绘制图表
  drawChart(fundData, fundInfo) {
    if (!this.chartFold) {
      this.chartFold = Echarts.init(document.getElementById('chart_fold'));
    }
    if (!this.chartPoints) {
      this.chartPoints = Echarts.init(document.getElementById('chart_points'));
    }
    if (fundData && (fundData.length > 0)) {
      // 更新图表绘制
      let chartObj = this.getChart(fundData);
      this.chartFold.setOption(chartObj.optionFold);
      this.chartPoints.setOption(chartObj.optionRegression);
    } else {
      // 更新图表标题
      console.log(fundInfo)
      this.chartFold.setOption({
        title: {
          text: fundInfo.fundNameShort
        }
      });
      this.chartPoints.setOption({
        title: {
          text: fundInfo.fundNameShort
        }
      });
    }
  }
  // 时间范围按钮切换
  dateSwitch(index, per) {
    this.setState({
      switchIndex: index
    }, () => {
      this.fetchFundData(this.props.code, per, (data) => {
      this.drawChart(data.reverse());
  });
  });
  }
  // 时间范围按钮
  getSwitchBtns() {
    let switchArray = [
      ['最近一周', 7],
      ['最近一月', 30],
      ['最近3月', 90],
      ['最近半年', 180],
      ['最近一年', 365],
      ['最近三年', 1095]
    ];
    let switchIndex = this.state.switchIndex;
    return (
        <div>
        {switchArray.map((item, i)=>{
          let active = (i==switchIndex ? true : false);
    let label = item[0];
    let per = item[1];
    return (<button key={i} className={"switch-btn"+(active?" active":"")} onClick={this.dateSwitch.bind(this,i,per)}>{label}</button>)
  })}
  </div>
  )
  }
  componentDidMount() {
    // 默认加载最近一月的基金数据
    console.log(this.props.code);
    this.fetchFundData(this.props.code, 30, (data) => {
      this.drawChart(data.reverse());
  });
    // 基金标题获取
    this.fetchFundInfo(this.props.code, (data) => {
      console.log(data);
    this.drawChart([], data);
  });
  }
  render() {
    return (
        <div className="fundChart-container">
        <div id="chartbox" className="chart-box">
        <div className="chart-fold" id="chart_fold"></div>
        <div className="chart-points" id="chart_points"></div>
        </div>
        <div className="switch-box">
        {this.getSwitchBtns()}
  </div>
    </div>
  );
  }

}


export default FundChart;
