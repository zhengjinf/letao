$(function () {
  //1.一进入页面,发送请求,进行页面渲染
  var currentpage = 1;
  var pagesize = 5;
  render();
  function render() {
    $.ajax({
      type: 'get',
      url: '/category/querySecondCategoryPaging',
      data: {
        page: currentpage,
        pageSize: pagesize
      },
      success: function (info) {
        // console.log(info);
        //结合模板引擎进行渲染
        var htmlStr = template('secondTpl', info);
        $('.lt-content tbody').html(htmlStr);
        //初始化分页
        $('#paginator').bootstrapPaginator({
          //配置版本
          bootstrapMajorVersion: 3,
          //总页数
          totalPages: Math.ceil(info.total / info.size),
          //当前页
          currentPage: info.page,
          //给每个分页按钮注册点击事件
          onPageClicked: function (a, b, c, page) {
            currentpage = page;
            //重新渲染
            render();
          }
        })
      }
    })
  }

  //2.给添加分类按钮注册点击事件,让模态框显示
  $('.addBtn').click(function () {
    $('#catemoremodal').modal('show');
    //发送请求,动态渲染下拉框的数据
    $.ajax({
      type: 'get',
      url: "/category/queryTopCategoryPaging",
      data: {
        page: 1,
        pageSize: 100
      },
      dataType: 'json',
      success: function (info) {
        // console.log(info);
        var htmlStr = template('dropdownTpl', info);
        $('.dropdown-menu').html(htmlStr);
      }
    })
  })

  //3.给模态框中的a,注册事件委托,将其内容赋值给下拉框
  $('.dropdown-menu').on('click', 'a', function () {
    //获取文本内容
    var txt = $(this).text();
    //赋值给下拉框
    $('.dropD').text(txt);
    // 将文本内容赋值给给隐藏域
    $id = $(this).data('id');
    // console.log($id)
    $('[name="categoryId"]').val($id ); 
    //更新校验状态
    $('#form').data('bootstrapValidator').updateStatus('categoryId','VALID');
  })

  //4.上传文件利用插件实现文件上传初始化
  $('#fileupdate').fileupload({
    //后台返回的数据类型
    dataType: "json",
    //e：事件对象
    //data：图片上传后的对象，通过data.result.picAddr可以获取上传后的图片地址
    done: function (e, data) {
      // console.log(data.result.picAddr);
      // 图片路径
      var imgUrl = data.result.picAddr;
      //将图片路径赋值给图片
      $('.imgbox img').attr('src', imgUrl);
      //将地址传到隐藏域中
      $('[name="brandLogo"]').val( imgUrl );
       //更新校验状态
    $('#form').data('bootstrapValidator').updateStatus('brandLogo','VALID');
    }
  })

  //5.配置表单
  $('#form').bootstrapValidator({
      //1. 指定不校验的类型，默认为[':disabled', ':hidden', ':not(:visible)'],可以不设置
      //默认插件不对隐藏域进行校验
      //重置排除项
     excluded: [],
    //设置小图标
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',//校验成功
      invalid: 'glyphicon glyphicon-remove',//校验失败
      validating: 'glyphicon glyphicon-refresh'//校验中
    },
    //配置字段
    fields: {
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
      },
    }
  })

  //6.注册事件校验成功,阻止表单提交的默认事件
  $('#form').on('success.form.bv',function(e){
    e.preventDefault();
    // console.log('被阻止了');
    //发送请求,进行页面渲染
    $.ajax({
      type:'post',
      url:'/category/addSecondCategory',
      data: $('#form').serialize(),
      dataType:'json',
      success:function(info){
        console.log(info);
        if(info.success){
          //关闭模态框
          $('#catemoremodal').modal('hide');
          currentpage = 1;
          //重新渲染第一页
          render();
          // 重置表单
          $('#form').data('bootstrapValidator').resetForm(true);
          //重置下拉框
          $('.dropD').text('请选择一级分类');
          //图片
          $('.imgbox img').attr('src','images/none.png');
        }
      }
    })
  })
})