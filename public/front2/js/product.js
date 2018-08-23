/**
 * Created by Jepson on 2018/8/23.
 */

$(function() {

  // 功能1: 获取地址栏的productId, 发送ajax请求, 进行商品渲染
  var productId = getSearch("productId");

  $.ajax({
    type: "get",
    url: "/product/queryProductDetail",
    data: {
      id: productId
    },
    dataType: "json",
    success: function( info ) {
      console.log( info );
      var htmlStr = template("productTpl", info);
      $('.lt_main .mui-scroll').html( htmlStr );

      // 手动进行轮播初始化
      // 获得slider插件对象
      var gallery = mui('.mui-slider');
      gallery.slider({
        interval: 5000 //自动轮播周期，若为0则不自动播放，默认为0；
      });


      // 手动初始化 数字框
      mui(".mui-numbox").numbox()
    }
  })


});