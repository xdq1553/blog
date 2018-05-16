$(function(){

  var mycontent = $(".bgimg").find(".personContent").find(".personShow").find(".content");
  var mycollect = $(".bgimg").find(".personContent").find(".personShow").find(".content_1");
  $("#myblog").on("click",function(){
    $(this).css("background","#cdc9c9");
    mycontent.css("display","block");
    mycollect.css("display","none");
    $("#mycollect").css("background","#fff");
  })
  $("#mycollect").on("click",function(){
    $(this).css("background","#cdc9c9");
    mycontent.css("display","none");
    mycollect.css("display","block");
    $("#myblog").css("background","#fff");
  })
})
