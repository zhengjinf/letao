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
          // console.log( info );
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
      // console.log(id)
      $('[name="categoryId"]').val(id );
      //重置表单状态
      $('#form').data('bootstrapValidator').updateStatus('categoryId','VALID');
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
          //重置表单状态
      $('#form').data('bootstrapValidator').updateStatus('brandLogo','VALID');
      }
    })
    //5.配置表单
    $('#form').bootstrapValidator({
      //配置隐藏域
      excluded: [],
      //设置小图标
      feedbackIcons: {
        valid: 'glyphicon glyphicon-ok',//校验成功
        invalid: 'glyphicon glyphicon-remove',//校验失败
        validating: 'glyphicon glyphicon-refresh'//校验中
      },
      //设置字段
      fields:{
        categoryId:{
          validators:{
            notEmpty:{
              message:'请选择一级分类'
            }
          }
        },
        brandName:{
          validators:{
            notEmpty:{
              message:'请输入二级分类'
            }
          }
        },
        brandLogo:{
          validators:{
            notEmpty:{
              message:'请上传图片'
            }
          }
        },
      }
    })
    //表单验证完成,阻止表单默认的提交行为
    $('#form').on('success.form.bv',function(e){
      e.preventDefault();
      // 发送请求
      $.ajax({
        type:'post',
        url:'/category/addSecondCategory',
        data:$('#form').serialize(),
        //后台返回数据类型为json,可以不用设置dataType
        success:function(info){
          // console.log(info);
          if(info.success){
            //关闭模态框
            $('#cateSecModal').modal('hide');
            //重新渲染第一页
            currentpage = 1;
            render();
            //重置表单状态
            $('#form').data('bootstrapValidator').resetForm(true);
          //重置下拉框
           $('.selectFirst').text('请选择一级分类');
          //图片
           $('.img-box img').attr('src','images/none.png');
          }

        }
      })

    })


})