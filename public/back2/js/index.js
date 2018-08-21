$(function(){
  //左边echarts
  // 基于准备好的dom，初始化echarts实例
  var myChart1 = echarts.init(document.getElementById('main1'));

  // 指定图表的配置项和数据
  var option1 = {
    title: {
        text: '2017年注册人数'
    },
    tooltip: {},
    legend: {//图例
        data: ['人数']
    },
    xAxis: {//x轴的刻度
        data: ["1月", "2月", "3月", "4月", "5月", "6月"]
    },
    yAxis: {},
    //数据项列表
    series: [{
        name: '人数',
        type: 'bar',
        data: [1000, 1500, 1800, 1200, 1000, 500]
    }]
};
  // 使用刚指定的配置项和数据显示图表。
  myChart1.setOption(option1);

//右边
var myChart2 = echarts.init(document.getElementById('main2'));
option2 = {
  //大标题
  title: {
      text: '热门品牌销售',
      subtext: '2018年8月',//副标题
      x: 'center'//控制标题的位置
  },
  tooltip: {//提示框组件
      trigger: 'item',//axis:坐标轴触发
      formatter: "{a} <br/>{b} : {c} ({d}%)"//配置提示信息 
                                            //a:系列名称 b:数据项名称 c;数值 d:百分比
  },
  //图例
  legend: {
      orient: 'vertical',//horizontal可以让图例水平显示
      left: 'left',
      data: ['耐克', '阿迪', '新百伦', '李宁', '阿迪王']
  },
  //数据项
  series: [
      {
          name: '品牌',
          type: 'pie',
          radius: '55%',//指定圆的大小,55%直径所占比例
          center: ['50%', '60%'],//圆心的坐标位置
          data: [
              { value: 335, name: '耐克' },
              { value: 310, name: '阿迪' },
              { value: 234, name: '新百伦' },
              { value: 135, name: '李宁' },
              { value: 1548, name: '阿迪王' }
          ],
          //可以添加阴影效果
          itemStyle: {
              emphasis: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
          }
      }
  ]
};
 // 使用刚指定的配置项和数据显示图表。
 myChart2.setOption(option2);



})