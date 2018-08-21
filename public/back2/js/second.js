$(function(){
  var currentPage = 1;
  var pageSize = 5;
  //1.页面渲染
  render();
  function render(){
    $.ajax({
      type:'get',
      url:'/category/querySecondCategoryPaging',
      data:{
        page:currentPage,
        pageSize:pageSize
      },
      dataType:'json',
      success:function(info){
        // console.log(info);
        var htmlStr = template('firstTpl',info);
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

  //2.添加分类,显示模态框
  $(".btnAdd").click(function(){
    $("#secondModal").modal('show');
    //发送请求,进行下拉框的结构渲染
    $.ajax({
      type:'get',
      url:'/category/queryTopCategoryPaging',
      data:{
        page:1,
        pageSize:100
      },
      dataType:'json',
      success:function(info){
        // console.log(info);
        var htmlStr = template('secondTpl',info);
        $('.dropdown-menu').html(htmlStr);
      }
    })
  })
  //3.给下拉框中的a注册点击事件,获取到a的文本赋值给下拉框
  $('.dropdown-menu').on('click','a',function(){
    var txt = $(this).text();
    $('.firstCate').text(txt);
    //获取id
    var id = $(this).data('id');
    // console.log(id)
    $('[name="categoryId"]').val(id);
    //手动校验状态
    $('#form').data('bootstrapValidator').updateStatus('categoryId','VALID');
  })
  //4.多文件上传
  $('#upload').fileupload({
    dataType:'json',
    done:function(e,data){
      // console.log(data.result.picAddr);
      //将图片路径赋值给图片
      $('.imgbox img').attr('src',data.result.picAddr);
      $('[name="brandLogo"]').val(data.result.picAddr);
       //手动校验状态
     $('#form').data('bootstrapValidator').updateStatus('brandLogo','VALID')
    }
  })

  //5.校验表单
  $('#form').bootstrapValidator({
    //表单校验,默认不校验隐藏域
    excluded:[],//所有的都校验
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',//校验成功
      invalid: 'glyphicon glyphicon-remove',//校验失败
      validating: 'glyphicon glyphicon-refresh'//校验中
    },
    //配置字段
    fields:{
      categoryId: {
        validators: {
          notEmpty: {
            message: "请选择一级分类"
          }
        }
      },
      brandName: {
        validators: {
          notEmpty: {
            message: '请输入二级分类'
          }
        }
      },
      brandLogo: {
        validators: {
          notEmpty: {
            message: '请上传图片'
          }
        }
      }
    }
  })

  //5.校验成功,阻止默认行为
  $('#form').on('success.form.bv',function(e){
    e.preventDefault();
    $.ajax({
      type:'post',
      url:"/category/addSecondCategory",
      data:$('#form').serialize(),
      dataType:'json',
      success:function(info){
        // console.log(info);
        if(info.success){
          //关闭模态框
          $("#secondModal").modal('hide');
          //渲染第一页
          currentPage = 1;
          render();
          //重置表单的校验状态
          $('#form').data('bootstrapValidator').resetForm(true);
          //重置下拉框和图片
          $('.firstCate').text('请选择一级分类');
          $('.imgbox img').attr('src','images/none.png')
        }
      }

    })
  })



})