$(function(){
  //1.点击登录按钮,注册点击事件
 $('.loginBtn').click(function(){
  var username = $('.username').val().trim();
  var password = $('.password').val().trim();
  
  if(username === ''){
    mui.toast('请输入用户名');
    return;
  }
  if(password === ''){
    mui.toast('请输入密码');
    return;
  }
  $.ajax({
    type:'post',
    url:'/user/login',
    data:{
      username:username,
      password:password
    },
    dataType:'json',
    success:function(info){
      console.log(info);
      // {error: 403, message: "用户名不存在! "}
      if(info.error === 403){
        mui.toast('用户名或者密码错误');
        return;
      }
      if(info.success){//登录成功
        var search = location.search;
        // console.log(search)
        if(search.indexOf('retUrl') > -1){
          //从其他页面跳转过来的
          search = search.replace('?retUrl=','');
          // console.log(search);
          location.href = search;
        }
        else{
          location.href="user.html";
        }
      }
    }
  })
 })
})