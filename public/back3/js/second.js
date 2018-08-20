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
          console.log( info );
          var htmlStr = template('tpl',info);
          $('.lt-content tbody').html(htmlStr);
          // 初始化分页
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
      $('#cateSecModal').modal('show');
      //发送请求.渲染下拉列表
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
          var htmlStr = template('secTpl',info);
          $('.dropdown-menu').html(htmlStr);
        }
      })
    })

    //3.给下拉框绑定点击事件
    $('.dropdown-menu').on('click','a',function(){
      var txt = $(this).text();
      $('.selectFirst').text(txt);
      var id = $(this).data('id');
      console.log(id)
      $('[name="categoryId"]').val(id );
    })

    //4.利用插件,实现文件上传
    $("#updatefile").fileupload({
      dataType:'json',
      done:function(e,data){
        // console.log(data.result);
        var imgUrl = data.result.picAddr;
        $('.img-box img').attr('src',imgUrl);
        //将图片赋值到隐藏域
        $('[name="brandLogo"]').val(imgUrl);
      }
    })


})