// function CheckForm() {
// 	var stime = $("date_start").value;
// 	var etime = $("date_end").value;
// 	var g_ln  = $("g_ln").value;
// 	if((stime == "" || etime == "") && g_ln == ""){
// 		alert('請正確選擇日期區間！');
// 		return false;
// 	}
//     var diff = Date.parse(stime.replace(/-/g,"/"))- Date.parse(etime.replace(/-/g,"/"));
//     if(diff > 0){
// 		alert('日期區間的開始時間不得大於結束時間！');
// 		$("date_start").focus();
// 		return false;
//     }
// }
// function CheckType(id) {
//     if(id == 0){
// 	    $("g_lb").disabled = false;
// 		$("g_ln").disabled = false;
// 		$("action").value  = "report_admin";
// 	}else if(id == 1){
// 		$("g_lb").disabled = true;
// 		$("g_ln").disabled = false;
// 		$("action").value  = "report_class";
// 	}else{
// 	    $("g_lb").disabled = false;
// 		$("g_ln").disabled = true;
// 		$("g_ln").value    = "";
// 		$("action").value  = "report_period";
// 	}
// }
// function CheckDate() {
//     $("g_ln").value = "";
// }
// function CheckAgentReport(ut,user) {
// 	if(typeof(get_val) == 'undefined'){
// 	    return false;
// 	}
// 	str  = "main.php?action=report_agent&at="+ut+"&user="+user;
// 	str += get_val;
// 	go_main(str);
// }
// function CheckMemberReport(mt,ut,user) {
// 	if(typeof(get_val) == 'undefined'){
// 	    return false;
// 	}
// 	str = "main.php?action=report_member&mt="+mt+"&ut="+ut+"&user="+user;
// 	str += get_val;
// 	go_main(str);
// }
// function CheckGlb(g) {
// 	if(typeof(get_val) == 'undefined'){
// 	    return false;
// 	}
// 	get_val = sel_val+"&g_lb="+g;
// }
// function CheckGln(t,n,d) {
// 	if(typeof(get_val) == 'undefined'){
// 	    return false;
// 	}
// 	get_val = sel_val+"&g_ln="+n+"&period_date="+d;
// }
// /********************
//  * 取窗口滾動條高度 
//  ******************/
// function getScrollTop(){
//     var scrollTop = 0;
//     if(document.documentElement&&document.documentElement.scrollTop){
//         scrollTop = document.documentElement.scrollTop;
//     }else if(document.body){
//         scrollTop = document.body.scrollTop;
//     }
//     return scrollTop;
// }
// function open_clew(obj,caption,info,n){
// 	$("clew_caption").innerHTML = '<font class="font_b">'+caption+'</font>';
// 	$("clew_info").innerHTML    = info;
// 	$("clew_window").style.display = "block";
// 	$("clew_window").style.top  = getScrollTop()+obj.getBoundingClientRect().top+obj.offsetHeight;
// 	//$("clew_window").style.left = X-(obj.offsetWidth/2)-n;
// 	$("clew_window").style.left = obj.getBoundingClientRect().left+obj.offsetWidth-$("clew_window").offsetWidth+1-n; 

// }
// function close_clew(){
// 	$("clew_window").style.display = "none";
// }
/**
 * Created by zxm on 2017/3/31.
 */
$.fn.extend({
    "initPage":function(listCount,currentPage,fun){
        var maxshowpageitem = $(this).attr("maxshowpageitem");
        if(maxshowpageitem!=null&&maxshowpageitem>0&&maxshowpageitem!=""){
            page.maxshowpageitem = maxshowpageitem;
        }
        var pagelistcount = $(this).attr("pagelistcount");
        if(pagelistcount!=null&&pagelistcount>0&&pagelistcount!=""){
            page.pagelistcount = pagelistcount;
        }

        var pageId = $(this).attr("id");
        page.pageId=pageId;
        if(listCount<0){
            listCount = 0;
        }
        if(currentPage<=0){
            currentPage=1;
        }
        page.setPageListCount(pageId,listCount,currentPage,fun);

    }
});
var  page = {
    "maxshowpageitem":5,//最多显示的页码个数
    "pagelistcount":10,//每一页显示的内容条数
    /**
     * 初始化分页界面
     * @param listCount 列表总量
     */
    "initWithUl":function(pageId,listCount,currentPage){

        var pageCount = 1;
        if(listCount>0){
            var pageCount = listCount%page.pagelistcount>0?parseInt(listCount/page.pagelistcount)+1:parseInt(listCount/page.pagelistcount);
        }
        var appendStr = page.getPageListModel(pageCount,currentPage,listCount);
        $("#"+pageId).html(appendStr);
    },
    /**
     * 设置列表总量和当前页码
     * @param listCount 列表总量
     * @param currentPage 当前页码
     */
    "setPageListCount":function(pageId,listCount,currentPage,fun){
        listCount = parseInt(listCount);
        currentPage = parseInt(currentPage);
        page.initWithUl(pageId,listCount,currentPage);
        page.initPageEvent(pageId,listCount,fun);

    },
    "initPageEvent":function(pageId,listCount,fun){
        $("#"+pageId +">li[class='pageItem']").on("click",function(){
            if(typeof fun == "function"){
                fun($(this).attr("page-data"));
            }
            page.setPageListCount(pageId,listCount,$(this).attr("page-data"),fun);
        });
    },
    "getPageListModel":function(pageCount,currentPage,listCount){
        var prePage = currentPage-1;
        var nextPage = currentPage+1;
        var prePageClass ="pageItem";
        var nextPageClass = "pageItem";
        if(prePage<=0){
            prePageClass="pageItemDisable";
        }
        if(nextPage>pageCount){
            nextPageClass="pageItemDisable";
        }
        var appendStr ="";
        // appendStr+="<li class='' style='margin:5px;'>共"+listCount+"条记录</li>";
        appendStr+="<li class='"+prePageClass+"' page-data='1' page-rel='firstpage'>home</li>";
        appendStr+="<li class='"+prePageClass+"' page-data='"+prePage+"' page-rel='prepage'>&lt;prev</li>";
        var miniPageNumber = 1;
        if(currentPage-parseInt(page.maxshowpageitem/2)>0&&currentPage+parseInt(page.maxshowpageitem/2)<=pageCount){
            miniPageNumber = currentPage-parseInt(page.maxshowpageitem/2);
        }else if(currentPage-parseInt(page.maxshowpageitem/2)>0&&currentPage+parseInt(page.maxshowpageitem/2)>pageCount){
            miniPageNumber = pageCount-page.maxshowpageitem+1;
            if(miniPageNumber<=0){
                miniPageNumber=1;
            }
        }
        var showPageNum = parseInt(page.maxshowpageitem);
        if(pageCount<showPageNum){
            showPageNum = pageCount
        }
        for(var i=0;i<showPageNum;i++){
            var pageNumber = miniPageNumber++;
            var itemPageClass = "pageItem";
            if(pageNumber==currentPage){
                itemPageClass = "pageItemActive";
            }

            appendStr+="<li class='"+itemPageClass+"' page-data='"+pageNumber+"' page-rel='itempage'>"+pageNumber+"</li>";
        }
        appendStr+="<li class='"+nextPageClass+"' page-data='"+nextPage+"' page-rel='nextpage'>next&gt;</li>";
        appendStr+="<li class='"+nextPageClass+"' page-data='"+pageCount+"' page-rel='lastpage'>tail</li>";
       return appendStr;

    }
}