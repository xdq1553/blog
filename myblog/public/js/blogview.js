$(function(){
  var Good = $("#fixed").find("#good_btn");
  var comment = $("#fixed").find("#comment_btn");
  var save = $("#fixed").find("#save_btn");
  var GoodTotal = $("#leftBlog").find(".usermessage").find("ul").find("li").find(".good_total");
  var CollectTotal = $("#leftBlog").find(".usermessage").find("ul").find("li").find(".collect_total");
  var oContent = window.location.search.split("contentid=")[1];
  var oContentid = oContent.split("&")[0];
  // alert(oContentid);
  Good.one("click",function(){
    // 把点赞的数据传过去
    $.ajax({
      type:"post",
      url:"/api/usercontent/good",
      data:{
        goodNum: GoodTotal.html(),
        contentid: oContentid
      },
      success:function(res){
        //点赞的实现
        Good.attr("class","iconfont icon-dianzan");
        $("#fixed").find(".li_good").find(".good_num").html(res.data.good);
      },
      error:function(error){
        alert("点赞无效"+error);
      }
    })
  })
// 点击评论
comment.on("click",function(){
  $("#rightBlog").find(".comText").find(".comWord").find(".comWord_h").css("display","block");
  $(this).attr("class","iconfont icon-pinglun1");
})
  //评论提交按钮
  $("#messageBtn").click(function(){

      $.ajax({
          type: "post",
          url: "/api/comment/post",
          data: {
              //文章id
              contentid: $("#contentid").val(),
              //评论内容
              content: $("#messageContent").val()
          },
          success: function(resData){
              console.log(resData);
              if(!resData.code){
                  $("#messageContent").val("");
                  //通过传输过来的数据，加载评论
                    $("#rightBlog").find(".comText").find(".comWord").find(".comWord_h").css("display","none");
                    comment.attr("class","iconfont icon-pinglun");
                  reanderComment(resData.data.comments);
              }
          },
          error: function(err){
              alert("err");
          }
      })
  })
  function reanderComment(comments){
      var html = "";
      comments.reverse(); //逆序
      for(var i = 0; i < comments.length; i++){
          html += `<div class="messageBox">
              <p class="name clear">
                  <span class="fl">${comments[i].username}：</span>
                  <span class="fr">${comments[i].content}</span>
              </p>
              <p class= "text_c"><span class="ft">${comments[i].postTime}</span></p>
          </div>`
      }
      $(".messageList").html(html);
  }

  //点击收藏
  save.on("click",function(){
    $(this).attr("class","iconfont icon-shoucang");

    $.ajax({
      type:"post",
      url:"/api/usercontent/collect",
      data:{
        collectNum: CollectTotal.html(),
        contentid: oContentid
      },
      success: function(data){
        setTimeout(function(){
          alert("收藏成功");
        },500)
      },
      error:function(err){
        alert("发生未知错误"+err);
      }
    })
  })

})
