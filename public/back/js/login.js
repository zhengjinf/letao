//1. 用户名不能为空
//2. 用户密码不能为空
//3. 用户密码长度为6-12位


$(function(){
  $("#form").bootstrapValidator({
     //设置小图标
     feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
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
})