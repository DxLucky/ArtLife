
                           //---------节点获取表--------
//----header---
getHeader=document.getElementById("header");
getSeat=document.getElementById("seat");
//----banner---
bannerFirst=document.getElementById("bannerFirst");
//----专题---
getSpecialLi=document.getElementById("specialPhoto").getElementsByTagName("li");
//----专题箭头---
arrowRight=document.getElementById("arrowRight");
arrowLeft=document.getElementById("arrowLeft");
specialPhotoBox=document.getElementById("specialPhoto");
//----新作---
alterNate=document.getElementById("alterNate");
newOpusPhoto=document.getElementById("newOpusPhoto");
newOpusPhotoLi=newOpusPhoto.getElementsByTagName("li");
smallPhotoLi=document.getElementById("smallPhoto").getElementsByClassName("newOpusSmallBox");
//----推荐---
cateGoryChoose=document.getElementById("cateGoryChoose").getElementsByTagName("li");
categoryList=document.getElementsByClassName("categoryList");
categoryShadow=document.getElementsByClassName("categoryShadow");
categoryRightShadow=document.getElementsByClassName("categoryRightShadow")[0];
//---whyUs----
whyUsli=document.getElementById("whyUs").getElementsByTagName("li");
//---侧边栏----
sidebarBotton=document.getElementById("sidebar").getElementsByTagName("div");
helpBox=document.getElementById("help");
sucessMess=document.getElementById("sucessMess");
telTips=helpBox.getElementsByTagName("form")[0].getElementsByTagName("p")[0].getElementsByTagName("span")[0];
TelMatch=/0?(13|14|15|17|18)[0-9]{9}/;
//---banner移入移除全局变量和定时器----
var pos=1;
var sliderM;
//---------页面加载设置时加行间样式--------
//-----banner轮播-----
window.onload=function(){
   for (var i=0;i<getSpecialLi.length;i++){
       //---------页面加载设置专题图片相对定位left值--------
       getSpecialLi[i].style.cssText="position:relative;left:0px;";
       //---------页面加载设置specail专题图片移入移除函数--------
       getSpecialLi[i].onmouseover=function(){extend(this)};
       getSpecialLi[i].onmouseout=function(){contract(this)};
       getSpecialLi[i].setAttribute("value",i);
       //---------页面加载设置新作图片设置zIndex层级关系--------
       smallPhotoLi[i].getElementsByTagName("img")[0].style.zIndex="10";
       smallPhotoLi[i].getElementsByTagName("img")[1].style.zIndex="9";
   }
//-----左边第一张---
   newOpusPhotoLi[0].getElementsByTagName("img")[0].style.zIndex="10";
   newOpusPhotoLi[0].getElementsByTagName("img")[1].style.zIndex="9";
   //-----左边第二张---
   newOpusPhotoLi[1].getElementsByTagName("div")[0].style.zIndex="10";
   newOpusPhotoLi[1].getElementsByTagName("div")[1].style.zIndex="9";
   //-----右边小图下面第四张---
   smallPhotoLi[7].getElementsByTagName("img")[0].style.zIndex="10";
   smallPhotoLi[7].getElementsByTagName("img")[1].style.zIndex="9";
   //---------页面加载设置推荐图片设置zIndex层级关系和display方式--------
   for (var d=0;d<3;d++){
       categoryList[d].getElementsByTagName("div")[1].style.cssText="display:block;position:absolute;top:0px";
       categoryList[d].getElementsByTagName("div")[1].style.zIndex="50";
       categoryList[d].getElementsByTagName("div")[2].style.cssText="display:none;position:absolute;top:0px";
       categoryList[d].getElementsByTagName("div")[3].style.cssText="display:none;position:absolute;top:0px";
       categoryList[d].getElementsByTagName("div")[4].style.cssText="display:none;position:absolute;top:0px";
   }
   cateGoryChoose[1].style.cssText="color: #e56a69;border-bottom: 1px solid #e56a69;";
   //---------页面加载设置banner1的小图片--------
    function slider(){
        document.getElementById("slider"+pos+"").style.display="none";
        pos=(++pos==4?1:pos);
        document.getElementById("slider"+pos+"").style.display="block";
    }
    var banner=document.getElementById("bannerOutBox");
   sliderM=setInterval(slider,4000);
    //-----移入banner停止轮播-----
    banner.onmouseover=function(){
        clearInterval(sliderM);
    };
//-----移出banner开始轮播-----
    banner.onmouseout=function(){
        sliderM=setInterval(slider,4000);
    };
};
function moveImg(pre,now){
   document.getElementById("slider"+pre+"").style.display="none";
   document.getElementById("slider"+now+"").style.display="block";
   pos=now;
}
//----页面加载是鼠标滚动时页面动画---
                           //--------鼠标滚动导航背景颜色变化-------
