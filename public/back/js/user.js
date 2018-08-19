$(function () {

  var currentpage = 1; //标记当前页
  var pagesize = 5; //每页页数
  var currentid;
  var isDelete;
  //1.页面渲染
  render();
  function render() {
    $.ajax({
      type: 'get',
      url: '/user/queryUser',
      data: {
        page: currentpage,
        pageSize: pagesize
      },
      dataType: 'json',
      success: function (info) {
        console.log(info);
        var htmlStr = template('tpl', info);
        $('.lt-content tbody').html(htmlStr);
        //初始化分页
        $('#paginator').bootstrapPaginator({
          //配置版本
          bootstrapMajorVersion: 3,
          //总页数:
          totalPages: Math.ceil(info.total / info.size),
          //当前页
          currentPage: info.page,
          //为分页注册事件:
          onPageClicked: function (event, originalEvent, type, page) {
            currentpage = page;
            //重新渲染页面
            render();
          }

        })
      }

    })
  }

  //2.点击按钮,显示模态框
  $('tbody').on('click', ".btn", function () {
    //显示模态框
    $('#usermodal').modal('show');
    //获取id
    currentid = $(this).parent().data("id");
    // console.log(currentid);
       isDelete = $(this).hasClass("btn-danger") ? 0 : 1;
  })
  //3.点击确认按钮,切换状态,隐藏模态框,重新渲染页面
  $('.submitBtn').click(function () {
    //发送请求
    $.ajax({
      type: 'post',
      url: '/user/updateUser',
      data: {
        id: currentid,
        isDelete: isDelete
      },
      dataType: 'json',
      success: function (info) {
        // console.log(info);
        if (info.success){
          //关闭模态框
          $('#usermodal').modal('hide');
          //重新渲染页面
          render();
        }
      }
    })
  })



})