$(function(){
  var currentpage = 1;
  var pagesize = 5;
  //1.渲染页面
  render();
  function render(){
    $.ajax({
      type: "get",
      url: "/category/queryTopCategoryPaging",
      data: {
        page: currentpage,
        pageSize: pagesize
      },
      dataType: "json",
      success: function( info ) {
        // console.log( info )
        var htmlStr = template('tpl',info);
        $('.lt-content tbody').html(htmlStr);
        //初始化分页
        $('#paginator').bootstrapPaginator({
          bootstrapMajorVersion:3,
          currentpage:info.page,
          totalPages:Math.ceil(info.total/info.size),
          onPageClicked:function(a,b,c,page){
            currentpage = page;
            render();
          }
        })
      }
    })
  }

  //2.点击添加分类按钮,显示模态框
  $('.addBtn').click(function(){
    $('#cateModal').modal('show');
  })

  //3.配置表单bootstrapValidator
  $('#form').bootstrapValidator({
    //配置图标
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },
    //配置字段
      fields: {
    categoryName: {
      // 校验规则, 要求非空
      validators: {
        notEmpty: {
          message: "请输入一级分类名称"
        }
      }
    }
  }
});



//4.表单校验完成,阻止表单的默认行为
$('#form').on('success.form.bv',function(e){
  e.preventDefault();
  // console.log(1)
  //发送请求
  $.ajax({
    type:'post',
    url:'/category/addTopCategory',
    data:$("#form").serialize(),
    dataType:'json',
    success:function(info){
      console.log(info);
      if(info.success){
        //关闭模态框
        $('#cateModal').modal('hide');
        //重新渲染页面
        currentpage = 1;
        render();
      }
    }
  })
})
})