  $(function(){
    var currentpage = 1;
    var pagesize = 5;
    //1.渲染页面
    render();
    function render(){
      $.ajax({
        type: "get",
        url: "/category/querySecondCategoryPaging",
        data: {
          page: currentpage,
          pageSize: pagesize
        },
        dataType: "json",
        success: function( info ) {
          console.log( info )
          var htmlStr = template('tpl',info);
          $('.lt-content tbody').html(htmlStr);
          //初始化分页
          // $('#paginator').bootstrapPaginator({
          //   bootstrapMajorVersion:3,
          //   currentpage:info.page,
          //   totalPages:Math.ceil(info.total/info.size),
          //   onPageClicked:function(a,b,c,page){
          //     currentpage = page;
          //     render();
          //   }
          // })
        }
      })
    }



})