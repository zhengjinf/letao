$(function(){
  render();
  var currentPage = 1; //标记当前页
  var pageSize = 5; //每页页数
  function render(){
    $.ajax({
      type:'get',
      url:'/user/queryUser',
      data:{
        page: currentPage,
        pageSize: pageSize
      },
      dataType:'json',
      success:function(info){
        console.log(info);
        var htmlStr = template('tpl',info);
        $('.lt-content tbody').html(htmlStr);
        //标记当前页:
        currentPage = page;
      }
   
    })
  }
})