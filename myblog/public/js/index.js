$(function(){
    Login = $("#right").find(".login");
    Register = $("#right").find(".register");
    //登录注册互换
    Login.find("#btn_1").on("click",function(){
        Login.hide();
        Register.show();
    });
    Register.find("#btn_2").on("click",function(){
        Login.show();
        Register.hide();
    });
// 导航栏的js
$("#right_1").find(".login").hover(function(){
  $(this).css("background","rgba(0, 0, 0, 0.3)");
  $("#person").show();
},function(){
  $(this).css("background","rgba(0, 0, 0, 0)");
  $("#person").hide();
})
$("#person").find("a").hover(function(){
  $(this).css("background","#fc84fc");
},function(){
  $(this).css("background","rgba(0, 0, 0, 0.3)");
})

//拖动滑块
var oBlock = Register.find(".registerBox").find(".move").find(".slider");
var node = oBlock.find(".block");
drag(node,oBlock);
// node1.find(".wrap").html("验证成功")
    //注册
    Register.find("#submitRegister").on("click", function(){
        //点击注册按钮，通过ajax提交请求
        $.ajax({
            type: "POST",
            url: "/api/user/register",
            data: {
                username: Register.find("[name=username]").val(),
                password: Register.find("[name=password]").val(),
                repassword: Register.find("[name=repassword]").val(),
                //验证滑块
                check: oBlock.find(".wrap").html()
            },
            dataType: "json",
            success: function(res){
                console.log(res);
                Register.find(".textMessage").html(res.message);
                //注册成功
                if(!res.code){
                    setTimeout(function(){
                        Register.hide();
                        Login.show();
                    },1000);
                }
            },
            error: function(err){
                console.log("请求错误:" + err);
            }
        })
    })

    //登录
    Login.find("#submitLogin").on("click", function(){
        //通过ajax提交请求
        $.ajax({
            type: "post",
            url: "/api/user/login",
            data: {
                username: Login.find("[name=username]").val(),
                password: Login.find("[name=password]").val()
            },
            dataType: "json",
            success: function(res){
                console.log(res);
                //提示信息
                Login.find(".loginBox").find(".register_1").find(".textMessage").html(res.message);
                if(!res.code){
                    //登录成功
                    setTimeout(function(){
                        location.reload();
                        // history.go(0);
                    }, 1000);
                }
            },
            error: function(err){
                console.log("请求错误:" + err);
            }
        })
    })
    //点击退出
    $("#loginOut").on("click", function(){
        $.ajax({
            url: "/api/user/logout",
            success: function(res){
                if(!res.code){
                    //重载页面
                    location.reload();
                    // history.go(0);
                }
            },
            error: function(err){
                console.log("退出失败:" + err);
            }
        })
    })
    $("#loginout").on("click", function(){
        $.ajax({
            url: "/api/user/logout",
            success: function(res){
                if(!res.code){
                    //重载页面
                    location.reload();
                    // history.go(0);
                }
            },
            error: function(err){
                console.log("退出失败:" + err);
            }
        })
    })
//滑块拖动
//封装函数
      function drag(node,node1){
          var offsetX = 0;
          node.mousedown(function(ev){
              offsetX = ev.pageX - $(this).position().left;
              $(document).mousemove(function(ev){
                  var X = ev.pageX - offsetX;
                  if(X < 0){
                      X = 0;
                  }else if(X > 288){
                      X = 288;
                  }
                  node.css({
                      left: X +"px",
                  })
                  node1.find(".bottom").css("width",X+"px");
                  if(X > 200 && X < 230){
                      node1.find(".wrap").css({
                          "background":"none",
                          "color":"#fff"
                      });
                      node1.find(".wrap").html("验证成功")

                      node.css({
                          left: 288,
                      })
                      node1.find(".bottom").css("width","288px");
                      node1.find(".block").css("background",`"#fff url("../images/pic/block_2.png") center center no-repeat"`);
                      $(document).off();
                  }
              })
              $(document).mouseup(function(){
                  $(document).off();
              })
          })
      }

})
