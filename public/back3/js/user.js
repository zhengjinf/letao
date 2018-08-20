$(function(){
  var currentpage = 1;
  var pagesize = 5;
  var currentId ;
  var isDelete;

//1.一进入页面,发送请求,利用模板引擎进行页面渲染
  render();
  function render(){
    $.ajax({
      type:'get',
      url:'/user/queryUser',
      data:{
        page:currentpage,
        pageSize:pagesize
      },
      dataType:'json',
      success:function(info){
        // console.log(info);
        var htmlStr = template('tpl',info);
        $('tbody').html(htmlStr);
        //进行分页初始化
        $("#paginator").bootstrapPaginator({
          //版本号
          bootstrapMajorVersion:3,
          //总页数
          totalPages:Math.ceil(info.total/info.size),
          //当前页
          currentPage:info.page,
          //给分页注册点击事件
          onPageClicked:function(a,b,c,page){
            currentpage = page;
            render();
          }
        })
      }
    })
  }

  //2.点击按钮,显示模态框
  $('.lt-content tbody').on('click','.btn',function(){
    //显示模态框
    $('#forbidModal').modal('show');
    //获取id
    currentId = $(this).parent().data('id');
    // console.log(currentId)
    // isDelete = $(this).hasClass('btn-danger')? 0 :1;
    isDelete = $(this).hasClass("btn-danger") ? 0 : 1;
    // console.log(isDelete)
  })
  //3.点击确认按钮发送请求,重新渲染页面
  $('.submitBtn').click(function(){
    $.ajax({
      type:'post',
      url:'/user/updateUser',
      data:{
        id:currentId,
        isDelete:isDelete
      },
      dataType:'json',
      success:function(info){
        // console.log(info);
        if(info.success){
          //关闭模态框
          $('#forbidModal').modal('hide');
          //重新渲染页面
          render();
        }
      }
    })
  })
})