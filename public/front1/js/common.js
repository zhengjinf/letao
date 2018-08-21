$(function () {
  //区域滚动初始化
  mui('.mui-scroll-wrapper').scroll({
    indicators: false, //是否显示滚动条(true:默认显示)
    deceleration: 0.0006, //阻尼系数,系数越小滑动越灵敏
  });

  //轮播图初始化
  //获得slider插件对象
  var gallery = mui('.mui-slider');
  gallery.slider({
    interval: 1000//自动轮播周期，若为0则不自动播放，默认为0；
  });
})