$(function () {
  //1.一进入页面发送aja请求,进行页面渲染
  var productId = getSearch('productId');
  // console.log(productId);
  $.ajax({
    type: 'get',
    url: '/product/queryProductDetail',
    data: {
      id: productId
    },
    dataType: 'json',
    success: function (info) {
      console.log(info);
      var htmlStr = template('productTpl', info);
      $('.lt-main .mui-scroll').html(htmlStr);
      //手动初始化轮播图
      //获得slider插件对象
      var gallery = mui('.mui-slider');
      gallery.slider({
        interval: 1000//自动轮播周期，若为0则不自动播放，默认为0；
      });
      //初始化数字框
      mui('.mui-numbox').numbox()
    }
  })

  //2.让尺码可以被选(事件委托)
  $('.lt-main').on('click','.lt-size span',function(){
    $(this).addClass('current').siblings().removeClass('current');
  })

  //3.加入购物车(判断是否登录,未登录拦截到登录页,登录跳转到购物车页)
  $('.addCart').click(function(){
    var num = $('.lt-main .lt-num input').val();
    // console.log(num)
    var size = $('.lt-size span.current').text();
    // console.log(size)
    if(!size){
      mui.toast('请选择尺码');
      return;
    }
    //发送请求
    $.ajax({
      type:'post',
      url:'/cart/addCart',
      data:{
        productId:productId,
        num:num,
        size:size
      },
      dataType:'json',
      success:function(info){
        console.log(info);
        // {error: 400, message: "未登录！"}
        if(info.error === 400){
          //拦截到登录页,拼接该页的地址,用于登录以后再跳转回来
          location.href= "login.html?retUrl="+location.href;
        }
        if(info.success){
          //提示用户是否继续浏览
          mui.confirm('恭喜您添加成功','温馨提示',['去购物车','继续浏览'],function(e){
            if (e.index === 0 ){
              location.href = "cart.html";
            }
          })
        }
      }
    })
  })
})