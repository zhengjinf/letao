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
          }
        })
      }
    })
  }
})