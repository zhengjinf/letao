$(function(){
  var currentPage = 1;
  var pageSize = 5;
  //1.页面渲染
  render();
  function render(){
    $.ajax({
      type:'get',
      url:'/category/queryTopCategoryPaging',
      data:{
        page:currentPage,
        pageSize:pageSize
      },
      dataType:'json',
      success:function(info){
        // console.log(info);
        var htmlStr = template('tpl',info);
        $('.lt-main tbody').html(htmlStr);
        $('#paginator').bootstrapPaginator({
          bootstrapMajorVersion:3,
          totalPages:Math.ceil(info.total/info.size),
          currentPage:info.page,
          onPageClicked:function(a,b,c,page){
            currentPage = page;
            render();
          }
        })
      }
    })
  }
  //2.点击添加分类按钮,显示模态框
  $('.btnAdd').click(function(){
    $('#firstModal').modal('show');
  })
  //3.配置表单校验
  $('#form').bootstrapValidator({
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',//校验成功
      invalid: 'glyphicon glyphicon-remove',//校验失败
      validating: 'glyphicon glyphicon-refresh'//校验中
    },
    //配置字段
    fields:{
      categoryName:{
        validators:{
          notEmpty:{
            message:'请输入一级分类'
          }
        }
      }
    }
  })

  //4.表单校验成功,阻止表单默认提交
  $('#form').on('success.form.bv',function(e){
    e.preventDefault();
    $.ajax({
      type:"post",
      url:'/category/addTopCategory',
      data:$('#form').serialize(),
      dataType:'json',
      success:function(info){
        // console.log(info);
        if(info.success){
          $('#firstModal').modal('hide');
          currentPage = 1;
          render();
          //重置表单校验状态
          $('#form').data('bootstrapValidator').resetForm(true)
        }
      }
    })
  })
})

