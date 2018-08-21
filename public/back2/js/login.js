$(function(){
  //1.配置表单校验
  $('#form').bootstrapValidator({
    //配置小图标
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',//校验成功
      invalid: 'glyphicon glyphicon-remove',//校验失败
      validating: 'glyphicon glyphicon-refresh'//校验中
    },
    //配置字段
    fields:{
      username:{
        validators:{
          notEmpty:{
            message:'用户名不能为空'
          },
          stringLength:{
            min:2,
            max:6,
            message:'请输入2-6位用户名'
          },
          callback:{
            message:'用户名不存在'
          }
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
            message:'请输入6-12位密码'
          },
          callback:{
            message:'密码错误'
          }
        }
      }
    }
  })
  //2.表单校验成功,默认会发生跳转,进行提交
  $('#form').on('success.form.bv',function(e){
    e.preventDefault();
    // console.log('表单校验的默认行为被阻止了');
    //发生请求,进行校验
    $.ajax({
      type:'post',
      url:'/employee/employeeLogin',
      data:$('#form').serialize(),
      dataType:'json',
      success:function(info){
        console.log(info);
        // error: 1000, message: "用户名不存在! "
        if(info.error === 1000){
          $('#form').data('bootstrapValidator').updateStatus('username','INVALID','callback')
        }
        // {error: 1001, message: "密码错误！"}
        if(info.error === 1001){
          $('#form').data('bootstrapValidator').updateStatus('password','INVALID','callback')
        }
        if(info.success){
          //跳转到首页
          location.href="index.html"
        }
      }
    })
  })
  //3.重置表单的校验状态
  //点击重置按钮,重置表单的校验状态
  $('[type="reset"]').click(function(){
    $('#form').data('bootstrapValidator').resetForm(true);
  })
  

})