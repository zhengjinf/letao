$(function(){
  //1.一进入页面,发送请求,判断用户是否登录,未登录,拦截到登录页,已登录,利用模板引擎进行渲染
  $.ajax({
    type:'get',
    url:'/user/queryUserMessage',
    dataType:'json',
    success:function(info){
      // console.log(info);
      // {error: 400, message: "未登录！"}
      if(info.error === 400){
        //未登录
        location.href = "login.html";
        return;
      }
      // if(info.success){
        var htmlStr = template('tpl',info);
        $('#userInfo').html(htmlStr);
      // }
    }
  })

  //2.点击退出按钮,注册点击事件,发送请求,跳转到登录页
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