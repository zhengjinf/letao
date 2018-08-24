$(function () {

  var currentPage = 1;
  var pageSize = 2;
  function render(callback) {
    // $('.lt-product').html('<div class="load"></div>');
    var obj = {};
    //必传参数
    obj.proName = $('.input-search').val();
    obj.page = currentPage;
    obj.pageSize = pageSize;
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
          callback && callback(info);
        }
      })
    }, 500)
  }

  //1.将地址栏的参数赋值到input中,动态渲染产品
  var txt = getSearch('key');
  // console.log(txt)
  // 赋值到input
  $('.input-search').val(txt);
  //添加下拉刷新
  mui.init({
    pullRefresh: {
      container: ".mui-scroll-wrapper",//下拉刷新容器标识，querySelector能定位的css选择器均可，比如：id、.class等
      down: {
        auto: true,//可选,默认false.首次加载自动下拉刷新一次
        callback: function () {
          currentPage = 1;
          render(function (info) {
            // console.log(info);
            var htmlStr = template('tpl', info);
            $('.lt-product').html(htmlStr);
            //ajax数据回来后,手动关闭下拉刷新
            // console.log(mui('.mui-scroll-wrapper').pullRefresh()).endPulldownToRefresh;
            mui('.mui-scroll-wrapper').pullRefresh().endPulldownToRefresh();

            // 手动开启上拉加载(上拉加载结束之后,默认禁止了上拉加载,需重置上拉加载)
            mui(".mui-scroll-wrapper").pullRefresh().refresh(true)

          });
        } //必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；
      },
      //配置上拉加载
      up: {
        callback: function () {
          // console.log('执行了上拉加载')
          currentPage++;
          render(function (info) {
            // console.log(info);
            var htmlStr = template('tpl', info);
            $('.lt-product').append(htmlStr);
            //ajax数据回来后,手动关闭上拉加载
            // console.log(mui('.mui-scroll-wrapper').pullRefresh())
            // 判断是否还有数据,若没有数据,则手动关闭上拉加载
            if (info.data.length === 0) {
              //没有更多数据了  true:没有更多数据
              mui('.mui-scroll-wrapper').pullRefresh().endPullupToRefresh(true);
            }else{
              //还有数据,是默认值
              mui('.mui-scroll-wrapper').pullRefresh().endPullupToRefresh(false);
            }
          });
        }
      }
    }
  });


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
    // render();
    // 重新调用一次下拉刷新即可
    mui('.mui-scroll-wrapper').pullRefresh().pulldownLoading();
  })


  // 3.排序功能,找到是否有current类,current类,切换箭头的类名即可
  // 没有current类,则当前加current,其他兄弟移除current
  //mui中认为在上拉刷新,下拉加载中click事件会有300ms的延迟,需要注册tap事件
  // $('.lt-sort a[data-type]').click(function () {
    $('.lt-sort a[data-type]').on('tap',function(){
    if ($(this).hasClass('current')) {
      //切换箭头的类名
      $(this).find('span').toggleClass('fa-angle-down').toggleClass('fa-angle-up');
    } else {
      //当前的加current类,其他移除
      $(this).addClass('current').siblings().removeClass('current');
    }
    //重新渲染页面
    // render();
      // 重新调用一次下拉刷新即可
      mui('.mui-scroll-wrapper').pullRefresh().pulldownLoading();
  })

  // 4.给产品注册点击事件(事件委托),跳转到产品列表页
  $('.lt-product').on('tap','a',function(){
    var id = $(this).data('id');
    // console.log(id);
    location.href = "product.html?productId=" +id;
  })

})