

$(function(){
  //一进入页面,发送请求,进行页面渲染
  $.ajax({
    type:'get',
    url:'/category/queryTopCategory',
    dataType:'json',
    success:function(info){
      console.log(info);
      var obj = {
        list:info
      }
      var htmlStr = template('leftTpl',info);
      $('.lt-main .lt-left ul').html(htmlStr);
      //渲染二级分类的第一个
      render(info.rows[0].id);
    }
  })

  //二级分类
  // renderSecond(id);
  $('.lt-main .lt-left').on('click','a',function(){
    var id = $(this).data('id');
    // console.log(id)
    $(this).addClass('current').parent().siblings().find('a').removeClass('current');
    render(id);
   
  
  })

  function render(id){
    $.ajax({
      type:'get',
      url:'/category/querySecondCategory',
      data:{
        id:id
      },
      dataType:'json',
      success:function(info){
        console.log(info);
        var htmlStr = template('rightTpl',info);
        $('.lt-main .lt-right ul').html(htmlStr);
      }
    })
  }


})