$(function(){
  //1.添加进度条
  //利用ajax全局事件
  $(document).ajaxStart(function(){
    NProgress.start();
  })
  $(document).ajaxStop(function(){
    NProgress.done();
  })
  //5.判断是否登录了,进行登录拦截
  //排除登录页
  if(location.href.indexOf('login.html')===-1){
    $.ajax({
      type:'get',
      url:'/employee/checkRootLogin',
      dataType:'json',
      success:function(info){
        // console.log(info);
        if(info.success){
          //已登录
        }
        if(info.error === 400){
          location.href = 'login.html';
        }
      }
    })
  }

  //2.侧边栏的切换
  $('.category').click(function(){
    $('.child').stop().slideToggle();
  })

  //3.右侧按钮的隐藏
  $('.menu').click(function(){
    $('.lt-aside').toggleClass('hidemenu');
    $('.topbar').toggleClass('hidemenu');
    $('.lt-main').toggleClass('hidemenu');
  })

  //4.模态框显示
  $('.logout').click(function(){
    $('#cover').modal('show');
  })
  //5.点击退出按钮,跳转到登录页
  $('.mlogout').click(function(){
    //发送请求
    $.ajax({
      type:'get',
      url:'/employee/employeeLogout',
      dataType:'json',
      success:function(info){
        // console.log(info);
        if(info.success){
          location.href="login.html";
        }
      }
    })
  })

  


})