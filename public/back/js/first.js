$(function(){
  var currentpage = 1;
  var pagesize = 5;
  render();
  //1.一进入页面,发送请求,进行页面渲染
  function render(){
    $.ajax({
      type:'get',
      url:'/category/queryTopCategoryPaging',
      data:{
        page:currentpage,
        pageSize:pagesize
      },
      dataType:'json',
      success:function(info){
        // console.log(info);
        var htmlStr = template('firstTpl',info);
        $('.lt-content tbody').html(htmlStr);
        
        //进行分页渲染
        //分页初始化
        $('#paginator').bootstrapPaginator({
          //配置版本
          bootstrapMajorVersion:3,
          //总页数
          totalPages:Math.ceil(info.total/info.size),
          //当前页
          currentPage:info.page,
          //给每个分页按钮注册点击事件
          onPageClicked: function (a, b, c, page) {
            currentpage = page;
            //重新渲染页面
            render();
          }
        })
      }
    })
  }

  //2.给添加分类按钮添加点击事件
  $('.addBtn').click(function(){
    $('#catemodal').modal('show');
  })

  //3.校验表单
  $('#form').bootstrapValidator({
   //设置小图标
   feedbackIcons: {
    valid: 'glyphicon glyphicon-ok',//校验成功
    invalid: 'glyphicon glyphicon-remove',//校验失败
    validating: 'glyphicon glyphicon-refresh'//校验中
  },
   //字段
   fields:{
    categoryName:{
      //校验规则
      validators:{
        //非空
        notEmpty:{
          message:'请输入一级分类名'
        }
      }
    }
   }
  })

  //4.阻止表单验证成功后默认的跳转行为
  $('#form').on('success.form.bv',function(e){
    e.preventDefault();
    //4.点击添加按钮,发送请求,进行页面渲染
      $.ajax({
        type:'post',
        url:'/category/addTopCategory',
        data:$('#form').serialize(),
        dataType:'json',
        success:function(info){
          // console.log(info);
          if(info.success){
            //关闭模态框
            $('#catemodal').modal('hide');
            // 渲染第一页
            currentpage = 1;
            render();
            //重置表单的校验状态
            $("#form").data('bootstrapValidator').resetForm(true);
          }
        }
      })
  })

})