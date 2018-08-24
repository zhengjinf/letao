$(function(){
  //1.一进入页面,发送请求,判断是否登录,未登录,拦截到登录页,登录成功,利用模板引擎进行渲染
  function render(){
    setTimeout(function(){
      $.ajax({
        type:'get',
        url:'/cart/queryCart',
        dataType:'json',
        success:function(info){
          console.log(info);
          // {error: 400, message: "未登录！"}
          if(info.error === 400){
            location.href = "login.html?retUrl=" + location.href;
          }
          //已登录 
          var htmlStr = template('queryTpl',{arr:info});
          $('.lt-main .mui-table-view').html(htmlStr);
          // 关闭下拉刷新
          mui('.mui-scroll-wrapper').pullRefresh().endPulldownToRefresh();
          // console.log( mui('.mui-scroll-wrapper').pullRefresh())
        }
      })
    },500)
  }

  //2.配置下拉刷新
  mui.init({
    pullRefresh : {
      container:".mui-scroll-wrapper",//下拉刷新容器标识，querySelector能定位的css选择器均可，比如：id、.class等
      down : {
        height:50,//可选,默认50.触发下拉刷新拖动距离,
        auto: true,//可选,默认false.首次加载自动下拉刷新一次
        contentdown : "亲,下拉可以刷新",//可选，在下拉可刷新状态时，下拉刷新控件上显示的标题内容
        contentover : "亲,释放立即刷新",//可选，在释放可刷新状态时，下拉刷新控件上显示的标题内容
        contentrefresh : "亲,正在刷新...",//可选，正在刷新状态时，下拉刷新控件上显示的标题内容
        callback :function(){
          render();
        } //必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；
      }
    }
  });

  //3.点击删除按钮注册点击事件,事件委托,tap事件,发送请求,执行一次下拉刷新即可
  $('.lt-main').on('tap','.btn-del',function(){
    var id = $(this).data('id');
    // console.log(id);
    mui.confirm('亲,您确定要删除该件宝贝吗','温馨提示',['非常确定','我再想想'],function(e){
      if(e.index === 0){
        $.ajax({
          type:'get',
          url:'/cart/deleteCart',
          data:{
            id:[id],
          },
          dataType:'json',
          success:function(info){
            // console.log(info);
            if(info.success){
              mui('.mui-scroll-wrapper').pullRefresh().pulldownLoading()
            }
          }
        })
      }
    })
  })

  //4.点击编辑按钮,注册事件委托,发送请求
  $('.lt-main').on('tap','.btn-edit',function(){
    //获取所有的自定义属性
    var obj = this.dataset;
    // console.log(obj)

    var htmlStr = template('editTpl',obj);
    htmlStr = htmlStr.replace(/\n/g,'')
    mui.confirm(htmlStr,'编辑商品',['确认','取消'],function(e){
      if(e.index === 0){
        //根据所选择的尺码和数量,发送请求,执行下拉刷新即可
        var size = $('.elt-size span.current').text();
        var num = $('.elt-num input').val();
        var id = obj.id;
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
              //重新执行一次下拉刷新即可
              mui('.mui-scroll-wrapper').pullRefresh().pulldownLoading();
            }
          }
        })

      }
    })
    //初始化数字框
    mui(".mui-numbox").numbox();
  })

  //5.让尺码可以被选中
  $('body').on('click','.elt-size span',function(){
    $(this).addClass('current').siblings().removeClass('current');
  })

})