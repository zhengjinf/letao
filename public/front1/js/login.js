$(function(){
  $('.loginBtn').click(function(){

    //发送ajax请求
    var username= $('#username').val();
    var password= $('#password').val();
    if(username === ''){
      mui.toast('请输入用户名');
      return;
    }
    if(password === ''){
      mui.toast('请输入密码');
      return;
    }

  })
})