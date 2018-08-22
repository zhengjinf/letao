$(function(){
  //1.获取地址栏中的参数,赋值给input框
  var key = getSearch('key');
  // console.log(key);
  $('.lt-search .search-input').val(key);
  render();

  //2.点击搜索按钮,进行页面渲染
  $('.searchBtn').click(function(){
    // 获取搜索关键字
    var key =  $('.lt-search .search-input').val().trim();
    if(key === ''){
      //mui消息框
      mui.toast('请输入搜索关键字');
      return;
    }
    // 读取本地数据库的数据
    var jsonStr = localStorage.getItem('search_list')||'[]';
    //转成数组
    var arr = JSON.parse(jsonStr);
    //判断是否重复,并且数组长度不能大于10;
    var index = arr.indexOf(key);
    if(index != -1){
      //有重复项
      arr.splice(index,1);
    }
    if(arr.length >=10){
      //删除最后一项
      arr.pop();
    }
    // 将key赋值到数组的最前面
    arr.unshift(key);
    //存入本地历史中
    localStorage.setItem('search_list',JSON.stringify(arr));
    render();
  })

  //3.添加排序功能
  //1.判断是否有current类,有current类,切换箭头即可
  //2.如果没有current类,给自己添加current类,其他移除current类
  $('.lt-sort a[data-type]').click(function(){
    if($(this).hasClass('current')){
      //切换i的类名即可
      $(this).find('i').toggleClass('fa-angle-down').toggleClass('fa-angle-up')
    }else{
      //添加current类,移除其他current
      $(this).addClass('current').siblings().removeClass('current');
    }
    // 重新渲染页面
    render();
  })

  //封装render函数,调用方法实现页面渲染
  function render(){
    $('.lt-product').html(' <div class="loading"></div>');
    //获取input框的数据
    var str = {};
    // 发送请求必传的三个参数
    str.proName =$('.lt-search .search-input').val();
    str.page = 1;
    str.pageSize = 100;

    //两个可选的参数num price 1升序 2 降序
    //判断有没有高亮的元素,决定是否升序,根据箭头的类名控制升序还是降序
    var $current = $('.lt-sort a.current');
    // console.log($current);
    //如果有current类,即长度大于0;
    if($current.length > 0){
      //当前有current类
      var strName = $current.data('type');
      // console.log(strName)
      var strValue = $current.find('i').hasClass('fa-angle-down')?2:1;
      // console.log(strValue)
      str[strName] = strValue;
    }
    // console.log(str)
    //模拟网络延迟
    setTimeout(function(){
      $.ajax({
        type:'get',
        url:'/product/queryProduct',
        data:str,
        dataType:'json',
        success:function(info){
          // console.log(info);
          var htmlStr = template('productTpl',info);
          $('.lt-product').html(htmlStr);
        }
      })
    },500)
  }
})