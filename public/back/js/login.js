//1. 用户名不能为空,长度2-6位
//2. 用户密码不能为空,长度为6-12位

$(function(){
  //1.校验功能
  $("#form").bootstrapValidator({
     //设置小图标
     feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',//校验成功
      invalid: 'glyphicon glyphicon-remove',//校验失败
      validating: 'glyphicon glyphicon-refresh'//校验中
    },
    //配置字段
    fields:{
      username:{
        //配置校验规则
        validators:{
          //非空
            notEmpty:{
              //提示信息
                message:"用户名不能为空"
            },
            stringLength:{
              min:2,
              max:6,
              message:"用户名必须是2-6位",
            }
        }
    },
      password:{
       validators:{
        notEmpty:{
          message:"密码不能为空"
        },
        stringLength:{
          min:6,
          max:12,
          message:"密码长度必须是6-12位"
        }
       }
      },
    }
  })

  //2.注册表单校验成功的事件,阻止submit提交的默认跳转行为
  $("#form").on('success.form.bv',function(e){
    e.preventDefault();
    // console.log('校验成功,默认行为被阻住了');
    $.ajax({
      type:'post',
      url:'/employee/employeeLogin',
      data:$('#form').serialize(),
      dataType:'json',
      success:function(info){
        // console.log(info);
        if(info.success){
          location.href="index.html"
        }
        if(info.error===1000){
          alert ("密码错误");
        }
        if(info.error===1001){
          alert ("密码错误");
        }
      }
    })
  })

  //2.重置校验状态





})