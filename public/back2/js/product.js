$(function(){
  var currentPage = 1;
  var pageSize = 2;
  var picArr = [];//存储图片数据
  //1.页面渲染
  render();
  function render(){
    $.ajax({
      type:'get',
      url:'/product/queryProductDetailList',
      data:{
        page:currentPage,
        pageSize:pageSize
      },
      dataType:'json',
      success:function(info){
        // console.log(info);
        var htmlStr = template('firstTpl',info);
        $('.lt-main tbody').html(htmlStr);
        $('#paginator').bootstrapPaginator({
          bootstrapMajorVersion:3,
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

  //2.点击添加按钮,显示模态框
  $('.btnAdd').click(function(){
    $('#secondModal').modal('show');
    //发送请求进行下拉框的页面渲染
    $.ajax({
      type:'get',
      url:'/category/querySecondCategoryPaging',
      data:{
        page:1,
        pageSize:100
      },
      dataType:'json',
      success:function(info){
        // console.log(info);
        var  htmlStr = template('secondTpl',info);
        $('.dropdown-menu').html(htmlStr);
      }
    })
  })
  //3.给下拉框赋值
  $('.dropdown-menu').on('click','a',function(){
    var txt = $(this).text();
    $('.secondCate').text(txt);
    var id = $(this).data('id');
    $('[name="brandId"]').val(id);
    //重置表单校验状态
    $('#form').data('bootstrapValidator').updateStatus('brandId','VALID');
  })
  //4.多文件上传
  $('#upload').fileupload({
    dataType:'json',
    done:function(e,data){
      // console.log(data.result)
      //在网页中动态添加三张图片
      $('.imgbox').prepend('<img src="'+  data.result.picAddr  +'" width="100px">');
      //将图片地址存到数组中
      picArr.unshift(data.result);
      //如果数组的长度大于3,则让最后一张图片移除,数组的最后一项移除
      if (picArr.length > 3){
        $('.imgbox img').eq(-1).remove();
        picArr.pop();
      }
      // console.log(picArr);
      // 如果数组的长度等于3,手动校验状态
      if(picArr.length === 3){
        $('#form').data('bootstrapValidator').updateStatus('picstatus','VALID');
      }else{
        $('#form').data('bootstrapValidator').updateStatus('picstatus','INVALID');
      }
    }
  })
  //5.配置表单校验
  $("#form").bootstrapValidator({
    //全部校验
    excluded:[],
    //配置图标
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',//校验成功
      invalid: 'glyphicon glyphicon-remove',//校验失败
      validating: 'glyphicon glyphicon-refresh'//校验中
    },
    //配置字段
    fields:{
      brandId:{
        validators:{
          notEmpty:{
            message:'请选择二级分类'
          }
        }
      },
      proName:{
        validators:{
          notEmpty:{
            message:'请选择商品名称'
          }
        }
      },
      proDesc:{
        validators:{
          notEmpty:{
            message:'请选择商品描述'
          }
        }
      },
      //库存:非0数字开头
      num:{
        validators:{
          notEmpty:{
            message:'请选择商品库存'
          },
          regexp:{
            regexp:/^[1-9]\d*$/,
            message:'商品库存格式为非0数字开头'
          }
        }
      },
      size:{
        validators:{
          notEmpty:{
            message:'请选择商品尺码'
          }
        },
        regexp:{
          regexp:/^\d{2}-\d{2}$/,
          message:'商品尺码格式为xx-xx,例如30-40'
        }
      },
      
      oldPrice:{
        validators:{
          notEmpty:{
            message:'请选择商品原价'
          }
        }
      },
      
      price:{
        validators:{
          notEmpty:{
            message:'请选择商品现价'
          }
        }
      },
      picstatus:{
        validators:{
          notEmpty:{
            message:'请上传3张照片'
          }
        }
      }
    }
  })
  //6.表单校验完成,阻止默认提交发送请求
  // $('#form').on('success.form.bv',function(e){
  //   e.preventDefault();
  $('#form').on('success.form.bv',function(e){
    e.preventDefault();
    //发送请求
    var str = $('#form').serialize();
    str += "&picName1="+picArr[0].picName+"&picAddr1"+picArr[0].picAddr;
    str += "&picName2="+picArr[1].picName+"&picAddr2"+picArr[1].picAddr;
    str += "&picName3="+picArr[2].picName+"&picAddr3"+picArr[2].picAddr;
    // console.log(str);
    $.ajax({
      type:'post',
      url:'/product/addProduct',
      data:str,
      dataType:'json',
      success:function(info){
        // console.log(info);
        // 关闭模态框
        $('#secondModal').modal('hide');
        //重新渲染页面
        currentPage = 1;
        render()
        //重置下拉框和图片
        $(".secondCate").text('请选择二级分类');
        $(".imgbox img").remove();
        //重置表单状态
        $('#form').data('bootstrapValidator').resetForm(true);
      }
    })
  })


})