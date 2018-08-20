$(function(){
  var currenpage = 1;
  var pagesize = 2;
  render();
  function render(){
    $.ajax({
      type:'get',
      url:'/product/queryProductDetailList',
      data:{
        page:currenpage,
        pageSize:pagesize
      },
      dataType:"json",
      success:function(info){
        console.log(info);
        var htmlStr = template('productTpl',info);
        $('.lt-content tbody').html(htmlStr);
        //分页初始化
        $('#paginator').bootstrapPaginator({
          bootstrapMajorVersion:3,
          currenPage:info.page,
          totalPages:Math.ceil(info.total/info.size),
          //给分页添加点击事件
          onPageClicked:function(a,b,c,page){
            currenpage=page;
            render();
          },
          //配置分页
        })
      }
    })
  }

  //2.点击添加按钮,显示模态框
  $("#addBtn").click(function(){
    $("#productModal").modal('show');
    //发送请求,进行下拉框的渲染
    $.ajax({
      type:'get',
      url:'/category/querySecondCategoryPaging',
      data:{
        page:1,
        pageSize:100
      },
      dataType:'json',
      success:function(info){
        console.log(info);
        var htmlStr = template('dropdownTpl',info);
        $('.dropdown-menu').html(htmlStr);
      }
    })
  })
  //3.点击下拉框a,赋值给下拉框
  $('.dropdown-menu').on('click','a',function(){
    var txt = $(this).text();
    $('.dropD').text(txt);
    var id = $(this).data('id');
    // console.log(id)
    $('[name="brandId]').val(id);
  })

  //4.多文件上传
  $("#fileupdate").fileupload({
    dataType:'json',
    done:function(e,data){
      console.log(data)
    }
  })


})