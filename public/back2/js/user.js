$(function(){
  var currentPage = 1;
  var pageSize = 5;
  var id ;
  var isDelete;
  //1.进入页面,进行页面渲染
  render();
  function render(){
    $.ajax({
      type:'get',
      url:'/user/queryUser',
      data:{
        page:currentPage,
        pageSize:pageSize
      },
      dataType:'json',
      success:function(info){
        // console.log(info);
        var htmlStr = template('tpl',info);
        $('.lt-content tbody').html(htmlStr);
        //分页
        $('#paginator').bootstrapPaginator({
          //配置版本
          bootstrapMajorVersion: 3,
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
  //2.给禁用启用按钮注册事件,显示模态框
  $('.lt-content tbody').on('click','.btn',function(){
    $('#toggleModal').modal('show');
    id = $(this).parent().data('id');
    // console.log(id);
    //判断是否有禁用按钮的类,获得isDelete的数据
    isDelete = $(this).hasClass("btn-danger") ? 0 : 1;
    // console.log(isDelete)
  })

  //3.点击确认按钮,发送请求,进行页面重新渲染
  $('.submitBtn').click(function(){
    $.ajax({
      type:'post',
      url:'/user/updateUser',
      data:{
        id:id,
        isDelete:isDelete
      },
      dataType:'json',
      success:function(info){
        console.log(info);
        if(info.success){
          //关闭模态框,重新渲染页面
          $('#toggleModal').modal('hide');
          render();
        }
      }
    })
  })
})