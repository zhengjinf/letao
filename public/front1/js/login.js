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
        if (info.error === 403){
          mui.toast('用户名和密码不正确');
          return;
        };
        //登录成功,获取地址栏参数,看是否是从其他页面跳转过来的
        var search = location.search;//?returnUrl=http://localhost:3000/front1/product.html?productId=20
        // console.log(search)
        // console.log(search.indexOf('returnUrl'))
        if(search.indexOf('returnUrl') > -1){//有returnUrl 从其他页面跳转过来的,截取后面的地址,跳转回去
          // var returnUrl = search.slice(11);
          var returnUrl = search.replace('?returnUrl=','');
          // console.log(returnUrl);
          location.href = returnUrl;
        }
        else{//直接登录到个人中心页
          location.href = 'user.html';
        }
      }
    })

  })
})