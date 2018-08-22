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

//专门获取地址栏的参数拼接成对象
function getSearch(k){
    //获取地址栏参数,转码
    var search = decodeURI(location.search);
    // console.log(search);
    search = search.slice(1);
    // console.log(search)
    // 分割成数组
    var arr = search.split('&');
    // console.log(arr);
    var obj = {};
    arr.forEach(function(v,i){
      var key = v.split('=')[0];
      var value = v.split('=')[1];
      // console.log(key)
      obj[key]=value
    })
    return obj[k];
}