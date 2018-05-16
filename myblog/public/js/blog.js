$(function(){
    //限制字符个数，出现省略号
    var maxwidth=50;
    var Left = $(".text").find(".text_p").find(".left").find(".listBox");
        Left.find(".txt").find(".detailTxt").each(function(){
            if($(this).text().length > maxwidth){
                $(this).text($(this).text().substring(0,maxwidth));
                $(this).html($(this).html()+'...');
          }
        });


    // 右边图片轮播
    var pic = $("#picChange").find("img");
    var timer = setInterval(timerInter,3000);
    var count = 0;
    pic.hover(function(){
        clearInterval(timer);
    },function(){
        timer = setInterval(timerInter,3000);
    })
    function timerInter(){
        count++;
        move(count);
    }
    function move(index){
        for(var i = 0;i < pic.length;i++){
            pic.eq(i).attr("class","");
            pic.eq(i).css({
                "zIndex":"1",
                "opacity":.2
        });
        }
        pic.eq(index % 4).attr("class","active");
        pic.eq(index % 4).css({
            "zIndex":"11",
            "opacity":1
        });
    }


    //发帖栏
    var Send = $(".text").find(".text_p").find(".right").find(".send");
    Send.on("click",function(){
        $(".text").find(".text_p").find(".sendStory").show();
    })

    // 帖子的前后端交互
    var SendStory = $(".sendStory").find(".btn_content");
    SendStory.on("click",function(){
        var options=$("#selected option:selected");
        // alert(options.val());
        $.ajax({
            type:"post",
            url:"/api/usercontent/plus",
            data: {
                userid: $("#categoryid").attr("class"),
                categoryid:options.val(),
                title: $("#title_text").val(),
                description: $("#description_text").val(),
                content: $("#content_text").val()
            },
            dataType:"json",
            success: function(res){
                alert(res);
                $(".text").find(".text_p").find(".sendStory").find(".post_message").html(res.message);
                if(res.code){
                    setTimeout(function(){
                    $(".text").find(".text_p").find(".sendStory").hide();
                    },5000);
                    // location.reload();
                }

            },
            error: function(err){
                console.log("err");
            }
        })
    })

})
