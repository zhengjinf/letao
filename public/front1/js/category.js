

$(function () {
  //1发送请求,进行左侧的页面渲染
  $.ajax({
    type: 'get',
    url: '/category/queryTopCategory',
    dataType: 'json',
    success: function (info) {
      // console.log(info);
      var htmlSter = template('leftTpl', info);
      $('.lt-left ul').html(htmlSter);
      // 渲染第一个二级分类
      render(info.rows[0].id);

    }
  })

  //点击ul下面的每个a,动态生成右边的二级分类
  $('.lt-left ul').on('click', 'a', function () {
    // 获取id
    var id = $(this).data('id');
    // console.log(id);
    //切换current类
    $(this).addClass('current').parent().siblings().find('a').removeClass('current');
    render(id);
  })

  function render(id) {
    $.ajax({
      type: 'get',
      url: '/category/querySecondCategory',
      data: {
        id: id
      },
      dataType: 'json',
      success: function (info) {
        // console.log(info);
        var htmlSter = template('rightTpl', info);
        $('.lt-right ul').html(htmlSter);
      }

    })
  }
})