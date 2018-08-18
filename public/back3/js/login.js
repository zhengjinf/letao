$(function(){
  //1.校验:用户名不能为空,长度2-6
        //密码不能为空,长度6-12;
  $('#form').bootstrapValidator({
    //设置小图标
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },
    //配置字段
    fields:{
      username:{
        //校验规则
        validators:{
          //非空
          notEmpty:{
            message:'用户名不能为空'
          },
          //长度2-6
          stringLength:{
            min:2,
            max:6,
            message:'用户名长度为2-6位'
          },
          //回调函数
          callback:{
            message:'用户名不存在'
          },
        }

      },
      password:{
        validators:{
          notEmpty:{
            message:'密码不能为空'
          },
          stringLength:{
            min:6,
            max:12,
            message:'密码长度为6-12位'
          },
          callback:{
            message:'密码错误'
          }
        }
      }
    }
  })

  //2.阻止submit自带的表单提交行为
  $('#form').on('success.form.bv',function(e){
    e.preventDefault();
    // console.log('浏览器默认行为被消除了');
    //发送请求
    $.ajax({
      type:'post',
      url:'/employee/employeeLogin',
      data:$('#form').serialize(),
      
      dataType:'json',
      success:function(info){
        // console.log(info);
        if(info.success){
          location.href="index.html";
        }
        if(info.error === 1000){
          //用户名不存在
          // 调用bootstrap-validators的实例
          $('#form').data('bootstrapValidator').updateStatus('username','INVALID','callback')
        }
        if(info.error === 1001){
          //密码错误
          $('#form').data('bootstrapValidator').updateStatus('password','INVALID','callback')
        }
      }
    })
  })

  //3.重置按钮的重置校验状态
  $('[type=reset]').click(function(){
    $('#form').data('bootstrapValidator').resetForm();
  })

})