window.onscroll=function(){
        if(document.body.scrollTop!==0 || document.documentElement.scrollTop!==0) {
            sidebarBotton[1].style.display="block";
            getSeat.style.animation = "bkTurnBlack .2s linear both";
            //getSeat.style.animation = "bkTurnBlack .2s linear both";
            //getSeat.style.mozAnimation = "bkTurnBlack .2s linear both";
            //alert(document.body.scrollTop)
            if(document.body.scrollTop>763 || document.documentElement.scrollTop>763){
                newOpusPhotoLi[0].style.animation="jumpUp .5s linear both";
                newOpusPhotoLi[1].style.animation="jumpUp .5s linear both";
                smallPhotoLi[3].style.animation="jumpUp .5s linear both";
                smallPhotoLi[7].style.animation="jumpUp .5s linear both";
                smallPhotoLi[2].style.animation="jumpUp .5s linear .2s both";
                smallPhotoLi[6].style.animation="jumpUp .5s linear .2s both";
                smallPhotoLi[1].style.animation="jumpUp .5s linear .4s both";
                smallPhotoLi[5].style.animation="jumpUp .5s linear .4s both";
                smallPhotoLi[0].style.animation="jumpUp .5s linear .6s both";
                smallPhotoLi[4].style.animation="jumpUp .5s linear .6s both";
            }
            if(document.body.scrollTop>1204 || document.documentElement.scrollTop>1204){
                categoryList[0].style.animation="jumpUpsw .5s linear both";
                categoryList[1].style.animation="jumpUpsw .5s linear .3s both";
                categoryList[2].style.animation="jumpUpsw .5s linear .6s both";
            }
            if(document.body.scrollTop>2483 || document.documentElement.scrollTop>2483){
                whyUsli[1].style.animation="jumpUp .8s linear both";
                whyUsli[0].style.animation="jumpUpRight .8s linear both";
                whyUsli[2].style.animation="jumpUpLeft .8s linear both";
            }
            if(document.body.scrollTop>2917 || document.documentElement.scrollTop>2917){
                whyUsli[3].style.animation="jumpUpHeight 1s linear both";
                whyUsli[6].style.animation="jumpUpHeightS 1s linear both";
                whyUsli[5].style.animation="opacityChange 1s linear both";
            }
        }
        else {
            getSeat.style.animation = "bkTurnBack .2s linear both";
            sidebarBotton[1].style.display="none"
        }
};
//==================================================
function extend(obj){    //移入专题图片伸展
    var num=obj.value;
     for (var k=0;k<num;k++){
         getSpecialLi[k].style.cssText="position:relative;left:-50px;transition:all .3s linear";
     }
}
function contract(obj){    //移除专题图片缩放
     var num=obj.value;
     for (var k=0;k<num;k++){
         getSpecialLi[num].style.cssText="with:316px;position:relative;left:0px;transition:all .3s linear";
         getSpecialLi[k].style.cssText="position:relative;left:0px;transition:all .3s linear"
     }
}
                                  //--------专题箭头----
arrowRight.onclick=function(){
    specialPhotoBox.style.marginLeft="-1033px";
    specialPhotoBox.style.transition="all .5s linear"
};
arrowLeft.onclick=function(){
    specialPhotoBox.style.marginLeft="0px";
    specialPhotoBox.style.transition="all .5s linear"
};
                           //----新作区域---
