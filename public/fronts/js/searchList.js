$(function () {
  //1.将地址栏的参数赋值到input中,动态渲染产品
  var txt = getSearch('key');
  // console.log(txt)
  // 赋值到input
  $('.input-search').val(txt);
  render();

  //2.点击搜索按钮,获取input值,渲染页面,判断是否为空,获取本地数据,将值赋值到本地中,重新渲染页面
  $('.searchBtn').click(function () {
    var txt = $('.input-search').val().trim();
    if (txt === '') {
      //显示提示信息
      mui.toast('请输入搜索关键字');
      return;
    }
    //读取本地历史数据
    var history = localStorage.getItem('search_list');
    var arr = JSON.parse(history);
    //获取input在数组中是否存在,indexOf=-1:不存在
    var index = arr.indexOf(txt);
    if (index != -1) {
      //已经存在
      // 删除所在的下标
      arr.splice(index, 1);
    }
    //如果数组长度大于10,删除数组的最后一项
    if (arr.length >= 10) {
      arr.pop();
    }
    arr.unshift(txt);
    // 转成json字符串,写入本地历史,重新渲染
    localStorage.setItem('search_list', JSON.stringify(arr));
    //重新渲染页面
    render();

  })


  // 3.排序功能,找到是否有current类,current类,切换箭头的类名即可
  // 没有current类,则当前加current,其他兄弟移除current
  $('.lt-sort a[data-type]').click(function () {
    if ($(this).hasClass('current')) {
      //切换箭头的类名
      $(this).find('span').toggleClass('fa-angle-down').toggleClass('fa-angle-up');
    } else {
      //当前的加current类,其他移除
      $(this).addClass('current').siblings().removeClass('current');
    }
    //重新渲染页面
    render();

  })







  function render() {
    $('.lt-product').html('<div class="load"></div>');
    var obj = {};
    //必传参数
    obj.proName = $('.input-search').val();
    obj.page = 1;
    obj.pageSize = 100;
    //可选参数
    // 判断有没有current类,决定是否传num 和price
    if ($('.lt-sort a.current').length > 0) {
      //有current类,则需要传num和price
      var sizeName = $('.lt-sort a.current').data('type');
      // console.log(sizeName)
      var sizeValue = $('.lt-sort a.current').find('span').hasClass('fa fa-angle-down') ? 2 : 1;
      // console.log(sizeValue)
      obj[sizeName] = sizeValue;
    }
    setTimeout(function () {
      $.ajax({
        type: 'get',
        url: '/product/queryProduct',
        data: obj,
        dataType: 'json',
        success: function (info) {
          // console.log(info);
          var htmlStr = template('tpl', info);
          $('.lt-product').html(htmlStr)
        }
      })
    }, 500)
  }
})