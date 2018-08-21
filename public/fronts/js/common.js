/**
 * Created by 惜沫 on 2018-08-20.
 */
//1.初始化区域滚动
mui('.mui-scroll-wrapper').scroll({
  deceleration: 0.0005, // 阻尼系数, 系数越小, 越灵敏
  indicators: false, //是否显示滚动条
});

//2.初始化轮播图
//获得slider插件对象
var gallery = mui('.mui-slider');
gallery.slider({
  interval:1000//自动轮播周期，若为0则不自动播放，默认为0；
});