$(function () {
  //1.动态渲染搜索记录
  //从本地读取历史数据,转成数组,,利用模板引擎进行渲染
  // var arr = ['阿迪','匡威','aaaa'];
  // var jsonStr = JSON.stringify(arr);
  // localStorage.setItem('search_list',jsonStr);

  //  var history = localStorage.getItem('search_list');//得到json字符串
  //  //将json字符串转成数组
  //  var arr = JSON.parse(history);
  // //  console.log(arr);
  // //利用模板引擎进行渲染
  // var htmlStr = template('tpl',{arr:arr});
  // $('.lt-content').html(htmlStr);

  render();
  //获取本地数据
  function getHistory() {
    var history = localStorage.getItem('search_list') || '[]';//得到json字符串
    //  //将json字符串转成数组
    var arr = JSON.parse(history);
    return arr;
  }
  //渲染页面
  function render() {
    var arr = getHistory();
    var htmlStr = template('tpl', { arr: arr });
    $('.lt-content').html(htmlStr);
  }

  //2.点击清空记录,读取数据,删除所有,重新渲染
  $('.lt-content').on('click', '.btn-empty', function () {
    //添加mui确认框
    mui.confirm('您确定删除全部记录吗?', '温馨提示', ['取消', '确认'], function (e) {
      if (e.index === 1) {
        //读取本地数据
        getHistory();
        //清空数据
        localStorage.removeItem('search_list');
        render();
      }
    })
  })
  //3.点击删除功能,删除单项 splice(从哪开始,删除几项,添加的项1,项2)
  // 注册事件委托,获取对应的下标,从本地读取数据,删除对应的项,转换成json字符串,存入本地数据,重新渲染
  $('.lt-content').on('click', '.btn-del', function () {
    var that = this;//将this指向存在that中
    //添加确认框
    mui.confirm('您确定要删除这条记录吗', '温馨提示', ['取消', '确认'], function (e) {
      if (e.index === 1) {
        var index = $(that).data('index');
        // console.log(index)
        var arr = getHistory();
        // console.log(arr)
        arr.splice(index, 1);
        var jsonStr = JSON.stringify(arr);
        localStorage.setItem('search_list', jsonStr);
        render();
      }
    })
  })
  //4.点击搜索按钮,给按钮注册点击事件,获取input的值,将值放在数组中的最前面
  $('.searchBtn').click(function () {
    var txt = $('.search-input').val().trim();
    // console.log(txt);

    //如果input框未赋值,则提示用户
    if (txt === '') {
      // alert("请输入搜索关键字");
      mui.toast('请输入搜索关键字')
      return;
    }
    //获取本地数据
    var arr = getHistory();
    //1.如果搜索重复,则删除之前的数据,将本条数据写在最前面
      var index = arr.indexOf(txt);
      // console.log(index);
      if(index != -1){
        arr.splice(index,1);
      }
      //2.数组长度不能大于10;
      if(arr.length >= 10){
          arr.pop();
      }
      //将文本放到数组的最前面
      arr.unshift(txt);
    // console.log(arr);
    //转成json字符串,存到本地历史中
    localStorage.setItem('search_list', JSON.stringify(arr));
    // 重新渲染页面
    render();
    //清空搜索框的值
    $('.search-input').val('');
    //跳转到产品列表页
    location.href="searchList.html?key="+txt;
  })

})