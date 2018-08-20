// $(function () {
  //1.添加进条
  // 利用ajax全局事件
  //发送第一个ajax请求时调用
  $(document).ajaxStart(function(){
    NProgress.start();
  });
  //ajax请求全部回来调用
  $(document).ajaxStop(function () {
  // 模拟网络延迟
  setTimeout(function() {
    // 关闭进度条
    NProgress.done();
  }, 500);
  })
// })



//5.判断用户是否有登录,登录了则什么都不用做,
// 未登录则跳转到登录页
//判断是否是登录页
if(location.href.indexOf("login.html")===-1){
  //非登录页
  //发送请求,是否进行登录
  $.ajax({
    type:'get',
    url:'/employee/checkRootLogin',
    dataType:'json',
    success:function(info){
      console.log(info);
      if(info.success){
        //已登录
      }
      if(info.error===400){
        //未登录,跳转到登录页
        location.href="login.html";
      }

    }
  })
}

//2.添加分类管理的切换功能
$(function () {
  $('.nav .category').click(function () {
    $('.child').slideToggle();
  })
})

//3.侧边栏切换
$(function () {
  $('.lt-main .menu').click(function () {
    $('.lt-aside').toggleClass('hidemenu');
    $('.toptitle').toggleClass('hidemenu');
    $('.lt-main').toggleClass('hidemenu');
  })
})

// 4.点击退出显示模态框
$('.logout').click(function () {
  $('#mymodal').modal('show')
})

//5.点击退出按钮退到登录页
$('.logout-btn').click(function () {
  $.ajax({
    type: 'get',
    url: '/employee/employeeLogout',
    dataType: 'json',
    success:function(info){
      // console.log(info);
      if(info.success){
        location.href="login.html";
      }
    }
  })
})
