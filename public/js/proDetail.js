var bgPic = document.getElementById("bgPic");
//    前一张
function prePic(){
    if(bgPic.style.marginLeft==""){
        bgPic.style.marginLeft="0px";
    }
    if(bgPic.style.marginLeft=="0px"){
        bgPic.style.marginLeft="0px";
    }else{
        bgPic.style.marginLeft=(parseInt(bgPic.style.marginLeft)+223)+"px";
        bgPic.style.transition="all 1s linear";
    }
}
//    后一张
function nextPic(){
    if(bgPic.style.marginLeft==""){
        bgPic.style.marginLeft="0px";
    }
    if(bgPic.style.marginLeft=="-1784px"){
        bgPic.style.marginLeft="-1784px";
        bgPic.style.transition="all 0s linear";
    }else{
        bgPic.style.marginLeft=(parseInt(bgPic.style.marginLeft)-223)+"px";
        bgPic.style.transition="all 1s linear";
    }
}
//    生活场景切换
var showArt = document.getElementById("showArt");
var bgLists = bgPic.getElementsByTagName("li");
function changeBg(num){
    showArt.style.background="url('../images/proDetail-" +
        num +
        ".jpg')no-repeat  center";
    showArt.style.backgroundSize="contain";
}
//    画框切换
var border = document.getElementById("border");
var artPic = document.getElementById("artPic");
var img=artPic.getElementsByTagName("img")[0];
function changeDefault(){
   if(border.style.backgroundImage=""){
       border.border.style.backgroundImage="none";
   }
    if(border.style.backgroundColor=""){
        border.style.backgroundColor="transparent";
    }
}
function changeBorder(No){
    border.style.backgroundImage="url('../images/proDetail-" +
        No +
        ".png')";
    border.style.backgroundSize="contain";
    border.style.backgroundColor="#EAEBE9";
    artPic.style.marginTop=Number((220-img.height)/2)+"px"

}
//    艺术品拖动
var artBox=document.getElementById("artBox");
var zhuangtai=false;
function myDrag(){
    var clickE=window.event||arguments[0];
    zhuangtai=true;
    var gensuiX=clickE.clientX-artBox.offsetLeft;
    var gensuiY=clickE.clientY-artBox.offsetTop;
    document.onmousemove=function(){
        var moveE=window.event||arguments[0];
        if(zhuangtai==true){
            artBox.style.left=moveE.clientX-gensuiX+"px";
            artBox.style.top=moveE.clientY-gensuiY+"px";
            if(parseInt(artBox.style.left)<=125){
                artBox.style.left="125px";
            }
            if(parseInt(artBox.style.left)>=1005){
                artBox.style.left="1005px";
            }
            if(parseInt(artBox.style.top)<=0){
                artBox.style.top="0px";
            }
            if(parseInt(artBox.style.top)>=(583-artBox.offsetHeight+Number(220-img.height))){
                var toTop = 583-artBox.offsetHeight+Number(220-img.height);
                artBox.style.top=toTop+"px";
            }
        }
    };
    document.onmouseup=function(){
        zhuangtai=false;
    }
}
//    商品价格与详情
var buyInfoBtn = document.getElementById("buyInfoBtn");
var artInfoBtn = document.getElementById("artInfoBtn");
var buyInfo = document.getElementById("buyInfo");
var detail = document.getElementById("detail");
var isOutB = true;
var isOutA = true;

function mouseIn(isOut,obj){
//        显示初始化
    buyInfo.style.display="none";
    detail.style.display="none";

    isOut = false;
    obj.style.display="block";
    if(obj.style.opacity=""){
        obj.style.opacity="0";
    }
    setTimeout(function(){
        obj.style.opacity="1";
        obj.style.transition="all 0.3s linear";
    },100);
    event.cancelBubble=true;
}

document.onclick=function(){
    if(buyInfo.style.display!="none" && isOutB){
        buyInfo.style.display="none";
    }else if(detail.style.display!="none" && isOutA){
        detail.style.display="none";
    }
};
//    更多场景&&定制画框
var optionBtn = document.getElementById("optionBtn");
var optionLists = optionBtn.getElementsByTagName("li");
var moreBg = document.getElementById("moreBg");
var customFrame = document.getElementById("customFrame");

var show1=function(){
    optionLists[0].style.overflow="visible";
    optionLists[14].style.overflow="hidden";
    optionBtn.style.bottom="140px";
};

var show2=function(){
    optionLists[14].style.overflow="visible";
    optionLists[0].style.overflow="hidden";
    optionBtn.style.bottom="140px";
};

optionLists[0].onmouseover=show1;
optionLists[14].onmouseover=show2;

var dis1 = function(){
    optionBtn.style.bottom="10px";
};

var dis2 = function(){
    optionBtn.style.bottom="10px";
};

optionLists[0].onmouseout=dis1;
optionLists[14].onmouseout=dis2;

//    评析、信息版块切换
var detailIntro = document.getElementById("detailIntro");
var secBtn = detailIntro.getElementsByTagName("span");
var infoDiv = document.getElementById("infoDiv");
var commentSec = document.getElementById("commentSec");

function switchSec(obj){
//        display初始化
    if(infoDiv.style.display=""){
        infoDiv.style.display="none";
    }else if(commentSec.style.display=""){
        commentSec.style.display="none"
    }
//        borderBottom初始化
    if(secBtn[0].style.borderBottom=""){
        secBtn[0].style.borderBottom="none";
    }else if(secBtn[1].style.borderBottom=""){
        secBtn[1].style.borderBottom="none";
    }
//        color初始化
    if(secBtn[0].style.color=""){
        secBtn[0].style.color="#a8a8a8";
    }else if(secBtn[1].style.color=""){
        secBtn[1].style.color="#a8a8a8";
    }
    if(obj==commentSec){
        infoDiv.style.display="none";
        commentSec.style.display="block";
        secBtn[1].style.borderBottom="none";
        secBtn[0].style.borderBottom="3px solid #000000";
        secBtn[1].style.color="#a8a8a8";
        secBtn[0].style.color="#000000";

    }else{
        commentSec.style.display="none";
        infoDiv.style.display="block";
        secBtn[0].style.borderBottom="none";
        secBtn[1].style.borderBottom="3px solid #000000";
        secBtn[0].style.color="#a8a8a8";
        secBtn[1].style.color="#000000";
    }
}
secBtn[0].onclick=function(){
    switchSec(commentSec);
};
secBtn[1].onclick=function(){
        switchSec(infoDiv);
    };

//       购物车添加
function addToCart(){
    var addSuccess=document.getElementById("addSuccess");
    var method="get";
    var action="/addToCart.do?";
    var content=null;
    ajax(method,action,content,function(data){
        //console.log("返回结果："+data);
        if(data=="login"){
            window.location.href="/goLogin.do";
        }else{
            addSuccess.style.animation=" move 1s linear";
        }
    })
}
//      立即购买
function nowBuy(){
    var method="get";
    var action="/nowBuy.do?";
    var content=null;
    ajax(method,action,content,function(data){
        if(data=="login"){
            window.location.href="/goLogin.do";
        }else{
            window.location.href="/payCenter.do";
        }
    })
}

