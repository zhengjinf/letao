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

//专门用于获取地址栏的参数
function getSearch(k) {
  var search = location.search;//"?name=%22pp%22&age=18&desc=%22%E5%B8%85%22"
  //对其进行解码
  search = decodeURI(search);//"?name="pp"&age=18&desc="帅""
  //去除问号
  search = search.slice(1);//name="pp"&age=18&desc="帅"
  //  console.log(search)
  // 通过&分隔成数组 
  var arr = search.split('&');//["name="pp"", "age=18", "desc="帅""]
  // console.log(arr)
  //遍历数组,将内容放在对象中
  var obj = [];
  arr.forEach(function (v, i) {
    var key = v.split('=')[0];
    var value = v.split('=')[1];
    obj[key] = value;
  })
  // console.log(obj);
  return obj[k];
}
// console.log(getSearch(key=18))