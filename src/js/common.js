var config={
    // url:"http://www.yinian.com:8080/Admin/"
    url:"http://106.15.229.159:9001/Admin/"
}
$(function(){
    $(".header .sq").click(function(){
        if($(".header .nav").css("display") == "none"){
            $(".header .nav").css("display","inline-block")
        }else{
            if($(window).width() <= 800){
                if($(".header .nav").css("height") =="0px" || $(".header .nav").css("height") ==0){
                    $(".header .nav").css("height","12rem")
                }else{
                    $(".header .nav").css("height",0)
                    $(".header li.cp").removeClass("open")
                }
            }else{
                $(".header .nav").css("display","none")
            }
            
        }
    })
    if(/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)) {
        $(".header li.cp").click(function(){
            $(".header .nav").css("height","auto")
            if($(this).hasClass("open")){
                $(this).removeClass("open")
                $(this).find(".child_nav").css("height",0)
            }else{
                $(this).addClass("open")
            }
        })
    }   
    
})

//获取url参数
function GetRequest(url){  
	var url = url ;//获取url中"?"符后的字串  
	var theRequest = new Object();  
	if (url.indexOf("?") != -1) {  
	   var str = url.substr(1);  
	   strs = str.split("&");  
	   for(var i = 0; i < strs.length; i ++) {  
		  theRequest[strs[i].split("=")[0]]=decodeURI(strs[i].split("=")[1]);  
	   }  
	}  
	return theRequest;  
 }  