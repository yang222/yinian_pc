var config={
    // url:"http://www.yinian.com/Admin/",
    url:"http://api.neu-flex.com/Admin/"
}
if ((navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i))) {
    /*window.location.href="你的手机版地址";*/
    if(/index.html/.test(window.location.href)){
        window.location.href="./mobile.html"
    }
    if(/psyche.html/.test(window.location.href)){
        window.location.href="./mp.html"
    }
}
else {
    /*window.location.href="你的电脑版地址";    */
    if(/mobile.html/.test(window.location.href)){
        window.location.href="./index.html"
    }
    if(/mp.html/.test(window.location.href)){
        window.location.href="./psyche.html"
    }
}


function toURL(){
    if(/CN/.test(window.location.href)){
        window.location.href =  window.location.href.replace(/CN/g,"EN")
    }
    if(/EN/.test(window.location.href)){
        window.location.href =  window.location.href.replace(/EN/g,"CN")
    }
}

$(function(){
    $(".header .sq").click(function(){
        if($(".header .nav").css("display") == "none"){
            $(".header .nav").css("display","inline-block")
        }else{
            if($(window).width() <= 1150){
                if($(".header .nav").css("height") =="0px" || $(".header .nav").css("height") ==0){
                    $(".header .nav").css("height","13rem")
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