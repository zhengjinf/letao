$(function () {
  //1.根据地址栏的参数,动态渲染页面
  var productId = getSearch('productId');
  // console.log(productId)
  $.ajax({
    type: 'get',
    url: '/product/queryProductDetail',
    data: {
      id: productId
    },
    dataType: 'json',
    success: function (info) {
      console.log(info);
      var htmlStr = template('tpl', info);
      $('.lt-main .mui-scroll').html(htmlStr);
      //初始化轮播图
      //获得slider插件对象
      var gallery = mui('.mui-slider');
      gallery.slider({
        interval: 5000//自动轮播周期，若为0则不自动播放，默认为0；
      });

      //初始化数字框
      mui('.mui-numbox').numbox();
    }
  })

  //2.让尺码可以选中事件委托
  $('.lt-main').on('click','.lt-size span',function(){
    $(this).addClass('current').siblings().removeClass('current');
  })

  //3.加入购物车
  $('.addCart').click(function(){
    //获取size productId num
    var size = $('.lt-size span.current').text();
    // console.log(size)
    var num = $('.mui-numbox-input').val();
    // console.log(num);
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
          // 拦截到登录页 拼接地址栏参数,以便登录以后再跳转回来
          location.href="login.html?returnUrl=" + location.href;
        }
        if(info.success){
          //弹出确认框
          mui.confirm('添加成功','温馨提示',['去购物车','继续浏览'],function(e){
            if(e.index === 0){
              location.href = "cart.html";
            }
          })
        }
      }
    })
   
  })


})