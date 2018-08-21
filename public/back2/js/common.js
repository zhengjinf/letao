$(function(){
  //1.添加进度条
  $(document).ajaxStart(function(){
    //开启进度条
    NProgress.start();
  })
  $(document).ajaxStop(function(){
    //模拟网络延迟
    setTimeout(function() {
      // 关闭进度条
      NProgress.done();
    }, 500);
  })

  // 2.判断用户是否进行登录,未登录跳转到登录页
  //将登录页排除在外
  if(location.href.indexOf("login.html")===-1){

    $.ajax({
      type:'get',
      url:'/employee/checkRootLogin',
      dataType:'json',
      success:function(info){
        console.log(info);
        if(info.success){
          //什么都不用做
        }
        if(info.error === 400){
          //拦截到登录页
          location.href="login.html";
        }
      }
    })
  }

  //3.点击目录,切换侧边栏
  $('.lt-main .menu').click(function(){
    // $('.lt-aside').toggleClass('menuout')
    console.log(1)
    $('.lt-aside').toggleClass('menuout');
    $('.lt-mheader').toggleClass('menuout');
    $('.lt-main').toggleClass('menuout');
  })

  //4.分类目录的切换
  $('.category').click(function(){
    $('.child').stop().slideToggle();
  })

  //5.点击退出按钮,显示模态框
  $('.logout').click(function(){
    $('#logoutModal').modal('show');
  })
  //6.给模态框的退出按钮注册事件,发送请求
  $('.logoutBtn').click(function(){
    $.ajax({
      type:'get',
      url:'/employee/employeeLogout',
      dataType:'json',
      success:function(info){
        console.log(info);
        if(info.success){
          location.href="login.html";
        }
      }
    })
  })

})