$(function () {
  var currentpage = 1;
  var pagesize = 5;
  var picArr = [];//用于存储图片数据

  //1.一进入页面,发送请求,利用模板引擎进行页面渲染
  render();
  function render() {
    $.ajax({
      type: 'get',
      url: '/product/queryProductDetailList',
      data: {
        page: currentpage,
        pageSize: pagesize,
      },
      dataType: 'json',
      success: function (info) {
        // console.log(info);
        var htmlStr = template('tpl', info);
        $('.lt-content tbody').html(htmlStr);
        //分页初始化
        $('#paginator').bootstrapPaginator({
          //配置版本
          bootstrapMajorVersion: 3,
          totalPages: Math.ceil(info.total / info.size),
          currentPage: info.page,
          //配置分页页码尺寸
          size: 'normal',
          //配置按钮文本
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
          //利用bootstrap组件
          useBootstrapTooltip: true,
          onPageClicked: function (a, b, c, page) {
            currentpage = page;
            render();
          }
        })
      }
    })
  }
  //2.点击添加商品,显示模态框
  $('.addBtn').click(function () {
    $('#productModal').modal('show');
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
  //3.点击下拉框的a,将a的文本赋值给下拉框
  $('.dropdown-menu').on('click', 'a', function () {
    var txt = $(this).text();
    $('.selectFirst').text(txt);
    //获取id,将值赋值给隐藏域
    var id = $(this).data('id');
    $('[name="brandId"]').val(id);
    //重置表单的校验内容和状态
    $('#form').data('bootstrapValidator').updateStatus('brandId', 'VALID');
  })
  //4.多文件上传,利用插件
  $('#updatefile').fileupload({
    dataType: 'json',
    done: function (e, data) {
      // console.log(data.result);
      //图片的路径
      var imgUrl = data.result.picAddr;
      //动态将图片放到盒子中(从前面开始放)
      $('.img-box').prepend(' <img src="' + imgUrl + '" width="100px">');
      //将图片路径放到数组中(unshift)
      picArr.unshift(data.result);
      // console.log(picArr);
      // 如果数组的长度,大于3,则删除最后一项,及最后一张图片
      if (picArr.length > 3) {
        picArr.pop();
        $('.img-box img:last-of-type').remove();
      }
      // 如果数组长度等于3,手动重置校验状态
      if (picArr.length === 3) {
        $('#form').data('bootstrapValidator').updateStatus('picStatu','VALID');
      }else{
        $('#form').data('bootstrapValidator').updateStatus('picStatu','INVALID');
      }
    }
  })
  //5.进行表单校验
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
      //二级分类
      brandId: {
        validators: {
          notEmpty: {
            message: '请选择二级分类'
          }
        }
      },
      //商品名称
      proName: {
        validators: {
          notEmpty: {
            message: '请输入商品名称'
          }
        }
      },
      //商品描述
      proDesc:{
        validators: {
          notEmpty: {
            message: '请输入商品描述'
          }
        }
      },
      //商品库存 非空+非0数字开头
      num:{
        validators:{
          notEmpty:{
            message:'请输入商品库存'
          },
          regexp:{
            regexp:/^[1-9]\d*$/,
            message:'商品库存必须是以非0开头的数字格式'
          }
        }
      },
      //商品尺码 非空+xx-xx格式
      size:{
        validators:{
          notEmpty:{
            message:'请输入商品尺码'
          },
          regexp:{
            regexp:/^\d{2}-\d{2}$/,
            message:'商品尺寸格式为xx-xx,例如32-40'
          }
        }
      },
      //商品原价
      oldPrice:{
        validators:{
          notEmpty:{
            message:'请输入商品原价'
          }
        }
      },
      //商品现价
      price:{
        validators:{
          notEmpty:{
            message:'请输入商品现价'
          }
        }
      },
      //图片
      picStatu:{
        validators:{
          notEmpty:{
            message:'请选择三张图片'
          }
        }
      }
    }
  })
  //6.表单校验完成,阻止表单的默认行为,发送请求,进行页面渲染
  $('#form').on('success.form.bv',function(e){
    e.preventDefault();
    // console.log('表单默认提交的功能被阻止了');
    //表单数据brandId=7&statu=&proName=qq&proDesc=qqq&num=11&size=22-22&oldPrice=11&price=11&picStatu=
    var paramStr = $('#form').serialize();
    
    //图片数据
    paramStr += "&picName1="+picArr[0].picName+"&picAddr1="+picArr[0].picAddr;
    paramStr += "&picName2="+picArr[1].picName+"&picAddr2="+picArr[1].picAddr;
    paramStr += "&picName3="+picArr[2].picName+"&picAddr3="+picArr[2].picAddr;
    console.log(paramStr);
    $.ajax({
      type:'post',
      url:'/product/addProduct',
      data:paramStr,
      dataType:'json',
      success:function(info){
        // console.log(info);
        if(info.success){
          //关闭模态框
          $('#productModal').modal('hide');
          //重置表单状态
          $('#form').data('bootstrapValidator').resetForm(true);
          //重置下拉框
          $('.selectFirst').text('请选择二级分类');
          //重置图片
          $('.img-box img').remove();
        }
      }
    })

  })






})