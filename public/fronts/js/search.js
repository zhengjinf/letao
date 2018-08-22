$(function () {
  //1.搜索历史的页面渲染,利用localStorage获取本地记录,根据本地的记录,渲染页面
  // var arr =['阿迪','匡威','aaa'];
  // //转成json字符串,写入本地历史
  // var jsonStr = JSON.stringify(arr);
  // //写入本地历史
  // localStorage.setItem('search_list',jsonStr);

  // 读取本地历史数据,转成数组,进行渲染
  render();
  function getHistory() {
    var history = localStorage.getItem('search_list') || '[]';
    var arr = JSON.parse(history);
    // console.log(arr);
    return arr;
  }
  function render(){
    var arr = getHistory();
    var htmlStr = template('tpl', { arr: arr });
    $('.lt-content').html(htmlStr);
  }

  //2.点击清空按钮,清除所有的历史记录,读取数据,删除记录,写入本地历史,动重新渲染页面
  $('.lt-content').on('click','.btn-empty',function(){
    // 显示确认框
    mui.confirm('您确定删除全部记录吗?', '温馨提示', ['取消', '确认'], function (e) {
      if(e.index === 1){
        //读取数据
        getHistory();
        localStorage.removeItem('search_list');
        //重新渲染页面
        render();
      }
    })
  })

  //3.给删除按钮注册点击事件
  $('.lt-content').on('click','.btn-del',function(){
    var index = $(this).data('index');
    // console.log(index);
    //显示确认框
    mui.confirm('您确定要删除所有记录吗?','温馨提示',['取消','确认'],function(e){
      if(e.index === 1){
        //获取本地历史
        var arr = getHistory();
        //删除对应的项
        arr.splice(index,1);
        //转成jsonStr 存入本地历史
        localStorage.setItem('search_list',JSON.stringify(arr));
        render();
      }
    })
  })

  //4.给搜索按钮注册点击事件,获取input框的值,获取本地历史数据,将input的值写入本地历史记录的最前面,存入本地,重新渲染
     //要求:不能重复(重复,删除之前的indexOf,将当前的写在最前面)
     //     长度不能大于10
     $('.searchBtn').click(function(){
       //获取input的值
       var txt = $('.input-search').val().trim();
       //如果文本内容为空,提示用户
       if (txt === ''){
         mui.toast('请输入搜索关键字');
         return;
       }
       //获取本地历史记录
       var arr = getHistory();
       //不能重复
       if(arr.indexOf(txt) != -1){
         //有重复
         arr.splice(arr.indexOf(txt),1)
       }
       if(arr.length >= 10){
         //删除最后一项
         arr.pop()
       }
       //将input的值写入到最前面
       arr.unshift(txt);
       localStorage.setItem('search_list',JSON.stringify(arr));
       render();
      //  清空input框
      $('.input-search').val('');
      //跳转到搜索详情页
      location.href="searchList.html?key="+txt;
     })






})