var k=0;
alterNate.onmouseover=function(){alterNate.style.color="#e56a69";};
alterNate.onmouseout=function(){alterNate.style.color="#666666";};
alterNate.onclick=function(){
    document.getElementById("newOpus").getElementsByTagName("div")[0].style.display="block";
    document.getElementById("newOpus").getElementsByTagName("div")[1].style.display="block";
    alterNate.style.color="#e56a69";
    alterNate.getElementsByTagName("i")[0].style.animation="rotateChange 0.8s linear infinite both";
    alterNate.onmouseout=function(){alterNate.style.color="#e56a69";};
    setTimeout(function(){
        alterNate.style.color="#666666";
        alterNate.getElementsByTagName("i")[0].style="none";
        alterNate.onmouseout=function(){alterNate.style.color="#666666";};
        document.getElementById("newOpus").getElementsByTagName("div")[0].style.display="none";
        document.getElementById("newOpus").getElementsByTagName("div")[1].style.display="none"
    },2000);
    if (k%2==0){
        //------左边第一幅----
        newOpusPhotoLi[0].getElementsByTagName("img")[0].style.animation="rotateImg 1s linear both";
        newOpusPhotoLi[0].getElementsByTagName("img")[1].style.animation="rotateImgReset 1s linear both";
        setTimeout(function(){
            newOpusPhotoLi[0].getElementsByTagName("img")[0].style.zIndex="9";
            newOpusPhotoLi[0].getElementsByTagName("img")[1].style.zIndex="10";
            newOpusPhotoLi[0].getElementsByClassName("newOpusText")[0].innerHTML=
                "<p>"+"赖明贤"+"<br/>"+"识微系列--CN003"+"<hr class='hrStyle'>"+"<span>"+"¥6050"+"</span>"+"</p>"

        },500);
        //-----左边第二幅-----
        newOpusPhotoLi[1].getElementsByTagName("div")[0].style.animation="rotateImg 1s linear .2s both";
        newOpusPhotoLi[1].getElementsByTagName("div")[1].style.animation="rotateImgReset 1s linear .2s both";
        setTimeout(function(){
            newOpusPhotoLi[1].getElementsByTagName("div")[0].style.zIndex="9";
            newOpusPhotoLi[1].getElementsByTagName("div")[1].style.zIndex="10";
            newOpusPhotoLi[1].getElementsByClassName("newOpusText")[0].innerHTML=
                "<p>"+"廖漫"+"<br/>"+"纪念品呢？"+"<hr class='hrStyle'>"+"<span>"+"¥54350"+"</span>"+"</p>"
        },700);
        //-----右上小图8张-----
        var t=0.4;
        var n=0;
        for (var m=0;m<smallPhotoLi.length;m++){
            smallPhotoLi[m].getElementsByTagName("img")[0].style.animation="rotateImg 1s linear "+t+"s both";
            smallPhotoLi[m].getElementsByTagName("img")[1].style.animation="rotateImgReset 1s linear "+t+"s both";
            myRotate(n,t);
            n=n+1;
            t=t+0.2;
            if(m==3){t=0.4;}
        }
        function myRotate(n,t){
            var textContent;
            if(n==0){
                textContent= "<p>"+"程蒙蒙"+"<br/>"+"寻梦"+"<hr class='hrStyle'>"+"<span>"+"¥9650"+"</span>"+"</p>"
            }
            else if(n==1){
                textContent= "<p>"+"李龙飞"+"<br/>"+"黑色诱惑"+"<hr class='hrStyle'>"+"<span>"+"¥21950"+"</span>"+"</p>"
            }
            else if(n==2){
                textContent= "<p>"+"张梓"+"<br/>"+"图像公园"+"<hr class='hrStyle'>"+"<span>"+"¥26750"+"</span>"+"</p>"
            }
            else if(n==3){
                textContent= "<p>"+"廉学洛"+"<br/>"+"黑洞"+"<hr class='hrStyle'>"+"<span>"+"¥150500"+"</span>"+"</p>"
            }
            else if(n==4){
                textContent= "<p>"+"吴箐"+"<br/>"+"我在儿时等你"+"<hr class='hrStyle'>"+"<span>"+"¥7250"+"</span>"+"</p>"
            }
            else if(n==5){
                textContent= "<p>"+"真琦"+"<br/>"+"沐浴阳光"+"<hr class='hrStyle'>"+"<span>"+"¥3050"+"</span>"+"</p>"
            }
            else if(n==6){
                textContent= "<p>"+"葛冠中"+"<br/>"+"消夏图"+"<hr class='hrStyle'>"+"<span>"+"¥130350"+"</span>"+"</p>"
            }
            else if(n==7){
                textContent= "<p>"+"刘宇"+"<br/>"+"观望"+"<hr class='hrStyle'>"+"<span>"+"¥6050"+"</span>"+"</p>"
            }
            setTimeout(function(){
                smallPhotoLi[n].getElementsByTagName("img")[0].style.zIndex="9";
                smallPhotoLi[n].getElementsByTagName("img")[1].style.zIndex="10";
                smallPhotoLi[n].getElementsByClassName("newOpusSmall")[0].innerHTML= textContent
            },(500+t*1000));
        }
    }
    else {
        //------左边第一幅----
        newOpusPhotoLi[0].getElementsByTagName("img")[1].style.animation="rotateImg 1s linear both";
        newOpusPhotoLi[0].getElementsByTagName("img")[0].style.animation="rotateImgReset 1s linear both";
        setTimeout(function(){
            newOpusPhotoLi[0].getElementsByTagName("img")[0].style.zIndex="10";
            newOpusPhotoLi[0].getElementsByTagName("img")[1].style.zIndex="9";
            newOpusPhotoLi[0].getElementsByClassName("newOpusText")[0].innerHTML=
                "<p>"+"明希"+"<br/>"+"前方还有100米"+"<hr class='hrStyle'>"+"<span>"+"¥4050"+"</span>"+"</p>"
        },500);
        //-----左边第二幅-----
        newOpusPhotoLi[1].getElementsByTagName("div")[1].style.animation="rotateImg 1s linear .2s both";
        newOpusPhotoLi[1].getElementsByTagName("div")[0].style.animation="rotateImgReset 1s linear .2s both";
        setTimeout(function(){
            newOpusPhotoLi[1].getElementsByTagName("div")[0].style.zIndex="10";
            newOpusPhotoLi[1].getElementsByTagName("div")[1].style.zIndex="9";
            newOpusPhotoLi[1].getElementsByClassName("newOpusText")[0].innerHTML=
                "<p>"+"张纯"+"<br/>"+"黑夜里的光"+"<hr class='hrStyle'>"+"<span>"+"¥2050"+"</span>"+"</p>"
        },700);
        //-----右上小图8张-----
        var t=0.4;
        var n=0;
        for (var m=0;m<smallPhotoLi.length;m++){
            smallPhotoLi[m].getElementsByTagName("img")[1].style.animation="rotateImg 1s linear "+t+"s both";
            smallPhotoLi[m].getElementsByTagName("img")[0].style.animation="rotateImgReset 1s linear "+t+"s both";
            myRotateSd(n,t);
            n=n+1;
            t=t+0.2;
            if (m==3){t=0.4;}
        }
        function myRotateSd(n,t){
            var textContent;
            if(n==0){
                textContent= "<p>"+"张鹏"+"<br/>"+"余音绕"+"<hr class='hrStyle'>"+"<span>"+"¥1850"+"</span>"+"</p>"
            }
            else if(n==1){
                textContent= "<p>"+"聂肖"+"<br/>"+"石头"+"<hr class='hrStyle'>"+"<span>"+"¥2350"+"</span>"+"</p>"
            }
            else if(n==2){
                textContent= "<p>"+"何俊艺"+"<br/>"+"什么玩意儿"+"<hr class='hrStyle'>"+"<span>"+"¥16350"+"</span>"+"</p>"
            }
            else if(n==3){
                textContent= "<p>"+"刘倩"+"<br/>"+"古怪的猫"+"<hr class='hrStyle'>"+"<span>"+"¥8050"+"</span>"+"</p>"
            }
            else if(n==4){
                textContent= "<p>"+"罗荃木"+"<br/>"+"海豚公园"+"<hr class='hrStyle'>"+"<span>"+"¥10050"+"</span>"+"</p>"
            }
            else if(n==5){
                textContent= "<p>"+"成艺"+"<br/>"+"乡音"+"<hr class='hrStyle'>"+"<span>"+"¥18350"+"</span>"+"</p>"
            }
            else if(n==6){
                textContent= "<p>"+"崔明"+"<br/>"+"人-尺"+"<hr class='hrStyle'>"+"<span>"+"¥4050"+"</span>"+"</p>"
            }
            else if(n==7){
                textContent= "<p>"+"赵一浅"+"<br/>"+"在这里一切相互存在"+"<hr class='hrStyle'>"+"<span>"+"¥70350"+"</span>"+"</p>"
            }
            setTimeout(function(){
                smallPhotoLi[n].getElementsByTagName("img")[0].style.zIndex="10";
                smallPhotoLi[n].getElementsByTagName("img")[1].style.zIndex="9";
                smallPhotoLi[n].getElementsByClassName("newOpusSmall")[0].innerHTML= textContent
            },(500+t*1000));
        }
    }
    k++
};

                         //-------新作左边图片移入移除-------
