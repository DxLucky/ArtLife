var clickNum=1;
var state=1;
function showSearch(){
    if(clickNum%2==1){
        document.getElementById("navSearchWrap").style.opacity="1";
        document.getElementById("navSearch").style.opacity="1";
        document.getElementById("navSearch").style.width="120px";
        document.getElementById("navSearch").style.transition="all 0.3s linear";
    }
    if(document.getElementById("navSearch").value.trim()!=""){
        window.location.href="search.do?keyWord="+document.getElementById("navSearch").value.trim()+"";
        document.getElementById("navSearch").value="";
    }else{
        state=0;
    }
    if(state==0&&clickNum%2==0){
        document.getElementById("navSearchWrap").style.opacity="0";
        document.getElementById("navSearch").style.opacity="0";
        document.getElementById("navSearch").style.width="80px";
        document.getElementById("navSearchWrap").style.transition="all 0.3s linear";
        document.getElementById("navSearch").style.transition="all 0.3s linear";
        state=1;
    }
    clickNum++;
}
//查看详情
function proDetail(obj){
    var id=obj.getElementsByTagName("img")[0].src.split("images/")[1].split(".")[0];
    window.location.href="/showDetail.do?id="+id+"";
}