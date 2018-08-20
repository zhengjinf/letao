$(function () {
  var currenpage = 1;
  var pagesize = 2;
  var picArr = [];//用于存储图片数据

  render();
  function render() {
    $.ajax({
      type: 'get',
      url: '/product/queryProductDetailList',
      data: {
        page: currenpage,
        pageSize: pagesize
      },
      dataType: "json",
      success: function (info) {
        // console.log(info);
        var htmlStr = template('productTpl', info);
        $('.lt-content tbody').html(htmlStr);
        //分页初始化
        $('#paginator').bootstrapPaginator({
          bootstrapMajorVersion: 3,
          currenPage: info.page,
          totalPages: Math.ceil(info.total / info.size),
          //给分页添加点击事件
          onPageClicked: function (a, b, c, page) {
            currenpage = page;
            render();
          },
          //配置分页
          //按钮大小
          size: 'normal',
          //配置提示文本
          itemTexts: function (type, page, current) {
            switch (type) {
              case 'page':
                return page;
              case 'first':
                return '首页';
              case 'last':
                return '尾页';
              case 'prev':
                return '上一页';
              case 'next':
                return '下一页'
            }
          },
          //配置title提示信息
          tooltipTitles: function (type, page, current) {
            switch (type) {
              case 'page':
                return '前往第' + page + '页';
              case 'first':
                return '首页';
              case 'last':
                return '尾页';
              case 'prev':
                return '上一页';
              case 'next':
                return '下一页'
            }
          },
          //使用bootstrap提示框组件
          useBootstrapTooltip: true
        })
      }
    })
  }

  //2.点击添加按钮,显示模态框
  $("#addBtn").click(function () {
    $("#productModal").modal('show');
    //发送请求,进行下拉框的渲染
    $.ajax({
      type: 'get',
      url: '/category/querySecondCategoryPaging',
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
  //3.点击下拉框a,赋值给下拉框
  $('.dropdown-menu').on('click', 'a', function () {
    var txt = $(this).text();
    $('.dropD').text(txt);
    var id = $(this).data('id');
    // console.log(id)
    $('[name="brandId]').val(id);
    //重置表单校验状态
    $('#form').data('bootstrapValidator').updateStatus('brandId','VALID')
  })

  //4.多文件上传
  $("#fileupdate").fileupload({
    dataType: 'json',
    done: function (e, data) {
      console.log(data.result);
      //将文件地址存到数组中width="100"
      $('.imgbox').prepend(' <img src="'+ data.result.picAddr+'" width="100px">');
      picArr.unshift(data.result);
      // console.log(picArr);
      //判断数组长度大于3,移除最后一张,将数组中的一个数据截取
      if (picArr.length > 3){
        $('.imgbox img').eq(-1).remove();
        picArr.pop();
      }
      //数组长度=3,重置表单的校验状态
      if(picArr.length === 3){
        $('#form').data('bootstrapValidator').updateStatus('picStatus','VALID');
      }else{
        $('#form').data('bootstrapValidator').updateStatus('picStatus','INVALID');
      }
    }
  })

  //5.配置信息
  $('#form').bootstrapValidator({
    //配置排除项
    excluded: [],
    //配置图标
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',//校验成功
      invalid: 'glyphicon glyphicon-remove',//校验失败
      validating: 'glyphicon glyphicon-refresh'//校验中
    },
    //配置字段
    fields: {
      proName:{
        validators:{
          notEmpty:{
            message:'请输入商品名称'
          }
        }
      },
      oldPrice:{
        validators:{
          notEmpty:{
            message:'请输入商品原价'
          }
        }
      },
      price:{
        validators:{
          notEmpty:{
            message:'请输入商品现价'
          }
        }
      },
      proDesc:{
        validators:{
          notEmpty:{
            message:'请输入商品描述'
          }
        }
      },
      //尺寸:xx-xx
      size:{
        validators:{
          notEmpty:{
            message:'请输入商品尺寸'
          },
          regexp:{
            regexp:/^\d{2}-\d{2}$/,
            message:'商品尺寸格式为xx-xx,例如:22-28'
          }
        }
      },
      //库存:非空+非0开头的数字
      num:{
        validators:{
          notEmpty:{
            message:'请输入商品库存'
          },
          regexp:{
            regexp:/^[1-9]\d*$/,
            message:'商品库存的格式为以非0数字开头'
          }
        }
      },
      brandId:{
        validators:{
          notEmpty:{
            message:'请选择二级分类'
          }
        }
      },
      //配置图片
      picStatus:{
        validators:{
          notEmpty:{
            message:'请选择3张图片'
          }
        }
      }
    }
  })
  //5.配置完成,阻止表单的默认跳转行为
  $('#form').on('success.form.bv',function(e){
    e.preventDefault();
    //收集表单信息和图片信息
    var paramStr = $('#form').serialize();

    // brandId=&statu=&proName=%E6%9E%9C%E6%9E%9C&proDesc=1111&num=111&size=11-11&oldPrice=11&price=11&picStatus=
    //拼接图片名称和地址
    paramStr += "$picName1="+picArr[0].picName+"&picAddr1="+picArr[0].picAddr ;
    paramStr += "$picName2="+picArr[1].picName+"&picAddr2="+picArr[1].picAddr ;
    paramStr += "$picName3="+picArr[2].picName+"&picAddr3="+picArr[2].picAddr ;
    // console.log(paramStr);
    //发送请求
    $.ajax({
      type:'post',
      url:'/product/addProduct',
      data:paramStr,
      dataType:'json',
      success:function(info){
        // console.log(info);
        if(info.success){
          //关闭模态框
          $("#productModal").modal('hide');
          // 显示第一页
          currentpage = 1;
          render();
          //重置表单信息和状态
          $('#form').data('bootstrapValidator').resetForm(true);
          //渲染第一页
          currentpage = 1;
          render();
          //重置下拉框
          $('.dropD').text('请选择二级分类');
          //重置图片
          $('.imgbox img').remove();
        }
      }
    })
  })
})