newOpusPhotoLi[0].onmouseover=function(){
    newOpusPhotoLi[0].getElementsByTagName("img")[0].style.animation="enlarge .2s linear both";
    newOpusPhotoLi[0].getElementsByTagName("img")[1].style.animation="enlarge .2s linear both";
};
newOpusPhotoLi[0].onmouseout=function(){
    newOpusPhotoLi[0].getElementsByTagName("img")[0].style.animation="reduce .2s linear both";
    newOpusPhotoLi[0].getElementsByTagName("img")[1].style.animation="reduce .2s linear both";
};
                           //-------新作右边小图片移入移除-------
for (var j=0;j<smallPhotoLi.length;j++){
    smallPhotoLi[j].onmouseover=function(){
        this.getElementsByTagName("img")[0].style.animation="enlarge .2s linear both";
        this.getElementsByTagName("img")[1].style.animation="enlarge .2s linear both";
    };
    smallPhotoLi[j].onmouseout=function(){
        this.getElementsByTagName("img")[0].style.animation="reduce .2s linear both";
        this.getElementsByTagName("img")[1].style.animation="reduce .2s linear both";
    };
}
                           //-----------推荐------------
//------点击水墨-----
cateGoryChoose[2].onclick=function(){
    for (var f=0;f<categoryShadow.length;f++){
        categoryShadow[f].style.display="block";
    }
    categoryRightShadow.style.display="block";
    setTimeout(function(){
        for (var c=0;c<categoryShadow.length;c++){
            categoryShadow[c].style.display="none"
        }
        categoryShadow[1].style.display="block";
        categoryRightShadow.style.display="none"
    },2000);
    for (var a=1;a<5;a++){
        if (a!==2){
            categoryList[0].getElementsByTagName("div")[a].style.animation = "cateGoryEnlarge 1s linear both";
            categoryList[1].getElementsByTagName("div")[a].style.animation = "cateGoryEnlarge 1s linear .5s both";
            categoryList[2].getElementsByTagName("div")[a].style.animation = "cateGoryEnlarge 1s linear 1s both";
            cateGoryChoose[a].style.cssText="none"
        }
        cateGoryChoose[2].style.cssText="color: #e56a69;border-bottom: 1px solid #e56a69;"
    }
    categoryList[0].getElementsByTagName("div")[2].style.display = "block";
    categoryList[0].getElementsByTagName("div")[2].style.animation = "cateGoryEnlargeRe 1s linear both";
    categoryList[1].getElementsByTagName("div")[2].style.display = "block";
    categoryList[1].getElementsByTagName("div")[2].style.animation = "cateGoryEnlargeRe 1s linear .5s both";
    categoryList[2].getElementsByTagName("div")[2].style.display = "block";
    categoryList[2].getElementsByTagName("div")[2].style.animation = "cateGoryEnlargeRe 1s linear 1s both";
    //-----左边图片区域----
    setTimeout(function(){
        categoryList[0].getElementsByTagName("div")[2].style.zIndex = "50";
        for (var b=1;b<5;b++) {
            if (b!==2){
                categoryList[0].getElementsByTagName("div")[b].style.zIndex = "";
                categoryList[0].getElementsByTagName("div")[b].style.display = "none"
            }
        }
        categoryList[0].getElementsByTagName("p")[0].innerHTML = "<p>" + "聂危谷" + "<br/>" + "吟秋,2012" + "<br/>" + "纸本设色：68x68cm" + "</p>";
        categoryList[0].getElementsByTagName("span")[0].innerHTML = "<span>" + "¥45050" + "</span>"
    }, 500);
    //-----中间图片区域----
    setTimeout(function(){
        categoryList[1].getElementsByTagName("div")[2].style.zIndex = "50";
        for (var b=1;b<5;b++) {
            if (b!==2){
                categoryList[1].getElementsByTagName("div")[b].style.zIndex = "";
                categoryList[1].getElementsByTagName("div")[b].style.display = "none"
            }
        }
        categoryList[1].getElementsByTagName("p")[0].innerHTML = "<p>" + "张兴来" + "<br/>" + "秋荷,2001" + "<br/>" + "纸本设色：44x46cm" + "</p>";
        categoryList[1].getElementsByTagName("span")[0].innerHTML = "<span>" + "¥5250" + "</span>"
    }, 1000);
    //-----右边图片区域----
    setTimeout(function(){
        categoryList[2].getElementsByTagName("div")[2].style.zIndex = "50";
        for (var b=1;b<5;b++) {
            if (b!==2){
                categoryList[2].getElementsByTagName("div")[b].style.zIndex = "";
                categoryList[2].getElementsByTagName("div")[b].style.display = "none"
            }
        }
        categoryList[2].getElementsByTagName("p")[0].innerHTML = "<p>" + "贾敏" + "<br/>" + "独饮山泉水,2014" + "<br/>" + "纸本设色：38x70cm" + "</p>";
        categoryList[2].getElementsByTagName("span")[0].innerHTML = "<span>" + "¥1950" + "</span>"
    }, 1500);
};
//------点击版画-----
    cateGoryChoose[3].onclick=function(){
        for (var f=0;f<categoryShadow.length;f++){
            categoryShadow[f].style.display="block"
        }
        categoryRightShadow.style.display="block";
        setTimeout(function(){
            for (var c=0;c<categoryShadow.length;c++){
                categoryShadow[c].style.display="none"
            }
            categoryShadow[2].style.display="block";
            categoryRightShadow.style.display="none"
        },2000);
        for(var a=1;a<5;a++){
            if (a!==3){
                categoryList[0].getElementsByTagName("div")[a].style.animation="cateGoryEnlarge 1s linear both";
                categoryList[1].getElementsByTagName("div")[a].style.animation="cateGoryEnlarge 1s linear .5s both";
                categoryList[2].getElementsByTagName("div")[a].style.animation="cateGoryEnlarge 1s linear 1s both";
                cateGoryChoose[a].style.cssText="none"
            }
            cateGoryChoose[3].style.cssText="color: #e56a69;border-bottom: 1px solid #e56a69;"
        }
        categoryList[0].getElementsByTagName("div")[3].style.display="block";
        categoryList[0].getElementsByTagName("div")[3].style.animation="cateGoryEnlargeRe 1s linear both";
        categoryList[1].getElementsByTagName("div")[3].style.display="block";
        categoryList[1].getElementsByTagName("div")[3].style.animation="cateGoryEnlargeRe 1s linear .5s both";
        categoryList[2].getElementsByTagName("div")[3].style.display="block";
        categoryList[2].getElementsByTagName("div")[3].style.animation="cateGoryEnlargeRe 1s linear 1s both";
        //-----左边图片区域----
        setTimeout(function(){
            categoryList[0].getElementsByTagName("div")[3].style.zIndex="50";
            for (var b=1;b<5;b++){
                if(b!==3){
                    categoryList[0].getElementsByTagName("div")[b].style.zIndex="";
                    categoryList[0].getElementsByTagName("div")[b].style.display="none";
                }
            }
            categoryList[0].getElementsByTagName("p")[0].innerHTML= "<p>"+"钟飚"+"<br/>"+"入定,2012"+"<br/>"+"艺术微喷：60x75cm"+"</p>";
            categoryList[0].getElementsByTagName("span")[0].innerHTML= "<span>"+"¥1149"+"</span>"
        },500);
        //-----中间图片区域----
        setTimeout(function(){
            categoryList[1].getElementsByTagName("div")[3].style.zIndex="50";
            for (var b=1;b<5;b++){
                if(b!==3){
                    categoryList[1].getElementsByTagName("div")[b].style.zIndex="";
                    categoryList[1].getElementsByTagName("div")[b].style.display="none";
                }
            }
            categoryList[1].getElementsByTagName("p")[0].innerHTML= "<p>"+"马力"+"<br/>"+"点点是根乖狗,2015"+"<br/>"+"综合：20x27cm"+"</p>";
            categoryList[1].getElementsByTagName("span")[0].innerHTML= "<span>"+"¥1380"+"</span>"
        },1000);
        //-----右边图片区域----
        setTimeout(function(){
            categoryList[2].getElementsByTagName("div")[3].style.zIndex="50";
            for (var b=1;b<5;b++){
                if(b!==3){
                    categoryList[2].getElementsByTagName("div")[b].style.zIndex="";
                    categoryList[2].getElementsByTagName("div")[b].style.display="none";
                }
            }
            categoryList[2].getElementsByTagName("p")[0].innerHTML= "<p>"+"崔雪涛"+"<br/>"+"安魂曲·迷城,2014"+"<br/>"+"数码版：50x50cm"+"</p>";
            categoryList[2].getElementsByTagName("span")[0].innerHTML= "<span>"+"¥1950"+"</span>"
        },1500);
};
//------点击水彩-----
cateGoryChoose[4].onclick=function(){
    for (var f=0;f<categoryShadow.length;f++){
        categoryShadow[f].style.display="block"
    }
    categoryRightShadow.style.display="block";
    setTimeout(function(){
        for (var c=0;c<categoryShadow.length;c++){
            categoryShadow[c].style.display="none"
        }
        categoryShadow[3].style.display="block";
        categoryRightShadow.style.display="none"
    },2000);
    for (var a=1;a<5;a++){
        if (a!==4){
            categoryList[0].getElementsByTagName("div")[a].style.animation = "cateGoryEnlarge 1s linear both";
            categoryList[1].getElementsByTagName("div")[a].style.animation = "cateGoryEnlarge 1s linear .5s both";
            categoryList[2].getElementsByTagName("div")[a].style.animation = "cateGoryEnlarge 1s linear 1s both";
            cateGoryChoose[a].style.cssText="none"
        }
        cateGoryChoose[4].style.cssText="color: #e56a69;border-bottom: 1px solid #e56a69;"
    }
    categoryList[0].getElementsByTagName("div")[4].style.display = "block";
    categoryList[0].getElementsByTagName("div")[4].style.animation = "cateGoryEnlargeRe 1s linear both";
    categoryList[1].getElementsByTagName("div")[4].style.display = "block";
    categoryList[1].getElementsByTagName("div")[4].style.animation = "cateGoryEnlargeRe 1s linear .5s both";
    categoryList[2].getElementsByTagName("div")[4].style.display = "block";
    categoryList[2].getElementsByTagName("div")[4].style.animation = "cateGoryEnlargeRe 1s linear 1s both";
    //-----左边图片区域----
    setTimeout(function(){
        categoryList[0].getElementsByTagName("div")[4].style.zIndex = "50";
        for (var b=1;b<5;b++) {
            if (b!==4){
                categoryList[0].getElementsByTagName("div")[b].style.zIndex="";
                categoryList[0].getElementsByTagName("div")[b].style.display = "none";
                cateGoryChoose[a].style.cssText="none"
            }
            cateGoryChoose[4].style.cssText="color: #e56a69;border-bottom: 1px solid #e56a69;"
        }
        categoryList[0].getElementsByTagName("p")[0].innerHTML = "<p>" + "梁荟轩" + "<br/>" + "蝴蝶系列,2016" + "<br/>" + "纸本水彩：27x19cm" + "</p>";
        categoryList[0].getElementsByTagName("span")[0].innerHTML = "<span>" + "¥2750" + "</span>"
    }, 500);
    //-----中间图片区域----
    setTimeout(function(){
        categoryList[1].getElementsByTagName("div")[2].style.zIndex = "50";
        for (var b=1;b<5;b++) {
            if (b!==4){
                categoryList[1].getElementsByTagName("div")[b].style.zIndex="";
                categoryList[1].getElementsByTagName("div")[b].style.display = "none"
            }
        }
        categoryList[1].getElementsByTagName("p")[0].innerHTML = "<p>" + "潘斌" + "<br/>" + "深林-2,2015" + "<br/>" + "纸本水彩：90x150cm" + "</p>";
        categoryList[1].getElementsByTagName("span")[0].innerHTML = "<span>" + "¥5250" + "</span>"
    }, 1000);
    //-----右边图片区域----
    setTimeout(function(){
        categoryList[2].getElementsByTagName("div")[2].style.zIndex = "50";
        for (var b=1;b<5;b++) {
            if (b!==4){
                categoryList[2].getElementsByTagName("div")[b].style.zIndex="";
                categoryList[2].getElementsByTagName("div")[b].style.display = "none"
            }
        }
        categoryList[2].getElementsByTagName("p")[0].innerHTML = "<p>" + "李晶" + "<br/>" + "空想,2016" + "<br/>" + "纸本水彩：27x39cm" + "</p>";
        categoryList[2].getElementsByTagName("span")[0].innerHTML = "<span>" + "¥1250" + "</span>"
    }, 1500);
};
//------点击油画-----
cateGoryChoose[1].onclick=function(){
    for (var f=0;f<categoryShadow.length;f++){
        categoryShadow[f].style.display="block"
    }
    categoryRightShadow.style.display="block";
    setTimeout(function(){
        for (var c=0;c<categoryShadow.length;c++){
            categoryShadow[c].style.display="none"
        }
        categoryShadow[0].style.display="block";
        categoryRightShadow.style.display="none"
    },2000);
    for (var a=1;a<5;a++){
        if (a!==1){
            categoryList[0].getElementsByTagName("div")[a].style.animation = "cateGoryEnlarge 1s linear both";
            categoryList[1].getElementsByTagName("div")[a].style.animation = "cateGoryEnlarge 1s linear .5s both";
            categoryList[2].getElementsByTagName("div")[a].style.animation = "cateGoryEnlarge 1s linear 1s both";
            cateGoryChoose[a].style.cssText="none";
        }
        cateGoryChoose[1].style.cssText="color: #e56a69;border-bottom: 1px solid #e56a69;"
    }
    categoryList[0].getElementsByTagName("div")[1].style.display = "block";
    categoryList[0].getElementsByTagName("div")[1].style.animation = "cateGoryEnlargeRe 1s linear both";
    categoryList[1].getElementsByTagName("div")[1].style.display = "block";
    categoryList[1].getElementsByTagName("div")[1].style.animation = "cateGoryEnlargeRe 1s linear .5s both";
    categoryList[2].getElementsByTagName("div")[1].style.display = "block";
    categoryList[2].getElementsByTagName("div")[1].style.animation = "cateGoryEnlargeRe 1s linear 1s both";
    //-----左边图片区域----
    setTimeout(function(){
        categoryList[0].getElementsByTagName("div")[1].style.zIndex = "50";
        for (var b=1;b<5;b++) {
            if (b!==1){
                categoryList[0].getElementsByTagName("div")[b].style.zIndex="";
                categoryList[0].getElementsByTagName("div")[b].style.display = "none";
            }
        }
        categoryList[0].getElementsByTagName("p")[0].innerHTML = "<p>" + "张檬予" + "<br/>" + "浮若幽生：No.1,2016" + "<br/>" + "布画油画：100x100cm" + "</p>";
        categoryList[0].getElementsByTagName("span")[0].innerHTML = "<span>" + "¥7350" + "</span>"
    }, 500);
    //-----中间图片区域----
    setTimeout(function(){
        categoryList[1].getElementsByTagName("div")[2].style.zIndex = "50";
        for (var b=1;b<5;b++) {
            if (b!==1){
                categoryList[1].getElementsByTagName("div")[b].style.zIndex="";
                categoryList[1].getElementsByTagName("div")[b].style.display = "none"
            }
        }
        categoryList[1].getElementsByTagName("p")[0].innerHTML = "<p>" + "陈建枢" + "<br/>" + "红,2016" + "<br/>" + "纸本油画：38x54cm" + "</p>";
        categoryList[1].getElementsByTagName("span")[0].innerHTML = "<span>" + "¥6050" + "</span>"
    }, 1000);
    //-----右边图片区域----
    setTimeout(function(){
        categoryList[2].getElementsByTagName("div")[2].style.zIndex = "50";
        for (var b=1;b<5;b++) {
            if (b!==1){
                categoryList[2].getElementsByTagName("div")[b].style.zIndex="";
                categoryList[2].getElementsByTagName("div")[b].style.display = "none"
            }
        }
        categoryList[2].getElementsByTagName("p")[0].innerHTML = "<p>" + "高桑康二郎" + "<br/>" + "他们是你，你是我，我是他们,2016" + "<br/>" + "布面丙烯：145x125cm" + "</p>";
        categoryList[2].getElementsByTagName("span")[0].innerHTML = "<span>" + "¥20350" + "</span>"
    }, 1500);
};
                           //----------点击回到顶部---------
