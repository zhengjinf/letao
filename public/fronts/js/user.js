$(function(){
  //1.一进入页面,发送请求判断是否已经登录,未登录拦截到登录页
  $.ajax({
    type:'get',
    url:'/user/queryUserMessage',
    dataType:'json',
    success:function(info){
      // console.log(info);
      // {error: 400, message: "未登录！"}
      if(info.error === 400){
        //拦截到登录页
        location.href="login.html";
      }
      //已登录
      var htmlStr = template('userTpl',info);
      $('.lt-main .mui-media').html(htmlStr);
    }
  })

  //2.给退出按钮绑定点击事件
  $('.logoutBtn').click(function(){
    $.ajax({
      type:'get',
      url:'/user/logout',
      dataType:'json',
      success:function(info){
        // console.log(info);
        if(info.success){
          location.href = "login.html";
        }
      }
    })

  })
})