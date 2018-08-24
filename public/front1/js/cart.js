$(function () {
  //1.一进入页面,发送请求,获取购车数据,根据后台返回的数据,先判断用户是否已经登录
  //未登录.拦截到登录页,已登录,根据模板引擎进行页面渲染
  function render() {
    //模拟网络延迟
    setTimeout(function () {
      $.ajax({
        type: 'get',
        url: '/cart/queryCart',
        dataType: 'json',
        success: function (info) {
          console.log(info);
          //利用获取到的数据,进行页面渲染
          // {error: 400, message: "未登录！"}
          if (info.error === 400) {//拦截到登录页
            location.href = "login.html";
            return;
          }
          //有数据返回,利用数据进行页面渲染
          var htmlStr = template('productTpl', { arr: info });
          $('.mui-table-view').html(htmlStr);
          //请求回来后,手动结束下拉刷新
          // console.log(mui('.mui-scroll-wrapper').pullRefresh())//下拉刷新实例
          mui('.mui-scroll-wrapper').pullRefresh().endPulldownToRefresh();
        }
      })
    }, 500)
  }

  //2.配置下拉刷新
  mui.init({
    pullRefresh: {
      container: ".mui-scroll-wrapper",//下拉刷新容器标识，querySelector能定位的css选择器均可，比如：id、.class等
      down: {
        auto: true,//可选,默认false.首次加载自动下拉刷新一次
        callback: function () {//必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；
          render();
        }
      }
    }
  });

  //3.点击删除按钮,注册事件委托,发送请求,进行页面重新渲染(下拉刷新即可)
  //mui中默认禁止了a的click事件,需要注册tap事件
  $('.lt-main').on('tap', '.btn-del', function () {
    var id = $(this).data('id');
    // console.log(id);
    //要求id是数组
    $.ajax({
      type: 'get',
      url: '/cart/deleteCart',
      data: {
        id: [id]
      },
      dataType: 'json',
      success: function (info) {
        console.log(info);
        if (info.success) {
          //删除成功,调用一次下拉刷新
          //  console.log( mui('.mui-scroll-wrapper').pullRefresh())
          mui('.mui-scroll-wrapper').pullRefresh().pulldownLoading();
        }
      }

    })
  })

  //4.点击编辑按钮,注册事件委托,显示确认框
  $('.lt-main').on('tap', '.btn-edit', function () {
    var obj = this.dataset;
    // console.log(obj);
    var id = obj.id;

    var htmlStr = template('editTpl', obj);//mui将模板中的 \n 换行标记, 解析成 <br> 标签, 就换行了,需要手动换掉
    htmlStr = htmlStr.replace(/\n/g, '');


    //显示确认框
    mui.confirm(htmlStr, '编辑商品', ['确认', '取消'], function (e) {
      if (e.index === 0) {
        // console.log('确认')
        // 发送请求,进行页面渲染
        var size = $('.lt-size span.current').text();
        var num = $('.lt-num input').val();
        // console.log(size,num);
        $.ajax({
          type:'post',
          url:'/cart/updateCart',
          data:{
            id:id,
            size:size,
            num:num
          },
          dataType:'json',
          success:function(info){
            console.log(info);
            if(info.success){
              //调用一次下拉刷新即可
              mui('.mui-scroll-wrapper').pullRefresh().pulldownLoading();
            }
          }
        })

      }
    })
    //初始化数字框
    mui('.mui-numbox').numbox()
  })


  //5.让尺码可以被点击(事件委托)
  $('body').on('click','.lt-size span',function(){
    $(this).addClass('current').siblings().removeClass('current');
  })
















})