var topIntev;
var nowTp;
var nowTpFor;
     sidebarBotton[1].onclick=function(){
         (function(){
            if(document.body.scrollTop){
                return nowTp=document.body.scrollTop
            }else {
                return nowTp=document.documentElement.scrollTop
            }
         })();
         topIntev=setInterval(backTop,50)
     };
     function backTop(){
         if(document.body.scrollTop){
             if(document.body.scrollTop==0 || document.body.scrollTop>nowTp){
                 clearInterval(topIntev)
             }
             else {
                 document.body.scrollTop=document.body.scrollTop-50;
                 nowTp=document.body.scrollTop;
             }
         }else {
             if(document.documentElement.scrollTop==0 || document.documentElement.scrollTop>nowTp){
                 clearInterval(topIntev)
             }
             else {
                 document.documentElement.scrollTop=document.documentElement.scrollTop-50;
                 nowTp=document.documentElement.scrollTop;
             }
         }
     }
                           //----------点击弹出帮助框---------
     sidebarBotton[0].onclick=function(){
         helpBox.style.display="block";
     };
     helpBox.getElementsByTagName("div")[1].onclick=function(){
         helpBox.style.display="none";
         sucessMess.style.display="none";
         helpBox.style.height="460px";
         telTips.style.display="none";
         helpBox.getElementsByTagName("input")[0].value="";
         helpBox.getElementsByTagName("textarea")[0].value="";
     };
                           //----------点击弹出帮助框提交按钮---------
helpBox.getElementsByTagName("input")[1].onclick=function(){
    if(helpBox.getElementsByTagName("input")[0].value!=="" && helpBox.getElementsByTagName("textarea")[0].value!=="" &&helpBox.getElementsByTagName("input")[0].value.match(TelMatch)){
        var phoneNo=helpBox.getElementsByTagName("input")[0].value;
        var leaveMess=helpBox.getElementsByTagName("textarea")[0].value;
        var method="post";
        var action="/askHelp.do";
        var content="phoneNumber="+phoneNo+"&message="+leaveMess+"";
        ajax(method,action,content,function(data){
            helpBox.style.height="340px";
            sucessMess.style.display="block";
            helpBox.getElementsByTagName("input")[0].value="";
            helpBox.getElementsByTagName("textarea")[0].value="";
        })
    }
    else {
        document.getElementById("judge").style.display="block";
        document.getElementById("judge").style.animation="hiddenVis 2.5s linear both";
        setTimeout(function(){
            document.getElementById("judge").style="none"
        },2500)
    }
};
sucessMess.getElementsByTagName("input")[0].onclick=function(){
    helpBox.style.display="none";
    sucessMess.style.display="none";
    helpBox.style.height="460px";
    telTips.style.display="none";
};
sucessMess.getElementsByTagName("div")[0].onclick=function(){
    sucessMess.style.display="none";
    helpBox.style.height="460px";
    telTips.style.display="none";
};
                           //======输入的手机号不能为空不能输错格式====
helpBox.getElementsByTagName("input")[0].onblur=function(){
    if(helpBox.getElementsByTagName("input")[0].value==""){
        telTips.innerHTML="手机号码不能为空";
        telTips.style.display="block";
    }
    else if(helpBox.getElementsByTagName("input")[0].value) {
        telTips.style.display = "none";
        if (!helpBox.getElementsByTagName("input")[0].value.match(TelMatch)) {
            telTips.innerHTML = "请输入正确的电话号码";
            telTips.style.display = "block";
        }
    }
};
helpBox.getElementsByTagName("textarea")[0].onfocus=function(){
    if(helpBox.getElementsByTagName("input")[0].value==""){
        telTips.innerHTML="手机号码不能为空";
        telTips.style.display="block";
    }
};